import { useState } from "react";
import PropTypes from "prop-types";

const LocationButton = ({ onLocationRetrieved, className }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    setLoadingLocation(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationRetrieved(latitude, longitude); // Pass to parent component
          setLoadingLocation(false);
        },
        () => {
          setError("Geolocation not enabled");
          setLoadingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  };

  return (
    <div>
      <button
        onClick={getLocation}
        disabled={loadingLocation}
        className={className}
      >
        {loadingLocation ? "Fetching Location..." : "Get My Location"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};
LocationButton.propTypes = {
  onLocationRetrieved: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default LocationButton;
