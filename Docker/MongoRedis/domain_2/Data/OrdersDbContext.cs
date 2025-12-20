using Microsoft.EntityFrameworkCore;
using domain_2.Models;

namespace domain_2.Data;

public class OrdersDbContext : DbContext
{
    public OrdersDbContext(DbContextOptions<OrdersDbContext> options) : base(options) { }
    public DbSet<Order> Orders { get; set; }
}
