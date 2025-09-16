using AuthApi.Contracts.DTOs.Response;

namespace AuthApi.Contracts.DTOs.Requests;

public class GoogleRegisterRequestDto
{
    public GoogleUserInfo UserInfo { get; set; }
    public string ChosenUserName { get; set; }
}