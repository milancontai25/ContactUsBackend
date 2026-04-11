import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TestimonialsSlider.module.css';

const TESTIMONIALS_DATA = [
  { 
    id: 0, 
    name: 'William Gibson', 
    role: 'Client', 
    text: 'Their ability to deliver high-quality products—on time and within budget—has made them our go-to partner for both industrial and consumer goods. We value their transparency, reliability, and global network.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&fit=crop' 
  },
  { 
    id: 1, 
    name: 'Sarah Jenkins', 
    role: 'Operations Director', 
    text: 'We partnered with Ramsam for perishable food exports, and their cold chain logistics have been outstanding. Their communication and tracking systems gave us full visibility and peace of mind throughout.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop' 
  },
  { 
    id: 2, 
    name: 'Ahmed Al-Farsi', 
    role: 'CEO, Gulf Imports', 
    text: 'Ramsam Trends has been our trusted partner for 5 years. Their reliability and quality are unmatched in the industry. Highly recommended for any business looking to expand their global reach.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop' 
  },
  { 
    id: 3, 
    name: 'Priya Sharma', 
    role: 'Procurement Head', 
    text: 'Exceptional service from sourcing to delivery. The team handles every shipment with precision and full documentation. They take the stress out of international trade.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop' 
  }
];

const TestimonialsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section className={styles.testimonialSection}>
      {/* Huge Faint Quote Mark in Background */}
      <div className={styles.bgQuoteMark}>“</div>
      
      {/* Optional: Add a faint dotted map background class here if desired */}
      <div className={styles.bgMapPattern}></div>

      <div className={styles.inner}>
        
        <div className={styles.header}>
          <div className={styles.pill}>TESTIMONIAL</div>
          <h2 className={styles.title}>What our clients say about us</h2>
        </div>

        <div className={styles.sliderArea}>
          
          {/* Floating Avatars (Hidden on mobile for cleaner look) */}
          <div className={styles.floatingAvatars}>
            {TESTIMONIALS_DATA.map((t, idx) => (
              idx !== activeIndex && (
                <img 
                  key={t.id}
                  src={t.avatar} 
                  alt={t.name}
                  onClick={() => setActiveIndex(idx)}
                  className={`${styles.floatImg} ${styles[`floatPos${idx}`]}`}
                  loading="lazy"
                />
              )
            ))}
          </div>

          {/* Central Active Content */}
          <div className={styles.activeContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
                className={styles.testimonialCard}
              >
                <div className={styles.activeAvatarWrapper}>
                  <img src={activeTestimonial.avatar} alt={activeTestimonial.name} className={styles.activeAvatar} />
                </div>
                
                <p className={styles.quoteText}>"{activeTestimonial.text}"</p>
                
                <h4 className={styles.clientName}>{activeTestimonial.name}</h4>
                <span className={styles.clientRole}>{activeTestimonial.role}</span>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Pagination Dots */}
        <div className={styles.dotsContainer}>
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSlider;