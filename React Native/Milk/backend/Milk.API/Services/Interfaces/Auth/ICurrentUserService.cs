using System.Security.Claims;

namespace Milk.API.Services.Interfaces.Auth;

public interface ICurrentUserService
{
    string? GetUserId(ClaimsPrincipal user);
}