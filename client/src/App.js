// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiveData from './pages/LiveData';
import About from './pages/About';
import Map from './pages/Map';

function App() {
  return (
    <Router basename="/SKG-BREATH">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<LiveData />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
