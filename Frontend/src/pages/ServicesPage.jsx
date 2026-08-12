import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransportServices from '../components/TransportServices'; // <-- Import new component
import PremiumServices from '../components/PremiumServices';
import styles from './ServicesPage.module.css';
import { Helmet } from "react-helmet-async";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page} data-testid="services-page">
      <Helmet>
  <title>Services | Ramsam Trends</title>

  <meta
    name="description"
    content="Explore Ramsam Trends services, including global sourcing, logistics, trading and reliable business solutions."
  />

  <link
    rel="canonical"
    href="https://www.ramsamtrends.com/services"
  />

  <meta
    property="og:title"
    content="Services | Ramsam Trends"
  />

  <meta
    property="og:description"
    content="Explore Ramsam Trends global sourcing, logistics, trading and business services."
  />

  <meta
    property="og:url"
    content="https://www.ramsamtrends.com/services"
  />

  <meta
    property="og:type"
    content="website"
  />
</Helmet>
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