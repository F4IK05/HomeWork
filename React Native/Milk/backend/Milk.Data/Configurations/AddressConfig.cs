using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Milk.Data.Models;

namespace Milk.Data.Configurations;

public class AddressConfig : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.City)
            .IsRequired()
            .HasMaxLength(120);
        
        builder.Property(x => x.Street)
            .IsRequired()
            .HasMaxLength(200);
        
        builder.Property(x => x.Building)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(x => x.Apartment)
            .HasMaxLength(50);

        builder.Property(x => x.CreatedAt)
            .IsRequired();
        
        builder.HasOne(x => x.User)
            .WithMany(u => u.Addresses)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.UserId);
    }
}