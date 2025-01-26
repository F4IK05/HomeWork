using System.Text.RegularExpressions;
using Project.Data.DTO.Users;

namespace Project.Classes;

public static class ValidateSystem
{
    private static Regex loginRegex = new Regex(@"^[A-Z][a-z]{1,19} [A-Z][a-z]{1,19}$");
    private static Regex passwordRegex = new Regex(@"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!?]{8,}$");
    //private static Regex roomNameRegex = new Regex();
    public static bool ValidateCredentials(LoginRegisterDTO loginDto)
    {
        return loginRegex.IsMatch(loginDto.Username) && passwordRegex.IsMatch(loginDto.Password);
    }
}