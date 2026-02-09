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
    icon: ["☀️","☁️","🌧️","🌙","🌤️"][Math.floor(Math.random() * 5)]
  })),
  forecast: Array.from({ length: 5 }, (_, i) => ({
    day: ["Mon","Tue","Wed","Thu","Fri"][i],
    temp: Math.floor(Math.random() * 15) + 15,
    description: ["Sunny","Rainy","Cloudy","Windy","Snowy"][Math.floor(Math.random() * 5)],
    icon: ["☀️","🌧️","☁️","💨","❄️"][Math.floor(Math.random() * 5)]
  })),
  metrics: {
    aqi: Math.floor(Math.random() * 150),
    uv_index: Math.floor(Math.random() * 11),
    humidity: Math.floor(Math.random() * 100),
    visibility: Math.floor(Math.random() * 20),
  }
});

// Color coding for metrics
const getAQIColor = (aqi) => {
  if (aqi <= 50) return "bg-green-200 text-green-800";
  if (aqi <= 100) return "bg-yellow-200 text-yellow-800";
  if (aqi <= 150) return "bg-orange-200 text-orange-800";
  return "bg-red-200 text-red-800";
};

const getUVColor = (uv) => {
  if (uv <= 2) return "bg-green-200 text-green-800";
  if (uv <= 5) return "bg-yellow-200 text-yellow-800";
  if (uv <= 7) return "bg-orange-200 text-orange-800";
  return "bg-red-200 text-red-800";
};

// Hourly mini-card (timeline style)
const HourlyCard = ({ hour }) => (
  <div className="bg-white shadow-sm rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px] flex-shrink-0 hover:shadow-lg transition-transform duration-200 hover:-translate-y-1">
    <div className="text-gray-600 text-sm font-medium">{hour.time}</div>
    <div className="text-2xl mt-1">{hour.icon}</div>
    <div className="font-bold mt-1">{hour.temp}°C</div>
  </div>
);

// Metric card
const MetricCard = ({ label, value, colorClass }) => (
  <div className={`rounded-lg shadow-md p-4 flex flex-col w-full items-center justify-center ${colorClass || "bg-white"} hover:shadow-lg transition-shadow duration-200 min-w-[110px]`}>
    <div className="font-semibold text-sm">{label}</div>
    <div className="text-lg font-bold mt-1">{value}</div>
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
    setLastCities((prev) => [selectedCity, ...prev.filter(c => c !== selectedCity)].slice(0,5));
  };

  // Options for SearchBar: current city + recent searches
  const searchOptions = [
    { label: city, value: city },
    ...lastCities.filter(c => c !== city).map(c => ({ label: c, value: c }))
  ];

  return (
    <div className="h-full bg-green-50 flex justify-center items-stretch p-4">
      <div className="w-full max-w-screen-xl flex flex-col gap-6 h-full">

        {/* Top bar: city on left, search on right */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800 flex-1">{city}</div>
          <div className="w-96">
            <SearchBar
              options={searchOptions}
              placeholder="Search city..."
              onSelect={handleCitySelect}
            />
          </div>
        </div>

        {/* Split layout */}
        <div className="flex flex-col lg:flex-row gap-6 h-full">

          {/* Left: Current weather + hourly inside same card */}
          <div className="flex-1 flex flex-col gap-6 h-full">
            <div className="flex-[6] bg-white rounded-xl shadow-lg p-6 w-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">

              {/* Current weather */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold">{current.temp}°C</div>
                  <div className="text-green-700 capitalize font-semibold">{current.description}</div>
                  <div className="text-gray-700 mt-1 text-sm">Feels like: {current.feels_like}°C</div>
                </div>
                <div className="text-6xl">{current.icon}</div>
              </div>

              {/* Hourly forecast inside current weather card */}
              <div className="flex overflow-x-auto gap-3 mt-4 pt-2 border-t border-gray-200 snap-x snap-mandatory">
                {hourly.map((hour, idx) => (
                  <div className="snap-start" key={idx}>
                    <HourlyCard hour={hour} />
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right: Weekly forecast + metrics */}
          <div className="flex-1 flex flex-col gap-6 h-full">

            {/* Weekly forecast */}
            <div className="flex-[6] bg-white rounded-xl shadow-md p-4 overflow-y-auto hover:shadow-lg transition-shadow duration-200">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {forecast.map((day) => (
                    <tr key={day.day} className="hover:bg-green-50 transition-colors">
                      <td className="py-2 px-2 font-semibold text-green-700">{day.day}</td>
                      <td className="py-2 px-2 text-2xl">{day.icon}</td>
                      <td className="py-2 px-2 font-bold">{day.temp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Metrics in a single row */}
            <div className="flex gap-4 overflow-x-auto">
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
