import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_DATA } from '../data/blogData';
import styles from './BlogList.module.css';

const BlogList = () => {
  return (
    <section className={styles.blogSection}>
      <div className={styles.inner}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pill}>LATEST NEWS</div>
          <h2 className={styles.title}>Read All Our Blogs</h2>
          <p className={styles.subtitle}>
            Stay informed with expert-written articles on global logistics, import-export strategies, sourcing trends, and supply chain best practices.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {BLOG_DATA.map((blog, idx) => (
            <motion.div 
              key={blog.id} 
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.imgWrapper}>
                <img src={blog.image} alt={blog.title} className={styles.img} />
                <div className={styles.datePill}>{blog.date}</div>
              </div>
              
              <div className={styles.content}>
                <div className={styles.meta}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>ramsamtrends</span>
                </div>
                
                <h3 className={styles.cardTitle}>{blog.title}</h3>
                
                <Link to={`/blog/${blog.slug}`} className={styles.readMore}>
                  Read Article 
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogList;