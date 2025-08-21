using System.Security.Claims;
using UserService.API.DTOs.GoogleAuthDTOs;
using UserService.API.DTOs.Requests;
using UserService.API.DTOs.Response;
using UserService.Data.Data.Models;

namespace UserService.API.Services.Interfaces;

public interface IAccountService
{
    public Task<Result> RegisterAsync(RegisterRequestDTO request);
    public Task<string> RegisterGoogleAsync(GoogleUserInfo userInfo, string chosenUserName);
    public Task ConfirmEmailAsync(ClaimsPrincipal user, string token, HttpContext context);
    public Task<Result> VerifyEmailAsync(string id);

    public Task AssignRoleToUserAsync(string userId, string roleName);

    public Task RemoveRoleFromUserAsync(string userId, string roleName);
}