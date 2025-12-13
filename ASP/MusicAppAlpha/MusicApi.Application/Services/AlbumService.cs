using MusicApi.Contracts.DTOs.Requests;
using MusicApi.Contracts.DTOs.Response;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Repositories.Services.Classes;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Application.Services;

public class AlbumService
{
    private readonly IAlbumRepository _albumRepository;
    private readonly S3Service _s3Service;

    public AlbumService(IAlbumRepository albumRepository, S3Service s3Service)
    {
        _albumRepository = albumRepository;
        _s3Service = s3Service;
    }

    public async Task<AlbumResponseDto> CreateAsync(CreateAlbumRequestDto request)
    {
        string? coverUrl = null;

        if (request.CoverUrl != null)
        {
            coverUrl = await _s3Service.UploadFileAsync(request.CoverUrl, "albums");
        }

        var album = new Album
        {
            Id = Guid.NewGuid(),
            AlbumName = request.AlbumName,
            ArtistId = request.ArtistId,
            CoverUrl = coverUrl,
        };
        
        await _albumRepository.AddAsync(album);
        
        var created = await _albumRepository.GetByIdAsync(album.Id);
        if (created == null)
        {
            throw new InvalidOperationException("Album not found");
        }

        return new AlbumResponseDto
        {
            Id = created.Id,
            AlbumName = created.AlbumName,
            ArtistId = created.ArtistId,
            ArtistName = created.Artist.ArtistName,
            CoverUrl = created.CoverUrl
        };
    }

    public async Task<List<AlbumResponseDto>> GetAllAsync()
    {
        var albums = await _albumRepository.GetAllAsync();

        return albums.Select(a => new AlbumResponseDto
        {
            Id = a.Id,
            AlbumName = a.AlbumName,
            ArtistId = a.ArtistId,
            ArtistName = a.Artist.ArtistName,
            CoverUrl = a.CoverUrl
        }).ToList();
    }

    public async Task<AlbumWithSongsResponseDto> GetByIdWithSongsAsync(Guid id)
    {
        var album = await _albumRepository.GetByIdAsync(id);
        if (album == null) return null;

        return new AlbumWithSongsResponseDto
        {
            Id = album.Id,
            AlbumName = album.AlbumName,
            ArtistId = album.ArtistId,
            ArtistName = album.Artist.ArtistName,
            CoverUrl = album.CoverUrl,

            Songs = album.Songs.Select(s => new SongResponseDto
            {
                Id = s.Id,
                Title = s.Title,

                ArtistId = s.ArtistId,
                ArtistName = s.Artist.ArtistName,

                AlbumId = s.AlbumId,
                AlbumName = album.AlbumName,

                FileUrl = s.FileUrl,
                CoverUrl = s.CoverUrl

            }).ToList()
        };
    }

}