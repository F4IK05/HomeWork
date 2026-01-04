using Models;

namespace Stores;
public class InMemoryUserStore
{
    private readonly List<User> _users = new();

    public void AddUser(User user)
    {
        _users.Add(user);
    }

    public User? FindByEmail(string email)
    {
        return _users.FirstOrDefault(u => u.Email == email);
    }

    public User? FindByRefreshHash(string refreshToken)
    {
        return _users.FirstOrDefault(u => u.RefreshTokenHash == refreshToken);
    }
}