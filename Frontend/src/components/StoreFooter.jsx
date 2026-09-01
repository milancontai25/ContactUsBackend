import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Removed the broken social icon imports, kept the standard ones
import { Store, Mail, Phone, MessageCircle } from 'lucide-react';
import '../assets/css/storefooter.css';

// --- Native SVG Social Icons ---
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const StoreFooter = ({ slug }) => {
  // --- FOOTER API STATE ---
  const [footerData, setFooterData] = useState({
    business_name: '',
    logo: null,
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    email: '',
    phone: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const formatUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`; 
  };

  // Fetch Footer Data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/business/${slug}/footer/`);
        setFooterData(res.data);
      } catch (err) {
        console.error("Failed to fetch footer data", err);
      }
    };
    if (slug) fetchFooterData();
  }, [slug]);

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        
        {/* Column 1: Brand */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="brand-logo-box">
              {footerData.logo ? (
                <img 
                  src={formatUrl(footerData.logo)} 
                  className="brand-logo-img" 
                  alt="logo" 
                  onError={(e) => e.target.style.display='none'} 
                />
              ) : (
                <Store size={22} />
              )}
            </div>
            <span className="footer-brand-name">{footerData.business_name || slug.toUpperCase()}</span>
          </div>
          <div className="social-links">
            {footerData.instagram && <a href={footerData.instagram} target="_blank" rel="noreferrer"><InstagramIcon /></a>}
            {footerData.facebook && <a href={footerData.facebook} target="_blank" rel="noreferrer"><FacebookIcon /></a>}
            {footerData.youtube && <a href={footerData.youtube} target="_blank" rel="noreferrer"><YoutubeIcon /></a>}
            {footerData.twitter && <a href={footerData.twitter} target="_blank" rel="noreferrer"><TwitterIcon /></a>}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/marketplace">Home</Link></li>
            <li><Link to="/marketplace/items">Shop Now</Link></li>
            <li><Link to="/marketplace/orders">Track Your Order</Link></li>
            <li><Link to="/marketplace/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div className="footer-col">
          <h4>About</h4>
          <ul>
            <li><Link to="/marketplace/our-story#story">Our Story</Link></li>
            <li><Link to="/marketplace/our-story#terms">Terms of Service</Link></li>
            <li><Link to="/marketplace/our-story#privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-col contact-col">
          <h4>Contact Us</h4>
          
          <a href={`mailto:${footerData.email || 'contact@store.com'}`} className="contact-link">
            <Mail size={16} /> {footerData.email || 'contact@store.com'}
          </a>
          
          <a href={`tel:${footerData.phone || '+910000000000'}`} className="contact-link">
            <Phone size={16} /> {footerData.phone || '+91-0000000000'}
          </a>
          
          <a 
            href={`https://wa.me/${(footerData.phone || '0000000000').replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noreferrer" 
            className="contact-link"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {footerData.business_name || slug.toUpperCase()}. All rights reserved.</p>
        <p>Powered by StatGrow</p>
      </div>
    </footer>
  );
};

export default StoreFooter;