import React from 'react';
import { motion } from 'framer-motion';
import styles from './PremiumServices.module.css';

// ─── SVG Icons ───
const GlobeExchangeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    <path d="M8 12a4 4 0 108 0 4 4 0 10-8 0"/>
  </svg>
);

const EnergyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const TrolleyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <rect x="3" y="15" width="18" height="6" rx="1"/>
    <circle cx="7" cy="21" r="2"/><circle cx="17" cy="21" r="2"/>
    <path d="M5 15V5h4v10M11 9h4v6M15 5h4v10"/>
  </svg>
);

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6l-1 2.5L9 13l-4.5 4.5-2.5-.5-1.5 1.5 4.5 1.5 1.5 4.5 1.5-1.5-.5-2.5L11 15l3.7 6.3c.4.7 1 .7 1.4.3l2.5-1c.4-.2.7-.6.6-1.1z"/>
  </svg>
);

// ─── Data ───
const PREMIUM_SERVICES = [
  {
    id: 1,
    title: 'Import & Export Services',
    desc: 'Ramsam Trends offers reliable and efficient import & export services, handling everything from sourcing and supplier coordination to customs clearance and final delivery...',
    icon: <GlobeExchangeIcon />
  },
  {
    id: 2,
    title: 'Global Energy & Fuel Solutions',
    desc: 'Ramsam Trends – Powering Global Energy & Fuel Solutions. Ramsam Trends delivers reliable sourcing, quality-assured fuels, and seamless global logistics for aviation, industrial, and energy markets worldwide.',
    icon: <EnergyIcon />
  },
  {
    id: 3,
    title: 'All Types Of Scraps',
    desc: 'From ferrous to non-ferrous, Ramsam Trends delivers seamless scrap procurement solutions worldwide. Ramsam Trends is a global leader in the procurement of all types of scrap, offering reliable sourcing, quality assurance, and seamless international trade solutions.',
    icon: <TrolleyIcon />
  },
  {
    id: 4,
    title: 'Global Agro Commodities Solutions',
    desc: 'Ramsam Trends delivers quality-assured agro commodities through trusted sourcing, competitive pricing, and seamless global trade solutions specializing in the export and import of premium organic and Ayurvedic products, connecting wellness-focused brands and retailers with trusted global suppliers...',
    icon: <PlaneIcon />
  }
];

const PremiumServices = () => {
  return (
    <section className={styles.premiumSection}>
      {/* Subtle Background Sweeping Lines Pattern */}
      <div className={styles.bgLines}></div>

      <div className={styles.inner}>
        
        {/* Header */}
        <div className={styles.premiumHeader}>
          <div className={styles.pill}>OUR SERVICES</div>
          <h2 className={styles.premiumTitle}>Premium Services By Ramsam Trends</h2>
          <p className={styles.premiumSubtitle}>
            Global companies are looking to establish reliable sourcing channels globally, 
            including North American & Indian market.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.premiumGrid}>
          {PREMIUM_SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id} 
              className={styles.premiumCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              
              {/* Decorative Orange Blob (Now hidden by default, shown on hover) */}
              <div className={styles.orangeBlob}></div>
              
              {/* Card Content Wrapper */}
              <div className={styles.premiumCardInner}>
                <div className={styles.premiumIconOuter}>
                  <div className={styles.premiumIconInner}>
                    {service.icon}
                  </div>
                </div>
                
                <div className={styles.premiumText}>
                  <h3 className={styles.premiumCardTitle}>{service.title}</h3>
                  <p className={styles.premiumCardDesc}>{service.desc}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PremiumServices;