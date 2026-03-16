import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './CompliancePage.module.css';

const CompliancePage = () => {
  const faqs = [
    { question: 'What are your payment terms?', answer: 'We accept Letter of Credit (L/C), Wire Transfer (T/T), and Escrow services. Payment terms are flexible based on order volume and client relationship.' },
    { question: 'How do you handle customs clearance?', answer: 'We have dedicated customs brokers in major ports worldwide. We handle all documentation, duty calculations, and regulatory compliance to ensure smooth clearance.' },
    { question: 'What is your typical shipping timeframe?', answer: 'Standard shipping ranges from 15-45 days depending on origin and destination. Express cold chain logistics available for perishable goods with 7-14 day delivery.' },
    { question: 'Are your products certified?', answer: 'Yes, all products meet international quality standards. We provide certifications including ISO, HACCP, Halal, and FDA registrations as applicable.' },
    { question: 'Do you provide samples before bulk orders?', answer: 'Yes, we offer sample shipments for quality verification. Sample costs are deducted from the first bulk order.' },
    { question: 'What is your minimum order quantity?', answer: 'MOQ varies by product. Typically 1 container (20-25 MT) for commodities. Contact us for specific product requirements.' },
    { question: 'How do you ensure cold chain integrity?', answer: 'We use temperature-controlled containers with real-time monitoring. All shipments include temperature logs and quality certificates.' },
    { question: 'What documentation do you provide?', answer: 'Complete export documentation including Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, Phytosanitary Certificate, and Quality Analysis Reports.' },
  ];
  const compliance = [
    { title: 'ITAR Compliance', description: 'Registered with DDTC for defense article exports', icon: '🛡️' },
    { title: 'FDA Registration', description: 'US FDA registered for food and medical device exports', icon: '⚕️' },
    { title: 'ISO 9001:2015', description: 'Quality management system certification', icon: '✅' },
    { title: 'Halal Certified', description: 'Islamic food standards compliance', icon: '🍇' },
  ];

  return (
    <div className={styles.page} data-testid="compliance-page">
      <Navbar />
      <section className={styles.section}>
        <div className={styles.inner}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.header}>
            <span className={styles.eyebrow}>Standards & Trust</span>
            <h1 className={styles.headerTitle}>Compliance & FAQs</h1>
            <p className={styles.headerSubtitle}>Certified, compliant, and committed to regulatory excellence</p>
          </motion.div>

          <div className={styles.certSection}>
            <h2 className={styles.sectionTitle}>Our Certifications</h2>
            <div className={styles.sectionDivider}></div>
            <div className={styles.certGrid}>
              {compliance.map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={styles.certCard} data-testid={`compliance-card-${index}`}>
                  <span className={styles.certIcon}>{item.icon}</span>
                  <h3 className={styles.certTitle}>{item.title}</h3>
                  <p className={styles.certDesc}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.sectionDivider}></div>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={styles.faqItem} data-testid={`faq-item-${index}`}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CompliancePage;