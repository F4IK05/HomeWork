namespace MusicApi.Data.Models;

public class Artist
{
    public Guid Id { get; set; }
    public string ArtistName { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
    
    public List<Song> Songs { get; set; } = new();
    public List<Album> Albums { get; set; } = new();
}