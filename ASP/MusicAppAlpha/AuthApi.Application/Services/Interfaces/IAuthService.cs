using System.Security.Claims;
using AuthApi.Contracts.DTOs.Requests.Auth;
using AuthApi.Contracts.DTOs.Response;
using Microsoft.AspNetCore.Http;

namespace AuthApi.Application.Services.Interfaces;

public interface IAuthService
{
    Task<Result> RegisterAsync(RegisterRequestDto request);
    Task<TypedResult<AuthResponse>> LoginAsync(LoginRequestDto request);
    Task<TypedResult<RefreshTokenResponse>> RefreshTokenAsync(RefreshRequestDto request);
    Task<TypedResult<string>> LogoutAsync(LogoutRequestDto request);
    Task SendConfirmationEmailAsync(ClaimsPrincipal userClaims, string token, HttpContext context);
    Task<Result> VerifyEmailAsync(string token); 
    // Task<Result> VerifyEmailAsync(string id); 

}