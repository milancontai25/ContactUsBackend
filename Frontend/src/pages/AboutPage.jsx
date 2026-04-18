import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './AboutPage.module.css';

// ─── Sleek SVG Icons to replace emojis ───
const Icons = {
  kitchen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  lamp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6m-3-14v2m-6 4a6 6 0 1112 0 6 6 0 01-12 0zm-2 8h10" /></svg>,
  garden: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18c-2.5 0-5 2-5 5s2.5 5 5 5m0-10c2.5 0 5 2 5 5s-2.5 5-5 5" /></svg>,
  leather: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
};

const AboutPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page} data-testid="about-page">
      <Navbar />
      
      {/* ─── Hero Section ─── */}
      <section className={styles.heroSection}>
        {/* Subtle Background Elements */}
        <div className={styles.bgPattern}></div>
        <div className={styles.inner}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.header}>
            <div className={styles.pill}>WHO WE ARE</div>
            <h1 className={styles.headerTitle}>About Us</h1>
            <p className={styles.headerSubtitle}>
              At Ramsam Trends, we are a global trading and sourcing company committed to delivering quality products and dependable logistics solutions. With extensive experience in international trade, we connect trusted suppliers with businesses worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission Section ─── */}
      <section className={styles.missionSection}>
        <div className={styles.inner}>
          <div className={styles.missionGrid}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.missionImgWrapper}>
                <img src="http://ramsam-trends-bucket.s3-website.ap-south-1.amazonaws.com/images/aboutus.jpg" alt="Global Logistics" className={styles.missionImg} />
                {/* Decorative offset box */}
                <div className={styles.missionImgDecoration}></div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={styles.missionContent}>
              <div className={styles.pill}>OUR PURPOSE</div>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                Our mission is to simplify global trade by providing reliable sourcing, secure logistics, and high-quality products. We strive to create value for our partners by combining industry expertise with innovative solutions that ensure smooth and successful international transactions.
              </p>
              <p className={styles.missionText}>
                Our focus is on building long-term partnerships through transparency, efficiency, and consistent service.
              </p>
              <ul className={styles.missionChecklist}>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  Verified Global Suppliers
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  End-to-End Logistics
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  Quality & Compliance
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── What We Offer (Products) ─── */}
      {/* <section className={styles.offerSection}>
        <div className={styles.inner}>
          <div className={styles.centerHeader}>
            <div className={styles.pill}>OUR CATALOG</div>
            <h2 className={styles.sectionTitle}>What We Offer</h2>
            <p className={styles.offerIntro}>
              We provide a carefully curated range of products that combine functionality, craftsmanship, and modern design. Our product categories include:
            </p>
          </div>

          <div className={styles.offerGrid}>
            {[
              { title: 'Kitchen Products', desc: 'Functional and stylish items designed to enhance everyday cooking and dining experiences.', icon: Icons.kitchen },
              { title: 'Lamps & Lights', desc: 'Elegant lighting solutions that add warmth and sophistication to homes and commercial spaces.', icon: Icons.lamp },
              { title: 'Garden Décor', desc: 'Unique outdoor decorative pieces that bring beauty and personality to gardens and landscapes.', icon: Icons.garden },
              { title: 'Leather Products', desc: 'Durable and premium leather goods known for quality craftsmanship and timeless style.', icon: Icons.leather },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={styles.offerCard}>
                <div className={styles.offerIconOuter}>
                  <div className={styles.offerIconInner}>
                    {item.icon}
                  </div>
                </div>
                <h3 className={styles.offerTitle}>{item.title}</h3>
                <p className={styles.offerDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ─── Why Choose Us ─── */}
      <section className={styles.whySection}>
        <div className={styles.inner}>
          <div className={styles.centerHeader}>
            <div className={styles.pill}>OUR STRENGTHS</div>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
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
                <div className={styles.whyContent}>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={styles.ctaBox}>
            <div className={styles.ctaDashedBorder}></div>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to start trading?</h2>
              <p className={styles.ctaDesc}>Contact our team today to discuss your sourcing and logistics needs.</p>
              <Link to="/contact" className={styles.ctaBtn}>Contact Us Today</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;