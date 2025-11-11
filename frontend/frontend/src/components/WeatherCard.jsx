const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-lg backdrop-blur-md transition-transform hover:scale-105 hover:bg-white/15">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-2">
        {weather.city}
      </h2>
      <p className="text-lg text-gray-300 mb-1">{weather.condition}</p>
      <p className="text-6xl font-extrabold text-white mb-4">
        {weather.temperature}°C
      </p>

      <div className="flex justify-around text-gray-300 text-sm mt-4">
        <div>
          <p className="font-semibold text-white/70">💧 Humidity</p>
          <p>{weather.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold text-white/70">🔥 Feels Like</p>
          <p>{weather.feels_like}°C</p>
        </div>
        <div>
          <p className="font-semibold text-white/70">🌬 Wind</p>
          <p>{weather.wind_speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
