using Microsoft.EntityFrameworkCore;
using Milk.Data.Contexts;
using Milk.Data.Models;

namespace Milk.Data.Seed;

public class ProductSeeder : ISeeder
{
    public async Task SeedAsync(MilkDbContext context)
    {
        if (context.Products.Any()) 
            return;
        
        var categories = await context.Categories
            .AsNoTracking()
            .ToListAsync();

        var categoryMap = categories.ToDictionary(c => c.Slug, c => c.Id);
        
        if (!categoryMap.Any())
            return;
        
        var seedDate = new DateTime(2026, 1, 29, 0, 0, 0, DateTimeKind.Utc);
        
        var products = new List<Product>
        {
            // Milk
            new()
            {
                Title = "Farm Fresh Whole Milk",
                Description = "Rich, creamy, and minimally processed. Our farm-to-table whole milk delivers the pure, nostalgic taste of fresh dairy.",
                Price = 2.50m,
                Volume = "1L",
                ImageUrl = "https://drinkmilk.co.uk/wp-content/uploads/2020/05/milk_2pint.png",
                CategoryId = categoryMap["milk"],
                IsActive = true,
                CreatedAt = seedDate
            },
            new()
            {
                Title = "Low Fat Milk 2%",
                Description = "All the essential nutrients with a lighter touch. Perfect for your morning cereal, smoothies, or a guilt-free glass of milk.",
                Price = 2.20m,
                Volume = "1L",
                ImageUrl = "https://pics.walgreens.com/prodimg/646103/900.jpg",
                CategoryId = categoryMap["milk"],
                IsActive = true,
                CreatedAt = seedDate
            },
            
            // Yogurt
            new()
            {
                Title = "Greek Style Yogurt",
                Description = "Authentically thick and strained. A high-protein, velvety treat that's perfect for breakfast bowls or as a tangy base for dips.",
                Price = 3.80m,
                Volume = "500g",
                ImageUrl = "https://cdn.prod.website-files.com/665438864fb99eb61d316371/667191687f8e9a116628090c_ND_GreekStyle_1kg_plunge.png",
                CategoryId = categoryMap["yogurt"],
                IsActive = true,
                CreatedAt = seedDate
            },
            
            // Cheese
            new()
            {
                Title = "Cheddar Cheese",
                Description = "Expertly aged for a sharp, bold profile. This firm cheddar adds a sophisticated depth to your cheese boards and melts beautifully.",
                Price = 5.50m,
                Volume = "250g",
                ImageUrl = "https://www.cheesebros.com/cdn/shop/files/19-year-cheddar-1.jpg?v=1763586815",
                CategoryId = categoryMap["cheese"],
                IsActive = true,
                CreatedAt = seedDate
            },
            
            // Butter
            new()
            {
                Title = "Creamy Butter",
                Description = "Churned from the finest fresh cream. Our unsalted butter offers a smooth texture and a rich, golden flavor for spreading or baking.",
                Price = 2.70m,
                Volume = "200g",
                ImageUrl = "https://crm.sunshineonline.com.my/crmfileshare01/image/sunshine/cache/product/163496_06062025135445-800x800.png",
                CategoryId = categoryMap["butter"],
                IsActive = true,
                CreatedAt = seedDate
            },
            
            // Cream
            new()
            {
                Title = "Fresh Cooking Cream 20%",
                Description = "Elevate your culinary creations. A silky-smooth cream that adds a rich, professional finish to pasta sauces and creamy soups.",
                Price = 3.10m,
                Volume = "250ml",
                ImageUrl = "https://meggle.rs/wp-content/uploads/2021/05/Cooking-Cream-500-20-copy-1-1.png",
                CategoryId = categoryMap["cream"],
                IsActive = true,
                CreatedAt = seedDate
            }
        };
        
        context.Products.AddRange(products);
        await context.SaveChangesAsync();
    }
}