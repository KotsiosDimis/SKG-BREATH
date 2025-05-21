import React from 'react';
import Layout from '../components/Layout';
import PollutionChart from '../components/PollutionChart';

const LiveData = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Live Air Quality Data</h1>
        <PollutionChart />
      </div>
    </Layout>
  );
};

export default LiveData;
