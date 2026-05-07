import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ThreatGallery from "./Pages/ThreatGallery";
import Resources from "./Pages/Resources";

function App() {
  return (
    <Router>
      <div className="bg-cyber-dark text-cyber-text min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/threats" element={<ThreatGallery />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;