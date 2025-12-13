using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Configurations;

public class AlbumConfig : IEntityTypeConfiguration<Album>
{
    public void Configure(EntityTypeBuilder<Album> builder)
    {
        builder.HasKey(a=> a.Id);

        builder.Property(a => a.AlbumName)
            .HasMaxLength(150)
            .IsRequired();
        
        builder.Property(a => a.CoverUrl)
            .HasMaxLength(512);
        
        builder.Property(a => a.ArtistId)
            .IsRequired();
        
        builder.HasOne(a => a.Artist)
            .WithMany(a => a.Albums)
            .HasForeignKey(a => a.ArtistId)
            .OnDelete(DeleteBehavior.Restrict);
        
        // индексы для поиска
        builder.HasIndex(a => a.AlbumName);
        builder.HasIndex(a => a.ArtistId);

        // один и тот же артист не может иметь два альбома с одинаковым названием
        builder.HasIndex(a => new { a.AlbumName, a.ArtistId })
            .IsUnique();
    }
}