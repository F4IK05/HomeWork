namespace MusicApi.Data.Models;

public class Album
{
    public Guid Id { get; set; }
    public string AlbumName { get; set; } = string.Empty;
    public string? CoverUrl { get; set; }
    public Guid ArtistId { get; set; }
    public Artist Artist { get; set; } = null!;
    public List<Song> Songs { get; set; } = new();
}