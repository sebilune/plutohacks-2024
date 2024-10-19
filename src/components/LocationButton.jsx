import { useState } from "react";
import { IconMapPin } from "@tabler/icons-react";
import PropTypes from "prop-types";

const LocationButton = ({ onLocationRetrieved }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState(null);
  const [cachedLocation, setCachedLocation] = useState(null); // Cache for user's location
  const [locationFetched, setLocationFetched] = useState(false); // Track if location is fetched

  // Function to retrieve location
  const getLocation = () => {
    setLoadingLocation(true);
    setError(null);

    // If location is already cached, use it
    if (cachedLocation) {
      onLocationRetrieved(cachedLocation.latitude, cachedLocation.longitude);
      setLocationFetched(true); // Set location as fetched
      setLoadingLocation(false);
      return;
    }

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
          setLocationFetched(true); // Set location as fetched
          setLoadingLocation(false);
        },
        (err) => {
          setError("Geolocation not enabled");
          setLoadingLocation(false);
          console.error("Error fetching location: ", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button
        onClick={getLocation}
        disabled={loadingLocation || locationFetched}
        className="icon-btn"
      >
        <IconMapPin size={30} color="white" />
        {loadingLocation ? "Fetching..." : "Get my location!"}
      </button>
    </div>
  );
};

LocationButton.propTypes = {
  onLocationRetrieved: PropTypes.func.isRequired,
};

export default LocationButton;
