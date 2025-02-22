using System.Data;
using System.Data.SqlClient;
using Dapper;
using EF;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

var configBuilder = new ConfigurationBuilder();
configBuilder.AddJsonFile("appsettings.json");

var config = configBuilder.Build();
var connectionString = config.GetConnectionString("Default");

// 1. Вставка данных в таблицу

/*using var connection = new SqlConnection(connectionString);

connection.Open();

Console.WriteLine("Brand: ");
string brand = Console.ReadLine();

Console.WriteLine("Model: ");
string model = Console.ReadLine();

Console.WriteLine("Year: ");
int year = int.Parse(Console.ReadLine());

Console.WriteLine("Price: ");
decimal price = decimal.Parse(Console.ReadLine());

var sqlQuery = "insert into Cars(Brand, Model, Year, Price) values (@Brand, @Model, @Year, @Price)";

var parameters = new {Brand = brand, Model = model, Year = year, Price = price};

int result = connection.Execute(sqlQuery, parameters);

Console.WriteLine(result == 1 ? "New car added" : "Error");*/






// 2. Обновление данных

/*using var connection = new SqlConnection(connectionString);

connection.Open();

Console.WriteLine("Enetr car id: ");
int carId = int.Parse(Console.ReadLine());

Console.WriteLine("Enter new price: ");
decimal price = decimal.Parse(Console.ReadLine());

var sqlQuery = "UPDATE Cars SET Price = @NewPrice WHERE Id = @CarId";

var parameters = new { CarId = carId, Price = price };

int result = connection.Execute(sqlQuery, parameters);

Console.WriteLine(result == 1 ? "Car updated" : "Error");*/






// 3. Удаление данных

/*using var connection = new SqlConnection(connectionString);

connection.Open();

Console.WriteLine("Enter car Id: ");
int Id = int.Parse(Console.ReadLine());

var sqlQuery = "DELETE FROM Cars WHERE Id = @CarId";

var parameters = new { CarId = Id };

int result = connection.Execute(sqlQuery, parameters);

Console.WriteLine(result == 1 ? "Car deleted" : "Error");*/






// 4. Выборка всех автомобилей

/*using var connection = new SqlConnection(connectionString);

var sqlQuery = "SELECT * FROM Cars";

connection.Open();

var cars = connection.Query<Car>(sqlQuery);

foreach (var car in cars)
{
    Console.WriteLine(car);
}*/






// 5. Фильтрация данных

using var connection = new SqlConnection(connectionString);

var sqlQuery = "SELECT * FROM Cars WHERE Brand = @BrandName";

Console.WriteLine("Enter Brand:");
string brandName = Console.ReadLine();

connection.Open();

var cars = connection.Query<Car>(sqlQuery, new {BrandName = brandName});

foreach (var car in cars)
{
    Console.WriteLine(car);
}

