import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './HomePage.module.css';

/* ─── YouTube Background Player ─── */
const YouTubeBG = () => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const VIDEO_ID = 'KEFt2quibkg';
    const loadPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: { autoplay:1, mute:1, loop:1, playlist:VIDEO_ID, controls:0, rel:0, showinfo:0, modestbranding:1, playsinline:1, iv_load_policy:3, disablekb:1, fs:0 },
        events: {
          onReady: (e) => e.target.playVideo(),
          onStateChange: (e) => { if (e.data === window.YT.PlayerState.ENDED) e.target.playVideo(); },
        },
      });
    };
    if (window.YT && window.YT.Player) { loadPlayer(); }
    else {
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = loadPlayer;
    }
    return () => { if (playerRef.current?.destroy) playerRef.current.destroy(); };
  }, []);

  return (
    <div className={styles.ytPlayer}>
      <div ref={containerRef}></div>
    </div>
  );
};

/* ─── Data ─── */
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const IconFlexible = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
  </svg>
);

const WHY_US = [
  { icon: <IconHeart />, title: 'Client Satisfaction First', desc: 'Your success is our priority. We focus on delivering exceptional service, clear communication, and reliable results.' },
  { icon: <IconCheck />, title: 'Quality & Reliability', desc: 'We work only with trusted suppliers and maintain strict quality standards to ensure every product meets expectations.' },
  { icon: <IconLock />, title: 'Secure & Efficient Trade', desc: 'From sourcing to shipping, we provide safe, compliant, and efficient logistics solutions for international trade.' },
  { icon: <IconFlexible />, title: 'Flexible Solutions', desc: 'Whether you need single shipments or long-term supply partnerships, our services are tailored to your business needs.' },
  { icon: <IconGlobe />, title: 'Global Network', desc: 'With a strong global sourcing and logistics network, we serve clients across multiple countries with dependable delivery.' },
];

