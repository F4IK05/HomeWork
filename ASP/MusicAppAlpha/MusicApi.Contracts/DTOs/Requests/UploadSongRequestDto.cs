namespace MusicApi.Contracts.DTOs.Requests;
using Microsoft.AspNetCore.Http;

public class UploadSongRequestDto
{
    public string Title { get; set; } = string.Empty;
    
    public Guid ArtistId { get; set; }
    public Guid? AlbumId { get; set; }
    public IFormFile AudioFile { get; set; } = null!;
    public IFormFile? CoverFile { get; set; }
}