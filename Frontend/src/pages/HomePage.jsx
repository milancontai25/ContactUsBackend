import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './HomePage.module.css';
import CategoryOverview from '../components/Products/CategoryOverview';
import DetailedProductView from '../components/Products/DetailedProductView';
import LogisticsBanner from '../components/LogisticsBanner';
import PremiumServices from '../components/PremiumServices';
import TransportServices from '../components/TransportServices';
import RequestQuote from '../components/RequestQuote';
import TestimonialsSlider from '../components/TestimonialsSlider';
import BlogList from '../components/BlogList';

/* ─── YouTube Background Player ─── */
const YouTubeBG = ({ videoId }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const loadPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: videoId, controls: 0, rel: 0, showinfo: 0, modestbranding: 1, playsinline: 1, iv_load_policy: 3, disablekb: 1, fs: 0 },
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
  }, [videoId]);

  return (
    <div className={styles.ytPlayer}>
      <div ref={containerRef}></div>
    </div>
  );
};

/* ─── Hero Slider Data ─── */
const HERO_SLIDES = [
  {
    id: 1,
    type: 'image',
    src: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/banner1.jpg', // Airplane
    pill: 'Ramsam Trends',
    title: 'Global Export &\nImport Solutions',
    desc: 'Bring premium products to your market. Ramsam Trends connects you to the finest commodities globally.',
    btnText: 'Contact Ramsam',
    btnLink: '/contact'
  },
  {
    id: 2,
    type: 'image',
    src: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/banner2.jpg', // Cargo Ship
    pill: 'Streamlined Logistics',
    title: 'Streamlined\nFreight & Logistics',
    desc: 'Deliver faster and smarter with Ramsam’s global freight solutions. Reliable shipping made easy.',
    btnText: 'Get Quote',
    btnLink: '/contact'
  },
  {
    id: 3,
    type: 'image',
    src: 'https://ramsam-trends-bucket.s3.ap-south-1.amazonaws.com/images/banner3.jpg', // Your YouTube Video ID
    pill: 'Trusted Partner',
    title: 'Empowering\nGlobal Trade',
    desc: 'A dedicated export house connecting international buyers with the finest agricultural commodities.',
    btnText: 'Our Services',
    btnLink: '/services'
  }
];

/* ─── Data (Rest of the page) ─── */
const IconHeart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><polyline points="20 6 9 17 4 12"/></svg>;
const IconLock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconFlexible = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>;
const IconGlobe = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>;

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
  { name: 'Ahmed Al-Farsi', role: 'CEO, Gulf Food Importers', text: 'Ramsam Trends has been our trusted partner for 5 years. Their reliability and quality are unmatched in the industry.', country: '🇦🇪' },
  { name: 'Priya Sharma', role: 'Director, Mumbai Commodities Ltd', text: 'Exceptional service from sourcing to delivery. The team handles every shipment with precision and full documentation.', country: '🇮🇳' },
  { name: 'James Whitfield', role: 'VP Procurement, EuroFood Group', text: 'We have sourced rice and grains through Ramsam Trends for 3 years. Always on time, always compliant. Highly recommended.', country: '🇬🇧' },
];

/* ─── Main Page ─── */
const HomePage = () => {
  // Added slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '', contact_number: '', email: '', product_name: '',
    enquiry_type: '', company_name: '', country: '', additional_details: ''
  });
  const [loading, setLoading] = useState(false);

  // Added auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

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
    <div className={styles.page} data-testid="home-page">
      <Navbar />

      {/* ── Hero Slider Section ── */}
      <section className={styles.heroSlider}>
        <AnimatePresence mode="wait">
          {HERO_SLIDES.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className={styles.slideWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Background Image / Video */}
                {slide.type === 'image' ? (
                  <img src={slide.src} alt="Hero Background" className={styles.heroImgBg} />
                ) : (
                  <YouTubeBG videoId={slide.src} />
                )}

                {/* Teal Gradient Overlay matching the screenshot */}
                <div className={styles.heroOverlay}></div>

                {/* Content */}
                <div className={styles.heroInner}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {/* Pill Tag */}
                    <div className={styles.heroPill}>
                      <span className={styles.heroPillDot}></span>
                      {slide.pill}
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heroTitle}>
                      {slide.title.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </h1>

                    {/* Subtitle */}
                    <p className={styles.heroSubtitle}>{slide.desc}</p>

                    {/* Styled Button (Orange with white check box) */}
                    <Link to={slide.btnLink} className={styles.heroCtaWrapper}>
                      <div className={styles.heroCtaMain}>{slide.btnText}</div>
                      <div className={styles.heroCtaIconBox}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Slider Dots */}
        <div className={styles.sliderDots}>
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      
          <CategoryOverview />

            <TransportServices />


            <PremiumServices />

            <RequestQuote />
            
            <TestimonialsSlider />
    

      <LogisticsBanner />
      <BlogList />
      <Footer />
    </div>
  );
};

export default HomePage;