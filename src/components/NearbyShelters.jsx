import { useEffect, useState } from 'react';
import axios from 'axios';
import MapEmbed from './MapEmbed';

const NearbyShelters = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const response = await axios.get('https://services.arcgis.com/pGfbNJoYypmNq86F/arcgis/rest/services/Open_Shelters/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*');
                setShelters(response.data.features);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShelters();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <div>
            <h2>Nearby Shelters</h2>
            <ul>
                {shelters.map((shelter, index) => (
                    <li key={index}>
                        {shelter.attributes.ADDRESS_1} {shelter.attributes.CITY} {shelter.attributes.STATE} {shelter.attributes.ZIP}
                        <MapEmbed place_name={shelter.attributes.SHELTER_NAME} latitude={shelter.attributes.LATITUDE} longitude={shelter.attributes.LONGITUDE} />
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default NearbyShelters;