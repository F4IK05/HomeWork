using AuthApi.Contracts.DTOs.Response;

namespace AuthApi.Application.Services.Interfaces;

public interface IGoogleAuthService
{
    public string GenerateGoogleAuthUrl(string redirectUri);

    public Task<GoogleTokenResponse> ExchangeCodeOnTokenAsync(string code, string redirectUri);

    public Task<GoogleUserInfo> GetUserInfoAsync(string accessToken);

}