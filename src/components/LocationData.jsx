import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LocationData = ({ latitude, longitude }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchAddress(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch {
      setError("Failed to fetch address");
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <article>
        <h5 className="text-center">YOUR ADDRESS</h5>
        <hr />
        <p className="text-center">{address}</p>
      </article>
      <article>
        <h5 className="text-center">YOUR COORDINATES</h5>
        <hr />
        <div className="container iframe-wrapper">
          <iframe
            width="300"
            height="200"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_MAPS_API_KEY
            }&q=${latitude},${longitude}`}
            allowFullScreen
          ></iframe>
        </div>
      </article>
    </>
  );
};
LocationData.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default LocationData;
