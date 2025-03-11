using Microsoft.EntityFrameworkCore;
using Project.Data.Contexts;
using Project.Data.Models;

namespace Project;

public class Manager
{
    
    
    public bool Register(int roleId, string userName, string password, string email)
    {
        var context = new GameStoreContext();

        if (context.Users.Any(u => u.UserName == userName || u.Email == email))
        {
            return false;
        }

        var user = new User
        {
            RoleId = roleId,
            UserName = userName,
            Email = email,
            Balance = 0,
            Password = PasswordHash.HashPassword(password)
        };
        
        context.Users.Add(user);
        
        context.SaveChanges();
        return true;
    }

    public bool Login(string userName, string password)
    {
        var context = new GameStoreContext();
        
        var user = context.Users
            .Include(u => u.Role) // будет жаловаться что Role не видно
            .FirstOrDefault(u => u.UserName == userName);

        if (user == null || !PasswordHash.VerifyPassword(password, user.Password))
        {
            return false;
        }

        //Console.WriteLine($"User logged in.\n User: {user.UserName} Role: {user.Role.Name}");
        return true;
    }
}