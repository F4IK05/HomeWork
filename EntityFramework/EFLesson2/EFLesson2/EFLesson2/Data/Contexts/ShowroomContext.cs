using EFLesson2.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EFLesson2.Data.Contexts;

public class ShowroomContext : DbContext
{
    // 12 пункт
    private readonly ILoggerFactory _loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
    public DbSet<Car> Cars { get; set; }
    public DbSet<Dealer> Dealers { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<CarOrder> CarOrders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // 12 пункт
        optionsBuilder.UseLoggerFactory(_loggerFactory);
        
        // Для 9 пункта
        optionsBuilder.UseLazyLoadingProxies();
        
        var connectionStrings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build()
            .GetConnectionString("Default");
        
        optionsBuilder.UseSqlServer(connectionStrings);
    }
}