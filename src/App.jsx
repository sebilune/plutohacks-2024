import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import "./components/NavBar";
import Navbar from "./components/NavBar";

// Pages
import Summary from "./pages/Summary";
import Contact from "./pages/Contact";
import Home from "./pages/Home"; // Import Home component
import DisasterBot from "./pages/DisasterBot";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
      </div>
      <div className="container">
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} /> {/* Add Home route */}
          <Route path="/summary" element={<Summary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disaster-bot" element={<DisasterBot />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
