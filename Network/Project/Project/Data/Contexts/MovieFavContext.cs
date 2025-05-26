using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project.Models;

namespace Project.Data;

public class MovieFavContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Favorite> Favorites { get; set; }

    public MovieFavContext()
    {
        Database.Migrate();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connetionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build()
            .GetConnectionString("Default");
        
        optionsBuilder.UseSqlServer(connetionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}