using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Models;

namespace Project.Data.FluentConfig;

public class FavoriteConfig : IEntityTypeConfiguration<Favorite>
{
    public void Configure(EntityTypeBuilder<Favorite> builder)
    {
        builder.HasKey(f => f.Id);

        builder.HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId);
        
        builder.HasOne(f => f.Movie)
            .WithMany(m => m.Favorites)
            .HasForeignKey(f => f.MovieId);
    }
}