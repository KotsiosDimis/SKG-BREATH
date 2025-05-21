import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const PollutionChart = () => {
  const [data, setData] = useState([]);
  const [groupBy, setGroupBy] = useState('month');

  useEffect(() => {
    fetch(`http://localhost:3001/api/dimos-thessalonikis/summary?groupBy=${groupBy}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to fetch data:', err));
  }, [groupBy]);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <h2>Μέσες Τιμές PM10 / PM2.5 ανά {groupBy === 'month' ? 'Μήνα' : 'Έτος'}</h2>
      
      <label>
        Ομαδοποίηση:
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="month">Μήνα</option>
          <option value="year">Έτος</option>
        </select>
      </label>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg_pm10" stroke="#ff7300" name="PM10" />
          <Line type="monotone" dataKey="avg_pm25" stroke="#387908" name="PM2.5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PollutionChart;
