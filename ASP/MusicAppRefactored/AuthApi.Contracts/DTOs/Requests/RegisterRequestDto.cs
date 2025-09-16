namespace AuthApi.Contracts.DTOs.Requests;

public record RegisterRequestDto(string Email, string UserName, string Password, string ConfirmPassword);