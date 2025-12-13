namespace MusicApi.Data.Models;

public class Playlist
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public Guid OwnerId { get; set; }
    public string? OwnerName { get; set; }
    
    public List<PlaylistSong> Songs { get; set; } = new();
}