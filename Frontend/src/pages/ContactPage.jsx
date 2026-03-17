import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    full_name: '', contact_number: '', email: '', product_name: '',
    enquiry_type: '', company_name: '', country: '', additional_details: ''
  });
  const [loading, setLoading] = useState(false);

  // 1. THIS IS THE ONLY FUNCTION THAT CHANGES
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Build the custom HTML email for Ramsam Trends
      const customHtmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
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
            <h3 style="color: #0f172a; margin-top: 0;">Enquiry Details</h3>
            <p><strong>Type:</strong> ${formData.enquiry_type.toUpperCase()}</p>
            <p><strong>Product:</strong> ${formData.product_name}</p>
            <p><strong>Additional Notes:</strong><br/>${formData.additional_details || 'None provided.'}</p>
          </div>
        </div>
      `;

      // Package it according to our new FastAPI Universal Model
      // const payload = {
      //   subject: `[Ramsam Lead] ${formData.enquiry_type} - ${formData.product_name}`,
      //   reply_to: formData.email,
      //   html_content: customHtmlMessage
      // };

      const payload = {
        source_key: "ramsam", // <--- Matches the key in ROUTING_MAP
        subject: `[Ramsam Lead] ${formData.enquiry_type} - ${formData.product_name}`,
        reply_to: formData.email,
        html_content: customHtmlMessage
      };

      // Point this to your actual deployed FastAPI server URL eventually
      await axios.post('/api/contact', payload);
      
      toast.success('Enquiry sent successfully! Our team will contact you shortly.');
      
      // Clear form
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
      
      <section className={styles.section}>
        <div className={styles.inner}>
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.header}>
            <span className={styles.eyebrow}>Reach Out</span>
            <h1 className={styles.headerTitle}>Contact Us</h1>
            <p className={styles.headerSubtitle}>Get in touch with our team for inquiries, quotes, or global partnership opportunities.</p>
          </motion.div>

          <div className={styles.grid}>
            
            {/* Left Column: The Form */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Submit an Enquiry</h2>
                <div className={styles.formDivider}></div>
                
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
                    
                    {/* 2. THE EMAIL FIELD IS NOW REQUIRED HERE: */}
                    <div className={styles.field}>
                      <label>Email Address <span className={styles.required}>*</span></label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" className={styles.input} />
                    </div>
                    
                    <div className={styles.field}>
                      <label>Product of Interest <span className={styles.required}>*</span></label>
                      <input type="text" required value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} placeholder="e.g., Basmati Rice, Planters" className={styles.input} />
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
                  
                  <button type="submit" disabled={loading} data-testid="contact-submit-btn" className={styles.submitBtn}>
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Right Column: Contact Info & Map */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className={styles.infoContainer}>
                <h2 className={styles.infoTitle}>Headquarters</h2>
                <div className={styles.infoDivider}></div>
                
                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h3 className={styles.contactItemTitle}>Email Us</h3>
                      <p className={styles.contactItemText}>admin@ramsamtrends.com</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h3 className={styles.contactItemTitle}>Call Us</h3>
                      <p className={styles.contactItemText}>+1 (408) 548-7143<br/>+1 (613) 663-0578</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={styles.contactItemTitle}>Visit Us</h3>
                      <p className={styles.contactItemText}>Lathrop, California, USA.</p>
                    </div>
                  </div>
                </div>

                <a href="https://wa.me/14085487143" target="_blank" rel="noopener noreferrer" data-testid="whatsapp-btn" className={styles.whatsappBtn}>
                  <svg className={styles.whatsappIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span>Chat on WhatsApp</span>
                </a>

                <div className={styles.mapSection}>
                  <div className={styles.mapWrapper}>
                    <iframe 
                      title="Location Map" 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100854.7431289133!2d-121.36511215!3d37.8183204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80901594892c578f%3A0x6e2b8618bbde48cc!2sLathrop%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1709660000000!5m2!1sen!2s" 
                      allowFullScreen="" 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;