namespace MusicApi.Contracts.DTOs.Response;

public class SongResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    
    public Guid ArtistId { get; set; }
    public string ArtistName { get; set; } = string.Empty;
    
    public Guid? AlbumId { get; set; }
    public string? AlbumName { get; set; }
    public string FileUrl { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }  
}