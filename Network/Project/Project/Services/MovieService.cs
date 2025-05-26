using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Project.Models;

namespace Project.Services;

public class MovieService
{
    private readonly HttpClient _httpClient;
    private readonly ConfigurationBuilder _configBuilder;
    private readonly string _apiKey;

    public MovieService()
    {
        _httpClient = new HttpClient();
        _configBuilder = new ConfigurationBuilder();
        _configBuilder.AddJsonFile("appsettings.json");
        var configuration = _configBuilder.Build();
        
        _apiKey = configuration.GetSection("Omdb:apiKey").Value;
    }
    
    public List<Movie> GetMovie(string title)
    {
        var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"http://www.omdbapi.com/?s={title}&apikey={_apiKey}")
        };
        
        var response = _httpClient.Send(request);

        if (response.IsSuccessStatusCode)
        {
            var json = response.Content.ReadAsStringAsync().Result; // получает ответ от API как стороку JSON
            var movie = JsonConvert.DeserializeObject<SearchResult>(json); // Десериализует JSON в объект класса Movie
            return movie.Search;
        }

        throw new Exception("Error while getting movie.");
    }

    
}
