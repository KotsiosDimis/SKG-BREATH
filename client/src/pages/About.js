import React from 'react';
import Layout from '../components/Layout';
import PollutantCard from '../components/PollutantCard';
import pollutants from '../assets/pollutantCardData';
import '../styles/theme.css';

const About = () => {
  // Split current pollutants and future pollutants
  const currentPollutants = pollutants.filter(p => ['co', 'no', 'no2', 'so2', 'o3'].includes(p.id));
  const futurePollutants = pollutants.filter(p => !['co', 'no', 'no2', 'so2', 'o3'].includes(p.id));

  return (
    <Layout>
      <main>
        {/* Current Pollutants */}
        <section id="pollutants" className="py-5 bg-surface text-center">
          <div className="container">
            <h2 className="mb-4">Οι Ρύποι που Παρακολουθούμε</h2>
            <p className="text-soft mb-5">
              Παρακάτω μπορείτε να δείτε πληροφορίες για τους σημαντικότερους ατμοσφαιρικούς ρύπους που επηρεάζουν την υγεία μας.
            </p>
            <div className="row">
              {currentPollutants.map((pollutant) => (
                <div key={pollutant.id} className="col-md-4 mb-4">
                  <PollutantCard {...pollutant} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Pollutants */}
        <section id="future-pollutants " className="py-5 section-glass text-center">
          <div className="container">
            <h2 className=" mb-4">Επερχόμενη Υποστήριξη</h2>
            <p className="text-soft mb-5">
              Οι παρακάτω ρύποι θα προστεθούν στο μέλλον με σκοπό την πληρέστερη εικόνα της ποιότητας αέρα.
            </p>
            <div className="row">
              {futurePollutants.map((pollutant) => (
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