import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import logo from '../assets/ramsamtardes_logo.jpeg';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    // { name: 'Compliance', path: '/compliance' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarLeft}>
            <a href="mailto:admin@ramsamtrends.com" className={styles.topBarItem}>
              <svg className={styles.topBarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              admin@ramsamtrends.com
            </a>
            <a href="tel:+14085487143" className={styles.topBarItem}>
              <svg className={styles.topBarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +1 (408) 548-7143
            </a>
            <span className={styles.topBarItem}>
              <svg className={styles.topBarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              8:00am – 6:00pm
            </span>
            <span className={styles.topBarItem}>
              <svg className={styles.topBarIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              USA · INDIA · UAE · EU
            </span>
          </div>

          {/* Social Icons — Top Right */}
          <div className={styles.topBarRight}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.topBarSocial} aria-label="Facebook">
              <svg className={styles.topBarSocialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.topBarSocial} aria-label="Instagram">
              <svg className={styles.topBarSocialIcon} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.topBarSocial} aria-label="LinkedIn">
              <svg className={styles.topBarSocialIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={styles.navbar}
        data-testid="main-navbar"
      >
        <div className={styles.navInner}>
          <div className={styles.navRow}>

            {/* Logo */}
            <Link to="/" className={styles.logoLink} onClick={closeMenu}>
              <img src={logo} alt="Ramsam Trades Logo" className={styles.logoImg} />
              <div>
                <h1 className={styles.logoTitle}>RAMSAM TRENDS</h1>
                <p className={styles.logoSubtitle}>Global Trade Solutions</p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className={styles.navLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.navLinkActive : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Desktop CTA + Hamburger */}
            <div className={styles.navRight}>
              <Link to="/contact" className={styles.phoneBtn}>
                Get Quote
              </Link>

              {/* Hamburger */}
              <button
                className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ── Dark Overlay ── */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMenu}
      />

      {/* ── Mobile Slide-in Menu ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <span className={styles.mobileMenuLogo}>RAMSAM TRENDS</span>
          <button className={styles.mobileMenuClose} onClick={closeMenu} aria-label="Close menu">
            <svg className={styles.mobileMenuCloseIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.mobileMenuLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.mobileNavLinkActive : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className={styles.mobileMenuFooter}>
          <Link to="/contact" className={styles.mobileQuoteBtn} onClick={closeMenu}>
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;