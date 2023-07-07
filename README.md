# Weather Forecast Application

## Description

The Weather Forecast Application is a web application that allows users to get real-time weather information for any location. It provides users with current weather conditions, temperature, and weather descriptions. The application uses a weather API to fetch the data and presents it in a user-friendly interface.

## Technologies Used

- React.js for building the frontend
- Node.js and Express for the backend server
- Axios for making HTTP requests to the weather API
- Bootstrap for styling and responsive layout
- Weather API (insert API name) for fetching weather data

## Installation and Setup

### Backend

1. Clone the repository: `git clone https://github.com/veeramanikandanr48/Weather_Forecast.git`
2. Navigate to the backend directory: `cd weather-forecast/backend`
3. Install dependencies: `npm install`
4. Start the backend server: `node server.js`
5. The backend server will start running on port 3000.

### Frontend

1. Open a new terminal window.
2. Navigate to the frontend directory: `cd Weather_Forecast/frontend`
3. Install dependencies: `npm install`
4. Update the API endpoint in `src/App.js` to point to the backend server URL (e.g., `http://localhost:3000`).
5. Start the frontend development server: `npm start`
6. The frontend application will open in your default browser at `http://localhost:3001`.

## Usage

1. Enter a location in the search input field to get weather information for that location.
2. Press the "Get Weather" button or hit Enter to fetch the weather data.
3. The application will display the current weather conditions, temperature, and weather descriptions for the specified location.
4. You can also click the "Use My Location" button to fetch weather information based on your current location.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request. Ensure that your code follows the project's coding guidelines and conventions.

