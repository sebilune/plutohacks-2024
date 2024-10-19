import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MapEmbed from "./MapEmbed";

// Haversine formula to calculate distance between two lat/lon points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const NearbyShelters = ({ latitude, longitude }) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get(
          "https://services.arcgis.com/pGfbNJoYypmNq86F/arcgis/rest/services/Open_Shelters/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*"
        );

        // Calculate the distance for each shelter
        const sheltersWithDistance = response.data.features.map((shelter) => {
          const distance = getDistance(
            latitude,
            longitude,
            shelter.attributes.LATITUDE,
            shelter.attributes.LONGITUDE
          );
          return { ...shelter, distance };
        });

        // Sort shelters by distance and take the closest two
        const closestShelters = sheltersWithDistance
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 2);

        setShelters(closestShelters);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchShelters();
    }
  }, [latitude, longitude]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <article>
      <h5 className="text-center">NEARBY SHELTERS</h5>
      <hr />
      {shelters.map((shelter, index) => (
        <>
          <div className="station" key={index}>
            <h3>{shelter.distance.toFixed(2)} km away</h3>
            <div>
              {shelter.attributes.ADDRESS_1}, {shelter.attributes.CITY},{" "}
              {shelter.attributes.STATE}, {shelter.attributes.ZIP}
            </div>
            <MapEmbed
              place_name={shelter.attributes.SHELTER_NAME}
              latitude={shelter.attributes.LATITUDE}
              longitude={shelter.attributes.LONGITUDE}
            />
          </div>
          <hr />
        </>
      ))}
    </article>
  );
};

// Add PropTypes for latitude and longitude
NearbyShelters.propTypes = {
  latitude: PropTypes.number.isRequired, // Ensure latitude is a number and required
  longitude: PropTypes.number.isRequired, // Ensure longitude is a number and required
};

export default NearbyShelters;
