using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Milk.Data.Models;

namespace Milk.Data.Configurations;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.Surname)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(x => x.AvatarUrl)
            .IsRequired()
            .HasMaxLength(1000);

        builder.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(256);
        
        builder.HasIndex(x => x.Email).IsUnique();

        builder.Property(x => x.PasswordHash)
            .IsRequired()
            .HasMaxLength(500);
        
        builder.Property(x => x.CreatedAt)
            .IsRequired();
    }
}