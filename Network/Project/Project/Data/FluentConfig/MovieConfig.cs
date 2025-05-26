using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Models;

namespace Project.Data.FluentConfig;

public class MovieConfig :IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Title)
            .IsRequired();

        builder.Property(m => m.Year);

        builder.HasMany(m => m.Favorites)
            .WithOne(f => f.Movie)
            .HasForeignKey(f => f.MovieId);
    }
}