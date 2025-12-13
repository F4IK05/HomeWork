using Microsoft.AspNetCore.Mvc;
using MusicApi.Application.Services;
using MusicApi.Contracts.DTOs.Requests;

namespace MusicApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController : ControllerBase
{
    private readonly AlbumService _albumService;

    public AlbumsController(AlbumService albumService)
    {
        _albumService = albumService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CreateAlbumRequestDto request)
    {
        await _albumService.CreateAsync(request);
        return Ok("Album created successfully");
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _albumService.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var album = await _albumService.GetByIdWithSongsAsync(id);
        if (album == null) return NotFound();
        return Ok(album);
    }
    
    
    
    
}