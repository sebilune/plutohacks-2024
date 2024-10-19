import { useState } from "react";

const SevereWeatherAlerts = () => {
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US"); // Default to US
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_SEVERE_WEATHER_API_KEY;

  const getWeatherAlerts = async () => {
    const url = `https://api.weatherbit.io/v2.0/alerts?postal_code=${postalCode}&country=${country}&key=${apiKey}`;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherAlerts();
  };

  return (
    <div>
      <h1>Severe Weather Alerts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter country code (optional, default is US)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Get Weather Alerts</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="alert">
              <h2>{alert.title}</h2>
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
          <p>No alerts available for this postal code.</p>
        )}
      </div>
    </div>
  );
};

export default SevereWeatherAlerts;
