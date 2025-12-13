using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Configurations;

public class ArtistConfig : IEntityTypeConfiguration<Artist>
{
    public void Configure(EntityTypeBuilder<Artist> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.ArtistName)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(a => a.PhotoUrl)
            .HasMaxLength(512);

        builder.HasIndex(a => a.ArtistName)
            .IsUnique();

    }
}