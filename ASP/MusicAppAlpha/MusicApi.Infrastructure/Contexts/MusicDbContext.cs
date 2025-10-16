using Microsoft.EntityFrameworkCore;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Contexts;

public class MusicDbContext : DbContext
{
    public MusicDbContext(DbContextOptions<MusicDbContext> options) : base(options) { }

    public DbSet<Song> Songs { get; set; }
    public DbSet<Album> Albums { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
