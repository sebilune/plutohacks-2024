import { useState } from "react";
import WeatherAlerts from "../components/WeatherAlerts";
import NearbyGasStations from "../components/NearbyGasStations";
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
        <section id="home">
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
          <main className="stacked info">
            <WeatherAlerts
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
            />
            <NearbyGasStations
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
            />
          </main>
        </section>
      </section>

      {/* Pass coordinates to NearbyRestaurants and WeatherAlerts */}
    </div>
  );
};

export default Home;
