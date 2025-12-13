using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Configurations;

public class SongConfig : IEntityTypeConfiguration<Song>
{
    public void Configure(EntityTypeBuilder<Song> builder)
    {
        builder.HasKey(s => s.Id);
        
        builder.Property(s => s.Title)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(s => s.FileUrl)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(s => s.CoverUrl)
            .HasMaxLength(512);
        
        builder.Property(s => s.UploadedAt)
            .IsRequired();
        
        builder.Property(s => s.ArtistId)
            .IsRequired();
        
        builder.HasOne(a => a.Artist)
            .WithMany(s => s.Songs)
            .HasForeignKey(a => a.ArtistId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(s => s.Album)
            .WithMany(a => a.Songs)
            .HasForeignKey(s => s.AlbumId)
            // чтобы при удалении альбомов песни сохранялись
            .OnDelete(DeleteBehavior.SetNull);

        // для поиска
        builder.HasIndex(s => s.Title);
        builder.HasIndex(s => s.ArtistId);
        builder.HasIndex(s => s.AlbumId);
        
        // индекс для поиска песен по артисту и названию
        builder.HasIndex(s => new { s.ArtistId, s.Title });
    }
}