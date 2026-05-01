import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ThreatGallery from "./pages/ThreatGallery";
import Resources from "./pages/Resources";

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