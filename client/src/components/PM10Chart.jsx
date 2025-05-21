import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PM10Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/air-quality/summary')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Failed to fetch chart data:', err));
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Μέση Τιμή PM10 ανά Μήνα (Θεσσαλονίκη)</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis label={{ value: 'μg/m³', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="avg_pm10" stroke="#8884d8" name="PM10" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PM10Chart;
