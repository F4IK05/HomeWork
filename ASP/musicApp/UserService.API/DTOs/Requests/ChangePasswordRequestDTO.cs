namespace UserService.API.DTOs.Requests;

public record ChangePasswordRequestDTO(string CurrentPassword, string NewPassword);