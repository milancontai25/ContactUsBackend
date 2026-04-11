import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryOverview from '../components/Products/CategoryOverview';
import DetailedProductView from '../components/Products/DetailedProductView';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSubcategory]);

  return (
    <div className={styles.page} data-testid="products-page">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {!selectedSubcategory ? (
          <CategoryOverview onSelectSubcategory={setSelectedSubcategory} />
         ) : (
           <DetailedProductView 
             subcategory={selectedSubcategory} 
             onBack={() => setSelectedSubcategory(null)} 
           />
         )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductsPage;