using System.Security.Claims;
using AuthApi.Contracts.DTOs.Requests.Auth;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Data.Models;
using Microsoft.AspNetCore.Http;

namespace AuthApi.Application.Services.Interfaces;

public interface IAuthService
{
    Task<TypedResult<AuthResponse>> ExternalTokenHelperAsync(User user);
    Task<Result> RegisterAsync(RegisterRequestDto request);
    Task<TypedResult<AuthResponse>> LoginAsync(LoginRequestDto request);
    Task<TypedResult<RefreshTokenResponse>> RefreshTokenAsync();
    Task<TypedResult<string>> LogoutAsync();
    Task SendConfirmationEmailAsync(ClaimsPrincipal userClaims, string token, HttpContext context);
    Task<Result> VerifyEmailAsync(string token); 
    // Task<Result> VerifyEmailAsync(string id); 

}