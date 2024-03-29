// App.jsx
import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherData from "./components/WeatherData";
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherData = async (location) => {
    setLoadingWeather(true);

    try {
      const apiUrl = `https://weather-forecast-7aid.onrender.com/weather/${location}`;
      const response = await axios.get(apiUrl);
      const { data } = response;
      const { city } =  data.features[6];
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <h1>Weather Forecast</h1>
        <WeatherForm onGetWeatherData={getWeatherData} loading={loadingWeather} />
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <WeatherData
            weather={{
              ...weatherData,
              location: weatherData.location.toUpperCase(),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
