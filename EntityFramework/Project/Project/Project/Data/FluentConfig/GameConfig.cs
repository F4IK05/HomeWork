using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Data.Models;

namespace Project.Data.FluentConfig;

public class GameConfig : IEntityTypeConfiguration<Game>
{
    public void Configure(EntityTypeBuilder<Game> builder)
    {
        builder.HasKey(g => g.Id);
        
        builder.Property(g => g.GameName)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasOne(g => g.Genre)
            .WithMany(g => g.Games) // один Genre может быть у многих Games
            .HasForeignKey(g => g.GenreId);

        builder.HasOne(g => g.Platform)
            .WithMany(p => p.Games) // один Platform может быть у многих Games
            .HasForeignKey(g => g.PlatformId);
        
        builder.Property(p => p.Price)
            .IsRequired();

        
        builder.HasMany(g => g.OrderContents)
            .WithOne(oc => oc.Game)  // Одна игра может быть куплена в нескольких заказах.
            .HasForeignKey(oc => oc.GameId);
    }
}