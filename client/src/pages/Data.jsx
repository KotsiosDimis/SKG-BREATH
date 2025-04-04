import React, { useEffect, useState } from 'react';
import { getAirQuality } from '../services/airQualityService';

const Data = () => {
  const [airData, setAirData] = useState(null);

  useEffect(() => {
    getAirQuality().then(setAirData).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Air Quality Data</h1>
      {airData ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(airData, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Data;
