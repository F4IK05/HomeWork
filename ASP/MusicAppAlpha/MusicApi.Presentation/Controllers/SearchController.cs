using Microsoft.AspNetCore.Mvc;
using MusicApi.Application.Services;
using MusicApi.Contracts.DTOs.Response.Search;

namespace MusicApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly SearchService _searchService;

    public SearchController(SearchService searchService)
    {
        _searchService = searchService;
    }
    
    [HttpGet]
    public async Task<ActionResult<SearchResponseDto>> Get([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken cancellationToken = default) 
        => Ok(await _searchService.SearchAsync(query, page, pageSize, cancellationToken));
     
}