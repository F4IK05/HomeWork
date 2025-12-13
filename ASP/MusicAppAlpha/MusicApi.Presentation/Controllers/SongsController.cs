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
    public async Task<IActionResult> Upload([FromForm] UploadSongRequestDto request)
    {
        await _musicService.UploadSongAsync(request);
        return Ok("Song uploaded successfully");
    }

    [HttpPost("{songId:guid}/album/{albumId:guid}")]
    public async Task<IActionResult> AssignToAlbum(Guid songId, Guid albumId)
    {
        try
        {
            var success = await _musicService.AssignSongToAlbumAsync(songId, albumId);
            if (!success) return NotFound(new { message = "Song or album not found" });
            
            return Ok("Song assigned successfully");
        }
        catch (InvalidOperationException  e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _musicService.DeleteSongAsync(id);
        if (!success) return NotFound(new { message = "Song not found" });
        return Ok(new { message = "Song deleted successfully" });
    }
}