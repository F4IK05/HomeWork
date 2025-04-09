using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace WeatherApp.Services;

internal class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly ConfigurationBuilder _configurationBuilder;
    private readonly string _apiKey;

    public WeatherService()
    {
        _httpClient = new HttpClient();
        _configurationBuilder = new ConfigurationBuilder();
        _configurationBuilder.AddJsonFile("appsettings.json");

        var config = _configurationBuilder.Build();

        _apiKey = config.GetSection("Weather:Key").Value;
    }

    public string GetWeatherByCity(string city)
    {
        var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric"),
            Headers =
            {
                { "Accept", "application/json" },
                { "Authorization", _apiKey}
            },
        };

        var response = _httpClient.Send(request);

        if (response.IsSuccessStatusCode)
        {
            var stream = response.Content.ReadAsStream();

            using var reader = new StreamReader(stream);

            return reader.ReadToEnd();
        }

        throw new Exception("Error fetching weather data");
    }
}
