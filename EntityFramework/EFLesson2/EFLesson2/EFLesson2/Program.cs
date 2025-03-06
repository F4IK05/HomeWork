using EFLesson2;
using EFLesson2.Data.Contexts;
using EFLesson2.Data.Models;
using Microsoft.EntityFrameworkCore;

var context = new ShowroomContext();
var crud = new CRUD();

#region Adding

#region Dealers

/*var dealers = new List<Dealer>()
{
    new() { Name = "AutoWorld", Location = "New York"},
    new() { Name = "CarHub", Location = "Los Angeles" }
};

context.Dealers.AddRange(dealers);
context.SaveChanges();*/

#endregion

#region Cars

/*var cars = new List<Car>()
{
    new() { DealerId = 1, Make = "Toyota", Model = "Corolla", Year = 2022 },
    new() { DealerId = 1, Make = "Honda", Model = "Civic", Year = 2021 },
    new() { DealerId = 2, Make = "Ford", Model = "Focus", Year = 2023 }
};

context.Cars.AddRange(cars);
context.SaveChanges();*/

#endregion

#endregion


#region Loadings

#region Eager

/*var result = context.Dealers
    .Include(d => d.Cars)
    .Select(d => new { d.Name, d.Location, Cars = d.Cars.Select(c => new { c.Make, c.Model })
    });

foreach (var res in result)
{
    Console.WriteLine("\n" + res.Name + " " + res.Location);

    foreach (var car in res.Cars)
    {
        Console.WriteLine($"Make: " + car.Make + ", Model: " + car.Model);
    }
}*/

#endregion

#region Explicit

/*var carMake = context.Cars.First(m => m.Make == "Ford");

context.Entry(carMake)
    .Reference(c => c.Dealer)
    .Load();

Console.WriteLine(carMake.Dealer.Name);*/

#endregion

#region Lazy

/*var dealers = context.Dealers.ToList(); // Почему-то без ToList не работало

foreach (var dealer in dealers)
{
    Console.WriteLine(dealer.Name + " | " + dealer.Location);

    foreach (var car in dealer.Cars)
    {
        Console.WriteLine($"Make: " + car.Make + ", Model: " + car.Model);
    }
}*/

#endregion

#endregion


// 10 пункт
#region FromSqlRaw

/*var cars = context.Cars
    .FromSqlRaw("SELECT * FROM Cars WHERE Make = 'Ford'");

foreach (var car in cars)
{
    Console.WriteLine($"Make: {car.Make}, Model: {car.Model}, Year: {car.Year}");
}*/

#endregion


#region CRUD

#region AddCar

// crud.AddCar(2, "KIA", "Cerato", 2015);

#endregion

#region UpdateCar

// crud.UpdateCar(3, "Chevrolet", "Malibu", 2016);

#endregion

#region DeleteCar

// crud.DeleteCar(1);

#endregion

#region GetAllCars

// crud.GetAllCars();

#endregion

#endregion


#region Logging

// Приемер с GetAllCar()

crud.GetAllCars();

#endregion
