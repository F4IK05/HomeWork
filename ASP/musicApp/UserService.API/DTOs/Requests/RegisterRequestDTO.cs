namespace UserService.API.DTOs.Requests;

public record RegisterRequestDTO(string Email, string UserName, string Password, string ConfirmPassword);