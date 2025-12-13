using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Configurations;

public class PlaylistConfig : IEntityTypeConfiguration<Playlist>
{
    public void Configure(EntityTypeBuilder<Playlist> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Title)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(p => p.Description)
            .HasMaxLength(1000);

        builder.Property(p => p.CoverUrl)
            .HasMaxLength(512);

        builder.Property(p => p.OwnerId)
            .IsRequired();

        // частые выборки "мои плейлисты"
        builder.HasIndex(x => new { x.OwnerId, x.CreatedAt });
    }
}