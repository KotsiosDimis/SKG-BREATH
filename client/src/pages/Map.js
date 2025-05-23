import React from 'react';
import Layout from '../components/Layout';
import { MapContainer, TileLayer} from 'react-leaflet';
import Map1 from '../components/Map1.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapPage = () => {
  const mapCenter = [40.6401, 22.9444];

  return (
    <Layout>
      <div
        style={{
          height: 'calc(100vh - 100px)', // adjust height based on your navbar+footer
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={12}
          minZoom={11}
          maxZoom={14}
          scrollWheelZoom={true}
          zoomControl={true}
          style={{ height: '100%', width: '100%' }}
          maxBounds={[
            [40.40, 22.70],
            [40.80, 23.20],
          ]}
          maxBoundsViscosity={1.0}
        >
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
