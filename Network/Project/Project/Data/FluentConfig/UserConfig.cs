using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Models;

namespace Project.Data.FluentConfig;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        
        builder.Property(u => u.UserName)
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(u => u.Email)
            .HasMaxLength(50)
            .IsRequired();
        
        builder.Property(u => u.Password)
            .IsRequired();

        builder.HasMany(u => u.Favorites)
            .WithOne(f => f.User)
            .HasForeignKey(f => f.UserId);
    }
}