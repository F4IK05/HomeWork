using Bogus;
using MVCIdentitySeedingLessson.Models;

namespace MVCIdentitySeedingLessson.Data
{
    public static class DbBogusGenerator
    {
        public static async Task Seed(ApplicationDbContext db)
        {
            if (!db.Books.Any())
            {
                var faker = new Faker<Book>("en")
                    .RuleFor(b => b.Title, f => f.Lorem.Sentence(3))
                    .RuleFor(b => b.Author, f => f.Person.FullName)
                    .RuleFor(b => b.Year, f => f.Date.Past(50).Year)
                    .RuleFor(b => b.Genre, f => f.PickRandom(new[] { "Fantasy", "Drama", "Horror", "Sci-Fi", "History" }));

                var books = faker.Generate(50);
                db.Books.AddRange(books);
                await db.SaveChangesAsync();
            }
        }
    }
}
