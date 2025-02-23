using Dapper;
using DapperLesson1;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

var configBuilder = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

var connectionString = configBuilder.GetConnectionString("Default");

using var connection = new SqlConnection(connectionString);

connection.Open();

// 1. Вставка данных в таблицу

/*
Console.WriteLine("Brand: ");
string brand = Console.ReadLine();

Console.WriteLine("Model: ");
string model = Console.ReadLine();

Console.WriteLine("Year: ");
int year = int.Parse(Console.ReadLine());

Console.WriteLine("Price: ");
decimal price = decimal.Parse(Console.ReadLine());

var sqlQuery = "insert into Cars(Brand, Model, Year, Price) values (@Brand, @Model, @Year, @Price)";

connection.Execute(sqlQuery, new { Brand = brand, Model = model, Year = year, Price = price});*/





// 2. Обновление данных

/*
Console.WriteLine("Enter id: ");
int id = int.Parse(Console.ReadLine());

Console.WriteLine("Enter new price: ");
decimal price = decimal.Parse(Console.ReadLine());

var sqlQuery = "UPDATE Cars SET Price = @NewPrice WHERE Id = @CarId";

connection.Execute(sqlQuery, new { CarId = id, NewPrice = price });*/





// 3. Удаление данных

/*
Console.WriteLine("Enter id: ");
int id = int.Parse(Console.ReadLine());

var sqlQuery = "DELETE FROM Cars WHERE Id = @CarId";

connection.Execute(sqlQuery, new { CarId = id });*/





// 4. Выборка всех автомобилей

/*
var sqlQuery = "SELECT * FROM Cars";

var cars = connection.Query<Car>(sqlQuery);

foreach (var car in cars)
{
    Console.WriteLine(car);
}*/





// 5. Фильтрация данных
Console.WriteLine("Enter brand: ");
string brand = Console.ReadLine();

var sqlQuery = "SELECT * FROM Cars WHERE Brand = @BrandName";

var cars = connection.Query<Car>(sqlQuery, new { BrandName = brand });

foreach (var car in cars)
{
    Console.WriteLine(car);
}