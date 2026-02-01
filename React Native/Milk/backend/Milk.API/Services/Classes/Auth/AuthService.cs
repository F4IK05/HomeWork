using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Milk.API.Constants;
using Milk.API.DTOs.Request.Auth;
using Milk.API.DTOs.Response.Auth;
using Milk.API.Services.Interfaces.Auth;
using Milk.Data.Contexts;
using Milk.Data.Models;

namespace Milk.API.Services.Classes.Auth;

public class AuthService : IAuthService
{
    private readonly IJwtTokenService _tokenService;
    private readonly ICurrentUserService _currentUserService;
    private readonly MilkDbContext _context;

    public AuthService(IJwtTokenService tokenService, MilkDbContext context, ICurrentUserService currentUserService)
    {
        _tokenService = tokenService;
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
    {
        var email = request.Email.Trim().ToLower();
        
        var exists = await _context.Users.AnyAsync(u => u.Email == email);
        if (exists)
        {
            return null;
        }

        var newUser = new User
        {
            Name = request.Name.Trim(),
            Surname = request.Surname.Trim(),
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            AvatarUrl = Avatars.Default+request.Name,
        };
        
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        
        var token = _tokenService.CreateToken(newUser);

        return new AuthResponseDto
        {
            Token = token,

            UserId = newUser.Id,
            Name = newUser.Name,
            Surname = newUser.Surname,
            Email = newUser.Email,
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
    {
        var email = request.Email.Trim().ToLower();
        
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            throw new Exception($"User with email {request.Email} does not exist");
        }
        
        var verifyPass = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
        if (!verifyPass)
        {
            throw new Exception($"Invalid email or password");
        }
        
        var token = _tokenService.CreateToken(user);

        return new AuthResponseDto
        {
            Token = token,

            UserId = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
        };
    }

    public async Task<MeResponseDto?> GetMeAsync(ClaimsPrincipal userPrincipal)
    {
        var userId = _currentUserService.GetUserId(userPrincipal);
        if (userId == null) return null;
        
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return null;

        return new MeResponseDto
        {
            UserId = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
        };
    }

    public async Task<bool> IsEmailAvailableAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        
        var normalizedEmail = email.Trim().ToLower();
        
        return !await _context.Users.AnyAsync(u => u.Email == normalizedEmail);
    }
}