import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MAIN_CATEGORIES, DETAILED_PRODUCTS } from '../data/productsData';
import styles from './ProductCategoryPage.module.css';

const ProductCategoryPage = () => {
  const { categoryId } = useParams(); // Gets the ID from URL (e.g., 'edible-oils')

  // 1. Find the category details for the Hero Banner
  let categoryInfo = null;
  MAIN_CATEGORIES.forEach(mainCat => {
    const found = mainCat.subcategories.find(sub => sub.id === categoryId);
    if (found) {
      categoryInfo = found;
    }
  });

  // 2. Find all products that belong to this category
  const currentProducts = DETAILED_PRODUCTS.filter(p => p.subcategoryId === categoryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!categoryInfo) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.emptyState}>
          <h2>Category Not Found</h2>
          <Link to="/products">Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page} data-testid="product-category-page">
      <Navbar />
      
      {/* ─── HERO SECTION (Like Services SS 86) ─── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{categoryInfo.name}</h1>
            <div className={styles.breadcrumbs}>
              <Link to="/">HOME</Link>
              <span>›</span>
              <Link to="/products">PRODUCTS</Link>
              <span>›</span>
              <span className={styles.currentCrumb}>{categoryInfo.name.toUpperCase()}</span>
            </div>
          </div>
          {/* Half-cut right image effect */}
          <div className={styles.heroImageWrapper}>
            <img src={categoryInfo.img} alt={categoryInfo.name} />
          </div>
        </div>
      </section>

      {/* ─── PRODUCT GRID (Like SS 85) ─── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>Available {categoryInfo.name}</h2>
            <p className={styles.headerSubtitle}>Explore our detailed catalog of {categoryInfo.name.toLowerCase()} available for global export.</p>
          </div>

          {currentProducts.length > 0 ? (
            <div className={styles.grid}>
              {currentProducts.map((product, index) => (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.05 }} 
                  className={styles.detailCard} 
                >
                  <div className={styles.detailCardImageWrapper}>
                    <img src={product.image_url} alt={product.name} className={styles.detailCardImage} loading="lazy" />
                    <span className={styles.detailCardBadge}>{product.category}</span>
                  </div>
                  
                  <div className={styles.detailCardBody}>
                    <h3 className={styles.detailCardTitle}>{product.name}</h3>
                    <p className={styles.detailCardDesc}>{product.description}</p>
                    
                    <div className={styles.specsSection}>
                      <h4 className={styles.specsTitle}>SPECIFICATIONS</h4>
                      <div className={styles.specsList}>
                        {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className={styles.specRow}>
                            <span className={styles.specKey}>{key.replace('_', ' ')}</span>
                            <span className={styles.specValue}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.detailCardFooter}>
                      <span className={styles.detailCardOrigin}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {product.origin}
                      </span>
                      <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className={styles.quoteBtnDark}>
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3>More products coming soon!</h3>
              <p>We are currently updating our digital catalog for this category.</p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductCategoryPage;