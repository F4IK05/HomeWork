using System.ComponentModel.DataAnnotations;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Application.Utils;
using AuthApi.Contracts.DTOs.Requests.Auth;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Data.Models;
using AuthApi.Infrastructure.Contexts;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using static BCrypt.Net.BCrypt;

namespace AuthApi.Application.Services.Classes;

public class AuthService : IAuthService
{
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly UserDbContext _context;
    private readonly IUserRoleService _userRoleService;
    private readonly TokenManager _tokenManager;
    private readonly IWebHostEnvironment _env;
    private readonly EmailSender _emailSender;

    public AuthService(IMapper mapper, UserDbContext context, IUserRoleService userRoleService, TokenManager tokenManager, IConfiguration configuration, IWebHostEnvironment env, EmailSender emailSender)
    {
        _mapper = mapper;
        _context = context;
        _userRoleService = userRoleService;
        _tokenManager = tokenManager;
        _configuration = configuration;
        _env = env;
        _emailSender = emailSender;
    }

    private static string GenerateAvatarUrl(string seed)
    {
        var encoded = Uri.EscapeDataString(seed);
        
        return $"https://api.dicebear.com/9.x/initials/svg?seed={encoded}";
    }
    
    public async Task<Result> RegisterAsync(RegisterRequestDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            throw new ValidationException("User with this email already exists");

        if (await _context.Users.AnyAsync(u => u.UserName == request.UserName))
            throw new ValidationException("Username already taken");
        
        var user = _mapper.Map<User>(request);

        if (string.IsNullOrEmpty(user.AvatarUrl))
        {
            user.AvatarUrl = GenerateAvatarUrl(request.UserName);
        }

        user.PasswordHash = HashPassword(request.Password);
        
        await _context.Users.AddAsync(user);

        await _userRoleService.AssignRoleToUserAsync(user.Id);
        
        await _context.SaveChangesAsync();

        return Result.Success();
    }

    public async Task<TypedResult<AuthResponse>> LoginAsync(LoginRequestDto request)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.Email == request.Identifier || u.UserName == request.Identifier);
        
        if (user == null || !Verify(request.Password, user.PasswordHash))
        {
            throw new InvalidCredentialException("Invalid Credentials");
        }
        
        // Все роли связанные с этим пользвателем
        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name).ToListAsync();
        
        var accessToken = await _tokenManager.CreateAccessTokenAsync(user, userRoles);
        var refreshToken = await _tokenManager.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(int.Parse(_configuration.GetSection("JWT:RefreshTokenExpiresInDays").Value));
        
        await _context.SaveChangesAsync();

        var response = new AuthResponse
        {
            UserName = user.UserName,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
            Token = accessToken,
            RefreshToken = refreshToken
        };
        
        return TypedResult<AuthResponse>.Success(response, "Login successful");
    }

    public async Task<TypedResult<RefreshTokenResponse>> RefreshTokenAsync(RefreshRequestDto request)
    {
        var user = _context.Users.FirstOrDefault(u => u.RefreshToken == request.RefreshToken);

        if (user == null || user.RefreshTokenExpiry <= DateTime.UtcNow)
        {
            return TypedResult<RefreshTokenResponse>.Error("Invalid or expired refresh token", 401);
        }
        
        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name).ToListAsync();
        
        var newAccessToken = await _tokenManager.CreateAccessTokenAsync(user, userRoles);
        var newRefreshToken = await _tokenManager.GenerateRefreshToken();
        
        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(int.Parse(_configuration.GetSection("JWT:RefreshTokenExpiresInDays").Value));
        
        await _context.SaveChangesAsync();
        
        var response = new RefreshTokenResponse
        {
            Token = newAccessToken,
            RefreshToken = newRefreshToken,
        };

        return TypedResult<RefreshTokenResponse>.Success(response, "Token refreshed");
    }

    public async Task<TypedResult<string>> LogoutAsync(LogoutRequestDto request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == request.UserId);
        if (user == null)
        {
            return TypedResult<string>.Error("User not found", 404);
        }
        
        user.RefreshToken = null;
        user.RefreshTokenExpiry = null;
        
        await _context.SaveChangesAsync();
        
        return TypedResult<string>.Success(null ,"User logged out");
    }
    
    public async Task SendConfirmationEmailAsync(ClaimsPrincipal userClaims, string token, HttpContext context)
    {
        var userLang = context.Request.Headers["Accept-Language"].ToString();
        var culture = (userLang?.Split(',').FirstOrDefault() ?? "en").ToLower();
        
        if (!new[] { "ru", "en" }.Contains(culture)) 
            culture = "en";
        
        var email = userClaims.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;      
        
        // ищет пользователя с указанной почтой
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        
        // путь к html-шаблону
        var filePath = Path.Combine(_env.WebRootPath, $"ConfirmMessage.{culture}.html");
        // _env.WebRootPath - беру путь до папки wwwroot и в нем ищу ConfirmMessage.html
        
        // чтение html-шаблона(весь файл считывается в строку)
        var msgContent = new StringBuilder(await File.ReadAllTextAsync(filePath));
        
        // ссылка
        var confirmLink = $"{context.Request.Scheme}://{context.Request.Host}/api/Auth/verify?token={token}&lang={culture}";
        // 1. Request.Scheme - протокол запроса(http или https)
        // 2. Request.host - домен + порт (example.com или localhost:5001)
        
        msgContent.Replace("{User}", user.UserName);
        msgContent.Replace("{ConfirmationLink}", confirmLink);
        
        await _emailSender.SendEmailAsync(user.Email, culture == "en" ? "Confirm your Email" : "Подтверждение Email", msgContent.ToString());
    }

    public async Task<Result> VerifyEmailAsync(string token)
    {
        if (!await _tokenManager.ValidateEmailTokenAsync(token))
        {
            return Result.Error("Invalid Token");
        }
        
        var email = _tokenManager.GetEmailFromToken(token);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            return Result.Error("User not found");
        }

        if (user.IsConfirmed)
        {
            return Result.Error("User is already confirmed");
        }

        user.IsConfirmed = true;

        await _userRoleService.RemoveRoleFromUserAsync(user.Id, "Guest");
        await _userRoleService.AssignRoleToUserAsync(user.Id, "User");
        
        await _context.SaveChangesAsync();
        
        return Result.Success("Email verified successfully");
    }
}