    using Microsoft.EntityFrameworkCore;
    using MusicApi.Contracts.DTOs.Response.Search;
    using MusicApi.Infrastructure.Contexts;

    namespace MusicApi.Application.Services;

    public class SearchService
    {
        private readonly MusicDbContext _context;

        public SearchService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task<SearchResponseDto> SearchAsync(string query, int page = 1, int pageSize = 20, CancellationToken ct = default)
        {
            query = (query ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(query))
                return new SearchResponseDto(page, pageSize, 0, Array.Empty<SearchResultItemDto>());
            
            // Гарантия того что страница всегда будет минимум 1
            // еслм в запросе будет page=0, то будет браться минимум 1
            page = Math.Max(1, page);
            
            // Ограничение кол-ва эл-тов на странице
            // если в запросе будет pageSize=9999, то будет максимум 50
            pageSize = Math.Clamp(pageSize, 1, 50);
            
            // Переводит поисковую строку в нижний регистр
            var q = query.ToLowerInvariant();

            var pattern = $"%{q}%";

            // Поиск по песням, AsNoTracking ускоряет работу посколько нету трекинга
            var songsQ = _context.Songs.AsNoTracking()
                .Where(s =>
                    EF.Functions.Like(s.Title.ToLower(), pattern) ||
                    EF.Functions.Like(s.Artist.ArtistName.ToLower(), pattern) ||
                    (s.Album != null && EF.Functions.Like(s.Album.AlbumName.ToLower(), pattern)))
                .Select(s => new SearchResultItemDto("song", s.Id.ToString(), s.Title, s.Artist.ArtistName, s.CoverUrl))
                .Take(200);
            
            // Поиск по артистам
            var artistsQ = _context.Artists.AsNoTracking()
                .Where(a => EF.Functions.Like(a.ArtistName.ToLower(), pattern))
                .Select(a => new SearchResultItemDto("artist", a.Id.ToString(), a.ArtistName, null, a.PhotoUrl))
                .Take(100);

            // Поиск по альбомам
            var albumsQ = _context.Albums.AsNoTracking()
                .Where(al => EF.Functions.Like(al.AlbumName.ToLower(), pattern) ||
                             EF.Functions.Like(al.Artist.ArtistName.ToLower(), pattern))
                .Select(al => new SearchResultItemDto("album", al.Id.ToString(), al.AlbumName, al.Artist.ArtistName, al.CoverUrl))
                .Take(150);

            // Поиск по плейлистам
            var playlistsQ = _context.Playlists.AsNoTracking()
                .Where(p => EF.Functions.Like(p.Title.ToLower(), pattern))
                .Select(p => new SearchResultItemDto("playlist", p.Id.ToString(), p.Title, p.OwnerName, p.CoverUrl))
                .Take(100);

            // Каждый запрос ждёт завершения предыдущего
            var songs     = await songsQ.ToListAsync(ct);
            var artists   = await artistsQ.ToListAsync(ct);
            var albums    = await albumsQ.ToListAsync(ct);
            var playlists = await playlistsQ.ToListAsync(ct);

            // те 4 списка в один List 
            var all = songs.Concat(artists).Concat(albums).Concat(playlists).ToList();

            var ordered = all
                .OrderByDescending(i => string.Equals(i.Title, query, StringComparison.OrdinalIgnoreCase)) // точное совпадение
                .ThenByDescending(i => i.Title.StartsWith(query, StringComparison.OrdinalIgnoreCase)) // начинается с запроса
                .ThenByDescending(i => i.Title.Contains(query, StringComparison.OrdinalIgnoreCase)) // содержит запрос
                .ThenBy(i => i.Title)
                .ToList();

            var total = ordered.Count;
            var pageItems = ordered.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return new SearchResponseDto(page, pageSize, total, pageItems);
        }

    }

