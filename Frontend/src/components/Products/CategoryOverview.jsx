// src/components/Products/CategoryOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ADD THIS IMPORT
import { MAIN_CATEGORIES } from '../../data/productsData';
import styles from '../../pages/ProductsPage.module.css';

const CategoryOverview = () => {
  return (
    <motion.div 
      key="categories-view"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, y: -20 }}
      className={styles.categoriesView}
    >
      {MAIN_CATEGORIES.map((category) => (
        <section key={category.id} className={styles.categorySection}>
          <div className={styles.inner}>
            
            <div className={styles.categoryHeader}>
              <div className={styles.pill}>{category.pill}</div>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDesc}>{category.desc}</p>
            </div>

            <div className={styles.subCatGrid}>
              {category.subcategories.map((subCat) => (
                // CHANGED THIS TO A LINK
                <Link 
                  to={`/products/${subCat.id}`} 
                  key={subCat.id} 
                  className={styles.subCatCard}
                  style={{ textDecoration: 'none' }} // Ensure it doesn't look like a link
                >
                  <div className={styles.subCatImgWrapper}>
                    <img src={subCat.img} alt={subCat.name} className={styles.subCatImg} loading="lazy" />
                  </div>
                  <div className={styles.subCatLabel}>
                    {subCat.name}
                  </div>
                </Link>
              ))}
            </div>
            
          </div>
        </section>
      ))}
    </motion.div>
  );
};

export default CategoryOverview;