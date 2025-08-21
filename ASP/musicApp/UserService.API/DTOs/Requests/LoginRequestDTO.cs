namespace UserService.API.DTOs.Requests;

// Identifier это UserName или Email
public record LoginRequestDTO(string Identifier, string Password);

