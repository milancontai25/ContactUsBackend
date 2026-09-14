import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Package, X, ChevronDown, Menu, Heart } from 'lucide-react';
import axios from 'axios';
import '../assets/css/storeheader.css';

/**
 * Every prop below is optional. Pages that hand in `searchTerm` /
 * `setSearchTerm` or `isDropdownOpen` / `setIsDropdownOpen` stay in control;
 * pages that render <StoreHeader slug={slug} /> on its own fall back to the
 * header's internal state. Nothing here assumes a parent is listening.
 */
const StoreHeader = ({
  slug,
  searchTerm,
  setSearchTerm,
  isLoggedIn = false,
  user,
  onLoginClick,
  onLogoutClick,
  onCartClick,
  isDropdownOpen,
  setIsDropdownOpen,
  cartCount = 0,          // renders a badge when > 0
  onSearchSubmit,         // overrides the default navigate-to-shop
  hasProducts,            // used until /header/ responds
  hasServices
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // --- CONTROLLED / UNCONTROLLED BRIDGES ---
  const [ownDropdownOpen, setOwnDropdownOpen] = useState(false);
  const dropdownIsControlled = typeof setIsDropdownOpen === 'function';
  const dropdownOpen = dropdownIsControlled ? !!isDropdownOpen : ownDropdownOpen;

  const setDropdownOpen = useCallback((value) => {
    if (dropdownIsControlled) setIsDropdownOpen(value);
    else setOwnDropdownOpen(value);
  }, [dropdownIsControlled, setIsDropdownOpen]);

  const [ownSearchTerm, setOwnSearchTerm] = useState('');
  const searchIsControlled = typeof setSearchTerm === 'function';
  const searchValue = searchIsControlled
    ? (typeof searchTerm === 'string' ? searchTerm : '')
    : ownSearchTerm;

  const updateSearch = useCallback((value) => {
    if (searchIsControlled) setSearchTerm(value);
    else setOwnSearchTerm(value);
  }, [searchIsControlled, setSearchTerm]);

  // --- HEADER API STATE ---
  const [headerData, setHeaderData] = useState({
    business_name: '',
    logo: null,
    has_products: hasProducts !== undefined ? hasProducts : true,
    has_services: hasServices !== undefined ? hasServices : false,
    customer_login: true
  });

  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type');
  const onShopRoute = location.pathname.startsWith('/marketplace/items');

  // Active states. "Shop Now" also lights up for collection / category / search
  // landings, which all live on /marketplace/items with no ?type=goods.
  const isCollectionsActive = location.pathname === '/marketplace';
  const isServicesActive = onShopRoute && (currentType === 'services' || currentType === 'service');
  const isProductsActive = onShopRoute && !isServicesActive;
  const isOurStoryActive = location.pathname === '/marketplace/our-story';
  const isContactActive = location.pathname === '/marketplace/contact';

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const formatUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  // Never crash when VITE_STORE_SLUG is missing
  const storeName = headerData.business_name || (slug ? String(slug).replace(/[-_]/g, ' ') : 'Store');
  const showLogin = headerData.customer_login !== false;

  // --- FETCH HEADER DATA ---
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    const fetchHeaderData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/v1/business/${slug}/header/`);
        if (!cancelled) setHeaderData(prev => ({ ...prev, ...res.data }));
      } catch (err) {
        console.error("Failed to fetch header data", err);
      }
    };

    fetchHeaderData();
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isSearchOpen]);

  // Close the menus whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.search, setDropdownOpen]);

  // Don't let the page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    updateSearch('');
  }, [updateSearch]);

  // Click-outside + Escape for the account menu and the search field
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (dropdownOpen && accountRef.current && !accountRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (isSearchOpen && searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        if (!searchValue.trim()) setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (dropdownOpen) setDropdownOpen(false);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (isSearchOpen) closeSearch();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen, isSearchOpen, isMobileMenuOpen, searchValue, closeSearch, setDropdownOpen]);

  // Enter (or the icon) runs the search. Typing alone no longer navigates,
  // so the shop page can keep filtering live while the category page waits
  // for a real submit.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchValue.trim();
    if (!term) {
      searchInputRef.current?.focus();
      return;
    }
    if (typeof onSearchSubmit === 'function') onSearchSubmit(term);
    else navigate(`/marketplace/items?search=${encodeURIComponent(term)}`);
    searchInputRef.current?.blur();
  };

  const navLinks = [
    { to: '/marketplace', label: 'Collections', active: isCollectionsActive, show: true },
    { to: '/marketplace/items?type=goods', label: 'Shop Now', active: isProductsActive, show: headerData.has_products },
    { to: '/marketplace/items?type=services', label: 'Services', active: isServicesActive, show: headerData.has_services },
    { to: '/marketplace/our-story', label: 'Our Story', active: isOurStoryActive, show: true },
    { to: '/marketplace/contact', label: 'Contact', active: isContactActive, show: true }
  ];

  return (
    <header className={`store-header ${scrolled ? 'scrolled' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
      <div className="header-content">

        {/* --- LEFT: BRAND LOGO & NAME --- */}
        <Link to="/marketplace" className="brand-section">
          {headerData.logo && (
            <img
              src={formatUrl(headerData.logo)}
              className="header-brand-logo"
              alt=""
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          {/* A span, not an h1: the page content owns the document heading */}
          <span className="brand-name-elegant" title={storeName}>{storeName}</span>
        </Link>

        {/* --- CENTER: DESKTOP NAVIGATION --- */}
        <nav className="header-nav" aria-label="Store">
          {navLinks.filter(l => l.show).map(link => (
            <Link
              key={link.label}
              to={link.to}
              className={`header-nav-link ${link.active ? 'active' : ''}`}
              aria-current={link.active ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* --- RIGHT: ICONS --- */}
        <div className="header-actions">

          {/* Search */}
          <div className="header-search-wrapper" ref={searchWrapRef}>
            <form className="search-input-group" onSubmit={handleSearchSubmit} role="search">
              {!isSearchOpen ? (
                <button
                  type="button"
                  className="action-icon-btn"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search the store"
                >
                  <Search size={20} />
                </button>
              ) : (
                <button type="submit" className="action-icon-btn search-active-icon" aria-label="Search">
                  <Search size={18} />
                </button>
              )}

              <input
                ref={searchInputRef}
                type="search"
                className={`header-search-input ${isSearchOpen ? 'open' : ''}`}
                placeholder="Search products..."
                aria-label="Search products"
                tabIndex={isSearchOpen ? 0 : -1}
                value={searchValue}
                onChange={(e) => updateSearch(e.target.value)}
              />

              {isSearchOpen && (
                <button
                  type="button"
                  className="action-icon-btn close-search-btn"
                  onClick={closeSearch}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              )}
            </form>
          </div>

          {/* Account */}
          {(isLoggedIn || showLogin) && (
            <div className="user-info-trigger" ref={accountRef}>
              {isLoggedIn ? (
                <>
                  <button
                    type="button"
                    className="auth-icon-wrapper"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="menu"
                    aria-label="Your account"
                  >
                    <span className="user-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                    <ChevronDown size={14} className="auth-chevron" />
                  </button>

                  {dropdownOpen && (
                    <div className="profile-dropdown" role="menu">
                      <div className="dropdown-header">Hello, {user?.name || 'there'}</div>
                      <Link to="/marketplace/orders" className="dropdown-item" role="menuitem">
                        <Package size={16} /> My Orders
                      </Link>
                      <Link to="/marketplace/wishlist" className="dropdown-item" role="menuitem">
                        <Heart size={16} /> My Wishlist
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        type="button"
                        className="dropdown-item text-red"
                        role="menuitem"
                        onClick={() => { setDropdownOpen(false); onLogoutClick?.(); }}
                      >
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  className="action-icon-btn"
                  onClick={() => onLoginClick?.()}
                  aria-label="Sign in"
                >
                  <User size={20} />
                </button>
              )}
            </div>
          )}

          {/* Cart */}
          <button
            type="button"
            className="action-icon-btn cart-icon-wrapper"
            onClick={() => onCartClick?.()}
            aria-label={cartCount > 0 ? `Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}` : 'Cart'}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="cart-count-badge">{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            className="action-icon-btn mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION --- */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />

          <nav className="mobile-nav-dropdown" aria-label="Store">
            {navLinks.filter(l => l.show).map(link => (
              <Link
                key={link.label}
                to={link.to}
                className={`mobile-nav-link ${link.active ? 'active' : ''}`}
                aria-current={link.active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            <div className="mobile-nav-divider" />

            {isLoggedIn ? (
              <>
                <Link to="/marketplace/orders" className="mobile-nav-link">My Orders</Link>
                <Link to="/marketplace/wishlist" className="mobile-nav-link">My Wishlist</Link>
                <button
                  type="button"
                  className="mobile-nav-link as-button text-red"
                  onClick={() => { setIsMobileMenuOpen(false); onLogoutClick?.(); }}
                >
                  Log out
                </button>
              </>
            ) : showLogin && (
              <button
                type="button"
                className="mobile-nav-link as-button"
                onClick={() => { setIsMobileMenuOpen(false); onLoginClick?.(); }}
              >
                Sign in
              </button>
            )}
          </nav>
        </>
      )}
    </header>
  );
};

export default StoreHeader;
