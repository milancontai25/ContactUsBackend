import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './TrackingPage.module.css';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault(); setLoading(true); setError(''); setTrackingResult(null);
    try { const r = await axios.post(`${API}/tracking`, { tracking_number: trackingNumber }); setTrackingResult(r.data); }
    catch (err) { setError(err.response?.status === 404 ? 'Tracking number not found. Please check and try again.' : 'Failed to fetch tracking information. Please try again.'); }
    finally { setLoading(false); }
  };

  const getStatusClass = (status) => {
    if (status === 'Delivered') return styles.statusDelivered;
    if (status === 'In Transit') return styles.statusInTransit;
    return styles.statusDefault;
  };

  return (
    <div className={styles.page} data-testid="tracking-page">
      <Navbar />
      <section className={styles.section}>
        <div className={styles.inner}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.header}>
            <span className={styles.eyebrow}>Shipment Status</span>
            <h1 className={styles.headerTitle}>Track Your Shipment</h1>
            <p className={styles.headerSubtitle}>Enter your tracking number to get real-time updates on your shipment</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.searchBox}>
            <form onSubmit={handleTrack} className={styles.searchForm} data-testid="tracking-form">
              <input type="text" required value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Enter tracking number (e.g., PH2026001)" className={styles.searchInput} data-testid="tracking-input" />
              <button type="submit" disabled={loading} data-testid="tracking-submit-btn" className={styles.searchBtn}>{loading ? 'Tracking...' : 'Track'}</button>
            </form>
            {error && <div className={styles.error} data-testid="tracking-error">{error}</div>}
          </motion.div>

          {trackingResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} data-testid="tracking-result">
              <div className={styles.resultCard}>
                <div className={styles.resultHeader}>
                  <div>
                    <p className={styles.trackingLabel}>Tracking Number</p>
                    <p className={styles.trackingNumber}>{trackingResult.tracking_number}</p>
                  </div>
                  <span className={`${styles.statusBadge} ${getStatusClass(trackingResult.status)}`}>{trackingResult.status}</span>
                </div>
                <div className={styles.infoGrid}>
                  <div><p className={styles.infoLabel}>Current Location</p><p className={styles.infoValue}>{trackingResult.current_location}</p></div>
                  <div><p className={styles.infoLabel}>Estimated Delivery</p><p className={styles.infoValue}>{trackingResult.estimated_delivery}</p></div>
                  <div><p className={styles.infoLabel}>Last Update</p><p className={styles.infoValue}>{trackingResult.last_update}</p></div>
                </div>
                <div>
                  <h3 className={styles.timelineTitle}>Shipment Timeline</h3>
                  <div className={styles.timelineList}>
                    {trackingResult.timeline.map((event, index) => (
                      <div key={index} className={styles.timelineItem} data-testid={`timeline-event-${index}`}>
                        <div className={styles.timelineConnector}>
                          <div className={index === trackingResult.timeline.length - 1 ? styles.timelineDotActive : styles.timelineDotInactive}></div>
                          {index !== trackingResult.timeline.length - 1 && <div className={styles.timelineLine}></div>}
                        </div>
                        <div className={styles.timelineContent}>
                          <p className={styles.timelineStatus}>{event.status}</p>
                          <p className={styles.timelineLocation}>{event.location}</p>
                          <p className={styles.timelineDate}>{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className={styles.supportBanner}>
            <p className={styles.supportText}>Need help with your shipment?</p>
            <p className={styles.supportText}>Contact our support team at <a href="mailto:support@ramsamtrade.com" className={styles.supportLink}>support@ramsamtrade.com</a></p>
          </div>
          

          {/* <div className={styles.sampleSection}>
            <p className={styles.sampleLabel}>Sample tracking numbers</p>
            <div className={styles.sampleButtons}>
              <button onClick={() => setTrackingNumber('PH2026001')} className={styles.sampleBtn} data-testid="sample-tracking-1">PH2026001</button>
              <button onClick={() => setTrackingNumber('PH2026002')} className={styles.sampleBtn} data-testid="sample-tracking-2">PH2026002</button>
            </div>
          </div> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TrackingPage;

          

         