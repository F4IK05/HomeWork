﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WeatherApp.Models.WeatherInfo;
using static WeatherApp.Models.WeatherSearchResult;

namespace WeatherApp.Models;

internal class WeatherInfo
{
    public class coord
    {
        public double lon { get; set; }
        public double lat { get; set; }
    }

    public class weather
    {
        public string main { get; set; }
        public string description { get; set; }
        public string icon { get; set; }
    }

    public class main
    {
        public double temp { get; set; }
        public double feels_like { get; set; }
        public double temp_min { get; set; }
        public double temp_max { get; set; }
        public int pressure { get; set; }
        public int humidity { get; set; }
    }

    public class wind
    {
        public double speed { get; set; }
    }

    public class sys
    {
       public int type { get; set; }
       public int id { get; set; }
       public string country { get; set; }
       public int sunrise { get; set; }
       public int sunset { get; set; }
    }

    
}
