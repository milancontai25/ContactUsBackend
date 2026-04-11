import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './ContactPage.module.css';

// ─── SVG Icons ───
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    full_name: '', contact_number: '', email: '', product_name: '',
    enquiry_type: '', company_name: '', country: '', additional_details: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const customHtmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #052c34; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            Ramsam Trends - New Enquiry
          </h2>
          <div style="margin-bottom: 20px;">
            <p><strong>Name:</strong> ${formData.full_name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.contact_number}</p>
            <p><strong>Company:</strong> ${formData.company_name || 'N/A'}</p>
            <p><strong>Country:</strong> ${formData.country}</p>
          </div>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px;">
            <h3 style="color: #052c34; margin-top: 0;">Enquiry Details</h3>
            <p><strong>Type:</strong> ${formData.enquiry_type.toUpperCase()}</p>
            <p><strong>Product:</strong> ${formData.product_name}</p>
            <p><strong>Additional Notes:</strong><br/>${formData.additional_details || 'None provided.'}</p>
          </div>
        </div>
      `;

      const payload = {
        source_key: "ramsam", 
        subject: `[Ramsam Lead] ${formData.enquiry_type} - ${formData.product_name}`,
        reply_to: formData.email,
        html_content: customHtmlMessage
      };

      await axios.post('/api/contact', payload);
      
      toast.success('Enquiry sent successfully! Our team will contact you shortly.');
      setFormData({ full_name: '', contact_number: '', email: '', product_name: '', enquiry_type: '', company_name: '', country: '', additional_details: '' });
    } catch (error) { 
      console.error("Submission error:", error);
      toast.error('Failed to send message. Please check your connection and try again.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className={styles.page} data-testid="contact-page">
      <Navbar />
      
      {/* ─── Top Info Cards Section (Matches SS 63) ─── */}
      <section className={styles.infoCardsSection}>
        <div className={styles.inner}>
          <div className={styles.cardsGrid}>
            
            {/* Card 1: Mail */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600" alt="Send Us Mail" className={styles.cardImg} />
              </div>
              <div className={styles.floatingIcon}>
                <MailIcon />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Send Us Mail</h3>
                <p className={styles.cardText}>admin@ramsamtrends.com</p>
              </div>
            </motion.div>

            {/* Card 2: Call */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${styles.card} ${styles.cardMiddle}`}>
              <div className={styles.cardImageWrapper}>
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600" alt="Call Us Anytime" className={styles.cardImg} />
              </div>
              <div className={styles.floatingIcon}>
                <PhoneIcon />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Call Us Anytime</h3>
                <p className={styles.cardText}>
                  <strong>USA:</strong> +1 (408) 548-7143<br/>
                  <strong>India:</strong> +91 9749715695<br/>                  
                  <strong>UAE:</strong> +1 (408) 548-7143<br/>
                  <strong>EU:</strong> +36 20 366 7390<br/>
                </p>
              </div>
            </motion.div>

            {/* Card 3: Visit */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600" alt="Visit Our Office" className={styles.cardImg} />
              </div>
              <div className={styles.floatingIcon}>
                <LocationIcon />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Visit Our Office</h3>
                <p className={styles.cardText}>Lathrop, California, USA<br/>Kolkata, West Bengal, India<br/> Hungary, Europe</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Drop Us A Line Section (Form) ─── */}
      <section className={styles.dropLineSection}>
        {/* Background Waves Pattern */}
        <div className={styles.bgPattern}></div>
        
        <div className={styles.inner}>
          
          <div className={styles.dropLineHeader}>
            <h2 className={styles.dropLineTitle}>Drop Us A Line</h2>
            <p className={styles.dropLineSubtitle}>Ramsam Trends will help you to solve your problem</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form} data-testid="contact-form">
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Full Name <span className={styles.required}>*</span></label>
                  <input type="text" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="Your full name" className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label>Contact Number <span className={styles.required}>*</span></label>
                  <input type="tel" required value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} placeholder="+1 234 567 8900" className={styles.input} />
                </div>
                
                <div className={styles.field}>
                  <label>Email Address <span className={styles.required}>*</span></label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" className={styles.input} />
                </div>
                
                <div className={styles.field}>
                  <label>Product of Interest <span className={styles.required}>*</span></label>
                  <input type="text" required value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} placeholder="e.g., Basmati Rice, Copper Scrap" className={styles.input} />
                </div>
                
                <div className={styles.field}>
                  <label>Type of Enquiry <span className={styles.required}>*</span></label>
                  <select required value={formData.enquiry_type} onChange={e => setFormData({...formData, enquiry_type: e.target.value})} className={styles.select}>
                    <option value="">— Select —</option>
                    <option value="purchase">Purchase (Buy)</option>
                    <option value="sales">Sales (Sell)</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                
                <div className={styles.field}>
                  <label>Company / Agent Name</label>
                  <input type="text" value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} placeholder="Your company" className={styles.input} />
                </div>
                
                <div className={styles.fieldFull}>
                  <label>Country <span className={styles.required}>*</span></label>
                  <input type="text" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="e.g., United States" className={styles.input} />
                </div>
              </div>
              
              <div className={styles.fieldFull} style={{ marginTop: '1.5rem' }}>
                <label>Additional Details / Requirements</label>
                <textarea value={formData.additional_details} onChange={e => setFormData({...formData, additional_details: e.target.value})} rows="4" placeholder="Quantity, specifications, timeline, etc." className={styles.textarea}></textarea>
              </div>
              
              <div className={styles.submitWrapper}>
                <button type="submit" disabled={loading} data-testid="contact-submit-btn" className={styles.submitBtn}>
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;