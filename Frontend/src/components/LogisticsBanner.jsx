import React from 'react';
import { motion } from 'framer-motion';
import styles from './LogisticsBanner.module.css';

// SVG Icons for Stats
const AirplaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6l-1 2.5L9 13l-4.5 4.5-2.5-.5-1.5 1.5 4.5 1.5 1.5 4.5 1.5-1.5-.5-2.5L11 15l3.7 6.3c.4.7 1 .7 1.4.3l2.5-1c.4-.2.7-.6.6-1.1z" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LogisticsBanner = () => {
  // Exactly 3 stats now
  const stats = [
    { icon: <AirplaneIcon />, number: '10k', label: 'Successful\nTransportation' },
    { icon: <TruckIcon />, number: '256', label: 'Land Freight\nTransportation' },
    { icon: <GlobeIcon />, number: '25+', label: 'Countries of\nOperation' }
  ];

  return (
    <div className={styles.wrapper}>
      
      {/* ─── Top Stats Section ─── */}
      <section className={styles.statsSection}>
        <div className={styles.statsBgOverlay}></div>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }}
                className={styles.statCard}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statContent}>
                  <h3 className={styles.statNumber}>{stat.number}</h3>
                  <p className={styles.statLabel}>
                    {stat.label.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner Section ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className={styles.ctaBanner}
          >
            {/* Dashed Border Inside */}
            <div className={styles.ctaDashedBorder}></div>
            
            <div className={styles.ctaContent}>
              <div className={styles.ctaTextContainer}>
                <h2 className={styles.ctaTitle}>
                  We ensure safe<br />transportation & delivery
                </h2>
                <p className={styles.ctaText}>
                  With a <strong>global network</strong>, Ramsam Trends can serve clients across continents, 
                  including North America, Asia, and other international markets. This helps ensure 
                  <strong> timely delivery, regulatory compliance and tailored solutions</strong> for airline 
                  and fuel distribution partners.
                </p>
              </div>

              <div className={styles.ctaVisuals}>
                {/* Image */}
                <img 
                  src="https://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/aboutus.jpg" 
                  alt="Delivery Professional" 
                  className={styles.deliveryImg}
                />
                
                {/* Floating Phone Pill */}
                <div className={styles.phonePill}>
                  <div className={styles.phoneIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className={styles.phoneNumber}>+1 (613) 663-0578</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LogisticsBanner;