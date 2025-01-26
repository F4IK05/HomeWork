using System.Text.Json;
using Project.Interfaces;

namespace Project.Classes;

public class Showroom : IShowRoom
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public List<Car> Cars { get; set; } = new();
    public int CarCapacity { get; set; } // машин не может быть больше чем CarCapacity
    public int CarCount => Cars.Count; // количество машин в салоне
    public int SalesCount { get; set; }
    
    public List<Showroom> Showrooms { get; set; } = new();

    public void AddCar(string showroomName, string make, string model, DateTime year)
    {
        var json = File.ReadAllText("./Data/showrooms.json");
        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }
        
        var showroom = Showrooms.FirstOrDefault(s => s.Name == showroomName);
        
        if (showroom.CarCount >= showroom.CarCapacity)
        {
            throw new Exception("Cannot add more cars than the capacity.");
        }
        
        var car = new Car
        {
            Make = make,
            Model = model,
            Year = year
        };
        
        showroom.Cars.Add(car);

        
        var jsonString = JsonSerializer.Serialize(Showrooms);
        File.WriteAllText("./Data/showrooms.json", jsonString);

        Console.WriteLine($"Car {make} {model} added to showroom {showroomName}.");
    }

    public void ReadCars(string showroomName)
    {
        var json = File.ReadAllText("./Data/showrooms.json");
        Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        
        var showroom = Showrooms.FirstOrDefault(s => s.Name == showroomName);

        if (showroom.CarCount == 0)
        {
            Console.WriteLine("There are no cars in this showroom.");
            return;
        }

        Console.WriteLine($"Cars in showroom {showroomName}:");

        foreach (var car in showroom.Cars)
        {
            Console.WriteLine($"Make: {car.Make} Model: {car.Model} Year: {car.Year.Year}");
        }
    }

    public void UpdateCar(string showroomName, string oldMake, string oldModel, string newMake, string newModel, DateTime newYear)
    {
        var json = File.ReadAllText("./Data/showrooms.json");
        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }
        
        var showroom = Showrooms.FirstOrDefault(s => s.Name == showroomName);

        var car = showroom.Cars.FirstOrDefault(s => s.Make == oldMake && s.Model == oldModel);
        if (car == null)
        {
            throw new Exception("Car not found.");
        }
        
        car.Make = newMake;
        car.Model = newModel;
        car.Year = newYear;
        
        var jsonString = JsonSerializer.Serialize(Showrooms);
        File.WriteAllText("./Data/showrooms.json", jsonString);
        
        Console.WriteLine($"Car {oldMake} {oldModel} updated to {newMake} {newModel} ({newYear.Year}) in showroom {showroomName}.");
    }

    public void RemoveCar(string showroomName, string make, string model)
    {
        var json = File.ReadAllText("./Data/showrooms.json");

        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }
        
        var showroom = Showrooms.FirstOrDefault(s => s.Name == showroomName);
        
        var car = showroom.Cars.FirstOrDefault(s => s.Make == make && s.Model == model);
        if (car == null)
        {
            throw new Exception("Car not found.");
        }
        
        showroom.Cars.Remove(car);
        
        var jsonString = JsonSerializer.Serialize(Showrooms);
        File.WriteAllText("./Data/showrooms.json", jsonString);
        
        Console.WriteLine($"Car {make} {model} removed from showroom {showroomName}.");
    }
}
