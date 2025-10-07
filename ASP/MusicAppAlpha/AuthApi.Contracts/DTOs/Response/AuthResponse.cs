namespace AuthApi.Contracts.DTOs.Response;

// то что будет возвращаться клиенту
public class AuthResponse
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string? AvatarUrl { get; set; }
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; }
}