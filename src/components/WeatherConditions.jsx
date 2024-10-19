import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "chart.js/auto";

const WeatherConditions = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");

  // Getting the API key from Vite environment variables
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeatherData = useCallback(async () => {
    if (!latitude || !longitude) return;

    try {
      console.log("Fetching weather data!");
      setLoading(true);
      setError(null);

      // Debugging: Log the API key to verify it's loading correctly
      console.log("API Key: ", apiKey);

      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&include=current%2Cdays%2Chours%2Calerts%2Cevents&key=${apiKey}&contentType=json`
      );

      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data);

      // Fetch the address associated with latitude and longitude
      fetchAddress(latitude, longitude);
    } catch (err) {
      console.error("Error in fetchWeatherData:", err);
      setError("Failed to fetch weather data. Please check the API key and try again.");
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, apiKey]);

  const fetchAddress = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      if (!response.ok) {
        throw new Error("Error fetching address");
      }
      const data = await response.json();
      setAddress(data.display_name);
    } catch (err) {
      console.error("Error in fetchAddress:", err);
      setError("Failed to fetch address.");
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [latitude, longitude, fetchWeatherData]);

  const buildGraphData = () => {
    if (!weatherData || !weatherData.days) return null;

    const labels = weatherData.days.map((day) => day.datetime);
    const temps = weatherData.days.map((day) => day.temp);

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°F)",
          data: temps,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
      ],
    };
  };

  if (loading) return <span aria-busy="true">Fetching Weather Data...</span>;
  if (error) return <div>{error}</div>;

  return (
    <article>
      <h5 className="text-center">
        WEATHER CONDITIONS
        <button onClick={fetchWeatherData} className="outline refetch-btn">
          Refetch
        </button>
      </h5>
      <hr />

      {weatherData && (
        <div>
          <h3>Your Location: {address}</h3>
          {/* Small Map Display */}
          <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: "200px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>

          {/* Temperature Chart */}
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
    </article>
  );
};

WeatherConditions.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default WeatherConditions;
