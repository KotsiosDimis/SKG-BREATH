import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const PollutionChartsSingleStation = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [pollutants, setPollutants] = useState({
    co: true,
    no: true,
    no2: true,
    so2: true,
    o3: true,
  });
  const [groupBy, setGroupBy] = useState('hourly'); // 'hourly' or 'monthly'
  const [data, setData] = useState([]);

  // Fetch station list
  useEffect(() => {
    fetch('https://skg-breath.onrender.com/api/okgAir/municipalities')
      .then(res => res.json())
      .then(stations => {
        setStations(stations);
        if (stations.length > 0) setSelectedStation(stations[0]);
      })
      .catch(err => console.error('Failed to fetch municipalities:', err));
  }, []);

  // Fetch data for selected station
  useEffect(() => {
    if (!selectedStation) return;

    const fetchData = async () => {
      if (groupBy === 'hourly') {
        const res = await fetch(`https://skg-breath.onrender.com/api/okgAir/${selectedStation}`);
        const json = await res.json();
        setData(json.sort((a, b) => new Date(a.time) - new Date(b.time)));
      } else {
        const keys = Object.keys(pollutants);
        const all = await Promise.all(
          keys.map(p =>
            fetch(`https://skg-breath.onrender.com/api/okgAir/average?municipality=${selectedStation}&by=month&pollutant=${p}`)
              .then(res => res.json())
              .then(values => values.map(d => ({ group: d.grouping, [p]: d.avg })))
          )
        );

        const merged = {};
        all.forEach(list => {
          list.forEach(row => {
            if (!merged[row.group]) merged[row.group] = { time: row.group };
            Object.assign(merged[row.group], row);
          });
        });

        setData(Object.values(merged));
      }
    };

    fetchData();
  }, [selectedStation, groupBy, pollutants]); 

  const handleToggle = key => {
    setPollutants(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Ρύποι (CO, NO, NO₂, SO₂, O₃)</h2>

      <div className="mb-4">
        <label>
          Εμφάνιση κατά:
          <select
            value={groupBy}
            onChange={e => setGroupBy(e.target.value)}
            className="ml-2"
          >
            <option value="hourly">Ώρα</option>
            <option value="monthly">Μήνα</option>
          </select>
        </label>

        <label className="ml-6">
          Σταθμός:
          <select
            value={selectedStation}
            onChange={e => setSelectedStation(e.target.value)}
            className="ml-2"
          >
            {stations.map(station => (
              <option key={station} value={station}>
                {station.charAt(0).toUpperCase() + station.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4">
        {Object.keys(pollutants).map(key => (
          <label key={key} className="mr-4">
            <input
              type="checkbox"
              checked={pollutants[key]}
              onChange={() => handleToggle(key)}
            />
            {key.toUpperCase()}
          </label>
        ))}
      </div>

      <h3 className="mb-2">{selectedStation.charAt(0).toUpperCase() + selectedStation.slice(1)}</h3>

      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            {pollutants.co && <Line type="monotone" dataKey="co" stroke="#ff7300" name="CO" />}
            {pollutants.no && <Line type="monotone" dataKey="no" stroke="#8884d8" name="NO" />}
            {pollutants.no2 && <Line type="monotone" dataKey="no2" stroke="#82ca9d" name="NO₂" />}
            {pollutants.so2 && <Line type="monotone" dataKey="so2" stroke="#d88484" name="SO₂" />}
            {pollutants.o3 && <Line type="monotone" dataKey="o3" stroke="#5bc0de" name="O₃" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PollutionChartsSingleStation;
