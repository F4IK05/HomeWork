namespace Project.Interfaces;

public interface IShowRoom
{
    public void AddCar(string showroomName, string make, string model, DateTime year);
    
    public void ReadCars(string showroomName);
    
    public void UpdateCar(string showroomName, string oldMake, string oldModel, string newMake, string newModel, DateTime newYear);
    
    public void RemoveCar(string showroomName ,string make, string model);
}