import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './ProductsPage.module.css';

// Using the exact products from your HomePage
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Premium Kitchenware', 
    category: 'Kitchenware', 
    description: 'Premium kitchenware and cookware — from elegant tableware to functional cooking essentials crafted for modern homes.', 
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', 
    origin: 'India', 
    specifications: { material: 'Ceramic & Steel', finish: 'Polished', durability: 'High Grade' } 
  },
  { 
    id: 2, 
    name: 'Lamp & Lights', 
    category: 'Lighting', 
    description: 'Decorative lamps, pendant lights, and ambient lighting solutions to transform any living space with warmth and style.', 
    image_url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80', 
    origin: 'Turkey', 
    specifications: { type: 'Pendant & Table', voltage: '110-240V', material: 'Brass & Glass' } 
  },
  { 
    id: 3, 
    name: 'Decorative Mirrors', 
    category: 'Decor', 
    description: 'Beautifully framed wall mirrors and decorative pieces — from minimalist to ornate styles for every interior.', 
    image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80', 
    origin: 'Italy', 
    specifications: { frame: 'Carved Wood / Metal', style: 'Contemporary', mounting: 'Wall Mounted' } 
  },
  { 
    id: 4, 
    name: 'Garden Decors', 
    category: 'Outdoor', 
    description: 'Outdoor sculptures, planters, garden furniture, and decorative accents to elevate every outdoor living space.', 
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', 
    origin: 'Vietnam', 
    specifications: { material: 'Weatherproof Stone', finish: 'Natural Matte', placement: 'Outdoor / Patio' } 
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Vite Environment Variable Fix for when your backend is ready
        // const API = `${import.meta.env.VITE_BACKEND_URL}/api`;
        // const r = await axios.get(`${API}/products`);
        // setProducts(r.data);
        
        // Using mock data until backend is ready
        setProducts(MOCK_PRODUCTS);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div className={styles.page} data-testid="products-page">
      <Navbar />
      
      <section className={styles.section}>
        <div className={styles.inner}>
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={styles.header}>
            <span className={styles.eyebrow}>Our Offerings</span>
            <h1 className={styles.headerTitle}>Product Catalog</h1>
            <p className={styles.headerSubtitle}>Browse our exclusive collection of premium home decor, lighting, kitchenware, and outdoor accents.</p>
            <a href="#" download data-testid="download-catalog-btn" className={styles.downloadBtn}>Download PDF Catalog</a>
          </motion.div>

          {/* Filter Pills */}
          <div className={styles.filtersWrapper}>
            <div className={styles.filters}>
              {categories.map((category) => (
                <button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  data-testid={`category-filter-${category.toLowerCase().replace(' ', '-')}`} 
                  className={`${styles.filterBtn} ${selectedCategory === category ? styles.filterBtnActive : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className={styles.grid}>
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.05 }} 
                className={styles.card} 
                data-testid={`product-card-${index}`}
              >
                <div className={styles.cardImageWrapper}>
                  <img src={product.image_url} alt={product.name} className={styles.cardImage} loading="lazy" />
                  <span className={styles.cardBadge}>{product.category}</span>
                </div>
                
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardDesc}>{product.description}</p>
                  
                  <div className={styles.specsSection}>
                    <h4 className={styles.specsTitle}>Specifications</h4>
                    <div className={styles.specsList}>
                      {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className={styles.specRow}>
                          <span className={styles.specKey}>{key.replace('_', ' ')}</span>
                          <span className={styles.specValue}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.cardOrigin}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {product.origin}
                    </span>
                    <Link to="/contact" data-testid={`request-quote-${product.id}`} className={styles.quoteBtn}>
                      Request Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductsPage;


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import styles from './ProductsPage.module.css';

// /* ── Static Product Data ── */
// const PRODUCTS = [
//   {
//     id: 1, category: 'Grains & Rice',
//     name: 'Basmati Rice (Premium)',
//     image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
//     description: 'Long-grain aromatic Basmati rice sourced directly from top producers in India and Pakistan. Cleaned, sorted, and packed for bulk and retail use.',
//     origin: 'India / Pakistan',
//     specs: { Grade: 'Extra Long Grain', Moisture: '≤ 13%', Purity: '≥ 98%', Packaging: '25kg / 50kg Bags' },
//   },
//   {
//     id: 2, category: 'Grains & Rice',
//     name: 'IRRI-6 Rice',
//     image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
//     description: 'High-yield IRRI-6 parboiled rice meeting strict international food safety standards, available in bulk shipments.',
//     origin: 'Pakistan',
//     specs: { Type: 'Parboiled / Raw', Broken: '≤ 5%', Moisture: '≤ 14%', Packaging: 'Bulk / Bags' },
//   },
//   {
//     id: 3, category: 'Sugar',
//     name: 'White Refined Sugar ICUMSA 45',
//     image: 'https://images.unsplash.com/photo-1559181567-c3190bfa4614?w=600&q=80',
//     description: 'Premium white refined sugar with ICUMSA 45 grade. Meets global food safety standards and available in customized packaging.',
//     origin: 'Brazil / Thailand',
//     specs: { Grade: 'ICUMSA 45', Purity: '≥ 99.8%', Moisture: '≤ 0.04%', Packaging: '50kg Bags / Bulk' },
//   },
//   {
//     id: 4, category: 'Sugar',
//     name: 'Raw Brown Sugar ICUMSA 600',
//     image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
//     description: 'Unrefined raw brown sugar ideal for industrial processing. Sourced from certified mills with full traceability documentation.',
//     origin: 'Brazil',
//     specs: { Grade: 'ICUMSA 600–1200', Purity: '≥ 97%', Moisture: '≤ 0.5%', Packaging: '50kg Bags / Bulk' },
//   },
//   {
//     id: 5, category: 'Edible Oils',
//     name: 'Sunflower Oil (Refined)',
//     image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
//     description: 'Refined sunflower oil suitable for cooking, food manufacturing, and retail. Produced under strict quality protocols.',
//     origin: 'Ukraine / Argentina',
//     specs: { Type: 'Refined / Crude', 'Free Fatty Acid': '≤ 0.1%', Color: 'Lovibond ≤ 3R', Packaging: '1L / 5L Bottles, IBC Tanks' },
//   },
//   {
//     id: 6, category: 'Edible Oils',
//     name: 'Palm Oil (RBD)',
//     image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
//     description: 'Refined, bleached, and deodorized (RBD) palm oil suitable for food manufacturing, frying, and margarine production.',
//     origin: 'Malaysia / Indonesia',
//     specs: { Type: 'RBD Palm Olein', 'FFA': '≤ 0.1%', IV: '56–60', Packaging: 'Flexi-bags / ISO Tanks' },
//   },
//   {
//     id: 7, category: 'Pulses & Lentils',
//     name: 'Yellow Lentils (Split)',
//     image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&q=80',
//     description: 'High-protein split yellow lentils sourced from certified farms. Ideal for food manufacturers and wholesalers.',
//     origin: 'Canada / Australia',
//     specs: { Moisture: '≤ 14%', Admixture: '≤ 1%', Purity: '≥ 99%', Packaging: '25kg / 50kg PP Bags' },
//   },
//   {
//     id: 8, category: 'Pulses & Lentils',
//     name: 'Kabuli Chickpeas',
//     image: 'https://images.unsplash.com/photo-1618688639428-dc0e83680ce2?w=600&q=80',
//     description: 'Large-size Kabuli chickpeas with uniform color and high nutritional value. Widely used across the Middle East and Europe.',
//     origin: 'Australia / Argentina',
//     specs: { Size: '8mm / 9mm / 10mm', Moisture: '≤ 13%', Purity: '≥ 98%', Packaging: '25kg / 50kg Bags' },
//   },
//   {
//     id: 9, category: 'Dates',
//     name: 'Medjool Dates (Premium)',
//     image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80',
//     description: 'Premium Medjool dates known for their rich flavor, large size, and soft texture. Grown in certified organic farms.',
//     origin: 'UAE / Jordan / Morocco',
//     specs: { Grade: 'A / Export Quality', Size: 'Large / Jumbo', Moisture: '18–25%', Packaging: '5kg / 10kg Gift Boxes' },
//   },
//   {
//     id: 10, category: 'Wheat & Grains',
//     name: 'Hard Red Wheat',
//     image: 'https://images.unsplash.com/photo-1602513445741-f7d8c6adccc2?w=600&q=80',
//     description: 'High-protein hard red wheat for bread, pasta, and food manufacturing. Available in bulk vessel quantities.',
//     origin: 'USA / Canada / Australia',
//     specs: { Protein: '≥ 12.5%', Moisture: '≤ 13.5%', 'Test Weight': '≥ 76 kg/hl', Packaging: 'Bulk Vessel / Containers' },
//   },
//   {
//     id: 11, category: 'Wheat & Grains',
//     name: 'Yellow Corn (Maize)',
//     image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
//     description: 'Non-GMO yellow corn for animal feed, starch production, and food processing industries worldwide.',
//     origin: 'USA / Brazil / Argentina',
//     specs: { Moisture: '≤ 14%', Aflatoxin: '≤ 20 ppb', Purity: '≥ 98%', Packaging: 'Bulk / Containers' },
//   },
//   {
//     id: 12, category: 'Specialty',
//     name: 'Sesame Seeds (White)',
//     image: 'https://images.unsplash.com/photo-1611344389010-2b9c5c7e5a0b?w=600&q=80',
//     description: 'High-quality white sesame seeds used in food manufacturing, bakery, and oil extraction industries globally.',
//     origin: 'Ethiopia / Sudan / India',
//     specs: { 'Oil Content': '≥ 50%', Moisture: '≤ 6%', Purity: '≥ 99.95%', Packaging: '25kg / 50kg PP Bags' },
//   },
// ];

// const CATEGORIES = ['All', 'Grains & Rice', 'Sugar', 'Edible Oils', 'Pulses & Lentils', 'Dates', 'Wheat & Grains', 'Specialty'];

// const ProductsPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const filtered = selectedCategory === 'All'
//     ? PRODUCTS
//     : PRODUCTS.filter(p => p.category === selectedCategory);

//   return (
//     <div className={styles.page} data-testid="products-page">
//       <Navbar />

//       {/* ── Hero Banner ── */}
//       <section className={styles.heroBanner}>
//         <div className={styles.heroBannerOverlay}></div>
//         <div className={styles.heroBannerInner}>
//           <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
//             <span className={styles.eyebrow}>Our Offerings</span>
//             <h1 className={styles.heroTitle}>Product Catalog</h1>
//             <p className={styles.heroSubtitle}>Browse our extensive range of commodities sourced from certified global suppliers</p>
//             <a href="#" download className={styles.downloadBtn}>
//               <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
//               Download PDF Catalog
//             </a>
//           </motion.div>
//         </div>
//       </section>

//       <section className={styles.section}>
//         <div className={styles.inner}>

//           {/* ── Category Filters ── */}
//           <div className={styles.filtersWrapper}>
//             <div className={styles.filters}>
//               {CATEGORIES.map(cat => (
//                 <button key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ''}`}>
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ── Count ── */}
//           <p className={styles.resultCount}>
//             Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
//             {selectedCategory !== 'All' && <> in <strong>{selectedCategory}</strong></>}
//           </p>

//           {/* ── Product Grid ── */}
//           <div className={styles.grid}>
//             {filtered.map((product, index) => (
//               <motion.div key={product.id}
//                 initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
//                 viewport={{ once:true }} transition={{ delay: index * 0.05 }}
//                 className={styles.card} data-testid={`product-card-${index}`}>

//                 <div className={styles.cardImageWrapper}>
//                   <img src={product.image} alt={product.name} className={styles.cardImage} loading="lazy" />
//                   <span className={styles.cardBadge}>{product.category}</span>
//                 </div>

//                 <div className={styles.cardBody}>
//                   <h3 className={styles.cardTitle}>{product.name}</h3>
//                   <p className={styles.cardDesc}>{product.description}</p>

//                   <div className={styles.specsSection}>
//                     <h4 className={styles.specsTitle}>Specifications</h4>
//                     <div className={styles.specsList}>
//                       {Object.entries(product.specs).map(([key, value]) => (
//                         <div key={key} className={styles.specRow}>
//                           <span className={styles.specKey}>{key}</span>
//                           <span className={styles.specValue}>{value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className={styles.cardFooter}>
//                     <span className={styles.cardOrigin}>
//                       <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
//                       {product.origin}
//                     </span>
//                     <Link to="/contact" className={styles.quoteBtn}>Request Quote</Link>
//                   </div>
//                 </div>

//               </motion.div>
//             ))}
//           </div>

//           {/* ── CTA Banner ── */}
//           <div className={styles.ctaBanner}>
//             <div className={styles.ctaBannerText}>
//               <h3 className={styles.ctaBannerTitle}>Need a Custom Commodity?</h3>
//               <p className={styles.ctaBannerDesc}>Can't find what you're looking for? Our sourcing team can procure any commodity worldwide.</p>
//             </div>
//             <Link to="/contact" className={styles.ctaBannerBtn}>Contact Our Team</Link>
//           </div>

//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default ProductsPage;