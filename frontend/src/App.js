import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherData from './components/WeatherData';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = (location) => {
    const apiUrl = `http://localhost:3000/weather/${location}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const { data } = response;
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <h1>Weather Forecast</h1>
        <WeatherForm getWeatherData={getWeatherData} />
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