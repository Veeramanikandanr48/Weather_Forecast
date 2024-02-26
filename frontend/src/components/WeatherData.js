// WeatherData.jsx
import React from "react";
import "./WeatherData.css";
import { RiCloudFill, RiSunFill } from "react-icons/ri";
import { FaCloudRain, FaSnowflake } from "react-icons/fa";
import PropTypes from "prop-types";

const WeatherData = ({ weather }) => {
  const getWeatherIcon = (description) => {
    switch (description) {
      case "Clear":
        return <RiSunFill className="weather-icon" size={72} color="#FDB813" />;
      case "Clouds":
        return <RiCloudFill className="weather-icon" size={72} color="#6699CC" />;
      case "Rain":
        return <FaCloudRain className="weather-icon" size={72} color="#5384AF" />;
      case "Snow":
        return <FaSnowflake className="weather-icon" size={72} color="#9ED7FF" />;
      default:
        return <RiCloudFill className="weather-icon" size={72} color="#6699CC" />;
    }
  };

  return (
    <div className="weather-data">
      <h2 className="weather-location">{weather.location}</h2>
      <div className="weather-info">
        <div className="weather-icon-container">{getWeatherIcon(weather.description)}</div>
        <p className="weather-description">{weather.description}</p>
        <h2 className="weather-temperature">{weather.temperature}°C</h2>
      </div>
    </div>
  );
};

WeatherData.propTypes = {
  weather: PropTypes.shape({
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherData;
