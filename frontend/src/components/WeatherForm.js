import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherForm.css";

const WeatherForm = ({ getWeatherData }) => {
  const [location, setLocation] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

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
      const apiKey = "74c61ddec52f4b5c98e8874813b00136"; // Replace with your reverse geocoding API key
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

  useEffect(() => {
    handleLocationClick();
  }, []); // Fetch location on component mount

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
          <button type="submit" className="btn btn-primary">
            Get Weather
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLocationClick}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Fetching Location..." : "Use My Location"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default WeatherForm;