const COMMODITIES = [
  { name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', desc: 'Premium kitchenware and cookware — from elegant tableware to functional cooking essentials crafted for modern homes.' },
  { name: 'Lamp & Lights', img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80', desc: 'Decorative lamps, pendant lights, and ambient lighting solutions to transform any living space with warmth and style.' },
  { name: 'Mirrors', img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80', desc: 'Beautifully framed wall mirrors and decorative pieces — from minimalist to ornate styles for every interior.' },
  { name: 'Garden Decors', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', desc: 'Outdoor sculptures, planters, garden furniture, and decorative accents to elevate every outdoor living space.' },
];

const TESTIMONIALS = [
  { name: 'Ahmed Al-Farsi', role: 'CEO, Gulf Food Importers', text: 'Powerhouse Trading has been our trusted partner for 5 years. Their reliability and quality are unmatched in the industry.', country: '🇦🇪' },
  { name: 'Priya Sharma', role: 'Director, Mumbai Commodities Ltd', text: 'Exceptional service from sourcing to delivery. The team handles every shipment with precision and full documentation.', country: '🇮🇳' },
  { name: 'James Whitfield', role: 'VP Procurement, EuroFood Group', text: 'We have sourced rice and grains through Powerhouse for 3 years. Always on time, always compliant. Highly recommended.', country: '🇬🇧' },
];

/* ─── Main Page ─── */
const HomePage = () => {
  const [formData, setFormData] = useState({
    full_name: '', contact_number: '', email: '', product_name: '',
    enquiry_type: '', company_name: '', country: '', additional_details: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
      // Build the custom HTML email for Ramsam Trends Quick Quote
      const customHtmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
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
        source_key: "ramsam", // <--- Matches the key in ROUTING_MAP
        subject: `[Ramsam Quote] ${formData.enquiry_type} - ${formData.product_name}`,
        reply_to: formData.email,
        html_content: customHtmlMessage
      };

      // Send to FastAPI backend
      await axios.post('http://localhost:8000/api/contact', payload); 

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
    <div className={styles.page} data-testid="home-page">
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero} data-testid="hero-section">
        <div className={styles.ytBgWrapper}><YouTubeBG /></div>
        <div className={styles.heroVideoOverlay}></div>
        <div className={styles.heroGoldLine}></div>

        <div className={styles.heroInner}>
          <motion.div initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, ease:[0.22,1,0.36,1] }}>
            <h1 className={styles.heroTitle}>Empowering</h1>
            <div className={styles.heroTitleLine2}>
              <span className={styles.heroTitleHighlight}>Global Trade</span>
            </div>
            <p className={styles.heroTitleSub}>With Trusted Commodity Solutions</p>
            <p className={styles.heroSubtitle}>A dedicated export house connecting international buyers with the finest agricultural commodities. Transparency, Timeliness, and Quality.</p>
            <div className={styles.heroActions}>
              <Link to="/contact" className={styles.heroBtnPrimary}>Request Quote</Link>
              <Link to="/products" className={styles.heroBtnSecondary}>View Products</Link>
            </div>
            <div className={styles.heroStats}>
              {[{ num:'20+', label:'Years Experience' }, { num:'150+', label:'Global Partners' }, { num:'$500M+', label:'Annual Volume' }].map(s => (
                <div key={s.label} className={styles.heroStat}>
                  <p className={styles.heroStatNum}>{s.num}</p>
                  <p className={styles.heroStatLabel}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className={styles.whySection}>
        <div className={styles.sectionInner}>
          
          <div className={styles.whyHeader}>
            <div className={styles.whyEyebrowPill}>
              <span className={styles.whyEyebrowDot}></span>
              WHY CHOOSE US
            </div>
            <h2 className={styles.whyMainTitle}>Client Satisfaction Is Our Primary Focus</h2>
            <p className={styles.whyMainDesc}>At Ramsam Trends, your success drives everything we do. We combine decades of trade expertise with personalized service to ensure seamless shipments — every time.</p>
          </div>

          
          <div className={styles.whyTwoCol}>
        
            <div className={styles.whyList}>
              {WHY_US.map((item, i) => (
                <motion.div key={item.title} className={styles.whyListItem}
                  initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay: i * 0.1 }}>
                  <div className={styles.whyListIcon}>{item.icon}</div>
                  <div>
                    <h3 className={styles.whyListTitle}>{item.title}</h3>
                    <p className={styles.whyListDesc}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            
            <div className={styles.whyRightGrid}>
              
              <div className={styles.whyColorCard} style={{backgroundColor: 'var(--gold)'}}>
                <h3 className={styles.whyColorCardTitle}>Global Reach</h3>
                <p className={styles.whyColorCardDesc}>Serving 50+ countries with reliable air, sea, and land freight solutions.</p>
              </div>
              
              <div className={styles.whyImgCard}>
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80" alt="Global shipping port" className={styles.whyImg} />
              </div>
            
              <div className={styles.whyImgCard}>
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" alt="Cargo logistics" className={styles.whyImg} />
              </div>
             
              <div className={styles.whyColorCard} style={{backgroundColor: 'var(--navy)'}}>
                <h3 className={styles.whyColorCardTitle} style={{color:'#fff'}}>Secure Sourcing</h3>
                <p className={styles.whyColorCardDesc} style={{color:'rgba(255,255,255,0.75)'}}>Vetted suppliers for sugar, rice, medical gear, and defense equipment — no compromises on quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Commodities ── */}
      <section className={styles.commoditiesSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>What We Offer</span>
            <h2 className={styles.sectionTitle}>Our Core Products</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className={styles.commoditiesGrid}>
            {COMMODITIES.map((item, i) => (
              <motion.div key={item.name} className={styles.commodityCard}
                initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }} transition={{ delay: i * 0.08 }}>
                <img src={item.img} alt={item.name} className={styles.commodityImg} loading="lazy" />
                <div className={styles.commodityOverlay}>
                  <h3 className={styles.commodityName}>{item.name}</h3>
                  <p className={styles.commodityDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.commoditiesCta}>
            <Link to="/products" className={styles.ctaBtn}>View Full Catalog</Link>
          </div>
        </div>
      </section>

      {/* ── Request Quote Form ── */}
      <section className={styles.rfq} data-testid="quick-rfq-section">
        <div className={styles.rfqInner}>
          <div className={styles.rfqHeader}>
            <span className={styles.sectionEyebrow}>Get Started</span>
            <h2 className={styles.rfqTitle}>Request a Quote</h2>
            <p className={styles.rfqSubtitle}>Fill in your details and our team will respond within 24 hours</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.rfqForm} data-testid="quick-rfq-form">
            <div className={styles.rfqGrid}>
              <div className={styles.rfqField}>
                <label>Full Name <span className={styles.required}>*</span></label>
                <input type="text" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="Your full name" className={styles.rfqInput} />
              </div>
              <div className={styles.rfqField}>
                <label>Contact Number (WhatsApp / Mobile) <span className={styles.required}>*</span></label>
                <input type="tel" required value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} placeholder="+1 234 567 8900" className={styles.rfqInput} />
              </div>

              {/* MADE EMAIL REQUIRED HERE */}
              <div className={styles.rfqField}>
                <label>Email Address <span className={styles.required}>*</span></label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" className={styles.rfqInput} />
              </div>

              <div className={styles.rfqField}>
                <label>Product Name / Product of Interest <span className={styles.required}>*</span></label>
                <input type="text" required value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} placeholder="e.g., Basmati Rice, Sugar ICUMSA 45" className={styles.rfqInput} />
              </div>
              <div className={styles.rfqField}>
                <label>Type of Enquiry <span className={styles.required}>*</span></label>
                <select required value={formData.enquiry_type} onChange={e => setFormData({...formData, enquiry_type: e.target.value})} className={styles.rfqSelect}>
                  <option value="">— Select —</option>
                  <option value="purchase">Purchase (Buy)</option>
                  <option value="sales">Sales (Sell)</option>
                </select>
              </div>
              <div className={styles.rfqField}>
                <label>Company Name / Agent Name</label>
                <input type="text" value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} placeholder="Your company or agency" className={styles.rfqInput} />
              </div>
              <div className={styles.rfqField}>
                <label>Country <span className={styles.required}>*</span></label>
                <input type="text" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="e.g., United Arab Emirates" className={styles.rfqInput} />
              </div>
            </div>
            <div className={styles.rfqNotesField}>
              <label>Additional Details / Requirements</label>
              <textarea value={formData.additional_details} onChange={e => setFormData({...formData, additional_details: e.target.value})} rows="4" placeholder="Quantity, specifications, timeline, packaging requirements, etc." className={styles.rfqTextarea}></textarea>
            </div>
            <button type="submit" disabled={loading} className={styles.rfqSubmit}>
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Client Voices</span>
            <h2 className={styles.sectionTitle}>What Our Partners Say</h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} className={styles.testimonialCard}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i * 0.12 }}>
                <div className={styles.testimonialStars}>{'★★★★★'}</div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <span className={styles.testimonialFlag}>{t.country}</span>
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Stats ── */}
      <section className={styles.trust} data-testid="trust-section">
        <div className={styles.trustInner}>
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}><p className={styles.trustNumber}>20+</p><p className={styles.trustLabel}>Years of Experience</p></div>
            <div className={styles.trustItem}><p className={styles.trustNumber}>150+</p><p className={styles.trustLabel}>Global Partners</p></div>
            <div className={styles.trustItem}><p className={styles.trustNumber}>$500M+</p><p className={styles.trustLabel}>Annual Trade Volume</p></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;