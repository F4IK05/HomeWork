using AuthApi.Application.Services.Interfaces;
using AuthApi.Contracts.DTOs.Requests.Account;
using AuthApi.Contracts.DTOs.Requests.AccountDTOs;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Application.Services.Classes;

public class AccountService : IAccountService
{
    private readonly UserDbContext _context;

    public AccountService(UserDbContext context)
    {
        _context = context;
    }

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
    
    public async Task<bool> HasPasswordAsync(string userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        return user?.PasswordHash != null;
    }

    // public async Task<Result> ChangeEmailAsync(string userId, ChangeEmailRequestDto request)
    // {
    //     var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
    //     
    //     if (user == null) return Result.Error("User not found");
    //
    //     if (user.Email == request.NewEmail)
    //     {
    //         return Result.Error("New email cannot be the same as the old one");
    //     }
    //
    //     if (await _context.Users.AnyAsync(u => u.Email == request.NewEmail))
    //     {
    //         return Result.Error("Email is already taken");
    //     }
    //
    //     if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
    //     {
    //         return Result.Error("Password is incorrect");
    //     }
    //     
    //     
    // }
    
}