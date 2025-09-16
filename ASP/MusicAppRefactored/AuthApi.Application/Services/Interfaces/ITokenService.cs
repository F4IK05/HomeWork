using System.Security.Claims;
using AuthApi.Data.Models;

namespace AuthApi.Application.Services.Interfaces;

public interface ITokenService
{
    public Task<string> CreateTokenAsync(User user, List<string> userRoles);

    public Task<string> CreateEmailTokenAsync(ClaimsPrincipal user);
    
    public Task<string> GetEmailFromTokenAsync(string token);
    
    public Task<bool> ValidateEmailTokenAsync(string token);
}