using AuthApi.Application.Services.Interfaces;
using AuthApi.Data.Models;
using AuthApi.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Application.Services.Classes;

public class UserRoleService : IUserRoleService
{
    private readonly UserDbContext _context;

    public UserRoleService(UserDbContext context)
    {
        _context = context;
    }

    public async Task AssignRoleToUserAsync(string userId, string roleName = "Guest")
    {
        var role = await _context.Roles.FirstAsync(r => r.Name == roleName);

        if (userId == null)
        {
            throw new Exception($"User with id {userId} not found");
        }

        if (role == null)
        {
            throw new Exception($"Role with name {roleName} not found");
        }

        _context.UserRoles.Add(new UserRoles { UserId = userId, RoleId = role.Id });
        
        await _context.SaveChangesAsync();
    }

    public async Task RemoveRoleFromUserAsync(string userId, string roleName)
    {
        var role = await _context.Roles.FirstAsync(r => r.Name == roleName);

        if (role == null)
        {
            throw new Exception($"Role with name {roleName} not found");
        }

        var userRole = await _context.UserRoles.FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == role.Id);

        if (userRole != null)
        {
            _context.UserRoles.Remove(userRole);
            
            await _context.SaveChangesAsync();
        }

    }
}