import { useState } from 'react';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found. Please try again.");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
          {/* Weather Card Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Weather Forecast</h1>
            <p className="text-blue-100 mt-1">Get real-time weather updates</p>
          </div>

          {/* Search Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[100px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Search'
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100">
                {error}
              </div>
            )}
          </div>

          {/* Weather Display */}
          {weather && (
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-inner border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt={weather.weather[0].main}
                      className="w-24 h-24"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-700 capitalize">{weather.weather[0].description}</p>
                      <p className="text-4xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-xl font-semibold text-blue-600">{weather.main.humidity}%</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-xl font-semibold text-blue-600">{weather.wind.speed} m/s</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Feels Like</p>
                    <p className="text-xl font-semibold text-blue-600">{Math.round(weather.main.feels_like)}°C</p>
                  </div>
                  <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Pressure</p>
                    <p className="text-xl font-semibold text-blue-600">{weather.main.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 text-center text-sm text-gray-500 border-t border-gray-100">
            Powered by OpenWeatherMap
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;