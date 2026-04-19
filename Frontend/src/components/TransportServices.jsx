import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './TransportServices.module.css';

// ─── SVG Icons ───
const ShipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M2 21c4 0 7-2 10-2s6 2 10 2"/>
    <path d="M19 21v-4M2 13h20M5 13v-4a2 2 0 012-2h10a2 2 0 012 2v4M9 7V3M15 7V3"/>
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6l-1 2.5L9 13l-4.5 4.5-2.5-.5-1.5 1.5 4.5 1.5 1.5 4.5 1.5-1.5-.5-2.5L11 15l3.7 6.3c.4.7 1 .7 1.4.3l2.5-1c.4-.2.7-.6.6-1.1z"/>
  </svg>
);

// ─── Data with slugs added for routing ───
export const TRANSPORT_SERVICES = [
  {
    id: 1,
    slug: 'maritime-transportation',
    title: 'Maritime transportation',
    desc: 'Global Shipping with Trusted Ocean Freight Solutions...',
    img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/1%20Maritime%20Freight%20Transportation.png',
    icon: <ShipIcon />
  },
  {
    id: 2,
    slug: 'land-freight-transportation',
    title: 'Land Freight transportation',
    desc: 'Efficient Ground Logistics You Can Count On...',
    img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/ChatGPT%20Image%20Apr%2017,%202026,%2010_50_51%20PM.png',
    icon: <TruckIcon />
  },
  {
    id: 3,
    slug: 'intermodal-shipping',
    title: 'Intermodal Shipping',
    desc: 'Smarter Logistics Through Multi-Mode Transport...',
    img: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/airplane.jpeg',
    icon: <PlaneIcon />
  }
];


const TransportServices = () => {
  return (
    <section className={styles.transportSection}>
      <div className={styles.inner}>
        
        {/* ─── Header ─── */}
        <div className={styles.header}>
          <div className={styles.pill}>OUR SERVICES</div>
          <h2 className={styles.title}>Global Procurement Expertise</h2>
          <p className={styles.subtitle}>
            We specialize in sourcing high-quality products from verified global suppliers, refineries, farms, and recycling networks, ensuring reliability, traceability, and compliance at every stage.
          </p>
        </div>

        {/* ─── Grid ─── */}
        <div className={styles.grid}>
          {TRANSPORT_SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.imgWrapper}>
                <img src={service.img} alt={service.title} className={styles.img} loading="lazy" />
                
                {/* Floating Center Icon */}
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>
                    {service.icon}
                  </div>
                </div>
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                {/* Link uses the unique slug to navigate */}
                <Link to={`/service/${service.slug}`} className={styles.readMoreBtn}>
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TransportServices;