namespace MusicApi.Contracts.DTOs.Requests;
using Microsoft.AspNetCore.Http;

public class UploadSongRequestDto
{
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public string Album { get; set; } = string.Empty;
    public IFormFile AudioFile { get; set; } = null!;
    public IFormFile? CoverFile { get; set; }
}