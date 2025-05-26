using Project.Classes;
using Project.Data;
using Project.Models;

namespace Project.Services;

public class FavoriteService
{
    public void AddMovieToFavorites(int userId, Movie movie)
    {
        using var context = new MovieFavContext();
        
        var movieInDB = context.Movies.FirstOrDefault(m => m.Title == movie.Title && m.Year == movie.Year);

        if (movieInDB == null)
        {
            movieInDB = new Movie()
            {
                Title = movie.Title,
                Year = movie.Year,
            };
            
            context.Movies.Add(movieInDB);
            context.SaveChanges();
        }

        if (!context.Favorites.Any(f => f.UserId == userId && f.MovieId == movieInDB.Id))
        {
            var favorite = new Favorite()
            {
                UserId = userId,
                MovieId = movieInDB.Id
            };
            
            context.Favorites.Add(favorite);
            context.SaveChanges();
        }
        else
        {
            Console.WriteLine($"This movie is already in your favorites!");
        }
    }

    public List<Movie> GetFavoritesByUserId(int userId)
    {
        using var context = new MovieFavContext();
        
        var favorites = context.Favorites.Where(f => f.UserId == userId)
            .Select(f => f.Movie).ToList();

        return favorites;
    }
   
}