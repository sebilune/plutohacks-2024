import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WeatherAlerts = ({ latitude, longitude }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_SEVERE_WEATHER_API_KEY;

  useEffect(() => {
    const getWeatherAlerts = async () => {
      const url = `https://api.weatherbit.io/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

      try {
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

    if (latitude && longitude) {
      getWeatherAlerts();
    }
  }, [latitude, longitude, apiKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Severe Weather Alerts</h2>
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
    </div>
  );
};

WeatherAlerts.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default WeatherAlerts;
