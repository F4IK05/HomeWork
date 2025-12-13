namespace MusicApi.Contracts.DTOs.Response;

public class ArtistResponseDto
{
    public Guid Id { get; set; }
    public string ArtistName { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
}