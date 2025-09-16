namespace AuthApi.Contracts.DTOs.Requests;

// Identifier это UserName или Email
public record LoginRequestDto(string Identifier, string Password);