using AuthApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthApi.Infrastructure.Configurations;

public class UserOAuthConfig : IEntityTypeConfiguration<UserOAuth>
{
    public void Configure(EntityTypeBuilder<UserOAuth> builder)
    {
        builder.HasKey(o => o.Id);

        builder.Property(o => o.Provider)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(o => o.ProviderUserId)
            .IsRequired()
            .HasMaxLength(200);

        builder.HasOne(o => o.User)
            .WithMany(u => u.OAuthAccounts)
            .HasForeignKey(o => o.UserId);
    }
}