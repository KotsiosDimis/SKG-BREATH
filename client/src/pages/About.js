import React from 'react';
import Layout from '../components/Layout';
import PollutantCard from '../components/PollutantCard';
import pollutants from '../data/pollutants';
import '../styles/theme.css';

const About = () => {
  return (
    <Layout>
      <main>
        <section id="pollutants" className="py-5 bg-surface text-center">
          <div className="container">
            <h2 className="text-accent mb-4">Οι Ρύποι που Παρακολουθούμε</h2>
            <p className="text-soft mb-5">
              Παρακάτω μπορείτε να δείτε πληροφορίες για τους σημαντικότερους ατμοσφαιρικούς ρύπους που επηρεάζουν την υγεία μας.
            </p>

            <div className="row">
              {pollutants.map((pollutant) => (
                <div key={pollutant.id} className="col-md-4 mb-4">
                  <PollutantCard {...pollutant} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default About;
