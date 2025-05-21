import { useEffect, useState } from 'react';
import { Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import '../styles/MapOverlay.css';

const getSeverityColor = (pollutant, value) => {
  if (pollutant === 'co') return value > 300 ? '#800080' : value > 150 ? '#ff0000' : value > 50 ? '#ffae42' : '#00e400';
  if (pollutant === 'no2') return value > 200 ? '#800080' : value > 100 ? '#ff0000' : value > 50 ? '#ffae42' : '#00e400';
  if (pollutant === 'no') return value > 150 ? '#800080' : value > 100 ? '#ff0000' : value > 50 ? '#ffae42' : '#00e400';
  if (pollutant === 'so2') return value > 125 ? '#800080' : value > 75 ? '#ff0000' : value > 25 ? '#ffae42' : '#00e400';
  if (pollutant === 'o3') return value > 180 ? '#800080' : value > 120 ? '#ff0000' : value > 60 ? '#ffae42' : '#00e400';
  return '#999';
};

const pollutantStyles = {
  co: { multiplier: 2 },
  no: { multiplier: 400 },
  no2: { multiplier: 30 },
  so2: { multiplier: 50 },
  o3: { multiplier: 25 },
};

const Map1 = () => {
  const map = useMap();
  const [data, setData] = useState([]);
  const [visiblePollutants, setVisiblePollutants] = useState({
    co: true,
    no: true,
    no2: true,
    so2: true,
    o3: true,
  });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch('https://skg-breath.onrender.com/api/map')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch /api/map', err));
  }, []);

  const handleToggle = (pollutant) => {
    setVisiblePollutants((prev) => ({
      ...prev,
      [pollutant]: !prev[pollutant],
    }));
  };

  const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });

  return (
    <>
      <div className="overlay top-right">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '▶' : '✕'}
        </button>
        {!collapsed && (
          <div className="toggle-list">
            {Object.keys(pollutantStyles).map((pollutant) => (
              <label key={pollutant} className="switch-label">
                <span>{pollutant.toUpperCase()}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={visiblePollutants[pollutant]}
                    onChange={() => handleToggle(pollutant)}
                  />
                  <span className="slider round"></span>
                </label>
              </label>
            ))}
          </div>
        )}
      </div>

      {data.map((station, idx) => {
        if (station.lat == null || station.lon == null) return null; // skip invalid
        return (
          <div key={idx}>
            {Object.keys(pollutantStyles).map((pollutant) => {
              const value = station[pollutant];
              const visible = visiblePollutants[pollutant];
              if (value && visible) {
                const color = getSeverityColor(pollutant, value);
                return (
                  <Circle
                    key={`${idx}-${pollutant}`}
                    center={[station.lat, station.lon]}
                    pathOptions={{ color, fillColor: color, fillOpacity: 0.4 }}
                    radius={value * pollutantStyles[pollutant].multiplier}
                  />
                );
              }
              return null;
            })}
            <Marker
              position={[station.lat, station.lon]}
              icon={customIcon}
              eventHandlers={{
                click: () => map.setView([station.lat, station.lon], 14, { animate: true }),
              }}
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
          </div>
        );
      })}
    </>
  );
};

export default Map1;
