namespace MusicApi.Contracts.DTOs.Response.Search;

public record SearchResultItemDto(
    string Type, // "song" | "artist" | "album" | "playlist"
    string Id,
    string Title,
    string? Subtitle, // ArtistName / AlbumTitle
    string? CoverUrl
);