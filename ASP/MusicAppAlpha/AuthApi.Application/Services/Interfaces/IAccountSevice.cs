using AuthApi.Contracts.DTOs.Requests.Profile;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Data.Models;
using Microsoft.AspNetCore.Http;

namespace AuthApi.Application.Services.Interfaces;

public interface IAccountService
{
    Task<User?> GetProfileAsync(string userId);
    Task<User> UpdateProfileAsync(string userId, UpdateProfileRequestDto dto);
    // Task<string> UploadAvatarAsync(string userId, IFormFile avatarFile);
    Task<Result> ChangePasswordAsync(string userId, ChangePasswordRequestDto request);
    Task<Result> ChangeEmailAsync(string userId, ChangeEmailRequestDto dto);
    Task<Result> DeleteAccountAsync(string userId, string password);
    Task<bool> HasPasswordAsync(string userId);

}