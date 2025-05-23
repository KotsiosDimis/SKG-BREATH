// Map1.js
import { useEffect, useState } from 'react';
import { Marker, Popup, Circle,} from 'react-leaflet';
import L from 'leaflet';
import '../styles/MapOverlay.css';

const getSeverityColor = (pollutant, value) => {
  if (value == null) return '#999';
  if (pollutant === 'co') return value > 7000 ? '#ff0000' : value > 4000 ? '#ffae42' : '#00e400';
  if (pollutant === 'no') return value > 100 ? '#ff0000' : value > 50 ? '#ffae42' : '#00e400';
  if (pollutant === 'no2') return value > 400 ? '#ff0000' : value > 200 ? '#ffae42' : '#00e400';
  if (pollutant === 'so2') return value > 500 ? '#ff0000' : value > 350 ? '#ffae42' : '#00e400';
  if (pollutant === 'o3') return value > 180 ? '#ff0000' : value > 100 ? '#ffae42' : '#00e400';
  return '#999';
};

const getSeverityLabel = (pollutant, value) => {
  if (value == null) return 'Άγνωστο';
  if (pollutant === 'co') return value > 7000 ? 'Κακή Ποιότητα' : value > 4000 ? 'Μέτρια Ποιότητα' : 'Καλή Ποιότητα';
  if (pollutant === 'no') return value > 100 ? 'Κακή Ποιότητα' : value > 50 ? 'Μέτρια Ποιότητα' : 'Καλή Ποιότητα';
  if (pollutant === 'no2') return value > 400 ? 'Κακή Ποιότητα' : value > 200 ? 'Μέτρια Ποιότητα' : 'Καλή Ποιότητα';
  if (pollutant === 'so2') return value > 500 ? 'Κακή Ποιότητα' : value > 350 ? 'Μέτρια Ποιότητα' : 'Καλή Ποιότητα';
  if (pollutant === 'o3') return value > 180 ? 'Κακή Ποιότητα' : value > 100 ? 'Μέτρια Ποιότητα' : 'Καλή Ποιότητα';
  return 'Άγνωστο';
};

const pollutantStyles = {
  co: { multiplier: 2 },
  no: { multiplier: 400 },
  no2: { multiplier: 30 },
  so2: { multiplier: 50 },
  o3: { multiplier: 25 },
};

const Map1 = () => {
  const [data, setData] = useState([]);
  const [visiblePollutants, setVisiblePollutants] = useState({ co: true, no: true, no2: true, so2: true, o3: true });
  const [collapsed, setCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-12-31');

  useEffect(() => {
    fetch(`https://skg-breath.onrender.com/api/map?date=${selectedDate}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch /api/map', err));
  }, [selectedDate]);

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
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>{collapsed ? '▶' : '✕'}</button>
        {!collapsed && (
          <div className="toggle-list">
            {Object.keys(pollutantStyles).map((p) => (
              <label key={p} className="switch-label">
                <span>{p.toUpperCase()}</span>
                <label className="switch">
                  <input type="checkbox" checked={visiblePollutants[p]} onChange={() => setVisiblePollutants(prev => ({ ...prev, [p]: !prev[p] }))} />
                  <span className="slider round"></span>
                </label>
              </label>
            ))}
            <input type="date" value={selectedDate} min="2017-01-01" max="2024-12-31" onChange={(e) => setSelectedDate(e.target.value)} className="date-picker mt-3" />
          </div>
        )}
      </div>

      <div className="legend bottom-left">
        <strong>Επεξήγηση Χρωμάτων</strong>
        <div><span style={{ backgroundColor: '#00e400' }} className="legend-color"></span> Καλή Ποιότητα</div>
        <div><span style={{ backgroundColor: '#ffae42' }} className="legend-color"></span> Μέτρια Ποιότητα</div>
        <div><span style={{ backgroundColor: '#ff0000' }} className="legend-color"></span> Κακή Ποιότητα</div>
      </div>

      {data.map((station, idx) => (
        <div key={idx}>
          {Object.keys(pollutantStyles).map((p) => {
            const val = station[p];
            const visible = visiblePollutants[p];
            if (val && visible) {
              const color = getSeverityColor(p, val);
              return <Circle key={`${idx}-${p}`} center={[station.lat, station.lon]} pathOptions={{ color, fillColor: color, fillOpacity: 0.4 }} radius={val * pollutantStyles[p].multiplier} />;
            }
            return null;
          })}
          <Marker position={[station.lat, station.lon]} icon={customIcon}>
            <Popup>
              <strong>{station.municipality}</strong><br />
              {['co', 'no', 'no2', 'so2', 'o3'].map((p) =>
                station[p] != null ? (
                  <div key={p}>
                    <span><strong>{p.toUpperCase()}:</strong> {station[p].toFixed(2)} μg/m³</span><br />
                    <span style={{ color: getSeverityColor(p, station[p]), fontWeight: 'bold' }}>{getSeverityLabel(p, station[p])}</span><br />
                  </div>
                ) : null
              )}
            </Popup>
          </Marker>
        </div>
      ))}
    </>
  );
};

export default Map1;
