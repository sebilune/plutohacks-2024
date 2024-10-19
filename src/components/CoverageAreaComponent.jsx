import React, { useState } from "react";

const ShelterLocator = () => {
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShelters = async (latitude, longitude) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6ef44416d3mshfdd928a41c7acf2p1d2c73jsn421cb4200b39", // Replace with your RapidAPI key
        "X-RapidAPI-Host": "homeless-shelter.p.rapidapi.com"
      }
    };

    const radius = 10; // Set the radius you want to search in miles

    try {
      setLoading(true);
      const response = await fetch(
        `https://homeless-shelter.p.rapidapi.com/location?lat=${latitude}&lng=${longitude}&radius=${radius}`,
        options
      );
      const data = await response.json();
      setShelters(data);
    } catch (err) {
      setError("Failed to fetch shelters. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchShelters(latitude, longitude);
        },
        (error) => {
          setError("Geolocation failed: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h1>Shelter Locator</h1>
      <button onClick={getLocation}>Find Nearest Shelter</button>

      {loading && <p>Loading shelters...</p>}
      {error && <p>{error}</p>}

      <ul>
        {shelters.length > 0 ? (
          shelters.map((shelter, index) => (
            <li key={index}>
              <strong>{shelter.name}</strong> - {shelter.address}
            </li>
          ))
        ) : (
          <p>No shelters found nearby.</p>
        )}
      </ul>
    </div>
  );
};

export default ShelterLocator;
