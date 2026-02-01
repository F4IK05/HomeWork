using Milk.Data.Models;

namespace Milk.API.Services.Interfaces.Auth;

public interface IJwtTokenService
{
    string CreateToken(User user);
}