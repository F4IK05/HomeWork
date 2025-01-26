using System.Text.Json;
using Project.Data.DTO.Users;
using Project.Data.Model;
using Project.Interfaces;

namespace Project.Classes;

public class ShowRoomManager : IShowRoomManger
{
    public List<Showroom> Showrooms { get; set; } = new();
    public User loggedUser;
    public AuthSystem AuthSystem;

    public void Login(LoginRegisterDTO loginDTO)
    {
        loggedUser = AuthSystem.Login(new LoginRegisterDTO(loginDTO.Username, loginDTO.Password));

        var showroom = Showrooms.FirstOrDefault(s => s.Id == loggedUser.ShowroomId);
        if (showroom == null)
        {
            throw new Exception("Showroom not found.");
        }

        Console.WriteLine($"User {loggedUser.Username} is now logged into showroom {showroom.Name}.");
    }

    public Showroom FindRoom(string roomName)
    {
        var json = File.ReadAllText("./Data/showrooms.json");

        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }
        
        var room = Showrooms.FirstOrDefault(room => room.Name == roomName);

        if (room == null)
        {
            throw new Exception("Room not found");
        }
        
        return room;
    }

    public void CreateShowRoom(string roomName, int carCapacity)
    {
        if (string.IsNullOrWhiteSpace(roomName))
        {
            throw new Exception("Showroom name cannot be empty.");
        }

        if (carCapacity <= 0 || carCapacity > 51)
        {
            throw new Exception("Showroom capacity must be between 1 and 50.");
        }

        var json = File.ReadAllText("./Data/showrooms.json");

        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }

        foreach (var showroom in Showrooms)
        {
            if (showroom.Name == roomName)
            {
                throw new Exception("Showroom already exists.");
            }
        }
        
        Showrooms.Add(new Showroom
        {
            Name = roomName,
            CarCapacity = carCapacity,
            Cars = new List<Car>()
        });
        
        var jsonString = JsonSerializer.Serialize(Showrooms);
        
        File.WriteAllText("./Data/showrooms.json", jsonString);

        Console.WriteLine($"Showroom '{roomName}' with capacity {carCapacity} created successfully.");
    }

    public void EditRoom(string roomName, string newRoomName, int newCarCapacity)
    {
        var json = File.ReadAllText("./Data/showrooms.json");

        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }
        
        // тут мне надоело и я использовал LİNQ у меня была ошибка когда я использовал foreach( 0:27 )
        
        var srToEdit = Showrooms.FirstOrDefault(x => x.Name == roomName);

        if (srToEdit == null)
        {
            throw new Exception("Room not found.");
        }

        if (!string.IsNullOrWhiteSpace(newRoomName))
        {
            if (Showrooms.Any(x => x.Name == newRoomName))
            {
                throw new Exception("Room already exists.");
            }
            
            srToEdit.Name = newRoomName;
        }

        if (newCarCapacity < srToEdit.Cars.Count)
        {
            throw new Exception("Car capacity must be greater than or equal to car capacity.");
        }
        
        srToEdit.CarCapacity = newCarCapacity;
        
        var jsonString = JsonSerializer.Serialize(Showrooms);
        
        File.WriteAllText("./Data/showrooms.json", jsonString);

        Console.WriteLine($"Showroom '{roomName}' successfully updated to '{newRoomName}' with capacity {newCarCapacity}.");
    }
    
    public void DeleteRoom(string roomName)
    {
        
        var json = File.ReadAllText("./Data/showrooms.json");
    
        if (json.Length > 0)
        {
            Showrooms = JsonSerializer.Deserialize<List<Showroom>>(json);
        }
    
        var srToDelete = Showrooms.FirstOrDefault(x => x.Name == roomName);

        if (srToDelete == null)
        {
            throw new Exception("Room not found.");
        }
        
        Showrooms.Remove(srToDelete);
        
        var jsonString = JsonSerializer.Serialize(Showrooms);
        File.WriteAllText("./Data/showrooms.json", jsonString);
        
        Console.WriteLine($"Showroom '{roomName}' successfully deleted.");
    }
}