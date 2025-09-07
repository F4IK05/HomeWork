using System.ComponentModel.DataAnnotations;
using System.Security.Authentication;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UserService.API.DTOs.GoogleAuthDTOs;
using UserService.API.DTOs.Requests;
using UserService.API.DTOs.Response;
using UserService.API.Services.Interfaces;
using UserService.Data.Data.Contexts;
using UserService.Data.Data.Models;
using static BCrypt.Net.BCrypt;

namespace UserService.API.Services.Classes;

public class AuthService : IAuthService
{
    private readonly UserDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly IAccountService _accountService;

    public AuthService(UserDbContext context, ITokenService tokenService, IMapper mapper, IAccountService accountService)
    {
        _context = context;
        _tokenService = tokenService;
        _mapper = mapper;
        _accountService = accountService;
    }

    public async Task<TypedResult<object>> LoginAsync(LoginRequestDTO request)
    {
        // Поиск пользователя по email или username
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Identifier || u.UserName == request.Identifier);
        
        if (user == null || !Verify(request.Password, user.Password))
        {
            throw new InvalidCredentialException("Invalid Credentials");
        }

        // Все роли связанные с этим пользвателем
        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name).ToListAsync();
        
        // Генерация токена
        var accessToken = await _tokenService.CreateTokenAsync(user, userRoles);
        
        // user.RefreshToken = Guid.NewGuid().ToString();
        // user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        // await _context.SaveChangesAsync();
        
        // Возвращение токена
        return TypedResult<object>.Success(new
        {
            AccessToken = accessToken,
            UserName = user.UserName,
            Email = user.Email,
            AvatarUrl = user.AvatarUrl,
            // RefreshToken = user.RefreshToken
        }, "Successfully logged in");
    }

    public async Task<string> LoginGoogleAsync(GoogleUserInfo userInfo)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == userInfo.Id);

        if (user == null)
        {
            throw new InvalidCredentialException("Invalid Credentials");
        }

        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name)
            .ToListAsync();
        
        var accessToken = await _tokenService.CreateTokenAsync(user, userRoles);

        return accessToken;
    }
}