import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Home = () => {
  const [airData, setAirData] = useState(null);

  useEffect(() => {
    fetch('https://skg-breath.onrender.com/api/open-weather')
      .then((res) => res.json())
      .then((data) => setAirData(data))
      .catch((err) => console.error('Error fetching air quality:', err));
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1>Thessaloniki Air Quality</h1>
        {airData ? (
          <pre>{JSON.stringify(airData, null, 2)}</pre>
        ) : (
          <p>Loading air quality data...</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
