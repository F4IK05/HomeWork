using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ms_identity.Data;
using ms_identity.Models;
using ms_identity.Services;

namespace ms_identity.Endpoints;

public static class UsersEndpoints
{
    public record RegisterDto(string Login, string Password);

    public static void MapUsers(this WebApplication app)
    {
        app.MapPost("/register", async (RegisterDto dto, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(dto.Login) || string.IsNullOrWhiteSpace(dto.Password))
                return Results.BadRequest("Login and password are required");

            var exists = await db.Users.AnyAsync(u => u.Login == dto.Login);
            if (exists) return Results.Conflict("User already exists");

            var user = new User
            {
                Login = dto.Login.Trim(),
                PasswordHash = Hash(dto.Password)
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            return Results.Ok(new { user.Id, user.Login });
        });

        //  (lazy caching)
        app.MapGet("/users/{id:int}", async (int id, AppDbContext db, ICacheService cache) =>
        {
            var key = $"user:{id}";

            var cached = await cache.GetAsync<UserPublic>(key);
            
            if (cached != null)
                return Results.Ok(new { source = "redis", data = cached });

            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return Results.NotFound();

            var dto = new UserPublic(user.Id, user.Login);

            await cache.SetAsync(key, dto, TimeSpan.FromMinutes(5));

            return Results.Ok(new { source = "postgres", data = dto });
        });
    }

    public record UserPublic(int Id, string Login);

    private static string Hash(string input)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }
}