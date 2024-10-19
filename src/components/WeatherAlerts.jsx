import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WeatherAlerts = ({ latitude, longitude }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_SEVERE_WEATHER_API_KEY;

  useEffect(() => {
    if (!latitude || !longitude) return; // Don't attempt to fetch data if coordinates aren't available

    const getWeatherAlerts = async () => {
      const url = `https://api.weatherbit.io/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

      try {
        console.log("Fetching weather alerts!");
        setLoading(true);
        setError(null);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch alerts");
        }

        const data = await response.json();
        setAlerts(data.alerts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherAlerts();
  }, [latitude, longitude, apiKey]);

  if (loading) return <div>Loading weather alerts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <article>
      <h5 className="text-center">WEATHER WARNINGS</h5>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index} className="alert">
            <h3>{alert.title}</h3>
            <p>{alert.description}</p>
            <p>
              <strong>Severity:</strong> {alert.severity}
            </p>
            <p>
              <strong>Effective Time:</strong> {alert.effective_local}
            </p>
            <p>
              <strong>Expires:</strong> {alert.expires_local}
            </p>
            <p>
              <strong>Regions:</strong> {alert.regions.join(", ")}
            </p>
            <a href={alert.uri} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </div>
        ))
      ) : (
        <p>No weather alerts available for this location.</p>
      )}
    </article>
  );
};

WeatherAlerts.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default WeatherAlerts;
