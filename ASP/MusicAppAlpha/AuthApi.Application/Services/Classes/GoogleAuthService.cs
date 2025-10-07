using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Web;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Contracts.DTOs.Google;

namespace AuthApi.Application.Services.Classes;

public class GoogleAuthService : IGoogleAuthService
{
    private readonly HttpClient _httpClient;

    public GoogleAuthService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public string GenerateGoogleAuthUrl(string redirectUri)
    {
        var query = HttpUtility.ParseQueryString(string.Empty);
        query["client_id"] = Environment.GetEnvironmentVariable("OAUTH_GOOGLE_CLIENT_ID");
        query["redirect_uri"] = redirectUri; // http://localhost:5173/auth/google
        query["response_type"] = "code"; // код авторизации
        query["scope"] = "openid email profile"; // какие данные мне нужны, для OpenID Connect
        query["access_type"] = "offline";
        query["prompt"] = "consent";
        return "https://accounts.google.com/o/oauth2/v2/auth?" + query.ToString();
    }

    public async Task<GoogleTokenResponse> ExchangeCodeOnTokenAsync(string code, string redirectUri)
    {
        var requestData = new Dictionary<string, string>
        {
            ["code"] = code,
            ["client_id"] = Environment.GetEnvironmentVariable("OAUTH_GOOGLE_CLIENT_ID"),
            ["client_secret"] = Environment.GetEnvironmentVariable("OAUTH_GOOGLE_CLIENT_SECRET"),
            ["redirect_uri"] = redirectUri,
            ["grant_type"] = "authorization_code"
        };

        var response = await _httpClient.PostAsync("https://oauth2.googleapis.com/token", new FormUrlEncodedContent(requestData));
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<GoogleTokenResponse>();
    }

    public async Task<GoogleUserInfo> GetUserInfoAsync(string accessToken)
    {
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _httpClient.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<GoogleUserInfo>();
    }
}