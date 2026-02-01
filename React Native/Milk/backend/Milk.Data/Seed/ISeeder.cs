using Milk.Data.Contexts;

namespace Milk.Data.Seed;

public interface ISeeder
{
    Task SeedAsync(MilkDbContext context);
}