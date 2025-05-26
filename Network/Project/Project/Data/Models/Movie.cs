namespace Project.Models;

public class Movie
{
    public int Id { get; set; }
    
    public string Title { get; set; }
    public string Year { get; set; }
    
    public ICollection<Favorite> Favorites { get; set; }
}

public class SearchResult
{
    public List<Movie> Search { get; set; }
}