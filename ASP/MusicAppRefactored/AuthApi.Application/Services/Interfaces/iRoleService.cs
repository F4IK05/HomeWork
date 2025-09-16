using AuthApi.Contracts.DTOs.Requests;
using AuthApi.Contracts.DTOs.Response;

namespace AuthApi.Application.Services.Interfaces;

public interface IRoleService
{
    public Task<PaginatedResult<object>> GetAllRolesAsync(int page, int pageSize);
    
    public Task<TypedResult<object>> GetRoleByIdAsync(string id);
    
    public Task<Result> UpsertRoleAsync(UpsertRoleRequestDto request);
    
    public Task<Result> RemoveRoleAsync(string id);
}