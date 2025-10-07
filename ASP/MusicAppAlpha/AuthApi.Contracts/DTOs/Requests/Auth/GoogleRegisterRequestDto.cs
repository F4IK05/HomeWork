namespace AuthApi.Contracts.DTOs.Requests.Auth;

public class GoogleRegisterRequestDto
{
    public string Email { get; set; } = string.Empty;
    public string GoogleId { get; set; } = string.Empty;
    public string? UserName { get; set; }
    public string? AvatarUrl { get; set; }
}