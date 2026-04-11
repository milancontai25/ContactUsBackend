import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  // Function for the scroll-to-top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} data-testid="main-footer">
      <div className={styles.footerInner}>
        
        {/* ── Top Grid Section ── */}
        <div className={styles.footerGrid}>
          
          {/* Column 1: Orange CTA Card */}
          <div className={styles.orangeCard}>
            <div className={styles.orangeCardHeader}>
              <div className={styles.orangeIconWrapper}>
                {/* Calculator/Building Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm4-4H7v-2h9v2zm0-4H7V7h9v2z" />
                </svg>
              </div>
              <h3 className={styles.orangeCardTitle}>Strong Global Network</h3>
            </div>
            <p className={styles.orangeCardText}>
              Strategic relationships with refineries, producers, exporters, shipping partners, and inspection agencies across key global markets.
            </p>
            <Link to="/contact" className={styles.orangeCardBtn}>
              Contact Us Now
              <span className={styles.btnCheckIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Column 2: Company Info */}
          <div className={styles.companyInfo}>
            <h4 className={styles.columnTitle}>Company Info</h4>
            <ul className={styles.linkList}>
              <li><Link to="/" className={styles.footerLink}><span className={styles.arrow}>→</span> Home</Link></li>
              <li><Link to="/about" className={styles.footerLink}><span className={styles.arrow}>→</span> About</Link></li>
              <li><Link to="/products" className={styles.footerLink}><span className={styles.arrow}>→</span> Products</Link></li>
              <li><Link to="/services" className={styles.footerLink}><span className={styles.arrow}>→</span> Services</Link></li>
              <li><Link to="/contact" className={styles.footerLink}><span className={styles.arrow}>→</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className={styles.aboutUs}>
            <h4 className={styles.columnTitle}>About Us</h4>
            <p className={styles.aboutText}>
              Ramsam Trends has carved a niche in the world of global procurement, serving as a vital bridge between manufacturers and consumers across North America and beyond. Founded on the principles of efficiency and reliability, the company specializes in sourcing a diverse range of products from around the globe, ensuring that the best offerings are readily available to meet the varied needs of its clients.
            </p>
          </div>
        </div>

        {/* ── Middle Contact Info Bar ── */}
        <div className={styles.contactBar}>
          {/* Email */}
          <div className={styles.contactItem}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className={styles.contactTextWrapper}>
              <span className={styles.contactLabel}>E-MAIL US</span>
              <a href="mailto:admin@ramsamtrends.com" className={styles.contactValue}>admin@ramsamtrends.com</a>
            </div>
          </div>

          {/* Phone */}
          <div className={styles.contactItem}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className={styles.contactTextWrapper}>
              <span className={styles.contactLabel}>SUPPORT 24/7</span>
              <a href="tel:+19176726581" className={styles.contactValue}>+1 (613) 663-0578</a>
            </div>
          </div>

          {/* Locations */}
          <div className={styles.contactItem}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
            </div>
            <div className={styles.contactTextWrapper}>
              <span className={styles.contactLabel}>OUR LOCATIONS</span>
              <span className={styles.contactValue}>USA | INDIA | UAE | EU</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Section ── */}
        <div className={styles.orangeDivider}></div>

        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            Copyright © 2024- 2026. Ramsam Trends LLC. <br/>
            Powered by StatGrow 
            {/* <a href="https://statgrow.cloud" target="_blank" rel="noopener noreferrer"> */}
            {/* StatGrow */}
            {/* </a> */}
          </div>
          {/* <div className={styles.legalLinks}>
            <Link to="/privacy">Privacy & Policy</Link> / <Link to="/disclaimer">Disclaimer</Link>
          </div> */}
        </div>

        {/* Scroll To Top Button */}
        {/* <button onClick={scrollToTop} className={styles.scrollToTopBtn} aria-label="Scroll to Top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button> */}
        
      </div>
    </footer>
  );
};

export default Footer;