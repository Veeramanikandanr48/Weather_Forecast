const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Use CORS middleware
app.use(cors());

// Route to fetch weather data for a location
app.get('/weather/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const apiKey = 'd78933e28d8045b7aa280313230407';

    // Make a request to the WeatherAPI
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    const response = await axios.get(apiUrl);

    // Extract relevant weather data from the API response
    const { temp_c, condition } = response.data.current;
    const temperature = temp_c;
    const description = condition.text;

    // Format the weather data
    const weatherData = {
      temperature,
      description,
      location,
    };

    // Send the weather data as a JSON response
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
