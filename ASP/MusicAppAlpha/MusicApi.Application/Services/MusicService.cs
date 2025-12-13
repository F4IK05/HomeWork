using MusicApi.Contracts.DTOs.Requests;
using MusicApi.Contracts.DTOs.Response;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Repositories.Services.Classes;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Application.Services;

public class MusicService
{
    private readonly ISongRepository _songRepository;
    private readonly IAlbumRepository _albumRepository;
    private readonly S3Service _s3Service;

    public MusicService(ISongRepository songRepository, S3Service s3Service, IAlbumRepository albumRepository)
    {
        _songRepository = songRepository;
        _s3Service = s3Service;
        _albumRepository = albumRepository;
    }

    public async Task<IEnumerable<SongResponseDto>> GetAllAsync()
    {
        var songs = await _songRepository.GetAllAsync();
        var list = songs.Select(s => new SongResponseDto
        {
            Id = s.Id,
            Title = s.Title,
            ArtistId = s.ArtistId,
            ArtistName = s.Artist?.ArtistName,
            AlbumId = s.AlbumId,
            AlbumName = s.Album != null ? s.Album.AlbumName : null,
            FileUrl = s.FileUrl,
            CoverUrl = s.CoverUrl
        }).ToList();
        
        return list;
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
            ArtistId = request.ArtistId,
            AlbumId = request.AlbumId,
            FileUrl = audioUrl,
            CoverUrl = coverUrl
        };

        await _songRepository.AddAsync(song);
    }

    public async Task<bool> AssignSongToAlbumAsync(Guid songId, Guid albumId)
    {
        var song = await _songRepository.GetByIdAsync(songId);
        if (song == null) return false;
        
        var album = await _albumRepository.GetByIdAsync(albumId);
        if (album == null) return false;

        if (song.ArtistId != album.ArtistId)
        {
            throw new InvalidOperationException("Song and album belong to different artist");            
        }

        song.AlbumId = album.Id;

        await _songRepository.UpdateAsync(song);
        
        return true;
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