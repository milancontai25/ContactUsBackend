import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransportServices from '../components/TransportServices'; // <-- Import new component
import PremiumServices from '../components/PremiumServices';
import styles from './ServicesPage.module.css';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page} data-testid="services-page">
      <Navbar />

      {/* ─── NEW Transportation Section (Screenshot 59) ─── */}
      <TransportServices />

      {/* ─── Premium Services Section (Screenshots 56 & 57) ─── */}
      <PremiumServices />

      <Footer />
    </div>
  );
};

export default ServicesPage;