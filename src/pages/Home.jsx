import { useState } from "react";

import LocationButton from "../components/LocationButton";
import WeatherAlerts from "../components/WeatherAlerts";
import NearbyGasStations from "../components/NearbyGasStations";
import LocationData from "../components/LocationData";
import html2pdf from "html2pdf.js";
import NearbyShelters from "../components/NearbyShelters";

const Home = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const handleLocationRetrieved = (latitude, longitude) => {
    setCoordinates({ latitude, longitude });
  };

  const generatePdf = () => {
    const element = document.getElementById("pdf-content");
    const options = {
      margin: 0.5,
      filename: "SEMA-Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
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
            <p className="text-center">All we need is your location!</p>
          </hgroup>
          <div className="stacked location-btn">
            <LocationButton onLocationRetrieved={handleLocationRetrieved} />
          </div>
        </section>
      </section>

      {coordinates.latitude && coordinates.longitude && (
        <div className="info" id="pdf-content">
          <WeatherAlerts
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
          <NearbyShelters
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
          <NearbyGasStations
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
          <LocationData
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
        </div>
      )}

      {coordinates.latitude && coordinates.longitude && (
        <div className="container">
          <div className="text-center">
            <button onClick={generatePdf}>Download Report as PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
