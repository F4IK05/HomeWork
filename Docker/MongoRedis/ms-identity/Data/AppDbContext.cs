using Microsoft.EntityFrameworkCore;
using ms_identity.Models;

namespace ms_identity.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<User> Users { get; set; }
}