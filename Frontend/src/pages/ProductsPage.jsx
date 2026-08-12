import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryOverview from '../components/Products/CategoryOverview';
import DetailedProductView from '../components/Products/DetailedProductView';
import styles from './ProductsPage.module.css';
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSubcategory]);

  return (
    <div className={styles.page} data-testid="products-page">
      <Helmet>
  <title>Products | Ramsam Trends</title>

  <meta
    name="description"
    content="Explore quality products from Ramsam Trends, sourced with a focus on reliability, quality and international trade requirements."
  />

  <link
    rel="canonical"
    href="https://www.ramsamtrends.com/products"
  />

  <meta
    property="og:title"
    content="Products | Ramsam Trends"
  />

  <meta
    property="og:description"
    content="Explore quality products offered by Ramsam Trends for businesses and international markets."
  />

  <meta
    property="og:url"
    content="https://www.ramsamtrends.com/products"
  />

  <meta
    property="og:type"
    content="website"
  />
</Helmet>
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