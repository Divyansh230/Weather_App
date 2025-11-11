import { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [reasoning, setReasoning] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setWeatherList([]);
    setReasoning("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/agent", { query });
      console.log("✅ Response:", res.data);

      if (res.data.weather_data && Array.isArray(res.data.weather_data)) {
        setWeatherList(res.data.weather_data);
        setReasoning(res.data.ai_reasoning || "");
      } else {
        setError(res.data.error || "No valid weather data found.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Backend not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-6 py-10 text-white font-inter">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        🌦 AI Weather Intelligence
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="mt-8 text-gray-400 animate-pulse">
          Fetching weather data...
        </div>
      )}

      {error && (
        <div className="mt-8 bg-red-950/30 border border-red-600/40 px-4 py-3 rounded-lg text-red-400 text-center max-w-md">
          {error}
        </div>
      )}

      {!loading && reasoning && !error && (
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-5 text-gray-300 shadow-md backdrop-blur-sm max-w-lg text-center">
          <p>{reasoning}</p>
        </div>
      )}

      {/* Weather cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        {weatherList.map((weather, i) => (
          <WeatherCard key={i} weather={weather} />
        ))}
      </div>

      {!loading && weatherList.length === 0 && !error && reasoning && (
        <p className="mt-10 text-gray-400 italic">
          No valid weather data found.
        </p>
      )}
    </div>
  );
};

export default App;
