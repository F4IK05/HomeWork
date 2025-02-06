using System.Text.Json;
using Lesson11.Data.Model;
using Lesson11.Interfaces;

namespace Lesson11.Implementations;

public class FileService : IFileService
{
    public List<Results> Results { get; set; } = new();
    
    public void Save(Results results)
    {
        
        var json = File.ReadAllText("./Data/SearchResult.json");

        if (json.Length > 0) Results = JsonSerializer.Deserialize<List<Results>>(json);
        
        Results.Add(new Results()
        {
            title = results.title,
            release_date = results.release_date
        });
        
        // Я не знал как можно еще это сделать, ибо
        var finalResults = Results.Select(r => new{r.title, r.release_date}).ToList();
        
        var jsonString = JsonSerializer.Serialize(finalResults);
        
        File.WriteAllText("./Data/SearchResult.json", jsonString);

    }

    public void DeleteMovie(string movieName)
    {
        var json = File.ReadAllText("./Data/SearchResult.json");

        if (json.Length > 0)
        {
            Results = JsonSerializer.Deserialize<List<Results>>(json);
        }

        var movieToDelete = Results.FirstOrDefault(r => r.title == movieName);
        
        if (movieToDelete != null) Results.Remove(movieToDelete);
        
        var finalResults = Results.Select(r => new{r.title, r.release_date}).ToList();
        
        var jsonString = JsonSerializer.Serialize(finalResults);
        
        File.WriteAllText("./Data/SearchResult.json", jsonString);
        

        Console.WriteLine("Movie deleted");
    }
}