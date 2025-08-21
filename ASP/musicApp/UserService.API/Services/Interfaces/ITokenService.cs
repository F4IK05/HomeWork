using System.Security.Claims;
using UserService.Data.Data.Models;

namespace UserService.API.Services.Interfaces;

public interface ITokenService
{
    public Task<string> CreateTokenAsync(User user, List<string> userRoles);

    public Task<string> CreateEmailTokenAsync(ClaimsPrincipal user);
    
    public Task<string> GetEmailFromTokenAsync(string token);
    
    public Task<bool> ValidateEmailTokenAsync(string token);
}