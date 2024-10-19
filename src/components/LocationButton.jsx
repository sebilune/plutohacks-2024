import { useState } from "react";
import PropTypes from "prop-types";

const LocationButton = ({ onLocationRetrieved, className }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState(null);
  const [cachedLocation, setCachedLocation] = useState(null); // Cache for user's location

  // Function to retrieve location
  const getLocation = () => {
    // If location is already cached, use it
    if (cachedLocation) {
      onLocationRetrieved(cachedLocation.latitude, cachedLocation.longitude);
      return;
    }

    setLoadingLocation(true);
    setError(null);

    if (navigator.geolocation) {
      console.log("Getting location!");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Cache the location
          setCachedLocation({ latitude, longitude });

          // Pass the location up to the parent component
          onLocationRetrieved(latitude, longitude);
          console.log("Location retrieved! ", latitude, longitude);
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
