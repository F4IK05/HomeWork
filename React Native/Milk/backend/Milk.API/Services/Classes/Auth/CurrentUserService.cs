using System.Security.Claims;
using Milk.API.Services.Interfaces.Auth;

namespace Milk.API.Services.Classes.Auth;

public class CurrentUserService : ICurrentUserService
{
    public string? GetUserId(ClaimsPrincipal user)
    {
        return user.FindFirstValue(ClaimTypes.NameIdentifier) ?? user.FindFirstValue("sub");
    }
}