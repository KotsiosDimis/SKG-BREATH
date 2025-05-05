import React from 'react';
import Layout from '../components/Layout';
import { MapContainer, TileLayer } from 'react-leaflet';
import OpenAQStations from '../components/OpenAQStations';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapPage = () => {
  const mapCenter = [40.6401, 22.9444];

  return (
    <Layout>
      <div style={{ height: '100%', width: '100%' }}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <OpenAQStations />
        </MapContainer>
      </div>
    </Layout>
  );
};

export default MapPage;
