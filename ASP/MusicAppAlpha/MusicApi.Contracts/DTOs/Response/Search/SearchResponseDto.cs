namespace MusicApi.Contracts.DTOs.Response.Search;

public record SearchResponseDto(
    int Page,
    int PageSize,
    int TotalCount,
    IReadOnlyList<SearchResultItemDto> Items // список эл-тов которые доступны только для чтения
);