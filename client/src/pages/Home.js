import React from 'react';
import Layout from '../components/Layout';
import '../styles/theme.css';
import { ReactComponent as WhiteTower } from '../assets/images/white-tower.svg';
import designerImage from '../assets/images/designer.jpeg';


const Home = () => {
  return (
    <Layout>
      <main>

        {/* Hero Section */}
        <section
          id="hero"
          className="fullscreen-section bg-primary text-light d-flex align-items-center"
        >
          <div className="container">
            <div className="row align-items-center">

              {/* Left: Title & Subtitle */}
              <div className="col-md-6 text-start">
                <h1 className="hero-title mb-3">SKG BREATH</h1>
                <h2 className="lead">
                  Η εφαρμογή που σου δείχνει <br /> τι πραγματικά αναπνέεις στη Θεσσαλονίκη
                </h2>
                <div className="mt-4">
                  <a href="#air-quality" className="btn btn-light btn-lg">
                    Δες τα Δεδομένα Τώρα
                  </a>
                </div>
              </div>

              {/* Right: SVG or Image */}
              <div className="col-md-6 text-center mt-4 mt-md-0">
                <WhiteTower className="white-tower-icon" />
              </div>

            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="fullscreen-section section-glass d-flex align-items-center"
        >
          <div className="container">
            <div className="row align-items-center">
              
              {/* Left: JPG Image */}
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img src={designerImage} alt="IHU" className="img-fluid vh-75 rounded-4" />
              </div>

              {/* Right: Text */}
              <div className="col-md-6 text-md-start text-center">
                <h2 className="mb-4">Σχετικά με την εφαρμογή</h2>
                <p className="lead">
                  Το <strong>SKG BREATH</strong> είναι μια φοιτητική πρωτοβουλία που δημιουργήθηκε από τρεις φοιτητές του ΔΙΠΑΕ,
                  με στόχο την ενημέρωση των πολιτών της Θεσσαλονίκης για την ποιότητα του αέρα στην πόλη.
                </p>
                <p className="lead">
                  Χρησιμοποιούμε δεδομένα από την πλατφόρμα{' '}
                  <a href="https://tds.okfn.gr" target="_blank" rel="noopener noreferrer">
                    tds.okfn.gr
                  </a>, τα οποία έχουμε μετασχηματίσει σε βάση δεδομένων ώστε να προσφέρουμε
                  πληροφορίες απλές, κατανοητές και προσβάσιμες.
                </p>
                <p className="lead">
                  Στόχος μας είναι να παρουσιάσουμε τα δεδομένα με φιλική διεπαφή και σύγχρονο σχεδιασμό, ώστε κάθε πολίτης
                  να μπορεί να κατανοήσει εύκολα τι συμβαίνει στον αέρα που αναπνέει.
                </p>
              </div>
            </div>
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
                  Τα δεδομένα που παρουσιάζουμε προέρχονται από δημόσια διαθέσιμες πηγές και έχουν οργανωθεί σε σύστημα που επιτρέπει
                  την εύκολη κατανόηση της ποιότητας του αέρα στην περιοχή της Θεσσαλονίκης.
                </p>
              </div>
              <div className="col-md-6 mb-4">
                <h2>Ρύποι</h2>
                <p className="lead">
                  Οι συγκεντρώσεις ρύπων όπως CO, NO, NO<sub>2</sub>, SO<sub>2</sub>, και O<sub>3</sub> παρουσιάζονται με καθαρά γραφήματα και δείκτες,
                  για να μπορείς να δεις πώς εξελίσσονται στον χρόνο και στις περιοχές που σε ενδιαφέρουν.
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
