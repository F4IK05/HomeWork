using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Milk.API.DTOs.Request.Profile;
using Milk.API.DTOs.Response.Profile;
using Milk.API.Services.Interfaces.Auth;
using Milk.API.Services.Interfaces.Profile;
using Milk.Data.Contexts;
using Milk.Data.Models;

namespace Milk.API.Services.Classes.Profile;

public class ProfileService : IProfileService
{
    private readonly MilkDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public ProfileService(ICurrentUserService currentUserService, MilkDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task<ProfileResponseDto?> GetMyProfileAsync(ClaimsPrincipal userPrincipal)
    {
        var user = await GetUserAsync(userPrincipal);
        return user == null ? null : Map(user);
    }

    public async Task<ProfileResponseDto?> UpdateProfileAsync(ClaimsPrincipal userPrincipal, UpdateProfileRequestDto request)
    {
        var user = await GetUserAsync(userPrincipal);
        if (user == null) return null;
        
        user.Name = request.Name;
        user.Surname = request.Surname;
        
        await _context.SaveChangesAsync();
        return Map(user);
    }

    public async Task<ProfileResponseDto?> UpdateAvatarAsync(ClaimsPrincipal userPrincipal, UpdateAvatarRequestDto request)
    {
        var user = await GetUserAsync(userPrincipal);
        if (user == null) return null;
        
        user.AvatarUrl = request.AvatarUrl;
        
        await _context.SaveChangesAsync();
        return Map(user);
    }

    public async Task<bool> ChangePasswordAsync(ClaimsPrincipal userPrincipal, ChangePasswordRequestDto request)
    {
        var user = await GetUserAsync(userPrincipal);
        if (user == null) return false;
        
        var verifyPass = BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash);
        if (!verifyPass) return false;
        
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
        await _context.SaveChangesAsync();
        
        return true;
    }
    
    private async Task<User?> GetUserAsync(ClaimsPrincipal userPrincipal)
    {
        var userId = _currentUserService.GetUserId(userPrincipal);
        if (string.IsNullOrWhiteSpace(userId))
            return null;

        return await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
    }
    
    private static ProfileResponseDto Map(User user)
    {
        return new ProfileResponseDto
        {
            UserId = user.Id,
            Email = user.Email,
            Name = user.Name,
            Surname = user.Surname,
            AvatarUrl = user.AvatarUrl,
            CreatedAt = user.CreatedAt
        };
    }
}