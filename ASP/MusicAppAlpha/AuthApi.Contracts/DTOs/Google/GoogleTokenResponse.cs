using System.Text.Json.Serialization;

namespace AuthApi.Contracts.DTOs.Google;

public class GoogleTokenResponse
{
    [JsonPropertyName("access_token")]
    public string Token { get; set; } = string.Empty;
    [JsonPropertyName("id_token")]
    public string IdToken { get; set; } = string.Empty;
    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; } = string.Empty;
    [JsonPropertyName("token_type")]
    public string TokenType { get; set; } = string.Empty;
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
}