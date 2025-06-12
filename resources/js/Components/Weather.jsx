import React, { useEffect, useState } from 'react';

const API_KEY = '5b77e52a4b422dec4f2d3b0db7b528e3'; 

export default function Weather({ location }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch weather');

        const data = await response.json();

        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (!location) return null;

  return (
    <div className="mt-2 text-sm text-white">
      <strong>Weather:</strong>{' '}
      {loading && <span>Loading...</span>}
      {error && <span className="text-red-500">Error: {error}</span>}
      {weather && (
        <span className="flex items-center gap-2">
          <img src={weather.icon} alt={weather.description} className="w-5 h-5" />
          {weather.temperature}°C, {weather.description}
        </span>
      )}
    </div>
  );
}
