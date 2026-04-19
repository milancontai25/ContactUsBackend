import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import styles from './RequestQuote.module.css';

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    full_name: '', contact_number: '', email: '', product_name: '',
    enquiry_type: '', company_name: '', country: '', additional_details: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
      const customHtmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            Ramsam Trends - Quick Quote Request
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

      const payload = {
        source_key: "ramsam", 
        subject: `[Ramsam Quote] ${formData.enquiry_type} - ${formData.product_name}`,
        reply_to: formData.email,
        html_content: customHtmlMessage
      };

      await axios.post('/api/contact', payload); 
      toast.success('Quote request submitted! We will contact you shortly.');
      setFormData({ full_name:'', contact_number:'', email:'', product_name:'', enquiry_type:'', company_name:'', country:'', additional_details:'' });
    } catch (error) { 
      console.error("Submission error:", error);
      toast.error('Failed to submit. Please try again.'); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <section className={styles.rfqSection} data-testid="quick-rfq-section">
      <div className={styles.inner}>
        
        <div className={styles.header}>
          <div className={styles.pill}>GET STARTED</div>
          <h2 className={styles.title}>Request a Quote</h2>
          <p className={styles.subtitle}>Fill in your details and our team will respond within 24 hours with a customized solution.</p>
        </div>

        <div className={styles.grid}>
          {/* LEFT SIDE: Form */}
          <div className={styles.formSide}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Full Name <span>*</span></label>
                  <input type="text" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="Your full name" />
                </div>
                <div className={styles.field}>
                  <label>Contact Number <span>*</span></label>
                  <input type="tel" required value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} placeholder="+1 234 567 8900" />
                </div>
                <div className={styles.field}>
                  <label>Email Address <span>*</span></label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" />
                </div>
                <div className={styles.field}>
                  <label>Product of Interest <span>*</span></label>
                  <input type="text" required value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} placeholder="e.g., Basmati Rice" />
                </div>
                <div className={styles.field}>
                  <label>Type of Enquiry <span>*</span></label>
                  <select required value={formData.enquiry_type} onChange={e => setFormData({...formData, enquiry_type: e.target.value})}>
                    <option value="">— Select —</option>
                    <option value="purchase">Purchase (Buy)</option>
                    <option value="sales">Sales (Sell)</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Country <span>*</span></label>
                  <input type="text" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="e.g., UAE" />
                </div>
              </div>
              <div className={styles.field} style={{ marginTop: '1.5rem' }}>
                <label>Additional Details</label>
                <textarea value={formData.additional_details} onChange={e => setFormData({...formData, additional_details: e.target.value})} rows="3" placeholder="Quantity, timeline, packaging, etc."></textarea>
              </div>
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Banner Image */}
          <div className={styles.imageSide}>
            <img src="https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/Global%20Sourcing%20Made%20Easy.jpg" alt="Global Logistics" className={styles.bannerImg} />
            <div className={styles.imageOverlay}>
              <h3>Global Sourcing Made Easy</h3>
              <p>Connect with trusted suppliers worldwide. We handle the logistics, compliance, and delivery.</p>
              <div className={styles.supportInfo}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <span>24/7 Support</span>
                  <strong>+1 (613) 663-0578</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RequestQuote;