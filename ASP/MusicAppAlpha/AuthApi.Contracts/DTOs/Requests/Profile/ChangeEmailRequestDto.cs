namespace AuthApi.Contracts.DTOs.Requests.Profile;

public class ChangeEmailRequestDto
{
    public string NewEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}