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

      {/* Conditionally render NearbyRestaurants and WeatherAlerts */}
      {coordinates.latitude && coordinates.longitude ? (
        <>
          <NearbyRestaurants
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
          <WeatherAlerts
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
        </>
      ) : (
        <p>
          Please fetch your location to see nearby restaurants and weather
          alerts.
        </p>
      )}
    </div>
  );
};

export default Home;
