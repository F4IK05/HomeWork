namespace MyClass;

public abstract class Transport
{
    public string Type { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public int MaxSpeed { get; set; }

    public Transport(string type, string brand, string model, int year, int maxSpeed)
    {
        Type = type;
        Brand = brand;
        Model = model;
        Year = year;
        MaxSpeed = maxSpeed;
    }

    public virtual void ShowInfo()
    {
        Console.Write($"Type: {Type}, Brand: {Brand}, Model: {Model}, Year: {Year}, MaxSpeed: {MaxSpeed}");
    }

    public abstract void Move();

}

public class Car : Transport
{
    public string FuelType { get; set; }

    public Car(string type, string brand, string model, int year, int maxSpeed, string fuelType) : base(type, brand, model, year, maxSpeed)
    {
        FuelType = fuelType;
    }

    public override void ShowInfo()
    {
        base.ShowInfo();
        Console.WriteLine($", Fuel Type: {FuelType}");
    }

    public override void Move()
    {
        Console.WriteLine($"The car {Brand} {Model} travels on the road at a speed of up to {MaxSpeed} km/h");
    }
}

public class Truck : Transport
{
    public int LoadCapacity { get; set; }

    public Truck(string type, string brand, string model, int year, int maxSpeed, int loadCapacity) : base(type, brand, model, year, maxSpeed)
    {
        LoadCapacity = loadCapacity;
    }

    public override void ShowInfo()
    {
        base.ShowInfo();
        Console.WriteLine($", Load Capacity: {LoadCapacity}");
    }

    public override void Move()
    {
        Console.WriteLine($"Truck {Brand} {Model} is transporting cargo");
    }
}

public class Bike : Transport
{
    public bool HasSideCar { get; set; }

    public Bike(string type, string brand, string model, int year, int maxSpeed, bool hasSideCar) : base(type, brand, model, year, maxSpeed)
    {
        HasSideCar = hasSideCar;
    }

    public override void ShowInfo()
    {
        base.ShowInfo();
        Console.WriteLine($", Has Side Car: {HasSideCar}");
    }

    public override void Move()
    {
        Console.WriteLine($"Motorcycle {Brand} {Model} rushes along the road");
        
    }
}

public class Bus : Transport
{
    public int PassengerCapacity { get; set; }

    public Bus(string type, string brand, string model, int year, int maxSpeed, int passengerCapacity) : base(type, brand, model, year, maxSpeed)
    {
        PassengerCapacity = passengerCapacity;
    }

    public override void ShowInfo()
    {
        base.ShowInfo();
        Console.WriteLine($", Passenger Capacity: {PassengerCapacity}");
    }

    public override void Move()
    {
        Console.WriteLine($"Bus {Brand} {Model} carries passengers");
        
    }
}

static class Manager
{
    static List<Transport> transports = new List<Transport>();

    public static void AddTransport()
    {
        Console.Write("Choose a type of transport: 1 - Car, 2 - Truck, 3 - Bike, 4 - Bus -> ");
        string? choice = Console.ReadLine();
        if (string.IsNullOrEmpty(choice) || (choice != "1" && choice != "2" && choice != "3" && choice != "4"))
        {
            Console.WriteLine("Wrong choice, please try again");
            return;
        }

        Console.Write("Enter brand: ");
        string? brand = Console.ReadLine();
        if (string.IsNullOrEmpty(brand))
        {
            Console.WriteLine("Wrong choice, please try again");
            return;
        }
        
        Console.Write("Enter model: ");
        string? model = Console.ReadLine();
        if (string.IsNullOrEmpty(model))
        {
            Console.WriteLine("Wrong choice, please try again");
            return;
        }
        
        Console.Write("Enter year: ");
        if (!int.TryParse(Console.ReadLine(), out int year) || year < 1886 || year > DateTime.Now.Year)
        {
            Console.WriteLine("Invalid year. Please enter a valid year (1886 - present year).");
            return;
        }
        
        Console.Write("Enter max speed: ");
        if (!int.TryParse(Console.ReadLine(), out int maxSpeed) || maxSpeed <= 0)
        {
            Console.WriteLine("Invalid max speed. Speed cannot be zero or negative.");
            return;
        } 
        if (choice == "1" && maxSpeed > 400)
        {
            Console.WriteLine("Invalid max speed. Max speed cannot be greater than 400 for Car.");
            return;
        }
        else if (choice == "2" && maxSpeed > 120)
        {
            Console.WriteLine("Invalid max speed. Max speed cannot be greater than 120 for Truck.");
            return;
        }
        else if (choice == "3" && maxSpeed > 350)
        {
            Console.WriteLine("Invalid max speed. Max speed cannot be greater than 350 for Bike");
            return;
        }
        else if (choice == "4" && maxSpeed > 120)
        {
            Console.WriteLine("Invalid max speed. Max speed cannot be greater than 120 for Bus");
            return;
        }


        switch (choice)
        {
            case "1":
                Console.Write("Enter fuel type: ");
                string? fuel;
                Console.Write("Enter fuel type: 1 - Gasoline, 2 - Diesel, 3 - Electric, 4 - Hybrid -> ");
                string? type = Console.ReadLine();
                if (string.IsNullOrEmpty(type) || (type != "1" && type != "2" && type != "3" && type != "4"))
                {
                    Console.WriteLine("Wrong choice, please try again");
                }

                switch (type)
                {
                    case "1":
                        fuel = "Gasoline";
                        transports.Add(new Car("Car", brand, model, year, maxSpeed, fuel));
                        break;
                    case "2":
                        fuel = "Diesel";
                        transports.Add(new Car("Car", brand, model, year, maxSpeed, fuel));
                        break;
                    case "3":
                        fuel = "Electric";
                        transports.Add(new Car("Car", brand, model, year, maxSpeed, fuel));
                        break;
                    case "4":
                        fuel = "Hybrid";
                        transports.Add(new Car("Car", brand, model, year, maxSpeed, fuel));
                        break;
                }

                
                break;
            case "2":
                Console.Write("Enter load capacity:");
                
                if (!int.TryParse(Console.ReadLine(), out int loadCapacity) && loadCapacity <= 0)
                {
                    Console.WriteLine("Invalid load capacity. Please enter a positive integer.");
                    return;
                }
                transports.Add(new Truck("Truck", brand, model, year, maxSpeed, loadCapacity));
                break;
            case "3":
                Console.Write("Has side carried: (1 - yes, skip or not 1 is - no)");
                bool hasSideCar = false;
                string? answer = Console.ReadLine();
                if (answer == "1")
                {
                    hasSideCar = true;
                }
                else
                {
                    hasSideCar = false;
                }

                transports.Add(new Bike("Bike", brand, model, year, maxSpeed, hasSideCar));
                break;
            case "4":
                Console.Write("Enter passenger capacity:");
                //int passengerCapacity = int.Parse(Console.ReadLine());

                if (!int.TryParse(Console.ReadLine(), out int passengerCapacity) && passengerCapacity < 8)
                {
                    Console.WriteLine("Invalid passenger capacity. Minimum passenger capacity is 8.");
                    return;
                }

                transports.Add(new Bus("Bus", brand, model, year, maxSpeed, passengerCapacity));
                break;
        }

        
    }
    
