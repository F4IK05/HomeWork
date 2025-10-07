namespace AuthApi.Contracts.DTOs.Requests.Auth;

public class LoginRequestDto
{
    // Email/UserName
    public string Identifier { get; set; }
    public string Password { get; set; }
}