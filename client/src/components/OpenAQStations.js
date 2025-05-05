// components/OpenAQStations.jsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import stations from '../assets/stations.json';

const OpenAQStations = () => {
  return (
    <>
      {stations.results.map((station) => {
        const { id, name, coordinates } = station;
        if (!coordinates || !coordinates.latitude || !coordinates.longitude) return null;

        return (
          <Marker
            key={id}
            position={[coordinates.latitude, coordinates.longitude]}
          >
            <Popup>
              <strong>{name}</strong><br />
              Lat: {coordinates.latitude}, Lng: {coordinates.longitude}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default OpenAQStations;
