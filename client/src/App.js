// src/App.js
import React, { useState } from 'react';
import ThessalonikiMap from './components/ThessalonikiMap';
import AirQualityMenu from './components/AirQualityMenu';

function App() {
  const [selectedMetrics, setSelectedMetrics] = useState({});

  return (
    <div className="App">
      <AirQualityMenu onChange={setSelectedMetrics} />
      <ThessalonikiMap selectedMetrics={selectedMetrics} />
    </div>
  );
}

export default App;
