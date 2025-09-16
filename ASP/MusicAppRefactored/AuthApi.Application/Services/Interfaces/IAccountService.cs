using System.Security.Claims;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Contracts.DTOs.Requests;
using Microsoft.AspNetCore.Http;

namespace AuthApi.Application.Services.Interfaces;

public interface IAccountService
{
    public Task<Result> RegisterAsync(RegisterRequestDto request);
    public Task<string> RegisterGoogleAsync(GoogleUserInfo userInfo, string chosenUserName);
    public Task ConfirmEmailAsync(ClaimsPrincipal user, string token, HttpContext context);
    public Task<Result> VerifyEmailAsync(string id);
    public Task<Result> LinkPasswordToAccountAsync(string userId, string password);
    public Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
    public Task<bool> HasPasswordAsync(string userId);

    public Task<Result> ChangeEmailAsync(string userId, string newEmail, string token);

    public Task AssignRoleToUserAsync(string userId, string roleName);

    public Task RemoveRoleFromUserAsync(string userId, string roleName);
}