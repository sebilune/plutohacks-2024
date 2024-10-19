import { useState } from "react";
import WeatherAlerts from "../components/WeatherAlerts";
import NearbyRestaurants from "../components/NearbyRestaurants";
import LocationButton from "../components/LocationButton";

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const handleLocationRetrieved = (latitude, longitude) => {
    setCoordinates({ latitude, longitude });
  };

  return (
    <div>
      <h1>Home</h1>

      {/* LocationButton is rendered first */}
      <LocationButton onLocationRetrieved={handleLocationRetrieved} />

      {/* Pass coordinates to NearbyRestaurants and WeatherAlerts */}
      <NearbyRestaurants
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
      />
      <WeatherAlerts
        latitude={coordinates.latitude}
        longitude={coordinates.longitude}
      />
    </div>
  );
};

export default Home;
