using MusicApi.Contracts.DTOs.Requests;
using MusicApi.Contracts.DTOs.Response;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Repositories.Services.Classes;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Application.Services;

public class ArtistService
{
    private readonly IArtistRepository _artistRepository;
    private readonly S3Service _s3Service;

    public ArtistService(IArtistRepository artistRepository, S3Service s3Service)
    {
        _artistRepository = artistRepository;
        _s3Service = s3Service;
    }

    public async Task<ArtistResponseDto> CreateAsync(CreateArtistRequestDto request)
    {
        var existing = await _artistRepository.GetByNameAsync(request.ArtistName);

        if (existing != null)
        {
            throw new InvalidOperationException("ArtistName already exists");
        }
        
        string? photoUrl = null;

        if (request.PhotoFile != null)
        {
            photoUrl = await _s3Service.UploadFileAsync(request.PhotoFile, "artists");
        }

        var artist = new Artist
        {
            Id = Guid.NewGuid(),
            ArtistName = request.ArtistName,
            PhotoUrl = photoUrl
        };
        
        await _artistRepository.AddAsync(artist);

        return new ArtistResponseDto
        {
            Id = artist.Id,
            ArtistName = artist.ArtistName,
            PhotoUrl = photoUrl

        };
    }

    public async Task<List<ArtistResponseDto>> GetAllAsync()
    {
        var artists = await _artistRepository.GetAllAsync();

        return artists.Select(a => new ArtistResponseDto
        {
            Id = a.Id,
            ArtistName = a.ArtistName,
            PhotoUrl = a.PhotoUrl
        }).ToList();
    }

    public async Task<ArtistResponseDto> GetByIdAsync(Guid id)
    {
        var artist = await _artistRepository.GetByIdAsync(id);
        
        if (artist == null) return null;

        return new ArtistResponseDto
        {
            Id = artist.Id,
            ArtistName = artist.ArtistName,
            PhotoUrl = artist.PhotoUrl
        };
    }
}