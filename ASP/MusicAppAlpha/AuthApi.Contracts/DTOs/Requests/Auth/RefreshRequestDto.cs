namespace AuthApi.Contracts.DTOs.Requests.Auth;

public class RefreshRequestDto
{
    public string RefreshToken { get; set; } = string.Empty;
}
