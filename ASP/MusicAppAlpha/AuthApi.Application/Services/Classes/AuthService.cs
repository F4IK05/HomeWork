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
    private readonly IHttpContextAccessor _http;

    public AuthService(IMapper mapper, UserDbContext context, IUserRoleService userRoleService, TokenManager tokenManager, IConfiguration configuration, IWebHostEnvironment env, EmailSender emailSender, IHttpContextAccessor http)
    {
        _mapper = mapper;
        _context = context;
        _userRoleService = userRoleService;
        _tokenManager = tokenManager;
        _configuration = configuration;
        _env = env;
        _emailSender = emailSender;
        _http = http;
    }
    
    private CookieOptions BuildRefreshCookieOptions(DateTime expiresUtc) => new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Strict,
        Expires = expiresUtc
    };

    private static string GenerateAvatarUrl(string seed)
    {
        var encoded = Uri.EscapeDataString(seed);
        
        return $"https://api.dicebear.com/9.x/initials/svg?seed={encoded}";
    }
    
    private async Task<AuthResponse> TokenHelperForUserAsync(User user)
    {
        // Все роли связанные с этим пользвателем
        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name).ToListAsync();
        
        var accessToken = await _tokenManager.CreateAccessTokenAsync(user, userRoles);
        
        // refresh: генерируем сырой токен, в БД кладём хэш
        var rawRefresh = await _tokenManager.GenerateRefreshToken();
        var refreshHash = _tokenManager.HashRefreshToken(rawRefresh);
        var refreshDays = int.Parse(_configuration["JWT:RefreshTokenExpiresInDays"]);
        var refreshExp = DateTime.UtcNow.AddDays(refreshDays);
        
        user.RefreshToken = refreshHash;
        user.RefreshTokenExpiry = refreshExp;
        
        await _context.SaveChangesAsync();
        
        // устанавливаем HttpOnly cookie
        _http.HttpContext!.Response.Cookies.Append(
            "refreshToken", rawRefresh, BuildRefreshCookieOptions(refreshExp));

        return new AuthResponse
        {
            UserName = user.UserName,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
            Token = accessToken,
        };
    }

    public async Task<TypedResult<AuthResponse>> ExternalTokenHelperAsync(User user)
    {
        var response = await TokenHelperForUserAsync(user);
        
        return TypedResult<AuthResponse>.Success(response, "Login successful");
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

        var response = await TokenHelperForUserAsync(user);
        
        return TypedResult<AuthResponse>.Success(response, "Login successful");
    }

    public async Task<TypedResult<RefreshTokenResponse>> RefreshTokenAsync()
    {
        var context = _http.HttpContext!;
        var rawRefresh = context.Request.Cookies["refreshToken"];
        if (rawRefresh == null)
        {
            return TypedResult<RefreshTokenResponse>.Error("No refresh token", 401);
        }
        
        var refreshHash = _tokenManager.HashRefreshToken(rawRefresh);

        var user = _context.Users.FirstOrDefault(u => u.RefreshToken == refreshHash);

        if (user == null || user.RefreshTokenExpiry == null || user.RefreshTokenExpiry <= DateTime.UtcNow)
        {
            return TypedResult<RefreshTokenResponse>.Error("Invalid or expired refresh token", 401);
        }
        
        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name).ToListAsync();

        var newAccessToken = await _tokenManager.CreateAccessTokenAsync(user, userRoles);
        
        var newRawRefresh = await _tokenManager.GenerateRefreshToken();
        var newHash = _tokenManager.HashRefreshToken(newRawRefresh);
        var refreshDays = int.Parse(_configuration["JWT:RefreshTokenExpiresInDays"]);
        var newExp = DateTime.UtcNow.AddDays(refreshDays);
        
        user.RefreshToken = newHash;
        user.RefreshTokenExpiry = newExp;
        
        await _context.SaveChangesAsync();

        context.Response.Cookies.Append("refreshToken", newRawRefresh, BuildRefreshCookieOptions(newExp));
        
        var response = new RefreshTokenResponse
        {
            Token = newAccessToken,
        };

        return TypedResult<RefreshTokenResponse>.Success(response, "Token refreshed");
    }

    public async Task<TypedResult<string>> LogoutAsync()
    {
        var context = _http.HttpContext!;
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (!string.IsNullOrEmpty(userId))
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiry = null;
                await _context.SaveChangesAsync();
            }
        }
        
        context.Response.Cookies.Delete("refreshToken");
        
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