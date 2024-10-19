import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const NearbyGasStations = ({ latitude, longitude }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return; // Don't attempt to fetch data if coordinates aren't available

    const fetchGasStations = async () => {
      const query = `
        [out:json];
        (
          node["amenity"="fuel"](around:2000, ${latitude}, ${longitude});
          way["amenity"="fuel"](around:2000, ${latitude}, ${longitude});
          relation["amenity"="fuel"](around:2000, ${latitude}, ${longitude});
        );
        out body;
      `;

      try {
        console.log("Fetching gas stations!");
        setLoading(true);
        setError(null);
        const response = await axios.post(
          "https://overpass-api.de/api/interpreter",
          query,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        setStations(response.data.elements);
      } catch {
        setError("Error fetching gas stations");
      } finally {
        setLoading(false);
      }
    };

    fetchGasStations();
  }, [latitude, longitude]);

  if (loading) return <div>Loading nearby gas stations...</div>;
  if (error) return <div>{error}</div>;

  // Filter out stations without valid coordinates
  const validStations = stations.filter(
    (station) => station.lat && station.lon
  );

  return (
    <article>
      <h5 className="text-center">NEARBY GAS STATIONS</h5>
      <hr />
      {validStations.length > 0 ? (
        <ul>
          {validStations.map((station) => (
            <li key={station.id}>
              <h3>{station.tags?.name || "Unnamed Gas Station"}</h3>
              <p>
                {station.lat}, {station.lon}
              </p>
              <iframe
                width="300"
                height="200"
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_MAPS_API_KEY
                }&q=${station.lat},${station.lon}`}
                allowFullScreen
                title={station.tags?.name || "Gas Station Location"}
              ></iframe>
            </li>
          ))}
        </ul>
      ) : (
        <p>No gas stations found for this location.</p>
      )}
    </article>
  );
};

NearbyGasStations.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default NearbyGasStations;
