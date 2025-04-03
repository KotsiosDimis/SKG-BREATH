// src/components/ThessalonikiMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ThessalonikiMap = ({ selectedMetrics }) => {
  const thessalonikiCoords = [40.6401, 22.9444];

  // Sample air quality data (you can fetch real data from an API)
  const airData = {
    co2: '400 ppm',
    pm25: '15 µg/m³',
    no2: '25 ppb'
  };

  // Filter the metrics that are selected
  const selectedEntries = Object.entries(selectedMetrics).filter(([_, isSelected]) => isSelected);

  return (
    <MapContainer
      center={thessalonikiCoords}
      zoom={13}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={thessalonikiCoords}>
        <Popup>
          {selectedEntries.length ? (
            <div>
              {selectedEntries.map(([metric]) => (
                <div key={metric}>
                  {metric.toUpperCase()}: {airData[metric]}
                </div>
              ))}
            </div>
          ) : (
            'Select a metric to display air quality data.'
          )}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ThessalonikiMap;
