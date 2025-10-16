namespace MusicApi.Contracts.DTOs.Response;

public class SongResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string Album { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }  
}