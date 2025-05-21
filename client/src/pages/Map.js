import React from 'react';
import Layout from '../components/Layout';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import Map1 from '../components/Map1.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapPage = () => {
  const mapCenter = [40.6401, 22.9444];

  return (
    <Layout>
      <div style={{ height: '100vh', width: '100%' }}>
        <MapContainer
          center={mapCenter}
          zoom={12}
          minZoom={11}
          maxZoom={14}
          scrollWheelZoom={true}
          zoomControl={true}
          style={{ height: '100%', width: '100%' }}
          maxBounds={[
            [40.48, 22.85],
            [40.74, 23.1],
          ]}
          maxBoundsViscosity={1.0}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Map1 />
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapPage;
