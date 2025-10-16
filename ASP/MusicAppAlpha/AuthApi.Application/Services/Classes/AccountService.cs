using AuthApi.Application.Services.Interfaces;
using AuthApi.Contracts.DTOs.Requests.Profile;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Data.Models;
using AuthApi.Infrastructure.Contexts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Application.Services.Classes;

public class AccountService : IAccountService
{
    private readonly UserDbContext _context;

    public AccountService(UserDbContext context)
    {
        _context = context;
    }
    
    public async Task<User?> GetProfileAsync(string userId)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }
    
    public async Task<User> UpdateProfileAsync(string userId, UpdateProfileRequestDto request)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) throw new Exception("User not found");

        if (!string.IsNullOrEmpty(request.UserName))
            user.UserName = request.UserName;
        

        await _context.SaveChangesAsync();
        return user;
    }

    // public async Task<string> UploadAvatarAsync(string userId, IFormFile avatarFile)
    // {
    //     throw new NotImplementedException();
    // }

    public async Task<Result> ChangePasswordAsync(string userId, ChangePasswordRequestDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) return Result.Error("User not found");

        if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
        {
            return Result.Error("Current password is incorrect");
        }

        if (request.NewPassword != request.ConfirmNewPassword)
        {
            return Result.Error("New passwords do not match");
        }

        if (BCrypt.Net.BCrypt.Verify(request.NewPassword, user.PasswordHash))
        {
            return Result.Error("New password cannot be the same as the old one");
        }

        try
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            
            return Result.Success("Password changed successfully");
        }
        catch (Exception e)
        {
            return Result.Error($"Error updating password: {e.Message}");
        }
    }

    public async Task<Result> ChangeEmailAsync(string userId, ChangeEmailRequestDto request)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) throw new Exception("User not found");

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new Exception("Password incorrect");

        user.Email = request.NewEmail;
        await _context.SaveChangesAsync();
        return Result.Success("Email changed successfully");
    }

    public async Task<Result> DeleteAccountAsync(string userId, string password)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) throw new Exception("User not found");

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            throw new Exception("Incorrect password");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return Result.Success("User deleted successfully");
    }

    public async Task<bool> HasPasswordAsync(string userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        return user?.PasswordHash != null;
    }
    
}