using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Project.Data.Models;

namespace Project.Data.FluentConfig;

public class OrderConfig : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);

        builder.HasOne(o => o.User)
            .WithMany(u => u.Orders) // один user может иметь много orders
            .HasForeignKey(o => o.UserId);
        
        builder.Property(o => o.OrderDate)
            .IsRequired()
            .HasDefaultValue(DateTime.Now);

        builder.Property(o => o.TotalAmount)
            .IsRequired();
        
        builder.HasMany(oc => oc.OrderContents)
            .WithOne(oc => oc.Order) // Один заказ может содержать несколько игр.
            .HasForeignKey(oc => oc.OrderId);
    }
}