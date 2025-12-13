using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Contexts;

public class MusicDbContext : DbContext
{
    public DbSet<Song> Songs { get; set; }
    public DbSet<Album> Albums { get; set; }
    public DbSet<Artist> Artists { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<PlaylistSong> PlaylistSongs { get; set; }
    
    public MusicDbContext(DbContextOptions<MusicDbContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
