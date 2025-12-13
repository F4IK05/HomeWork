using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Configurations;

public class PlaylistSongConfig : IEntityTypeConfiguration<PlaylistSong>
{
    public void Configure(EntityTypeBuilder<PlaylistSong> builder)
    {
        builder.HasKey(x => new { x.PlaylistId, x.SongId });

        builder.Property(x => x.Order)
            .HasDefaultValue(0);

        builder.HasOne(x => x.Playlist)
            .WithMany(p => p.Songs)
            .HasForeignKey(x => x.PlaylistId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Song)
            .WithMany()
            .HasForeignKey(x => x.SongId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}