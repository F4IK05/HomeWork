using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project.Data.Models;

namespace Project.Data.Contexts;

public class GameStoreContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Game> Games { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderContent> OrderContents { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Platform> Platforms { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build()
            .GetConnectionString("Default");
        
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        modelBuilder.Entity<Role>().HasData(
            new Role { Id = 1, Name = "User" },
            new Role { Id = 2, Name = "Admin" }
            ); // для того чтобы они появлялись автоматически

        // при миграции жалуется что используя динамику
        string passwordHashForAdmin = "$2a$11$gGL946W9xsWI.tZtu4FKPOoPBZR.Hkb7H3/qAIfMgWxLdCVlzo/9K";
        
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                RoleId = 2,
                UserName = "Admin",
                Email = "admin@gmail.com",
                Password = passwordHashForAdmin,
                Balance = 0
            }
        ); // по умолчанию добавляю admin-а
    }
}