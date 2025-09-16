namespace AuthApi.Contracts.DTOs.Response;

public class GoogleAuthResult
{
    public string AccessToken { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
}