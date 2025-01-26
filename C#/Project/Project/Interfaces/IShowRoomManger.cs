using Project.Classes;
using Project.Data.DTO.Users;

namespace Project.Interfaces;

public interface IShowRoomManger
{
    public Showroom FindRoom(string roomName); // для добавления машин

    public void Login(LoginRegisterDTO loginDTO);
    
    public void CreateShowRoom(string roomName, int carCapacity);
    
    public void EditRoom(string roomName, string newRoomName, int newCarCapacity);
    
    public void DeleteRoom(string roomName);
}