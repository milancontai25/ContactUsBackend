import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import CompliancePage from './pages/CompliancePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import StoreFront from './components/StoreFront'
import StoreCategory from './components/StoreCategory'
import Checkout from './components/Checkout'
import StoreProductDetail from './components/StoreProductDetail';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:slug" element={<ServiceDetailPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />

        <Route path="/marketplace" element={<StoreCategory />} />
        <Route path="/marketplace/items" element={<StoreFront />} />
        <Route path="/marketplace/item/:itemSlug" element={<StoreProductDetail />} />
        <Route path="/marketplace/checkout" element={<Checkout />} />
        <Route path="/marketplace/orders" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;