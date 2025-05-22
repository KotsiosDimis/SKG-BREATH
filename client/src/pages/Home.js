import React from 'react';
import Layout from '../components/Layout';
import '../styles/theme.css';

const Home = () => {
  return (
    <Layout>
      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="fullscreen-section bg-accent text-light d-flex flex-column justify-content-center align-items-center text-center"
        >
          <div className="hero-content">
            <h1 className="hero-title">SKG BREATH</h1>
            <p className="lead">Η Εφαρμογή που Σου Λέει Τι Αναπνέεις</p>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="fullscreen-section bg-primary text-light d-flex flex-column justify-content-center align-items-center text-center"
        >
          <div className="container">
            <h2 className="mb-4">Σχετικά με την εφαρμογή</h2>
            <p className="lead">
              Το <strong>SKG BREATH</strong> είναι μια σύγχρονη εφαρμογή παρακολούθησης της ποιότητας του αέρα που
              δημιουργήθηκε για να βοηθήσει τους πολίτες της Θεσσαλονίκης και άλλων περιοχών να γνωρίζουν τι πραγματικά
              αναπνέουν καθημερινά.
            </p>
            <p className="lead">
              Στόχος μας είναι η έγκυρη ενημέρωση μέσω live δεδομένων, οπτικών χαρτών και ενδείξεων ποιότητας, με
              εύχρηστο και καλαίσθητο περιβάλλον.
            </p>
            <p className="lead">
              Η ομάδα μας αποτελείται από φοιτητές του ΔΙΠΑΕ με πάθος για την τεχνολογία, την καινοτομία και το
              περιβάλλον.
            </p>
          </div>
        </section>

        {/* Air Quality Section */}
        <section
          id="air-quality"
          className="fullscreen-section bg-accent text-light text-center d-flex flex-column justify-content-center align-items-center"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-4">
                <h2>Ποιότητα Αέρα</h2>
                <p className="lead">
                  Η ποιότητα του αέρα παρακολουθείται βάσει δεικτών όπως PM2.5, PM10 και PM1. Αυτοί οι δείκτες σχετίζονται
                  άμεσα με την υγεία, ιδιαίτερα σε ευπαθείς ομάδες. Η εφαρμογή παρέχει άμεσες ενδείξεις καλής, μέτριας ή
                  κακής ποιότητας, βασισμένες στα όρια του ΠΟΥ.
                </p>
              </div>
              <div className="col-md-6 mb-4">
                <h2>Ρύποι</h2>
                <p className="lead">
                  Παρακολουθούνται ρύποι όπως CO, NO<sub>2</sub>, O<sub>3</sub>, SO<sub>2</sub> και NH<sub>3</sub>, με
                  βάση σταθμούς μέτρησης. Τα δεδομένα ανανεώνονται σε πραγματικό χρόνο και παρουσιάζονται με κατανοητό,
                  φιλικό προς τον χρήστη τρόπο.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
