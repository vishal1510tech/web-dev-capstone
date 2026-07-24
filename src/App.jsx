import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ThreatGallery from './Pages/ThreatGallery'
import Resources from './Pages/Resources'
import Quiz from './Pages/Quiz'

function App() {
  return (
    <Router>
      <div className="bg-slate-950 text-slate-200 min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<ThreatGallery />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App