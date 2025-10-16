namespace MusicApi.Data.Models;

public class Album
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public List<Song> Songs { get; set; } = new();
}