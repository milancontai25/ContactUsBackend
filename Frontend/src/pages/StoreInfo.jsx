import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import StoreHeader from '../components/StoreHeader';
import StoreFooter from '../components/StoreFooter';
import AuthCustomer from '../components/AuthCustomer';
import CartDrawer from '../components/CartDrawer';
import ScrollRow from '../components/ScrollRow';
import customerApi from '../api/customerAxios';
import '../assets/css/storecategory.css'; // the .elegant-* card + carousel styles used below
import '../assets/css/storeinfo.css';

const SECTIONS = [
  { id: 'story', label: 'Our Story' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'privacy', label: 'Privacy Policy' }
];

const toTitleCase = (str) => {
  if (!str) return '';
  return String(str).toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

/* Same price/stock resolution the shop pages use, so a variant product
   doesn't show ₹0 here. */
const getCardData = (product) => {
  let mrp = parseFloat(product.mrp_baseprice || 0);
  let sellingPrice = parseFloat(product.gross_amount || 0);
  let stockQuantity = Number(product.quantity_product || 0);
  let imageUrl = product.item_image_url || null;

  if (product.has_variants && Array.isArray(product.variants) && product.variants.length > 0) {
    const v = product.variants[0];
    sellingPrice = parseFloat(v.selling_price || sellingPrice);
    mrp = parseFloat(v.mrp || mrp);
    stockQuantity = v.stock !== undefined ? Number(v.stock) : stockQuantity;
    if (Array.isArray(v.images) && v.images.length > 0) {
      const primary = v.images.find(i => i.is_primary);
      imageUrl = primary ? primary.image_url : v.images[0].image_url;
    }
  }

  const isService = product.item_type && String(product.item_type).toLowerCase().includes('service');
  let isUnavailable = false;
  let unavailableText = 'SOLD OUT';

  if (isService) {
    const status = String(product.availability_status_service || '').toLowerCase();
    if (status === 'busy' || status === 'offline') {
      isUnavailable = true;
      unavailableText = 'NOT AVAILABLE';
    }
  } else if (stockQuantity <= 0) {
    isUnavailable = true;
  }

  const hasDiscount = mrp > sellingPrice;

  return {
    mrp,
    sellingPrice,
    imageUrl,
    isUnavailable,
    unavailableText,
    hasDiscount,
    discountPercent: hasDiscount && mrp > 0 ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0,
    currency: product.currency_symbol || '₹'
  };
};

const StoreInfo = () => {
  const location = useLocation();

  const slug = import.meta.env.VITE_STORE_SLUG || 'marketplace';

  // Data
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [hasProducts, setHasProducts] = useState(true);
  const [hasServices, setHasServices] = useState(false);

  // Business info
  const [businessName, setBusinessName] = useState('Store');
  const [businessLogo, setBusinessLogo] = useState('');
  const [storyImage, setStoryImage] = useState(null);
  const [socialLinks, setSocialLinks] = useState({});
  const [contactInfo, setContactInfo] = useState({});

  // UI
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('story');
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

  // --- 1. FETCH ---
  useEffect(() => {
    let cancelled = false;

    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(SUMMARY_API_URL);
        if (cancelled) return;
        const data = res.data;

        setTrendingProducts(data.trending || []);

        const allSummaryItems = [...(data.best_selling || []), ...(data.trending || [])];
        const foundServices = allSummaryItems.some(p => p.item_type && String(p.item_type).toLowerCase() === 'service');
        const foundGoods = allSummaryItems.some(p => !p.item_type || ['good', 'goods', 'product', 'products'].includes(String(p.item_type).toLowerCase()));

        setHasServices(foundServices);
        setHasProducts(allSummaryItems.length === 0 ? true : foundGoods);

        const biz = data.business || data.best_selling?.[0]?.business || data.trending?.[0]?.business;

        if (biz) {
          setBusinessName(biz.business_name || toTitleCase(slug.replace(/[-_]/g, ' ')));
          setBusinessLogo(formatUrl(biz.logo_bucket_url));

          // The store's own banner, not a stock photo. No banner, no figure.
          setStoryImage(biz.banner_1_url || biz.banner_2_url || biz.banner_3_url || null);

          setSocialLinks({
            facebook: biz.facebook_url,
            instagram: biz.instagram_url,
            youtube: biz.youtube_url,
            twitter: biz.x_url || biz.twitter_url
          });
          setContactInfo({
            email: biz.user?.email || biz.email || '',
            phone: biz.user?.phone || biz.phone || ''
          });
        } else {
          setBusinessName(toTitleCase(slug.replace(/[-_]/g, ' ')));
        }

        setLoading(false);
      } catch (err) {
        console.error("API Fetch Error:", err);
        if (!cancelled) {
          setBusinessName("Store Not Found");
          setLoading(false);
        }
      }
    };

    fetchStoreData();
    return () => { cancelled = true; };
  }, [slug]);

  // --- 2. DEEP LINKS (#story / #terms / #privacy) ---
  useEffect(() => {
    if (loading) return;

    const hash = location.hash.replace('#', '');
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Wait one frame so the section has its final height before scrolling.
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' }); // honours scroll-margin-top
      setActiveSection(hash);
    });

    return () => cancelAnimationFrame(raf);
  }, [location, loading]);

  // --- 3. WHICH SECTION AM I READING? ---
  useEffect(() => {
    if (loading || typeof IntersectionObserver === 'undefined') return;

    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-150px 0px -55% 0px', threshold: 0 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const jumpTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `${location.pathname}#${id}`);
    setActiveSection(id);
  }, [location.pathname]);

  // --- 4. AUTH & CART ---
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

  // --- 5. PRODUCT CARD ---
  const renderProductCard = (product, badgeLabel = null) => {
    const d = getCardData(product);

    return (
      <div key={product.id} className="elegant-product-card">
        <Link to={`/marketplace/item/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div className="elegant-image-box">
            {badgeLabel && !d.isUnavailable && <div className="elegant-badge">{badgeLabel}</div>}
            {d.isUnavailable && <div className="elegant-badge out-of-stock">{d.unavailableText}</div>}

            {d.imageUrl ? (
              <img src={d.imageUrl} alt={product.item_name} className={`elegant-product-img ${d.isUnavailable ? 'grayscale' : ''}`} />
            ) : (
              <div className="elegant-placeholder-img">{String(product.item_name || '?').charAt(0)}</div>
            )}

            <div className="elegant-add-overlay">
              <button
                className="elegant-add-btn"
                disabled={d.isUnavailable}
                onClick={(e) => {
                  if (product.has_variants) return; // let the Link open the detail page
                  handleAddToCart(product.id, e);
                }}
              >
                {d.isUnavailable ? d.unavailableText : (product.has_variants ? 'Select Options' : 'Add to Cart')}
              </button>
            </div>
          </div>

          <div className="elegant-details">
            <h3 className="elegant-title" title={product.item_name}>{product.item_name}</h3>

            <div className="elegant-price-row">
              <span className="elegant-price">{d.currency}{d.sellingPrice}</span>
              {d.hasDiscount && (
                <>
                  <span className="elegant-mrp">{d.currency}{d.mrp}</span>
                  <span className="elegant-discount-text">{d.discountPercent}% off</span>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const lastUpdated = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

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

      {/* --- PAGE HEAD --- */}
      <div className="info-masthead">
        <div className="info-shell">
          <h1 className="info-masthead-title">About {businessName}</h1>
          <p className="info-masthead-sub">
            Who we are, and the terms you agree to when you shop with us.
          </p>
        </div>
      </div>

      {/* --- SECTION NAV (sticky under the header) --- */}
      <nav className="info-subnav" aria-label="Page sections">
        <div className="info-subnav-inner">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              type="button"
              className={`info-subnav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => jumpTo(section.id)}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="info-main">

        {/* --- 1. OUR STORY --- */}
        <section id="story" className="info-section">
          <div className="info-shell">
            <h2 className="info-section-title">Our Story</h2>

            <div className="info-prose">
              <p className="info-lead">
                Welcome to <strong>{businessName}</strong>, where everyday elegance meets uncompromising quality.
              </p>
              <p>
                Born out of a passion for refined aesthetics and durable craftsmanship, {businessName} was
                founded with a simple mission: to provide our customers with premium, carefully curated
                products that elevate their daily lives. Whether it's our signature items or our hand-picked
                lifestyle accessories, every item in our catalog is chosen with you in mind.
              </p>
            </div>

            {storyImage && (
              <figure className="story-figure">
                <img src={storyImage} alt={`${businessName} store`} loading="lazy" />
              </figure>
            )}

            <div className="info-prose">
              <h3>Our Commitment to Quality</h3>
              <p>
                We believe that luxury shouldn't be out of reach. We work directly with trusted artisans and
                manufacturers to cut out the middlemen, ensuring that you receive honest savings without ever
                sacrificing the structural integrity or beauty of the product.
              </p>

              <h3>Customer First, Always</h3>
              <p>
                At {businessName}, your satisfaction is our ultimate benchmark. From a seamless online
                shopping experience to prompt, reliable delivery right to your door, we are dedicated to
                making every interaction with us exceptional. Thank you for being a part of our journey.
              </p>
            </div>
          </div>
        </section>

        {/* --- TRENDING (a break between the story and the legal text) --- */}
        {trendingProducts.length > 0 && (
          <section className="info-trending">
            <div className="info-shell">
              <div className="elegant-section-header">
                <span className="elegant-overline">WHAT'S HOT</span>
                <h2 className="elegant-serif-title">Trending Now</h2>
              </div>

              <ScrollRow className="srow--products" ariaLabel="trending products">
                {trendingProducts.slice(0, 10).map(product => renderProductCard(product, "TRENDING"))}
              </ScrollRow>

              <div className="see-more-row">
                <Link to="/marketplace/items?collection=trending" className="btn-see-more">
                  See more trending items
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* --- 2. TERMS OF SERVICE --- */}
        <section id="terms" className="info-section">
          <div className="info-shell">
            <h2 className="info-section-title">Terms of Service</h2>

            <div className="legal-card">
              <p className="legal-meta">Last updated {lastUpdated}</p>

              <ol className="legal-list">
                <li>
                  <h3>Acceptance of terms</h3>
                  <p>
                    By accessing and using the {businessName} website, you accept and agree to be bound by the
                    terms and provisions of this agreement. If you do not agree to abide by these terms, please
                    do not use this service.
                  </p>
                </li>
                <li>
                  <h3>Products and pricing</h3>
                  <p>
                    All products listed on the website are subject to change, as is product pricing. We reserve
                    the right, at any time, to modify or discontinue a product without notice. We shall not be
                    liable to you or to any third party for any modification, price change, suspension, or
                    discontinuance.
                  </p>
                </li>
                <li>
                  <h3>Billing and account information</h3>
                  <p>
                    We reserve the right to refuse any order you place with us. We may, in our sole discretion,
                    limit or cancel quantities purchased per person, per household, or per order. You agree to
                    provide current, complete, and accurate purchase and account information for all purchases
                    made at our store.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* --- 3. PRIVACY POLICY --- */}
        <section id="privacy" className="info-section">
          <div className="info-shell">
            <h2 className="info-section-title">Privacy Policy</h2>

            <div className="legal-card">
              <p className="legal-meta">Last updated {lastUpdated}</p>

              <ol className="legal-list">
                <li>
                  <h3>Information we collect</h3>
                  <p>
                    When you visit {businessName}, we collect certain information about your device, your
                    interaction with the site, and information necessary to process your purchases. We may also
                    collect additional information if you contact us for customer support. In this policy, we
                    refer to any information that can uniquely identify an individual as personal information.
                  </p>
                </li>
                <li>
                  <h3>How we use your information</h3>
                  <p>
                    We use your personal information to provide our services to you, which includes offering
                    products for sale, processing payments, shipping and fulfilling your order, and keeping you
                    up to date on new products, services, and offers.
                  </p>
                </li>
                <li>
                  <h3>Sharing personal information</h3>
                  <p>
                    We share your personal information with service providers to help us provide our services
                    and fulfil our contracts with you. For example, we use payment gateways to process your
                    payments securely.
                  </p>
                </li>
              </ol>

              {(contactInfo.email || contactInfo.phone) && (
                <div className="legal-contact">
                  <h3>Questions about your data</h3>
                  <p>
                    Write to us at{' '}
                    {contactInfo.email
                      ? <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                      : <Link to="/marketplace/contact">our contact page</Link>}
                    {contactInfo.phone ? ` or call ${contactInfo.phone}.` : '.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <StoreFooter
        slug={slug}
        businessName={businessName}
        businessLogo={businessLogo}
        socialLinks={socialLinks}
        contactInfo={contactInfo}
      />

      <AuthCustomer isOpen={showAuthCustomer} onClose={() => setShowAuthCustomer(false)} onLoginSuccess={checkLoginStatus} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default StoreInfo;