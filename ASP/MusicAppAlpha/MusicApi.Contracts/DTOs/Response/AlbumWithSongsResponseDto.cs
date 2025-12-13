namespace MusicApi.Contracts.DTOs.Response;

public class AlbumWithSongsResponseDto
{
    public Guid Id { get; set; }
    
    public string AlbumName { get; set; } = string.Empty;
    
    public Guid ArtistId { get; set; }
    public string ArtistName { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }
    
    public List<SongResponseDto> Songs { get; set; } = new();
}