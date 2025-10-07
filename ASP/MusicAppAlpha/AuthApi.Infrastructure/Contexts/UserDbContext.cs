using System.Reflection;
using AuthApi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Infrastructure.Contexts;

public class UserDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRoles> UserRoles { get; set; }
    public DbSet<UserOAuth> UserOAuths { get; set; }
    
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}