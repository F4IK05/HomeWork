using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WeatherApp.Models.WeatherInfo;

namespace WeatherApp.Models;

internal class WeatherSearchResult
{
    public coord coord { get; set; }
    public weather[] weather { get; set; }
    public main main { get; set; }
    public wind wind { get; set; }
    public sys sys { get; set; }

}
