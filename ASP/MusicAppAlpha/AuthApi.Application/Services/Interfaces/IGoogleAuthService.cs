using AuthApi.Contracts.DTOs.Google;

namespace AuthApi.Application.Services.Interfaces;

public interface IGoogleAuthService
{
    string GenerateGoogleAuthUrl(string redirectUri);
    Task<GoogleTokenResponse> ExchangeCodeOnTokenAsync(string code, string redirectUri);
    Task<GoogleUserInfo> GetUserInfoAsync(string accessToken);
}