namespace UserService.API.DTOs.Requests;

public record UpsertRoleRequestDTO(string Name, string? Id = null);