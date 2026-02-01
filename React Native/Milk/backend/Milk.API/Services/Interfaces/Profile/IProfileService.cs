using System.Security.Claims;
using Milk.API.DTOs.Request.Profile;
using Milk.API.DTOs.Response.Profile;

namespace Milk.API.Services.Interfaces.Profile;

public interface IProfileService
{
    Task<ProfileResponseDto?> GetMyProfileAsync(ClaimsPrincipal user);
    Task<ProfileResponseDto?> UpdateProfileAsync(ClaimsPrincipal user, UpdateProfileRequestDto request);
    Task<ProfileResponseDto?> UpdateAvatarAsync(ClaimsPrincipal user, UpdateAvatarRequestDto request);
    Task<bool> ChangePasswordAsync(ClaimsPrincipal user, ChangePasswordRequestDto request);
}