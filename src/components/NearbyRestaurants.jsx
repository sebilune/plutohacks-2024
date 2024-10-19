import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const NearbyRestaurants = ({ latitude, longitude }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchRestaurants = async () => {
        const query = `
          [out:json];
          (
            node["amenity"="restaurant"](around:2000, ${latitude}, ${longitude});
            way["amenity"="restaurant"](around:2000, ${latitude}, ${longitude});
            relation["amenity"="restaurant"](around:2000, ${latitude}, ${longitude});
          );
          out body;
        `;

        try {
          const response = await axios.post(
            "https://overpass-api.de/api/interpreter",
            query,
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );
          setRestaurants(response.data.elements);
        } catch {
          setError("Error fetching restaurants");
        } finally {
          setLoading(false);
        }
      };

      fetchRestaurants();
    }
  }, [latitude, longitude]);

  // Render nothing if latitude or longitude is undefined
  if (!latitude || !longitude) {
    return <div>Please get your location to see nearby restaurants.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <h3>{restaurant.tags?.name || "Unnamed Restaurant"}</h3>
            <p>
              {restaurant.lat}, {restaurant.lon}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes no longer mark latitude and longitude as required
NearbyRestaurants.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default NearbyRestaurants;
