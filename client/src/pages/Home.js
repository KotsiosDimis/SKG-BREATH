import React from 'react';
import Layout from '../components/Layout';
import '../styles/theme.css';

const Home = () => {
  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section id="hero" className="fullscreen-section bg-accent text-light d-flex flex-column justify-content-center align-items-center text-center">
          <div className="hero-content">
            <h1>SKG BREATH</h1>
            <p className="lead">Η Εφαρμογή που Σου Λέει Τι Αναπνέεις</p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="fullscreen-section bg-primary text-light d-flex flex-column justify-content-center align-items-center text-center">
          <div className="container">
            <h2>Σχετικά με την εφαρμογή</h2>
            <p>
              Το <strong>SKG BREATH</strong> είναι μια σύγχρονη εφαρμογή παρακολούθησης ποιότητας αέρα που στοχεύει στην ενημέρωση των πολιτών της Θεσσαλονίκης και άλλων περιοχών. Παρέχει live δεδομένα και χάρτες με ευαισθησία στο design και την ακριβή πληροφόρηση.
            </p>
          </div>
        </section>

        {/* Air Quality Section */}
        <section id="air-quality" className="fullscreen-section bg-accent d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="text-primary">Ποιότητα Αέρα</h2>
                <p className="text-soft">Πληροφορίες για PM2.5, PM10 και άλλους δείκτες ποιότητας αέρα.</p>
              </div>
              <div className="col-md-6">
                <h2 className="text-primary">Ρύποι</h2>
                <p className="text-soft">Παρακολούθηση ρύπων όπως CO, NO<sub>2</sub>, O<sub>3</sub> και άλλων επικίνδυνων ουσιών.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default Home;
