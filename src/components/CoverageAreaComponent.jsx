import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CoverageAreaComponent = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([25.7617, -80.1918]); // Miami, FL as default

  const fetchAllWeatherAlerts = async () => {
    setLoading(true);
    setError(null);  // Clear any previous errors
    try {
      const response = await fetch('https://api.weather.gov/alerts/active'); // Fetch all active alerts
      const data = await response.json();

      // Add safety check to avoid rendering alerts with missing or invalid geometry
      const validAlerts = (data.features || []).filter(
        alert => alert.geometry && alert.geometry.coordinates && alert.geometry.coordinates.length >= 2
      );

      setAlerts(validAlerts);

      if (validAlerts.length === 0) {
        setError('No dangerous weather alerts found.');
      }
    } catch (err) {
      setError("Error fetching weather data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndFetchAlerts = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]); // Update map center to the user's location
        },
        (error) => {
          setError("Geolocation failed: " + error.message);
        }
      );
    }

    // Fetch all weather alerts regardless of proximity
    fetchAllWeatherAlerts();
  };

  return (
    <div>
      <h1>Dangerous Weather Locator</h1>
      <button onClick={getLocationAndFetchAlerts}>Show Dangerous Weather</button>
      {loading && <p>Loading weather alerts...</p>}
      {error && <p>{error}</p>}
      
      <MapContainer center={mapCenter} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {alerts.length > 0 && alerts.map((alert, index) => (
          alert.geometry && alert.geometry.coordinates ? (
            <Marker
              key={index}
              position={[
                alert.geometry.coordinates[1], // latitude
                alert.geometry.coordinates[0], // longitude
              ]}
            >
              <Popup>
                <strong>{alert.properties.headline || 'Weather Alert'}</strong><br />
                {alert.properties.description || 'No description available.'}
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageAreaComponent;
