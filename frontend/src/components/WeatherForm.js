// WeatherForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./WeatherForm.css";

const WeatherForm = ({ getWeatherData, loading }) => {
  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    handleLocationClick();
  }, []); // Fetch location on component mount

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getCityName = async (latitude, longitude) => {
    try {
      const apiKey = process.env.74c61ddec52f4b5c98e8874813b00136;
      const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const { data } = response;
      const { city } = data.features[0].properties;
      setLocation(city);
      getWeatherData(city);
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== "") {
      getWeatherData(location);
      setLocation("");
    }
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location"
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Fetching Weather..." : "Get Weather"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLocationClick}
            disabled={loadingLocation || loading}
          >
            {loadingLocation ? "Fetching Location..." : "Use My Location"}
          </button>
        </div>
      </div>
    </form>
  );
};

WeatherForm.propTypes = {
  getWeatherData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default WeatherForm;
