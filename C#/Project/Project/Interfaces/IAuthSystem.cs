using Project.Data.DTO.Users;
using Project.Data.Model;

namespace Project.Interfaces;

public interface IAuthSystem
{
    public void Register(LoginRegisterDTO registerDTO);
    
    public User Login(LoginRegisterDTO loginDTO);
}