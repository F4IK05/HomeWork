using Milk.Data.Contexts;
using Milk.Data.Models;

namespace Milk.Data.Seed;

public class CategorySeeder : ISeeder
{
    public async Task SeedAsync(MilkDbContext context)
    {
        if (context.Categories.Any())
            return;

        var seedDate = new DateTime(2026, 1, 29, 0, 0, 0, DateTimeKind.Utc);

        var categories = new List<Category>
        {
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Milk",
                Slug = "milk",
                CreatedAt = seedDate
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Yogurt",
                Slug = "yogurt",
                CreatedAt = seedDate
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Cheese",
                Slug = "cheese",
                CreatedAt = seedDate
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Butter",
                Slug = "butter",
                CreatedAt = seedDate
            },
            new()
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Cream",
                Slug = "cream",
                CreatedAt = seedDate
            }
        };
        
        context.Categories.AddRange(categories);
        await context.SaveChangesAsync();
    }
}