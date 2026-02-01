using Milk.Data.Contexts;

namespace Milk.Data.Seed;

public class DbSeeder
{
    public static async Task SeedAsync(MilkDbContext context)
    {
        var seeders = new List<ISeeder>
        {
            new CategorySeeder(),
            new ProductSeeder(),
        };

        foreach (var seeder in seeders)
        {
            await seeder.SeedAsync(context);
        }
    }
}