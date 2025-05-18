import React from 'react';
import Layout from '../components/Layout';
import '../styles/theme.css';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section id="hero" className="fullscreen-section bg-light">
        <div className="hero-content text-center" style={{ paddingTop: '15vh' }}>
          <h1 className="text-accent">SKG BREATH</h1>
          <p className="lead text-secondary">Η Εφαρμογή που Σου Λέει Τι Αναπνέεις</p>
        </div>
      </section>

      {/* Air Quality Section */}
      <section id="air-quality" className="fullscreen-section d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="text-primary">Ποιότητα Αέρα</h2>
              <p className="text-soft">Πληροφορίες για PM2.5, PM10 κ.λπ.</p>
            </div>
            <div className="col-md-6">
              <h2 className="text-primary">Ρύποι</h2>
              <p className="text-soft">Πληροφορίες για CO, NO2, O3 κ.λπ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="fullscreen-section d-flex flex-column justify-content-center align-items-center bg-light text-center">
        <div className="container">
          <h2 className="text-accent">Σχετικά με την εφαρμογή</h2>
          <p className="text-soft">Περιγραφή και στόχοι της εφαρμογής.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
