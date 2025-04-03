import React, { useEffect, useState } from 'react';

function App() {
  const [airData, setAirData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/open-weather') // Proxy forwards to backend
      .then((res) => res.json())
      .then((data) => setAirData(data))
      .catch((err) => console.error('Error fetching air quality:', err));
  }, []);

  return (
    <div className="App">
      <h1>Eimai o alex kai eime pellos thelo na piasi protathlima i omonoia!</h1>
      {airData ? (
        <pre>{JSON.stringify(airData, null, 2)}</pre>
      ) : (
        <p>Loading air quality data...</p>
      )}
    </div>
  );
}

export default App;