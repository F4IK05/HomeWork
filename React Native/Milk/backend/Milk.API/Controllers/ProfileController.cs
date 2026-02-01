using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milk.API.DTOs.Request.Profile;
using Milk.API.DTOs.Response.Auth;
using Milk.API.DTOs.Response.Profile;
using Milk.API.Services.Interfaces.Profile;

namespace Milk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet("me")]
    public async Task<ActionResult<ProfileResponseDto>> GetMe()
    {
        var me = await _profileService.GetMyProfileAsync(User);
        
        return Ok(me);
    }

    [HttpPut("update-profile")]
    public async Task<ActionResult<ProfileResponseDto>> UpdateProfile(UpdateProfileRequestDto request)
    {
        var res = await _profileService.UpdateProfileAsync(User, request);
        
        return Ok(res);
    }

    [HttpPut("update-avatar")]
    public async Task<ActionResult<ProfileResponseDto>> UpdateAvatar(UpdateAvatarRequestDto request)
    {
        var res = await _profileService.UpdateAvatarAsync(User, request);
        
        return Ok(res);
    }

    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequestDto request)
    {
        var res = await _profileService.ChangePasswordAsync(User, request);
        
        return Ok(new { message = "Password changed" });
    }
}