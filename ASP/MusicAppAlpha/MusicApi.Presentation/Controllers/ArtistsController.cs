using Microsoft.AspNetCore.Mvc;
using MusicApi.Application.Services;
using MusicApi.Contracts.DTOs.Requests;

namespace MusicApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArtistsController : ControllerBase
{
    
    private readonly ArtistService _artistService;

    public ArtistsController(ArtistService artistService)
    {
        _artistService = artistService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CreateArtistRequestDto request)
    {
        var artist = await _artistService.CreateAsync(request);
        
        return Ok(artist);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var artists = await _artistService.GetAllAsync();
        
        return Ok(artists);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var artist = await _artistService.GetByIdAsync(id);
        if (artist == null) return NotFound();
        return Ok(artist);
    }
}