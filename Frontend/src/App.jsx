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
      </Routes>
    </Router>
  );
}

export default App;