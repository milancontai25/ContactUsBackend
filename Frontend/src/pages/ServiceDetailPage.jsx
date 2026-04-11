import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './ServiceDetailPage.module.css';

// ─── DETAIL PAGE DATA ───
// This holds the specific content for each of the 3 services
const SERVICES_DETAILS_DATA = {
  'maritime-transportation': {
    title: 'Maritime Freight Transportation',
    subtitle: 'Global Shipping with Trusted Ocean Freight Solutions',
    heroImg: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1200',
    intro: 'Ramsam Trends delivers seamless maritime freight transportation across key international trade routes. From port-to-port to door-to-door, our ocean logistics are designed for businesses that demand reliable, secure, and scalable shipping solutions.',
    listTitle: 'Our Maritime Freight Services Cover:',
    list: [
      'Full Container Load (FCL) & Less-than-Container Load (LCL)',
      'Port-to-Port, Door-to-Port & Door-to-Door Delivery',
      'Custom Clearance & Port Handling Services',
      'Hazardous & Oversized Cargo Solutions',
      'Regulatory Compliance & Documentation Support'
    ],
    contentTitle: 'Your Cargo, Our Priority',
    contentDesc: 'With an extensive network of global shipping lines and port agents, Ramsam Trends ensures on-time, cost-efficient ocean transport that aligns with your schedule and compliance needs.',
    images: [
      'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=600',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600'
    ]
  },
  'land-freight-transportation': {
    title: 'Land Freight transportation',
    subtitle: 'Efficient Ground Logistics You Can Count On',
    heroImg: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200',
    intro: 'At Ramsam Trends, we provide reliable and cost-effective land freight transportation services across North America and beyond. Whether you need full truckload (FTL), less-than-truckload (LTL), or last-mile delivery solutions, our ground logistics network ensures your cargo reaches its destination safely and on time.',
    listTitle: 'Our Land Freight Services Include:',
    list: [
      'Full Truckload (FTL) & LTL Options',
      'Door-to-Door Pickup & Delivery',
      'Real-Time Shipment Tracking',
      'Temperature-Controlled & Specialized Transport',
      'Regulatory Compliance & Documentation Support'
    ],
    contentTitle: 'Why Choose Ramsam for Land Freight?',
    contentDesc: 'We prioritize safety, speed, and transparency—leveraging strategic carrier partnerships and cutting-edge logistics tools. Our team ensures optimized routes and minimal transit times while keeping your cargo secure from origin to destination.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=600'
    ]
  },
  'intermodal-shipping': {
    title: 'Intermodal Shipping',
    subtitle: 'Smarter Logistics Through Multi-Mode Transport',
    heroImg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200',
    intro: 'Ramsam Trends offers fully integrated intermodal shipping solutions—combining land, sea, and rail transport to maximize efficiency and reduce costs. This hybrid freight strategy allows us to move goods across countries and continents with speed and precision.',
    listTitle: 'What We Offer in Intermodal Transport:',
    list: [
      'Seamless Integration of Truck, Rail & Ocean Freight',
      'Reduced Handling & Minimized Cargo Risk',
      'Environmentally Friendly Shipping Options',
      'Real-Time Visibility Across All Legs',
      'Scalable Solutions for All Cargo Sizes'
    ],
    contentTitle: 'Optimized Supply Chains, End to End',
    contentDesc: 'Intermodal shipping with Ramsam means flexibility, transparency, and reliability at every stage. Our tailored routes and logistics expertise ensure reduced transit times and competitive pricing—no matter how complex your shipping needs.',
    images: [
      'https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=600',
      'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=600'
    ]
  }
};

const ServiceDetailPage = () => {
  const { slug } = useParams(); // Gets the URL parameter (e.g. 'maritime-transportation')
  
  const serviceData = SERVICES_DETAILS_DATA[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!serviceData) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.notFound}>
          <h2>Service Not Found</h2>
          <Link to="/services">Back to Services</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page} data-testid="service-detail-page">
      <Navbar />
      
      {/* ─── HERO SECTION ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{serviceData.title}</h1>
            <div className={styles.breadcrumbs}>
              <Link to="/">HOME</Link>
              <span>›</span>
              <Link to="/services">SERVICES</Link>
              <span>›</span>
              <span className={styles.currentCrumb}>{serviceData.title.toUpperCase()}</span>
            </div>
          </div>
          {/* Half-cut right image effect */}
          <div className={styles.heroImageWrapper}>
            <img src={serviceData.heroImg} alt={serviceData.title} />
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className={styles.mainContent}>
        <div className={styles.innerLayout}>
          
          {/* Left Side: Details */}
          <div className={styles.detailsSide}>
            <h2 className={styles.contentTitle}>{serviceData.title}</h2>
            <h3 className={styles.contentSubtitle}>{serviceData.subtitle}</h3>
            
            <p className={styles.text}>{serviceData.intro}</p>
            
            <p className={styles.listTitle}>{serviceData.listTitle}</p>
            <ul className={styles.list}>
              {serviceData.list.map((item, index) => (
                <li key={index}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.imagesGrid}>
              {serviceData.images.map((img, index) => (
                <img key={index} src={img} alt="Service process" className={styles.gridImg} />
              ))}
            </div>

            <h4 className={styles.subHeading}>{serviceData.contentTitle}</h4>
            <p className={styles.text}>{serviceData.contentDesc}</p>
          </div>

          {/* Right Side: Sidebar CTA */}
          <div className={styles.sidebar}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaCardHeader}></div>
              <div className={styles.ctaCardBody}>
                <h3>Get best Transportation Services</h3>
                <div className={styles.phoneBox}>
                  <div className={styles.phoneIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className={styles.phoneText}>
                    <span>Need Help? Call Us now</span>
                    <strong>+1 (613) 663-0578</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;