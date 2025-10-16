using MusicApi.Contracts.DTOs.Requests;
using MusicApi.Contracts.DTOs.Response;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Repositories.Services.Classes;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Application.Services;

public class MusicService
{
    private readonly ISongRepository _songRepository;
    private readonly S3Service _s3Service;

    public MusicService(ISongRepository songRepository, S3Service s3Service)
    {
        _songRepository = songRepository;
        _s3Service = s3Service;
    }

    public async Task<IEnumerable<SongResponseDto>> GetAllAsync()
    {
        var songs = await _songRepository.GetAllAsync();
        return songs.Select(s => new SongResponseDto
        {
            Id = s.Id,
            Title = s.Title,
            Artist = s.Artist,
            Album = s.Album,
            Url = s.FileUrl,
            CoverUrl = s.CoverUrl
        });
    }

    public async Task UploadSongAsync(UploadSongRequestDto request)
    {
        // Загружаем MP3
        var audioUrl = await _s3Service.UploadFileAsync(request.AudioFile, "songs");

        // Загружаем обложку, если есть
        string? coverUrl = null;
        if (request.CoverFile != null)
        {
            coverUrl = await _s3Service.UploadFileAsync(request.CoverFile, "covers");
        }

        var song = new Song
        {
            Title = request.Title,
            Artist = request.Artist,
            Album = request.Album,
            FileUrl = audioUrl,
            CoverUrl = coverUrl
        };

        await _songRepository.AddAsync(song);
    }
    
    public async Task<bool> DeleteSongAsync(Guid id)
    {
        var song = await _songRepository.GetByIdAsync(id);
        if (song == null) return false;

        // Удаляем аудио и обложку из S3
        await _s3Service.DeleteFileAsync(song.FileUrl);
        if (!string.IsNullOrEmpty(song.CoverUrl))
            await _s3Service.DeleteFileAsync(song.CoverUrl);

        // Удаляем из базы
        await _songRepository.DeleteAsync(id);
        return true;
    }
}