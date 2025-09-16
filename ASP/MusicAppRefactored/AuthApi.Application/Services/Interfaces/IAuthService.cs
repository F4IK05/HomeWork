using AuthApi.Contracts.DTOs.Requests;
using AuthApi.Contracts.DTOs.Response;

namespace AuthApi.Application.Services.Interfaces;

public interface IAuthService
{
    public Task<TypedResult<object>> LoginAsync(LoginRequestDto request);
    Task<string> LoginGoogleAsync(GoogleUserInfo userInfo);
}