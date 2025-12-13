namespace MusicApi.Data.Models;

public class Song
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public string CoverUrl { get; set; } = string.Empty;
    public DateTime UploadedAt  { get; set; } = DateTime.UtcNow;
    
    public Guid ArtistId { get; set; }
    public Artist? Artist { get; set; }
    
    public Guid? AlbumId { get; set; }
    public Album? Album { get; set; }
}