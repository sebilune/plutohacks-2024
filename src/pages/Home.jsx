import WeatherAlerts from "../components/WeatherAlerts";
import NearbyRestaurants from "../components/NearbyRestaurants";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <WeatherAlerts />
      <NearbyRestaurants />
    </div>
  );
};

export default Home;
