using AuthApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthApi.Infrastructure.Configurations;

public class RoleConfig : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Name).IsRequired();
        
        builder.HasData(
            new Role { Id = "1", Name = "Guest" },
            new Role { Id = "2", Name = "User" },
            new Role { Id = "3", Name = "PremiumUser" },
            new Role { Id = "4", Name = "Admin" }
        );
    }
}