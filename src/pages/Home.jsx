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
      <section className="hero">
        <section id="home" className="centerd">
          <hgroup className="text-center">
            <h1>
              Welcome to SEMA,
              <div></div>Your solution for disaster preparedness.
            </h1>
            <p className="text-center">All we need is a location!</p>
          </hgroup>
          <div className="stacked location-btn">
            <LocationButton onLocationRetrieved={handleLocationRetrieved} />
          </div>
        </section>
      </section>

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
