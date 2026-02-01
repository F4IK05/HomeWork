dotnet ef migrations add InitialCreate --context MilkDbContext --project Milk.Data --startup-project Milk.Api
dotnet ef database update --context MilkDbContext --project Milk.Data --startup-project Milk.Api
