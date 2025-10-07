using AuthApi.Contracts.DTOs.Google;

namespace AuthApi.Contracts.DTOs.Google;

public class GoogleRegisterDto
{
    public GoogleUserInfo UserInfo { get; set; } = new();
    public string ChosenUserName { get; set; } = "";
}