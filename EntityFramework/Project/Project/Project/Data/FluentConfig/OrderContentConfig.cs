using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Data.Models;

namespace Project.Data.FluentConfig;

public class OrderContentConfig : IEntityTypeConfiguration<OrderContent>
{
    public void Configure(EntityTypeBuilder<OrderContent> builder)
    {
        builder.HasKey(oc => oc.Id);

        builder.HasOne(oc => oc.Order)
            .WithMany(oc => oc.OrderContents)
            .HasForeignKey(oc => oc.OrderId);
        
        builder.HasOne(oc => oc.Game)
            .WithMany(oc => oc.OrderContents)
            .HasForeignKey(oc => oc.GameId);
        
        builder.Property(oc => oc.Quantity)
            .IsRequired();
        
        builder.Property(oc => oc.TotalAmount)
            .IsRequired();
    }
    
}