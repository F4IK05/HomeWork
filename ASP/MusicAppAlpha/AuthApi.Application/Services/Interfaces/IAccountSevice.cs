using AuthApi.Contracts.DTOs.Requests.Account;
using AuthApi.Contracts.DTOs.Requests.AccountDTOs;
using AuthApi.Contracts.DTOs.Response;

namespace AuthApi.Application.Services.Interfaces;

public interface IAccountService
{
    Task<Result> ChangePasswordAsync(string userId, ChangePasswordRequestDto request);
    Task<bool> HasPasswordAsync(string userId);

    // Task<Result> ChangeEmailAsync(string userId, ChangeEmailRequestDto request);
}