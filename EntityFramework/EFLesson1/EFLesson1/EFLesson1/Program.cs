using EFLesson1.Data.Contexts;
using EFLesson1.Data.Models;
using Microsoft.EntityFrameworkCore;

var context = new ShowroomContext();

#region Examples

#region Customers

/*var customers = new List<Customer>
{
    new() { FirstName = "John", LastName = "Doe", PhoneNumber = "1234567890" },
    new() { FirstName = "Jane", LastName = "Smith", PhoneNumber = "0987654321" },
    new() { FirstName = "Michael", LastName = "Brown", PhoneNumber = "1112223333" },
    new() { FirstName = "Emily", LastName = "Davis", PhoneNumber = "4445556666" },
    new() { FirstName = "Chris", LastName = "Wilson", PhoneNumber = "7778889999" },
    new() { FirstName = "Sarah", LastName = "Miller", PhoneNumber = "1231231234" },
    new() { FirstName = "David", LastName = "Clark", PhoneNumber = "3213214321" },
    new() { FirstName = "Jessica", LastName = "Lewis", PhoneNumber = "6549873210" },
    new() { FirstName = "Paul", LastName = "Walker", PhoneNumber = "7896541230" },
    new() { FirstName = "Emma", LastName = "Thompson", PhoneNumber = "4561237890" }
};

context.Customers.AddRange(customers);

context.SaveChanges();*/


#endregion

#region Cars

/*var cars = new List<Car>()
{
    new() { Make = "Toyota", Model = "Camry", Year = 2020, Price = 25000 },
    new() { Make = "Honda", Model = "Civic", Year = 2021, Price = 22000 },
    new() { Make = "Ford", Model = "Focus", Year = 2019, Price = 18000 },
    new() { Make = "Chevrolet", Model = "Malibu", Year = 2022, Price = 27000 },
    new() { Make = "Nissan", Model = "Altima", Year = 2021, Price = 23000 }
};

context.Cars.AddRange(cars);

context.SaveChanges();*/

#endregion

#region Employees

/*var employees = new List<Employee>
{
    new Employee { FirstName = "Alice", LastName = "Johnson", Salary = 50000 },
    new Employee { FirstName = "Bob", LastName = "Anderson", Salary = 55000 },
    new Employee { FirstName = "Charlie", LastName = "Robinson", Salary = 60000 }
};

context.Employees.AddRange(employees);

context.SaveChanges();*/

#endregion

#region Sales

/*var sales = new List<Sale>
{
    new() { CarId = 1, CustomerId = 1, EmployeeId = 1, Date = DateTime.Now },
    new() { CarId = 2, CustomerId = 2, EmployeeId = 2, Date = DateTime.Now },
    new() { CarId = 3, CustomerId = 3, EmployeeId = 3, Date = DateTime.Now },
    new() { CarId = 4, CustomerId = 4, EmployeeId = 1, Date = DateTime.Now },
    new() { CarId = 5, CustomerId = 5, EmployeeId = 2, Date = DateTime.Now }
};

context.Sales.AddRange(sales);

context.SaveChanges();*/

#endregion

#endregion


#region LINQ

#region Task1

// Найти все автомобили, купленные конкретным клиентом.

/*Console.WriteLine("Enter customer Id: ");
int customerId = int.Parse(Console.ReadLine());

var result = context.Sales
    .Where(s => s.CustomerId == customerId)
    .Include(s => s.Car)
    .Select(s => new {s.Customer.FirstName, s.Customer.LastName ,s.Car.Make, s.Car.Model});

foreach (var res in result)
{
    Console.WriteLine(res.FirstName + " " + res.LastName + " | " + res.Make + " " + res.Model);
}*/

#endregion

#region Task2

// Вывести список продаж за определенный период.

/*DateTime start = new DateTime(2020, 1, 1);

DateTime end = new DateTime(2025, 12, 31);

var result = context.Sales
    .Where(s => s.Date >= start && s.Date <= end)
    .Include(s => s.Car)
    .Include(s => s.Customer)
    .Select(s => new {s.Date, s.Car.Make, s.Car.Model, s.Customer.FirstName, s.Customer.LastName});

Console.WriteLine(result.ToQueryString());

foreach (var sales in result)
{
    Console.WriteLine(sales.Date + " | " + sales.FirstName + " " + sales.LastName + " | " + sales.Make + " " + sales.Model);
}*/


#endregion

#region Task3

// Подсчитать количество продаж каждого менеджера.

/*var result = context.Sales
    .GroupBy(s => new { s.EmployeeId })
    .Select(s => new {EmpId = s.Key.EmployeeId,SaleCount = s.Count()});

Console.WriteLine("Id - Count\n" );

foreach (var res in result)
{
    Console.WriteLine(" " + res.EmpId + " | " + res.SaleCount);
}*/

#endregion

#endregion