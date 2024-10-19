import { useState } from "react";
import LocationButton from "../components/LocationButton";
import WeatherAlerts from "../components/WeatherAlerts";
import NearbyGasStations from "../components/NearbyGasStations";

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
        </section>
      </section>

      {coordinates.latitude && coordinates.longitude && (
        <div className="info-section">
          <WeatherAlerts
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
          <NearbyGasStations
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
