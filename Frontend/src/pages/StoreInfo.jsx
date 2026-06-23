import React, { useState, useEffect } from 'react';
import StoreHeader from '../components/StoreHeader';
import StoreFooter from '../components/StoreFooter';
import AuthCustomer from '../components/AuthCustomer';
import CartDrawer from '../components/CartDrawer';
import '../assets/css/storeinfo.css'; 
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Removed useParams
import { BookOpen, FileText, ShieldCheck, Loader2 } from 'lucide-react';
import customerApi from '../api/customerAxios';
 

const StoreInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pull slug directly from .env, fallback to 'marketplace'
  const slug = import.meta.env.VITE_STORE_SLUG || 'marketplace';

  // Data State
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [hasProducts, setHasProducts] = useState(true);
  const [hasServices, setHasServices] = useState(false);
  
  // Business Info State
  const [businessName, setBusinessName] = useState('Store');
  const [businessLogo, setBusinessLogo] = useState('');
  const [socialLinks, setSocialLinks] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  
  // UI State 
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuthCustomer, setShowAuthCustomer] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  const SUMMARY_API_URL = `${API_BASE_URL}/api/v1/business/${slug}/items/summary/`;

  const formatUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`; 
  };

  const toTitleCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(SUMMARY_API_URL);
        const data = res.data;
        
        setTrendingProducts(data.trending || []);

        const allSummaryItems = [...(data.best_selling || []), ...(data.trending || [])];
        const foundServices = allSummaryItems.some(p => p.item_type && String(p.item_type).toLowerCase() === 'service');
        const foundGoods = allSummaryItems.some(p => !p.item_type || ['good', 'goods', 'product', 'products'].includes(String(p.item_type).toLowerCase()));
        
        setHasServices(foundServices);
        setHasProducts(allSummaryItems.length === 0 ? true : foundGoods);
        
        const biz = data.business || data.best_selling?.[0]?.business || data.trending?.[0]?.business;
        
        if (biz) {
            setBusinessName(biz.business_name || slug.toUpperCase());
            setBusinessLogo(formatUrl(biz.logo_bucket_url));
            setSocialLinks({
                facebook: biz.facebook_url,
                instagram: biz.instagram_url,
                youtube: biz.youtube_url,
                twitter: biz.x_url || biz.twitter_url
            });
            setContactInfo({
                email: biz.user?.email || biz.email || `contact@${slug}.com`, 
                phone: biz.user?.phone || biz.phone ? `${biz.user?.phone || biz.phone}` : ''
            });
        } else {
            setBusinessName(toTitleCase(slug.replace('-', ' ')));
        }
        setLoading(false);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setBusinessName("Store Not Found");
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [slug]);

  // --- 2. HANDLE SCROLL TO HASH (e.g. #terms) ---
  useEffect(() => {
    if (!loading) {
      const hash = location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Smoothly scroll to the section
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location, loading]);

  useEffect(() => {
     if (searchTerm && searchTerm.trim() !== '') {
         // UPDATED PATH: Removed /marketplace prefix
         navigate(`/marketplace/items?search=${encodeURIComponent(searchTerm)}`); 
     }
  }, [searchTerm, navigate]);

  // --- 3. AUTH & CART LOGIC ---
  const checkLoginStatus = () => {
    const token = localStorage.getItem('customer_token');
    const name = localStorage.getItem('customer_name');
    if (token) { setIsLoggedIn(true); setUser({ name: name || 'User' }); }
    else { setIsLoggedIn(false); setUser(null); }
  };

  useEffect(() => { checkLoginStatus(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_name');
    localStorage.removeItem('customer_refresh');
    setIsLoggedIn(false); setUser(null); setIsDropdownOpen(false);
  };

  const handleAddToCart = async (productId, e) => {
    e.preventDefault(); 
    if (!isLoggedIn) { alert("Please Login to shop!"); setShowAuthCustomer(true); return; }
    try {
        await customerApi.post(`customer/cart/add/`, { item: productId, quantity: 1 });
        setIsCartOpen(true);
    } catch (err) { console.error(err); alert("Failed to add item to cart."); }
  };

  // --- 4. PRODUCT CARD RENDERER ---
  const renderProductCard = (product, badgeLabel = null) => {
    const mrp = parseFloat(product.mrp_baseprice || 0);
    const sellingPrice = parseFloat(product.gross_amount || 0);
    const hasDiscount = mrp > sellingPrice;
    const currency = product.currency_symbol || '₹'; 
    const discountPercent = hasDiscount ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

    const isService = product.item_type && String(product.item_type).toLowerCase().includes('service');
    let isUnavailable = false;
    let unavailableText = 'SOLD OUT';

    if (isService) {
        const status = product.availability_status_service || '';
        if (status.toLowerCase() === 'busy' || status.toLowerCase() === 'offline') {
            isUnavailable = true;
            unavailableText = 'NOT AVAILABLE';
        }
    } else {
        if (product.quantity_product <= 0) {
            isUnavailable = true;
            unavailableText = 'SOLD OUT';
        }
    }

    return (
      <div key={product.id} className="elegant-product-card">
        {/* UPDATED PATH: Removed /marketplace prefix */}
        <Link to={`/marketplace/item/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="elegant-image-box">
                {badgeLabel && !isUnavailable && <div className="elegant-badge">{badgeLabel}</div>}
                {isUnavailable && <div className="elegant-badge out-of-stock">{unavailableText}</div>}

                {product.item_image_url ? (
                    <img src={product.item_image_url} alt={product.item_name} className={`elegant-product-img ${isUnavailable ? 'grayscale' : ''}`} />
                ) : ( 
                    <div className="elegant-placeholder-img">{product.item_name.charAt(0)}</div> 
                )}
                
                <div className="elegant-add-overlay">
                    <button 
                        className="elegant-add-btn" 
                        disabled={isUnavailable} 
                        onClick={(e) => handleAddToCart(product.id, e)}
                    >
                        {isUnavailable ? unavailableText : 'Add to Cart'}
                    </button>
                </div>
            </div>
            
            <div className="elegant-details">
                <h3 className="elegant-title" title={product.item_name}>{product.item_name}</h3>
                
                <div className="elegant-price-row">
                    <span className="elegant-price">{currency}{sellingPrice}</span>
                    {hasDiscount && (
                        <>
                            <span className="elegant-mrp">{currency}{mrp}</span>
                            <span className="elegant-discount-text">{discountPercent}% off</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
      </div>
    );
  };

  if (loading) return <div className="loading-container"><Loader2 size={40} className="animate-spin" /><p>Loading Info...</p></div>;

  return (
    <div className="store-body elegant-theme info-page-wrapper">
      <StoreHeader 
        slug={slug}
        businessName={businessName}
        businessLogo={businessLogo}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => setShowAuthCustomer(true)}
        onLogoutClick={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        hasProducts={hasProducts}
        hasServices={hasServices}
      />

      {/* --- 1. OUR STORY --- */}
      <div id="story" className="info-single-column">
        <h1 className="info-header-title">Our Story</h1>
        <div className="info-text-block">
          <p className="lead-text">
            Welcome to <strong>{businessName}</strong>, where everyday elegance meets uncompromising quality.
          </p>
          <p>
            Born out of a passion for refined aesthetics and durable craftsmanship, {businessName} was founded with a simple mission: to provide our customers with premium, carefully curated products that elevate their daily lives. Whether it's our signature items or our hand-picked lifestyle accessories, every item in our catalog is chosen with you in mind.
          </p>
          <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
              alt="Our Store" 
              className="info-hero-image" 
          />
          <h3>Our Commitment to Quality</h3>
          <p>
            We believe that luxury shouldn't be out of reach. We work directly with trusted artisans and manufacturers to cut out the middlemen, ensuring that you receive honest savings without ever sacrificing the structural integrity or beauty of the product.
          </p>
          <h3>Customer First, Always</h3>
          <p>
            At {businessName}, your satisfaction is our ultimate benchmark. From a seamless online shopping experience to prompt, reliable delivery right to your door, we are dedicated to making every interaction with us exceptional. Thank you for being a part of our journey.
          </p>
        </div>
      </div>

      {/* --- 2. TRENDING NOW SECTION --- */}
      {trendingProducts.length > 0 && (
          <section id="trending" className="elegant-section section-cream" style={{ width: '100%', padding: '60px 0' }}>
            <div className="elegant-main-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div className="elegant-section-header">
                    <span className="elegant-overline">WHAT'S HOT</span>
                    <h2 className="elegant-serif-title">Trending Now</h2>
                </div>
                
                <div className="elegant-product-grid">
                    {trendingProducts.slice(0, 4).map(product => renderProductCard(product, "TRENDING"))}
                </div>
            </div>
          </section>
      )}

      {/* --- 3. TERMS OF SERVICE --- */}
      <div id="terms" className="info-single-column">
        <h1 className="info-header-title">Terms of Service</h1>
        <div className="info-text-block">
          <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using the {businessName} website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>

          <h3>2. Products and Pricing</h3>
          <p>All products listed on the website are subject to change, as is product pricing. We reserve the right, at any time, to modify or discontinue a product without notice. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance.</p>

          <h3>3. Billing and Account Information</h3>
          <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
        </div>
      </div>

      {/* --- 4. PRIVACY POLICY --- */}
      <div id="privacy" className="info-single-column" style={{ marginBottom: '60px' }}>
        <h1 className="info-header-title">Privacy Policy</h1>
        <div className="info-text-block">
          <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

          <h3>1. Information We Collect</h3>
          <p>When you visit {businessName}, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual as "Personal Information".</p>

          <h3>2. How We Use Your Information</h3>
          <p>We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>

          <h3>3. Sharing Personal Information</h3>
          <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. For example, we use payment gateways to process your payments securely.</p>
        </div>
      </div>

      <StoreFooter 
        slug={slug}
        businessName={businessName}
        businessLogo={businessLogo}
        socialLinks={socialLinks}
        contactInfo={contactInfo}
      />

      <AuthCustomer isOpen={showAuthCustomer} onClose={() => setShowAuthCustomer(false)} onLoginSuccess={checkLoginStatus} />
      
      {/* UPDATED: Removed slug prop */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default StoreInfo;