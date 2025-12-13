using Microsoft.AspNetCore.Http;

namespace MusicApi.Contracts.DTOs.Requests;

public class CreateArtistRequestDto
{
    public string ArtistName { get; set; } = string.Empty;
    public IFormFile? PhotoFile { get; set; }
}