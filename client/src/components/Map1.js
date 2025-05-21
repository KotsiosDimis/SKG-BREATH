import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/map')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch /api/map', err));
  }, []);

  return (
    <>
      {data.map((station, idx) => (
        <Marker
          key={idx}
          position={[station.lat, station.lon]}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          })}
        >
          <Popup>
            <strong>{station.municipality}</strong><br />
            CO: {station.co?.toFixed(2)}<br />
            NO: {station.no?.toFixed(4)}<br />
            NO₂: {station.no2?.toFixed(2)}<br />
            SO₂: {station.so2?.toFixed(2)}<br />
            O₃: {station.o3?.toFixed(2)}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default Map;
