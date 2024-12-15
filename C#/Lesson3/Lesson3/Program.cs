namespace HomeWork_Lesson3;

public enum FuelType
{
    Petrol,
    Gasoline,
    Diesel,
    Electric,
}

public enum BodyType
{
    Cabriolet,
    SUV,
    Crossover,
    Hatchback,
    Wagon,
}

public class Transport
{
    
    public int Id { get; set; }
    public string Model { get; set; }
    public FuelType FuelType { get; set; }
    public BodyType BodyType { get; set; }

    public Transport(int id, string model, FuelType fuelType, BodyType bodyType)
    {
        Id = id;
        Model = model;
        FuelType = fuelType;
        BodyType = bodyType;
    }

    virtual public void DisplayInfo()
    {
        Console.WriteLine($"Id: {Id}, Model: {Model}, FuelType: {FuelType}, BodyType: {BodyType}");
    }
}

public class Car : Transport
{
    public Car(int id, string model, FuelType fuelType, BodyType bodyType) : base(id, model, fuelType, bodyType)
    {
    }
    public override void DisplayInfo() 
    {
        Console.WriteLine($"Car: Id: {Id}, Model: {Model}, FuelType: {FuelType}, BodyType: {BodyType}");
    }
}

public class Bus : Transport
{
    public Bus(int id, string model, FuelType fuelType, BodyType bodyType) : base(id, model, fuelType, bodyType)
    {
    }
    
    public override void DisplayInfo()
    {
        Console.WriteLine($"Bus: Id: {Id}, Model: {Model}, FuelType: {FuelType}, BodyType: {BodyType}");
    }
}

public class Manager
{
    private Transport[] _transports = new Transport[20];
    private int _count = 0;

    public void AddTransport(Transport transport)
    {
        bool isAdded = false;
        for (int i = 0; i < _count; i++)
        {
            if (_transports[i].Id == transport.Id)
            {
                Console.WriteLine($"Transport {transport.Id} is already added");
                isAdded = true;
            }
        }

        if (_count != _transports.Length && !isAdded)
        {
            _transports[_count++] = transport;
            Console.WriteLine($"Transport {transport.Id} is added");
        }
    }

    public void RemoveTransport(int id)
    {
        bool isRemoved = false;
        for (int i = 0; i < _count - 1; i++)
        {
            if (_transports[i].Id == id)
            {
                for (int j = i; j < _count - 1; j++)
                {
                    _transports[j] = _transports[j + 1];
                }
                _count--;
                Console.WriteLine("Transport removed");
                isRemoved = true;
            }
        }

        if (!isRemoved)
        {
            Console.WriteLine($"There is no transport with that id({id})");
            
        }
    }

    public void EditTransport(int id, string newModel, FuelType fuelType, BodyType bodyType)
    {
        bool isEdited = false;
        for (int i = 0; i < _count - 1; i++)
        {
            if (_transports[i].Id == id)
            {
                _transports[i].Model = newModel;
                _transports[i].FuelType = fuelType;
                _transports[i].BodyType = bodyType;
                isEdited = true;
                Console.WriteLine($"Transport {id} is updated");
            }
        }

        if (!isEdited)
        {
            Console.WriteLine($"There is no transport with that id({id})");
        }
    }
    
    public void DisplayAllTransports()
    {
        if (_count == 0)
        {
            Console.WriteLine("List is empty.");
            return;
        }

        Console.WriteLine("Transport List:");
        for (int i = 0; i < _count; i++)
        {
            _transports[i].DisplayInfo();
        }
    }

}

class Program
{
    static void Main(string[] args)
    {

        Manager manager = new Manager();

        manager.AddTransport(new Car(1, "Car", FuelType.Petrol, BodyType.Cabriolet));
        manager.AddTransport(new Bus(2, "Bus", FuelType.Gasoline, BodyType.Wagon));
        manager.AddTransport(new Car(3, "Another Car", FuelType.Electric, BodyType.SUV));
        
        
        
        // manager.RemoveTransport(5); //- to delete by ID
        // manager.RemoveTransport(1);
        
        manager.EditTransport(2, "Electric Bus",FuelType.Electric, BodyType.Wagon);
        
        manager.DisplayAllTransports();
    }

}