    public static void ShowAll()
    {
        if (transports.Count > 0)
        {
            Console.WriteLine("--------------------------------------------------------------------");
            for (int i = 0; i < transports.Count; i++)
            {
                Console.Write($"{i + 1}. ");
                transports[i].ShowInfo();
            }
            Console.WriteLine("--------------------------------------------------------------------"); 
        }
        else
        {
            Console.WriteLine("No transports available");
        }
    }

    public static void ShowByFilter(string filter)
    {
        if (transports.Count > 0)
        {
            Console.WriteLine("--------------------------------------------------------------------");
            for (int i = 0; i < transports.Count; i++)
            {
                if (transports[i].Type == filter)
                {
                    Console.Write($"{i + 1}. ");
                    transports[i].ShowInfo();
                }
            }

            Console.WriteLine("--------------------------------------------------------------------");
        }
    }

    public static void LaunchTransport()
    {
        if (transports.Count > 0)
        {
            ShowAll();
            Console.WriteLine("Please choose one of the transports:");
            
            bool isFound = false;

            if (int.TryParse(Console.ReadLine(), out int index))
            {
                if (index > 0 && index < transports.Count + 1)
                {
                    for (int i = 0; i < transports.Count; i++)
                    {
                        transports[index - 1].Move();
                        isFound = true;
                        break;
                    }
                
                }
                else if (!isFound)
                {
                    Console.WriteLine("Can't find");
                }
                
            }
            else
            {
                Console.WriteLine("Wrong input. Try again.");
            }
        }
        else
        {
            Console.WriteLine("There is no such transport.");
        }

    }

    public static void RemoveTransport()
    {
        if (transports.Count > 0)
        {
        ShowAll();
        
            Console.WriteLine("Please enter the ID of the transport(from list):");
        

            if (int.TryParse(Console.ReadLine(), out int id))
            {
                if (id > 0 && id < transports.Count + 1)
                {
                    transports.RemoveAt(id - 1);
                    Console.WriteLine("Transport removed");
                }
                else
                {
                    Console.WriteLine("Wrong input. Try again.");
                }
            }
        }
        else
        {
            Console.WriteLine("There is no such transport.");
        }

    }

    public static void FilterList()
    {
        if (transports.Count > 0)
        {
            Console.WriteLine("Enter the type of transport to filter: 1 - Car, 2 - Truck, 3 - Bike, 4 - Bus");
        
            string? choice = Console.ReadLine();
            string filter;

            switch (choice)
            {
                case "1":
                    filter = "Car";
                    ShowByFilter(filter);
                    break;
                case "2":
                    filter = "Truck";
                    ShowByFilter(filter);
                    break;
                case "3":
                    filter = "Bike";
                    ShowByFilter(filter);
                    break;
                case "4":
                    filter = "Bus";
                    ShowByFilter(filter);
                    break;
            }
        }
        else
        {
            Console.WriteLine("There is no such transport.");
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        bool isDone = false;
        while (!isDone)
        {
            Console.WriteLine("---------Menu---------" +
                              "\n1. Add transport" +
                              "\n2. Show transport list" +
                              "\n3. Launch transport" +
                              "\n4. Remove transport" +
                              "\n5. Filter list" +
                              "\n6. Exit");
            
            
            if (!int.TryParse(Console.ReadLine(), out int choice))
            {
                Console.WriteLine("Wrong input. Try again.");
                
            }

            if (choice == 1)
            {
                Manager.AddTransport();
            } 
            else if (choice == 2)
            {
                Manager.ShowAll();
            } 
            else if (choice == 3)
            {
                Manager.LaunchTransport();
            } 
            else if (choice == 4)
            {
                Manager.RemoveTransport();
            } 
            else if (choice == 5)
            {
                Manager.FilterList();
            }
            else if (choice == 6)
            {
                isDone = true;
                Console.WriteLine("\nThank you for using this program. Press any key to exit.");
            }
            
        }
        
    }
}