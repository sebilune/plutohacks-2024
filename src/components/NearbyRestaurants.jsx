import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const NearbyRestaurants = ({ latitude, longitude }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return; // Don't attempt to fetch data if coordinates aren't available

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
        setLoading(true);
        setError(null);
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
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return <div>Nearby Restaurants</div>; // Placeholder if no coordinates are available
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      {restaurants.length > 0 ? (
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
      ) : (
        <p>No restaurants found for this location.</p>
      )}
    </div>
  );
};

NearbyRestaurants.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default NearbyRestaurants;
