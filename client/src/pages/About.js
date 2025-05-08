import React from 'react';
import Layout from '../components/Layout';
import PollutantCard from '../components/PollutantCard';
import pollutants from '../data/pollutants'; // άλλαξέ το path αν χρειάζεται

const About = () => {
  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {pollutants.map((pollutant) => (
            <div key={pollutant.id} className="col-md-4 mb-4">
              <PollutantCard {...pollutant} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
