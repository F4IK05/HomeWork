namespace MusicApi.Data.Models;

public class Song
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string Album { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
}