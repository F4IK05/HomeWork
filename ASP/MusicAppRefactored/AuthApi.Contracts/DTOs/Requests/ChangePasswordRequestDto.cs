namespace AuthApi.Contracts.DTOs.Requests;


public record ChangePasswordRequestDto(string CurrentPassword, string NewPassword);