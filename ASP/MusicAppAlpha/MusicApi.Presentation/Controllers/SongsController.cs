using Microsoft.AspNetCore.Mvc;
using MusicApi.Application.Services;
using MusicApi.Contracts.DTOs.Requests;

namespace MusicApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SongsController : ControllerBase
{
    private readonly MusicService _musicService;
    
    public SongsController(MusicService musicService)
    {
        _musicService = musicService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _musicService.GetAllAsync());
    
    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] UploadSongRequestDto dto)
    {
        await _musicService.UploadSongAsync(dto);
        return Ok("Song uploaded successfully");
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _musicService.DeleteSongAsync(id);
        if (!success) return NotFound(new { message = "Song not found" });
        return Ok(new { message = "Song deleted successfully" });
    }
}