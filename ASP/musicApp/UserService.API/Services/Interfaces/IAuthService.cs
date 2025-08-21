﻿using UserService.API.DTOs.GoogleAuthDTOs;
using UserService.API.DTOs.Requests;
using UserService.API.DTOs.Response;

namespace UserService.API.Services.Interfaces;

public interface IAuthService
{
    public Task<TypedResult<object>> LoginAsync(LoginRequestDTO request);
    Task<string> LoginGoogleAsync(GoogleUserInfo userInfo);
}