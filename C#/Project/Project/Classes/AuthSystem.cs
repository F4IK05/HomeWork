using System.Text.Json;
using Project.Data.DTO.Users;
using Project.Data.Model;
using Project.Interfaces;

namespace Project.Classes;

public class AuthSystem : IAuthSystem
{
    public List<User> Users { get; set; } = new();
    
    public void Register(LoginRegisterDTO registerDTO)
    {
        
        if (!ValidateSystem.ValidateCredentials(registerDTO))
        {
            throw new Exception("Invalid credentials");
        }
        
        var json = File.ReadAllText("./Data/users.json");

        if (json.Length > 0)
        {
            Users = JsonSerializer.Deserialize<List<User>>(json);
        }

        foreach (var user in Users)
        {
            if (user.Username == registerDTO.Username)
            {
                throw new Exception("Username already taken");
            }
        }

        Users.Add(new User() { Username = registerDTO.Username, Password = registerDTO.Password });
        
        var jsonString = JsonSerializer.Serialize(Users);

        File.WriteAllText("./Data/users.json", jsonString);

        Console.WriteLine($"{registerDTO.Username} registered successfully");
    }

    public User Login(LoginRegisterDTO loginDTO)
    {
        if (!ValidateSystem.ValidateCredentials(loginDTO))
        {
            throw new Exception("Invalid credentials");
        }
        
        var json = File.ReadAllText("./Data/users.json");

        if (json.Length > 0)
        {
            Users = JsonSerializer.Deserialize<List<User>>(json);

            foreach (var user in Users)
            {
                if (user.Username == loginDTO.Username && user.Password == loginDTO.Password)
                {
                    Console.WriteLine($"User {loginDTO.Username} logged in");
                    return user;
                }
            }
            
            throw new Exception("Invalid username or password");
        }
        
        throw new Exception("Invalid credentials");
    }
}