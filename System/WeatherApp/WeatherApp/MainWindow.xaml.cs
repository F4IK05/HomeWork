using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using WeatherApp.Models;
using WeatherApp.Services;

namespace WeatherApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly WeatherService _weatherService = new();
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var city = SearchBox.Text;


            Thread th1 = new(() =>
            {
                try
                {
                    var res = _weatherService.GetWeatherByCity(city);

                    var searchResult = JsonSerializer.Deserialize<WeatherSearchResult>(res);

                    if (searchResult != null)
                    {

                        Dispatcher.Invoke(() =>
                        {
                            WeatherListResult.Items.Clear();

                            WeatherListResult.Items.Add($"Страна: {searchResult.sys.country} Город: {city}");
                            WeatherListResult.Items.Add($"🌡 Температура: {searchResult.main.temp} °C");
                            WeatherListResult.Items.Add($"🤒 Ощущается как: {searchResult.main.feels_like} °C");
                            WeatherListResult.Items.Add($"📉 Мин: {searchResult.main.temp_min} °C");
                            WeatherListResult.Items.Add($"📈 Макс: {searchResult.main.temp_max} °C");
                            WeatherListResult.Items.Add($"💧 Влажность: {searchResult.main.humidity}%");
                            WeatherListResult.Items.Add($"💨 Ветер: {searchResult.wind.speed} м/с");

                            if (searchResult.weather != null && searchResult.weather.Length > 0)
                            {
                                WeatherListResult.Items.Add($"☁️ Состояние: {searchResult.weather[0].main}");
                                WeatherListResult.Items.Add($"🔎 Описание: {searchResult.weather[0].description}");
                            }
                        });
                    }
                }
                catch (Exception ex)
                {
                    Dispatcher.Invoke(() =>
                    {
                        MessageBox.Show("Не удалось получить данные о погоде. Проверьте правильность ввода города.");
                    });
                }
            });

            th1.Start();
        }
    }
}