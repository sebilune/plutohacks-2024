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
import Home from "./pages/Home";
import DisasterBot from "./components/DisasterBot";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <DisasterBot />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disaster-bot" element={<DisasterBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
