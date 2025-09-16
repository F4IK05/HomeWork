namespace AuthApi.Contracts.DTOs.Requests;

public record UpsertRoleRequestDto(string Name, string? Id = null);