import React, { useState } from "react";
import SearchBar from "../UI/SearchBar";

// Dummy weather data generator
const getWeatherDataForCity = (city) => ({
  location: city,
  current: {
    temp: Math.floor(Math.random() * 15) + 15,
    feels_like: Math.floor(Math.random() * 15) + 14,
    description: "Partly cloudy",
    icon: "☁️",
  },
  hourly: Array.from({ length: 6 }, (_, i) => ({
    time: `${i + 1} AM`,
    temp: Math.floor(Math.random() * 15) + 15,
    icon: ["☀️", "☁️", "🌧️", "🌙", "🌤️"][Math.floor(Math.random() * 5)]
  })),
  forecast: Array.from({ length: 5 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri"][i],
    temp: Math.floor(Math.random() * 15) + 15,
    description: ["Sunny", "Rainy", "Cloudy", "Windy", "Snowy"][Math.floor(Math.random() * 5)],
    icon: ["☀️", "🌧️", "☁️", "💨", "❄️"][Math.floor(Math.random() * 5)]
  })),
  metrics: {
    aqi: Math.floor(Math.random() * 150),
    uv_index: Math.floor(Math.random() * 11),
    humidity: Math.floor(Math.random() * 100),
    visibility: Math.floor(Math.random() * 20),
  }
});

// Color coding for metrics
// Color coding for metrics
const getAQIColor = (aqi) => {
  if (aqi <= 50) return "bg-green-400 text-slate-950 dark:bg-white dark:text-green-200 border-green-200/50";
  if (aqi <= 100) return "bg-yellow-400 text-slate-950 dark:bg-white dark:text-yellow-200 border-yellow-200/50";
  if (aqi <= 150) return "bg-orange-400 text-slate-950 dark:bg-white dark:text-orange-200 border-orange-200/50";
  return "bg-red-400 text-slate-950 dark:bg-white dark:text-red-200 border-red-200/50";
};

const getUVColor = (uv) => {
  if (uv <= 2) return "bg-green-400 text-slate-950 dark:bg-white dark:text-green-200 border-green-200/50";
  if (uv <= 5) return "bg-yellow-400 text-slate-950 dark:bg-white dark:text-yellow-200 border-yellow-200/50";
  if (uv <= 7) return "bg-orange-400 text-slate-950 dark:bg-white dark:text-orange-200 border-orange-200/50";
  return "bg-red-400 text-slate-950 dark:bg-white dark:text-red-200 border-red-200/50";
};

// Hourly mini-card (timeline style)
const HourlyCard = ({ hour }) => (
  <div className="bg-slate-800 dark:bg-white shadow-sm rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] flex-shrink-0 hover:shadow-lg transition-transform duration-200 hover:-translate-y-1">
    <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">{hour.time}</div>
    <div className="text-2xl mt-1">{hour.icon}</div>
    <div className="font-bold mt-1 text-black dark:text-black text-stroke">{hour.temp}°C</div>
  </div>
);

// Metric card
const MetricCard = ({ label, value, colorClass }) => (
  <div className={`rounded-lg shadow-md p-4 flex flex-col w-full items-center justify-center border ${colorClass || "bg-white text-slate-950 border-transparent"} hover:shadow-lg transition-all duration-200 min-w-[110px]`}>
    <div className="font-semibold text-sm uppercase tracking-wider">{label}</div>
    <div className="text-xl font-bold mt-1 text-stroke">{value}</div>
  </div>
);

const Weather = () => {
  const [city, setCity] = useState("San Francisco, CA");
  const [weatherData, setWeatherData] = useState(getWeatherDataForCity(city));
  const [lastCities, setLastCities] = useState([]);

  const { current, hourly, forecast, metrics } = weatherData;

  // Handle selecting a city
  const handleCitySelect = (selectedCity) => {
    const newWeather = getWeatherDataForCity(selectedCity);
    setCity(selectedCity);
    setWeatherData(newWeather);
    setLastCities((prev) => [selectedCity, ...prev.filter(c => c !== selectedCity)].slice(0, 5));
  };

  // Options for SearchBar: current city + recent searches
  const searchOptions = [
    { label: city, value: city },
    ...lastCities.filter(c => c !== city).map(c => ({ label: c, value: c }))
  ];

  return (
    <div className="h-full bg-slate-50 flex justify-center items-stretch p-4">
      <div className="w-full max-w-screen-xl flex flex-col gap-6 h-full">

        {/* Top bar: city on left, search on right */}
        <div className="flex-none flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800 flex-1 text-stroke">{city}</div>
          <div className="w-96">
            <SearchBar
              options={searchOptions}
              placeholder="Search city..."
              onSelect={handleCitySelect}
            />
          </div>
        </div>

        {/* Split layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

          {/* Left: Current weather + hourly inside same card */}
          <div className="flex-1 flex flex-col gap-6">
            <div
              className="flex-1 bg-white rounded-xl shadow-lg p-6 w-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-200 min-h-0 relative overflow-hidden"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay for contrast */}
              <div className="absolute inset-0 bg-white/40 dark:bg-white/60 z-0"></div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Current weather */}
                <div className="flex items-center justify-between mb-4 text-white dark:text-black">
                  <div>
                    <div className="text-4xl font-bold text-stroke">{current.temp}°C</div>
                    <div className="text-green-200 dark:text-green-800 capitalize font-semibold text-stroke">{current.description}</div>
                    <div className="text-gray-200 dark:text-gray-800 mt-1 text-sm font-medium text-stroke">Feels like: {current.feels_like}°C</div>
                  </div>
                  <div className="text-6xl">{current.icon}</div>
                </div>

                {/* Hourly forecast inside current weather card */}
                <div className="flex overflow-x-auto gap-3 mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 snap-x snap-mandatory">
                  {hourly.map((hour, idx) => (
                    <div className="snap-start" key={idx}>
                      <HourlyCard hour={hour} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right: Weekly forecast + metrics */}
          <div className="flex-1 flex flex-col gap-3">

            {/* Weekly forecast */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-4 overflow-y-auto hover:shadow-lg transition-shadow duration-200">
              <table className="w-full h-full text-left border-collapse">
                <tbody>
                  {forecast.map((day) => (
                    <tr key={day.day} className="hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                      <td className="py-3 px-2 font-semibold text-green-700 dark:text-green-400 w-1/3 text-stroke">{day.day}</td>
                      <td className="py-3 px-2 text-2xl w-1/3 text-center text-stroke">{day.icon}</td>
                      <td className="py-3 px-2 font-bold text-slate-950 dark:text-black text-right w-1/3 text-stroke">{day.temp}°C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Metrics in a single row */}
            <div className="flex-none flex gap-4 overflow-x-auto">
              <MetricCard label="AQI" value={metrics.aqi} colorClass={getAQIColor(metrics.aqi)} />
              <MetricCard label="UV Index" value={metrics.uv_index} colorClass={getUVColor(metrics.uv_index)} />
              <MetricCard label="Humidity" value={`${metrics.humidity}%`} />
              <MetricCard label="Visibility" value={`${metrics.visibility} km`} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Weather;
