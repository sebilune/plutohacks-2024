import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WeatherAlerts = ({ latitude, longitude }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_SEVERE_WEATHER_API_KEY;

  useEffect(() => {
    if (!latitude || !longitude) return; // Don't attempt to fetch data if coordinates aren't available

    const getWeatherAlerts = async () => {
      const url = `https://api.weatherbit.io/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

      try {
        console.log("Fetching weather alerts!");
        setLoading(true);
        setError(null);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch alerts");
        }

        const data = await response.json();
        setAlerts(data.alerts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherAlerts();
  }, [latitude, longitude, apiKey]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      timeZoneName: "short", // Adds the timezone info if available
    });
  };

  const extractAlertDetails = (description) => {
    const details = {
      summary: "Not available",
      location: "Not available",
      timeframe: "Not available",
      impacts: "Not available",
    };

    // Find the indices for each section
    const whatStart = description.indexOf("* WHAT");
    const whereStart = description.indexOf("* WHERE");
    const whenStart = description.indexOf("* WHEN");
    const impactsStart = description.indexOf("* IMPACTS");

    if (whatStart !== -1 && whereStart !== -1) {
      details.summary = description
        .slice(whatStart + 8, whereStart)
        .trim()
        .replace(/^\.+/, ""); // 8 is the length of "* WHAT..."
    }

    if (whereStart !== -1 && whenStart !== -1) {
      details.location = description
        .slice(whereStart + 9, whenStart)
        .trim()
        .replace(/^\.+/, ""); // 9 is the length of "* WHERE..."
    }

    if (whenStart !== -1 && impactsStart !== -1) {
      details.timeframe = description
        .slice(whenStart + 8, impactsStart)
        .trim()
        .replace(/^\.+/, ""); // 8 is the length of "* WHEN..."
    }

    if (impactsStart !== -1) {
      details.impacts = description
        .slice(impactsStart + 10)
        .trim()
        .replace(/^\.+/, ""); // 10 is the length of "* IMPACTS..."
    }

    return details;
  };

  if (loading) return <div>Loading weather alerts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <article>
      <h5 className="text-center">WEATHER WARNINGS</h5>
      <hr />
      {alerts.length > 0 ? (
        alerts.map((alert, index) => {
          const { summary, location, timeframe, impacts } = extractAlertDetails(
            alert.description
          );
          return (
            <div key={index} className="alert">
              <h4 className="text-center">{alert.title}</h4>

              {/* Organize key information in a table */}
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Summary</strong>
                    </td>
                    <td>{summary}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Location</strong>
                    </td>
                    <td>{location}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Timeframe</strong>
                    </td>
                    <td>{timeframe}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Impacts</strong>
                    </td>
                    <td>{impacts}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Severity</strong>
                    </td>
                    <td>{alert.severity}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Effective Time</strong>
                    </td>
                    <td>{formatDate(alert.effective_local)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Expiration Time</strong>
                    </td>
                    <td>{formatDate(alert.expires_local)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Regions Affected</strong>
                    </td>
                    <td>{alert.regions.join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <p>No weather alerts available for this location.</p>
      )}
    </article>
  );
};

WeatherAlerts.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default WeatherAlerts;
