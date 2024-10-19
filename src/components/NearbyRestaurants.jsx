import { useEffect, useState } from "react";
import axios from "axios";

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async (latitude, longitude) => {
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

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchRestaurants(latitude, longitude);
          },
          () => {
            setError("Geolocation not enabled");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

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

export default NearbyRestaurants;
