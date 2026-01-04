namespace Contracts.DTOs;

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    string UserId,
    string Email,
    string Username
);