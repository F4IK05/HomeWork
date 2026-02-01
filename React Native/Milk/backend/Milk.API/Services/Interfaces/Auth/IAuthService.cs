using System.Security.Claims;
using Milk.API.DTOs.Request.Auth;
using Milk.API.DTOs.Response.Auth;

namespace Milk.API.Services.Interfaces.Auth;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
    Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
    Task<MeResponseDto?> GetMeAsync(ClaimsPrincipal user);
    Task<bool> IsEmailAvailableAsync(string email);
}