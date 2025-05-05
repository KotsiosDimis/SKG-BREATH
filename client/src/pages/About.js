import React from 'react';
import Layout from '../components/Layout';
import PollutantCard from '../components/PollutantCard';

const About = () => {
  const coData = {
    title: '🔹 CO (Μονοξείδιο του Άνθρακα)',
    unit: 'μg/m³ ή ppm',
    source: 'Μηχανές εσωτερικής καύσης (π.χ. αυτοκίνητα), καύση ξύλου',
    safeLevel: '< 4 mg/m³ (ή 4000 μg/m³) → Καλή ποιότητα',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 4000 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '4001 – 7000 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 7000 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO Air Quality Guidelines (2021), Table 0.1, σελ. 19',
    },
  };

  const noData = {
    title: '🔹 NO (Μονοξείδιο του Αζώτου)',
    unit: 'μg/m³',
    source: 'Καύση καυσίμων (οχήματα, σταθμοί ενέργειας), βιομηχανία',
    safeLevel: 'Δεν υπάρχει επίσημο όριο από τον WHO — χρησιμοποιούνται ενδεικτικές τιμές.',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 50 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '51 – 100 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 100 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.eea.europa.eu/data-and-maps/indicators/air-quality-overview/assessment',
      text: 'EEA Air Quality Guidelines (based on monitoring practices)',
    },
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <PollutantCard {...coData} />
          </div>
          <div className="col-md-6 mb-4">
            <PollutantCard {...noData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
