import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Package, X, ChevronDown, Menu, Heart } from 'lucide-react';
import axios from 'axios';
import '../assets/css/storeheader.css'; 

const StoreHeader = ({ 
  slug, 
  searchTerm, 
  setSearchTerm, 
  isLoggedIn, 
  user, 
  onLoginClick, 
  onLogoutClick, 
  onCartClick,
  isDropdownOpen,
  setIsDropdownOpen
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  
  // --- HEADER API STATE ---
  const [headerData, setHeaderData] = useState({
    business_name: '',
    logo: null,
    has_products: true,
    has_services: false,
    customer_login: true
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type');
  
  // ✅ Active States updated to include /marketplace
  const isCategoriesActive = location.pathname === '/marketplace' && !currentType;
  const isProductsActive = currentType === 'goods';
  const isServicesActive = currentType === 'services';
  const isOurStoryActive = location.pathname === '/marketplace/our-story';
  const isContactActive = location.pathname === '/marketplace/contact';

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const formatUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`; 
  };

  // Fetch Header Data from API
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/business/${slug}/header/`);
        setHeaderData(res.data);
      } catch (err) {
        console.error("Failed to fetch header data", err);
      }
    };
    if (slug) fetchHeaderData();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, currentType]);

  return (
    <header className={`store-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        
        {/* --- LEFT: BRAND LOGO & NAME --- */}
        <Link to="/marketplace" className="brand-section">
          {headerData.logo && (
              <img 
                src={formatUrl(headerData.logo)} 
                className="brand-logo-img" 
                alt="logo" 
                onError={(e) => e.target.style.display='none'} 
              />
          )}
          <h1 className="brand-name-elegant" title={headerData.business_name}>
              {headerData.business_name || slug.toUpperCase()}
          </h1>
        </Link>
        
        {/* --- CENTER: DESKTOP NAVIGATION MENU --- */}
        <nav className="header-nav">
          <Link to="/marketplace" className={`header-nav-link ${isCategoriesActive ? 'active' : ''}`}>
            Collections
          </Link>
          {headerData.has_products && (
            <Link to="/marketplace/items?type=goods" className={`header-nav-link ${isProductsActive ? 'active' : ''}`}>
              Shop Now
            </Link>
          )}
          {headerData.has_services && (
            <Link to="/marketplace/items?type=services" className={`header-nav-link ${isServicesActive ? 'active' : ''}`}>
              Services
            </Link>
          )}
          <Link to="/marketplace/our-story" className={`header-nav-link ${isOurStoryActive ? 'active' : ''}`}>
            Our Story
          </Link>
          <Link to="/marketplace/contact" className={`header-nav-link ${isContactActive ? 'active' : ''}`}>
            Contact
          </Link>
        </nav>

        {/* --- RIGHT: ICONS --- */}
        <div className="header-actions">
          
          {/* Search */}
          <div className="header-search-wrapper">
            <div className="search-input-group">
              {!isSearchOpen ? (
                <button className="action-icon-btn" onClick={() => setIsSearchOpen(true)}>
                  <Search size={20} />
                </button>
              ) : (
                <Search size={18} color="#9CA3AF" className="search-active-icon" />
              )}
              
              <input 
                ref={searchInputRef}
                type="text" 
                className={`header-search-input ${isSearchOpen ? 'open' : ''}`}
                placeholder="Search..." 
                value={typeof searchTerm === 'string' ? searchTerm : ''}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {isSearchOpen && (
                <button 
                    className="action-icon-btn close-search-btn" 
                    onClick={() => {
                        setIsSearchOpen(false);
                        setSearchTerm(''); 
                    }}
                >
                  <X size={18} color="#6B7280" />
                </button>
              )}
            </div>
          </div>

          {/* User Auth */}
          <div className="user-info-trigger">
            {isLoggedIn ? (
              <div className="auth-icon-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="user-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
                <ChevronDown size={14} color="#6B7280" style={{ marginLeft: '4px' }} />
                
                {isDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">Hello, {user?.name}</div>
                    <Link to="/marketplace/orders" className="dropdown-item"><Package size={16} /> My Orders</Link>
                    <Link to="/marketplace/wishlist" className="dropdown-item"><Heart size={16} /> My Wishlist</Link>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item text-red" onClick={onLogoutClick}><LogOut size={16} /> Logout</div>
                  </div>
                )}
              </div>
            ) : (
              <button className="action-icon-btn" onClick={onLoginClick}>
                <User size={20} />
              </button>
            )}
          </div>

          {/* Cart */}
          <button className="action-icon-btn cart-icon-wrapper" onClick={onCartClick}>
            <ShoppingCart size={20} />
          </button>

          {/* Mobile Hamburger Menu */}
          <button 
            className="action-icon-btn mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION DROPDOWN --- */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          <Link to="/marketplace" className={`mobile-nav-link ${isCategoriesActive ? 'active' : ''}`}>
            Collections
          </Link>
          {headerData.has_products && (
            <Link to="/marketplace/items?type=goods" className={`mobile-nav-link ${isProductsActive ? 'active' : ''}`}>
              Shop Now
            </Link>
          )}
          {headerData.has_services && (
            <Link to="/marketplace/items?type=services" className={`mobile-nav-link ${isServicesActive ? 'active' : ''}`}>
              Services
            </Link>
          )}
          <Link to="/marketplace/our-story" className={`mobile-nav-link ${isOurStoryActive ? 'active' : ''}`}>
            Our Story
          </Link>
          <Link to="/marketplace/wishlist" className="mobile-nav-link">
            My Wishlist
          </Link>
          <Link to="/marketplace/contact" className={`mobile-nav-link ${isContactActive ? 'active' : ''}`}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default StoreHeader;