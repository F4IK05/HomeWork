using EF_Lesson1.Data.Contexts;
using EF_Lesson1.Data.Models;
using Microsoft.EntityFrameworkCore;

using var context = new ShowroomContext();

// Доабавление информации(7 пункт)

#region Customers

/*var customers = new List<Customer>()
{
    new Customer { FirstName = "Ivan", LastName = "Ivanov", Email = "ivanov@example.com", PhoneNumber = "+79111234567" },
    new Customer { FirstName = "Peter", LastName = "Petrov", Email = "petrov@example.com", PhoneNumber = "+79122345678" },
    new Customer { FirstName = "Maria", LastName = "Smirnova", Email = "smirnova@example.com", PhoneNumber = "+79133456789" },
    new Customer { FirstName = "Anna", LastName = "Kozlova", Email = "kozlova@example.com", PhoneNumber = "+79144567890" },
    new Customer { FirstName = "Dmitry", LastName = "Sidorov", Email = "sidorov@example.com", PhoneNumber = "+79155678901" },
    new Customer { FirstName = "Olga", LastName = "Vasilyeva", Email = "vasilieva@example.com", PhoneNumber = "+79166789012" },
    new Customer { FirstName = "Sergey", LastName = "Mironov", Email = "mironov@example.com", PhoneNumber = "+79177890123" },
    new Customer { FirstName = "Tatiana", LastName = "Orlova", Email = "orlova@example.com", PhoneNumber = "+79188901234" },
    new Customer { FirstName = "Alexey", LastName = "Fedorov", Email = "fedorov@example.com", PhoneNumber = "+79199012345" },
    new Customer { FirstName = "Ekaterina", LastName = "Belova", Email = "belova@example.com", PhoneNumber = "+79200123456" }
};

context.Customers.AddRange(customers);

context.SaveChanges();*/

#endregion

#region Cars

/*var cars = new List<Car>()
{
    new Car { Brand = "Toyota", Model = "Camry", ProductionYear = new DateTime(2022,1,1), Price = 2500000 },
    new Car { Brand = "BMW", Model = "X5", ProductionYear = new DateTime(2021,1,1), Price = 4500000 },
    new Car { Brand = "Mercedes", Model = "E-Class", ProductionYear = new DateTime(2023,1,1), Price = 5000000 },
    new Car { Brand = "Hyundai", Model = "Solaris", ProductionYear = new DateTime(2020,1,1), Price = 1300000 },
    new Car { Brand = "Ford", Model = "Focus", ProductionYear = new DateTime(2019,1,1), Price = 1100000 }
};

context.Cars.AddRange(cars);

context.SaveChanges();*/

#endregion

#region Employees

/*var employees = new List<Employee>()
{
    new() {FirstName = "John", LastName = "Doe", Salary = 3000},
    new() {FirstName = "Jane", LastName = "Smith", Salary = 2000},
    new() {FirstName = "Mark", LastName = "Johnson", Salary = 4000},
};

context.Employees.AddRange(employees);

context.SaveChanges();*/

#endregion

#region Sales

/*var sales = new List<Sale>()
{
    new() { SaleDate = DateTime.UtcNow, CustomerId = 3, CarId = 1, EmployeeId = 1 },
    new() { SaleDate = DateTime.UtcNow, CustomerId = 1, CarId = 2, EmployeeId = 2 },
    new() { SaleDate = DateTime.UtcNow, CustomerId = 5, CarId = 3, EmployeeId = 1 },
    new() { SaleDate = DateTime.UtcNow, CustomerId = 7, CarId = 4, EmployeeId = 3 },
    new() { SaleDate = DateTime.UtcNow, CustomerId = 9, CarId = 5, EmployeeId = 2 }
};

context.Sales.AddRange(sales);

context.SaveChanges();*/

#endregion



// Вывод информации

#region info

#region car_info

/*var cars = context.Cars;

Console.WriteLine("All cars: ");
foreach (var car in cars)
{
    Console.WriteLine($" -Brand: {car.Brand}\n" +
                      $" -Model: {car.Model}\n" +
                      $" -Year: {car.ProductionYear.Year}\n" +
                      $" -Price: {car.Price}\n");
}*/

#endregion

#region customer_info

/*var customers = context.Customers;

Console.WriteLine("All customers: ");
foreach (var customer in customers)
{
    Console.WriteLine($" -Name: {customer.FirstName}\n" +
                      $" -Surname: {customer.LastName}\n" +
                      $" -Email: {customer.Email}\n" +
                      $" -PhoneNumber: {customer.PhoneNumber}\n");
}*/

#endregion

#region employee_info

/*var employees = context.Employees;

Console.WriteLine("All employees: ");
foreach (var employee in employees)
{
    Console.WriteLine($" -Name: {employee.FirstName}\n" +
                      $" -Surname: {employee.LastName}\n" +
                      $" -Salary: {employee.Salary}\n");
}*/

#endregion

#region sale_info

/*var sales = context.Sales;
Console.WriteLine("All sales: ");
foreach (var sale in sales)
{
    Console.WriteLine($" -CarId: {sale.CarId}\n" +
                      $" -CustomerId: {sale.CustomerId}\n" +
                      $" -EmployeeId: {sale.EmployeeId}\n" +
                      $" -SaleDate: {sale.SaleDate.Year}\n");
}*/

#endregion

#endregion



// LINQ-запросы(9 пункт)

// ----------------------------------------------------------------------------------

//- Найти все автомобили, купленные конкретным клиентом.



/*Console.WriteLine("Enter name: ");
string name = Console.ReadLine();

var result = context.Sales
    .Include(c => c.Customer)
    .Include(c => c.Car)
    .Where(c => c.Customer.FirstName == name)
    .Select(c => new {c.Car.Brand, c.Car.Model});

foreach (var res in result)
{
    Console.WriteLine($"Car: \n -Brand: {res.Brand}\n -Model: {res.Model}");
}*/

// к примеру напишите: Ivan

// ----------------------------------------------------------------------------------

//- Вывести список продаж за определенный период.
// P.s : у меня немного странно он будет работать так как все даты были написына как DateTime.Now 


/*var fDate = new DateTime(1970, 1, 1);
var lDate = new DateTime(2025, 3, 3);

var result = context.Sales
    .Include(c => c.Car)
    .Include(c => c.Employee)
    .Include(c => c.Customer)
    .Where(s => s.SaleDate >= fDate && s.SaleDate <= lDate)
    .Select(s => new { s.SaleDate, s.Customer.FirstName, s.Customer.LastName, s.Car.Brand, s.Car.Model });

foreach (var res in result)
{
    Console.WriteLine($"Sales:\n" +
                      $" -Sale date: {res.SaleDate}\n" +
                      $" -Customer info:\n" +
                      $"   --Name: {res.FirstName}\n" +
                      $"   --Surname: {res.LastName}\n" +
                      $" -Car info:\n" +
                      $"   --Brand: {res.Brand}\n" +
                      $"   --Model: {res.Model}\n");
}*/

// ----------------------------------------------------------------------------------

//- Подсчитать количество продаж каждого менеджера.

var result = context.Sales
    .Include(c => c.Customer)
    .GroupBy(c => new {c.EmployeeId, c.Employee.FirstName})
    .Select(c => new
    {
        Name = c.Key.FirstName,
        SalesCount = c.Count(),
    });

Console.WriteLine("Name - SalesCount");
foreach (var res in result)
{
    Console.WriteLine($"{res.Name} - {res.SalesCount}");
}
