using System.Text.RegularExpressions;
using Project.Data;
using Project.Models;
using Project.Utilities;

namespace Project.Services;

public class AuthService
{
    public bool Register(string username, string email, string password)
    {
        using var context = new MovieFavContext();
        
        if (context.Users.Any(u => u.UserName == username || u.Email == email)) return false;

        var newUser = new User
        {
            UserName = username,
            Email = email,
            Password = PasswordHasher.HashPassword(password)
        };
        
        context.Users.Add(newUser);
        
        context.SaveChanges();
        return true;
    }

    public bool Login(string username, string password)
    {
        using var context = new MovieFavContext();
        
        var user = context.Users
            .FirstOrDefault(u => u.UserName == username);
        
        if (user == null || !PasswordHasher.VerifyPassword(password, user.Password)) return false;

        return true;
    }

    public bool IsValidEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;

        string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        
        return Regex.IsMatch(email, pattern);
    }

    public User GetUserById(int userId)
    {
        using var context = new MovieFavContext();
        
        var user = context.Users.FirstOrDefault(u => u.Id == userId);
        
        return user;
    }

    public int GetUserByName(string userName)
    {
        using var context = new MovieFavContext();
        
        var user = context.Users.FirstOrDefault(u => u.UserName == userName);
        
        return user.Id;
    }
}