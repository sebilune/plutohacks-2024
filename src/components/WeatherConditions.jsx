import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'chart.js/auto';

const WeatherConditions = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState([25.7617, -80.1918]); // Default to Miami

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key

  const fetchWeatherData = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&include=current%2Cdays%2Chours%2Calerts%2Cevents&key=${apiKey}&contentType=json`
      );
      const data = await response.json();
      setWeatherData(data);
      fetchAddress(latitude, longitude);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      setAddress(data.display_name);
    } catch (err) {
      setError('Failed to fetch address');
    }
  };

  const getLocationAndFetchWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          fetchWeatherData(latitude, longitude); // Fetch weather for user's location
        },
        (error) => {
          setError('Geolocation failed: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const buildGraphData = () => {
    if (!weatherData || !weatherData.days) return null;

    const labels = weatherData.days.map(day => day.datetime);
    const temps = weatherData.days.map(day => day.temp);

    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°F)',
          data: temps,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Weather Conditions Near You</h1>
      <button onClick={getLocationAndFetchWeather}>Show Weather Data</button>

      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
      
      {weatherData && (
        <div>
          <h3>Your Location: {address}</h3>
          <p>Latitude: {location[0]}, Longitude: {location[1]}</p>

          <h3>Weather Alerts: </h3>
          {weatherData.alerts && weatherData.alerts.length > 0 ? (
            <ul>
              {weatherData.alerts.map((alert, index) => (
                <li key={index}>
                  <strong>{alert.event}</strong>: {alert.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No dangerous weather alerts found.</p>
          )}

          {/* Reduced-size Map */}
          <MapContainer center={location} zoom={10} style={{ height: '200px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>

          {/* Chart displaying temperature for the next few days */}
          {buildGraphData() && (
            <Line
              data={buildGraphData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherConditions;
