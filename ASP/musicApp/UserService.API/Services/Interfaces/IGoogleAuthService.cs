using UserService.API.DTOs;
using UserService.API.DTOs.GoogleAuthDTOs;
using UserService.API.DTOs.Requests;
using UserService.API.DTOs.Response;

namespace UserService.API.Services.Interfaces;

public interface IGoogleAuthService
{
    public string GenerateGoogleAuthUrl(string redirectUri);

    public Task<GoogleTokenResponse> ExchangeCodeOnTokenAsync(string code, string redirectUri);

    public Task<GoogleUserInfo> GetUserInfoAsync(string accessToken);

}