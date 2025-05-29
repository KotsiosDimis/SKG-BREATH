import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Data from './pages/HistoricalData';
import About from './pages/About';
import Map from './pages/Map';
import LiveDataPage from './pages/LiveDataPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/live" element={<LiveDataPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
