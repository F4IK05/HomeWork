using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserService.Data.Data.Models;

namespace UserService.Data.Data.Configurations;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        
        builder.HasIndex(u => u.UserName).IsUnique();
        builder.HasIndex(u => u.Email).IsUnique();
        
        var name = builder.Property(u => u.UserName);
        name.IsRequired().HasMaxLength(50);
        
        var email = builder.Property(u => u.Email);
        email.IsRequired().HasMaxLength(255);
        
        var password = builder.Property(u => u.Password);
        password.IsRequired(false);

        var isConfirmed = builder.Property(u => u.isConfirmed);
        isConfirmed.HasDefaultValue(false);
    }
}