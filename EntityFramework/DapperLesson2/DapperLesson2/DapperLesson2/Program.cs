using System.Threading.Channels;
using Dapper;
using DapperLesson2;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

var configBuilder = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

var connectionString = configBuilder.GetConnectionString("Default");

using var connection = new SqlConnection(connectionString);

connection.Open();

/*2. Вставка данных
Реализуйте метод, который добавляет новый автомобиль в таблицу Cars и его владельца в таблицу Owners.*/

/*Console.WriteLine("Brand: ");
string brand = Console.ReadLine();

Console.WriteLine("Model: ");
string model = Console.ReadLine();

Console.WriteLine("Year: ");
int year = int.Parse(Console.ReadLine());

Console.WriteLine("Price: ");
decimal price = decimal.Parse(Console.ReadLine());

Console.WriteLine("Owner name: ");
string name = Console.ReadLine();

var sqlQuery = """
                declare @CarId int;
                
                insert into Cars(Brand, Model, Year, Price) values (@Brand, @Model, @Year, @Price);
                
                set @CarId = (select Id from Cars where Brand = @Brand AND Model = @Model AND Year = @Year AND Price = @Price);
                
                insert into Owners(Name, CarId) values (@Name, @CarId);
               """;

connection.Execute(sqlQuery, new {@Brand = brand, @Model = model, @Year = year, @Price = price, @Name = name});*/





/*3. Обновление данных
Реализуйте метод, который обновляет имя владельца по идентификатору автомобиля CarId.*/

/*Console.WriteLine("Enter car id: ");
int carId = int.Parse(Console.ReadLine());

Console.WriteLine("Enter new owner name: ");
string newOwnerName = Console.ReadLine();

var sqlQuery = "UPDATE Owners SET Name = @NewOwner WHERE CarId = @CarId;";

connection.Execute(sqlQuery, new { NewOwner = newOwnerName, CarId = carId });*/






/*4. Удаление данных
Реализуйте метод, который удаляет автомобиль и связанного с ним владельца по CarId.*/

/*Console.WriteLine("Enter car id: ");
int carId = int.Parse(Console.ReadLine());

var sqlQuery = """
               DELETE FROM Owners WHERE CarId = @CarId;
               DELETE FROM Cars WHERE Id = @CarId;
               """;

connection.Execute(sqlQuery, new { CarId = carId });*/





/*5. Выборка автомобилей с владельцами (INNER JOIN)
Реализуйте метод, который получает все автомобили и их владельцев, используя INNER JOIN, 
и возвращает список объектов CarWithOwner.*/

/*var sqlQuery = """
               SELECT c.Id, c.Brand, c.Model, c.Year, c.Price, o.Name
               FROM Cars c
               INNER JOIN Owners o ON c.Id = o.CarId;
               """;
               
var result = connection.Query<Car, Owner, CarWithOwner>(sqlQuery, (car, owner) =>
    {
        return new CarWithOwner
        {
            Id = car.Id,
            Brand = car.Brand,
            Model = car.Model,
            Year = car.Year,
            Price = car.Price,
            Name = owner.Name
        };
    },
    splitOn: "Name");

foreach (var car in result)
{
    Console.WriteLine(car.Brand + " - " + car.Model + " - " + car.Year + " - " + car.Price + " - " + car.Name);
}*/





/*6. Фильтрация автомобилей по владельцу
Реализуйте метод, который получает список автомобилей определённого владельца, передаваемого в параметре.*/

Console.WriteLine("Enter owner name: ");
string owner = Console.ReadLine();

var sqlQuery = """
               SELECT c.Id, c.Brand, c.Model, c.Year, c.Price, o.Id, o.Name 
               FROM Cars c
               INNER JOIN Owners o ON c.Id = o.CarId
               WHERE o.Name = @OwnerName;
               """;

var result = connection.Query<Car, Owner, CarWithOwner>(sqlQuery, (car, owner) =>
{
    return new CarWithOwner
    {
        Id = car.Id,
        Brand = car.Brand,
        Model = car.Model,
        Year = car.Year,
        Price = car.Price,
        Name = owner.Name,
    };
}, new {OwnerName = owner} , splitOn: "Id");

foreach (var car in result)
{
    Console.WriteLine($"Owner: {car.Name}\n-Car info\n  -Brand: {car.Brand}\n  -Model: {car.Model}\n  -Year: {car.Year}\n  -Price: {car.Price}");
}
               