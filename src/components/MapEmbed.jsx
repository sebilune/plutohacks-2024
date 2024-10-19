import PropTypes from 'prop-types';

const MapEmbed = ({ place_name, latitude, longitude }) => {
  return (
    <div>
      <h3>{place_name}</h3>
      <iframe
        width="300"
        height="200"
        src={`https://www.google.com/maps/embed/v1/place?key=${
          import.meta.env.VITE_MAPS_API_KEY
        }&q=${place_name}@${latitude},${longitude}`}
        allowFullScreen
        title={place_name}
      ></iframe>
    </div>
  );
};
MapEmbed.propTypes = {
  place_name: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default MapEmbed;
