import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.page} data-testid="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.inner}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.header}>
            <span className={styles.eyebrow}>Who We Are</span>
            <h1 className={styles.headerTitle}>About Us</h1>
            <p className={styles.headerSubtitle}>
              At Ramsam Trends, we are a global trading and sourcing company committed to delivering quality products and dependable logistics solutions. With extensive experience in international trade, we connect trusted suppliers with businesses worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.inner}>
          <div className={styles.missionGrid}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.missionImgWrapper}>
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" alt="Global Logistics" className={styles.missionImg} />
                <div className={styles.missionImgOverlay}></div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={styles.missionContent}>
              <span className={styles.sectionEyebrow}>Our Purpose</span>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <div className={styles.sectionDivider}></div>
              <p className={styles.missionText}>
                Our mission is to simplify global trade by providing reliable sourcing, secure logistics, and high-quality products. We strive to create value for our partners by combining industry expertise with innovative solutions that ensure smooth and successful international transactions.
              </p>
              <p className={styles.missionText}>
                Our focus is on building long-term partnerships through transparency, efficiency, and consistent service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer (Products) */}
      <section className={styles.offerSection}>
        <div className={styles.inner}>
          <div className={styles.centerHeader}>
            <span className={styles.sectionEyebrow}>Our Catalog</span>
            <h2 className={styles.sectionTitle}>What We Offer</h2>
            <div className={styles.sectionDividerCentered}></div>
            <p className={styles.offerIntro}>
              We provide a carefully curated range of products that combine functionality, craftsmanship, and modern design. Our product categories include:
            </p>
          </div>

          <div className={styles.offerGrid}>
            {[
              { title: 'Kitchen Products', desc: 'Functional and stylish items designed to enhance everyday cooking and dining experiences.', icon: '🍽️' },
              { title: 'Lamps & Lights', desc: 'Elegant lighting solutions that add warmth and sophistication to homes and commercial spaces.', icon: '💡' },
              // { title: 'Mirrors', desc: 'Premium decorative mirrors crafted to complement modern and classic interiors.', icon: '🪞' },
              { title: 'Garden Décor', desc: 'Unique outdoor decorative pieces that bring beauty and personality to gardens and landscapes.', icon: '🪴' },
              { title: 'Leather Products', desc: 'Durable and premium leather goods known for quality craftsmanship and timeless style.', icon: '👜' },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={styles.offerCard}>
                <div className={styles.offerIcon}>{item.icon}</div>
                <h3 className={styles.offerTitle}>{item.title}</h3>
                <p className={styles.offerDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whySection}>
        <div className={styles.inner}>
          <div className={styles.centerHeader}>
            <span className={styles.sectionEyebrow}>Our Strengths</span>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <div className={styles.sectionDividerCentered}></div>
          </div>

          <div className={styles.whyGrid}>
            {[
              { title: 'Client Satisfaction First', desc: 'Your success is our priority. We focus on delivering exceptional service, clear communication, and reliable results.' },
              { title: 'Quality & Reliability', desc: 'We work only with trusted suppliers and maintain strict quality standards to ensure every product meets our expectations.' },
              { title: 'Secure & Efficient Trade', desc: 'From sourcing to shipping, we provide safe, compliant, and efficient logistics solutions for international trade.' },
              { title: 'Flexible Solutions', desc: 'Whether you need single shipments or long-term supply partnerships, our services are tailored to your business needs.' },
              { title: 'Global Network', desc: 'With a strong global sourcing and logistics network, we serve clients across multiple countries with dependable delivery.' },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={styles.whyCard}>
                <div className={styles.whyNumber}>0{index + 1}</div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to start trading?</h2>
            <p className={styles.ctaDesc}>Contact our team today to discuss your sourcing and logistics needs.</p>
            <Link to="/contact" className={styles.ctaBtn}>Contact Us</Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;