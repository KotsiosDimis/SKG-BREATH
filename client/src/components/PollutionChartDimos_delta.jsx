import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const PollutionChartDimos_delta = () => {
  const [data, setData] = useState([]);
  const [pollutants, setPollutants] = useState({
    co: true,
    no: true,
    no2: true,
    so2: true,
    o3: true,
  });
  const [groupBy, setGroupBy] = useState('hourly'); // 'hourly' or 'monthly'

  useEffect(() => {
    const endpoint =
      groupBy === 'hourly'
        ? 'http://localhost:3001/api/okgAir/dimos_delta'
        : `http://localhost:3001/api/okgAir/average?municipality=dimos_delta&by=month&pollutant=`;

    if (groupBy === 'hourly') {
      fetch(endpoint)
        .then(res => res.json())
        .then(json => {
          const sorted = json.sort((a, b) => new Date(a.time) - new Date(b.time));
          setData(sorted);
        })
        .catch(err => console.error('Failed to fetch data:', err));
    } else {
      // For monthly, we load all pollutants separately and merge them
      const keys = Object.keys(pollutants);
      Promise.all(
        keys.map(p =>
          fetch(`${endpoint}${p}`)
            .then(res => res.json())
            .then(values => values.map(d => ({ group: d.group, [p]: d.avg })))
        )
      )
        .then(all => {
          // merge datasets by 'group'
          const merged = {};
          all.forEach(list => {
            list.forEach(row => {
              if (!merged[row.group]) merged[row.group] = { time: row.group };
              Object.assign(merged[row.group], row);
            });
          });
          setData(Object.values(merged));
        })
        .catch(err => console.error('Failed to fetch monthly data:', err));
    }
  }, [groupBy]);

  const handleToggle = key => {
    setPollutants(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ width: '50%', height: 500 }}>
      {/* <h2>Ρύποι (CO, NO, NO₂, SO₂, O₃) ανά {groupBy === 'hourly' ? 'Ώρα' : 'Μήνα'}</h2> */}

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Εμφάνιση κατά:
          <select
            value={groupBy}
            onChange={e => setGroupBy(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="hourly">Ώρα</option>
            <option value="monthly">Μήνα</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        {Object.keys(pollutants).map(key => (
          <label key={key} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={pollutants[key]}
              onChange={() => handleToggle(key)}
            />
            {key.toUpperCase()}
          </label>
        ))}
      </div>
    <p>Demos Delta</p>
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
  );
};

export default PollutionChartDimos_delta;
