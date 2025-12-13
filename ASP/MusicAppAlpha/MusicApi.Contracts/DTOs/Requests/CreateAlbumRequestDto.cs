using Microsoft.AspNetCore.Http;

namespace MusicApi.Contracts.DTOs.Requests;

public class CreateAlbumRequestDto
{
    public string AlbumName { get; set; } = string.Empty;
    
    public Guid ArtistId { get; set; }
    
    public IFormFile? CoverUrl { get; set; }
}