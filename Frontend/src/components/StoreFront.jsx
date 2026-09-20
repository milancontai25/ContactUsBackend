import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Image as ImageIcon, SlidersHorizontal, X, LayoutGrid } from 'lucide-react';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import AuthCustomer from './AuthCustomer';
import CartDrawer from './CartDrawer';
import ScrollRow from './ScrollRow';
import customerApi from '../api/customerAxios';
import '../assets/css/storefront.css';
import '../assets/css/storefront-shop.css';

/* Switch to 'right' to move the whole filter panel to the other side. */
const FILTER_SIDE = 'left';

const COLLECTION_LABELS = {
  best_selling: 'Best Selling',
  trending: 'Trending Now'
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'discount', label: 'Biggest discount' },
  { value: 'name_asc', label: 'Name: A to Z' }
];

const toTitleCase = (str) => {
  if (!str) return '';
  return String(str).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

/* Single source of truth for price / stock / image, used by both the
   filters and the card so they can never disagree. */
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
      const primaryImg = v.images.find(img => img.is_primary);
      imageUrl = primaryImg ? primaryImg.image_url : v.images[0].image_url;
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
  const discountPercent = hasDiscount && mrp > 0 ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  return {
    mrp,
    sellingPrice,
    stockQuantity,
    imageUrl,
    isService,
    isUnavailable,
    unavailableText,
    hasDiscount,
    discountPercent,
    currency: product.currency_symbol || '₹'
  };
};

const subcategoryOf = (product) =>
  toTitleCase(product.sub_category || product.subcategory || product.category || '');

const StoreFront = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- URL DRIVEN STATE ---
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const currentType = queryParams.get('type') || '';
  const urlSearch = queryParams.get('search') || '';
  const categoryParam = queryParams.get('category') || 'All';
  const collectionParam = queryParams.get('collection') || '';

  // --- DATA ---
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState({ best_selling: [], trending: [] });
  const [loading, setLoading] = useState(true);

  const [hasProducts, setHasProducts] = useState(false);
  const [hasServices, setHasServices] = useState(false);

  const [businessName, setBusinessName] = useState('');
  const [businessLogo, setBusinessLogo] = useState('');
  const [banners, setBanners] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // --- FILTER STATE ---
  const [selectedCats, setSelectedCats] = useState(() => new Set());
  const [selectedSubcats, setSelectedSubcats] = useState(() => new Set());
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- SHELL STATE ---
  const [showAuthCustomer, setShowAuthCustomer] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const slug = import.meta.env.VITE_STORE_SLUG;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const GOODS_API_URL = `${API_BASE_URL}/api/v1/business/${slug}/items/goods/`;
  const SERVICES_API_URL = `${API_BASE_URL}/api/v1/business/${slug}/items/services/`;
  const SUMMARY_API_URL = `${API_BASE_URL}/api/v1/business/${slug}/items/summary/`;

  const formatUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  // ------------------------------------------------------------------
  // 1. FETCH
  // ------------------------------------------------------------------
  useEffect(() => {
    checkLoginStatus();

    const fetchStoreData = async () => {
      try {
        setLoading(true);

        const [goodsRes, servicesRes, summaryRes] = await Promise.allSettled([
          axios.get(GOODS_API_URL),
          axios.get(SERVICES_API_URL),
          axios.get(SUMMARY_API_URL)
        ]);

        let goodsList = [];
        let servicesList = [];

        if (goodsRes.status === 'fulfilled') {
          goodsList = Array.isArray(goodsRes.value.data) ? goodsRes.value.data : (goodsRes.value.data.results || []);
          goodsList.forEach(item => { item._local_item_type = 'goods'; });
        }
        if (servicesRes.status === 'fulfilled') {
          servicesList = Array.isArray(servicesRes.value.data) ? servicesRes.value.data : (servicesRes.value.data.results || []);
          servicesList.forEach(item => { item._local_item_type = 'services'; });
        }

        const combinedProducts = [...goodsList, ...servicesList];
        setProducts(combinedProducts);

        setHasProducts(goodsList.length > 0 || combinedProducts.length === 0);
        setHasServices(servicesList.length > 0);

        // Best selling / trending come from the same summary endpoint the
        // category page uses, so "See more" lands on the exact same items.
        let summary = null;
        if (summaryRes.status === 'fulfilled') {
          summary = summaryRes.value.data || null;
          setCollections({
            best_selling: summary?.best_selling || [],
            trending: summary?.trending || []
          });
        }

        const biz = combinedProducts[0]?.business || summary?.business || null;

        if (biz) {
          setBusinessName(biz.business_name || slug.toUpperCase());
          setBusinessLogo(formatUrl(biz.logo_bucket_url));

          const activeBanners = [];
          if (biz.banner_1_url) activeBanners.push(biz.banner_1_url);
          if (biz.banner_2_url) activeBanners.push(biz.banner_2_url);
          if (biz.banner_3_url) activeBanners.push(biz.banner_3_url);
          setBanners(activeBanners);

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

  // Keep the search box in sync when the header navigates here with ?search=
  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  // Banner autoplay
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  // Lock the page behind the mobile filter drawer
  useEffect(() => {
    if (isFilterOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isFilterOpen]);

  // ------------------------------------------------------------------
  // 2. URL HELPERS
  // ------------------------------------------------------------------
  const updateQuery = useCallback((mutate) => {
    const next = new URLSearchParams(location.search);
    mutate(next);
    const qs = next.toString();
    navigate(qs ? `${location.pathname}?${qs}` : location.pathname);
  }, [location.search, location.pathname, navigate]);

  const setCollection = (value) => updateQuery(q => {
    if (value) q.set('collection', value);
    else q.delete('collection');
  });

  const setTypeFilter = (value) => updateQuery(q => {
    if (value) q.set('type', value);
    else q.delete('type');
  });

  const clearCategoryParam = () => updateQuery(q => q.delete('category'));

  // ------------------------------------------------------------------
  // 3. FILTER PIPELINE
  // ------------------------------------------------------------------
  const typeFiltered = useMemo(() => products.filter(p => {
    if (currentType === 'goods') return p._local_item_type === 'goods';
    if (currentType === 'services' || currentType === 'service') return p._local_item_type === 'services';
    return true;
  }), [products, currentType]);

  const availableCategories = useMemo(() => {
    const map = new Map();
    typeFiltered.forEach(p => {
      if (!p.category) return;
      const name = toTitleCase(p.category);
      map.set(name, (map.get(name) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [typeFiltered]);

  const categoryFiltered = useMemo(() => typeFiltered.filter(p => {
    const cat = toTitleCase(p.category || '');
    if (categoryParam !== 'All') return cat.toLowerCase() === categoryParam.toLowerCase();
    if (selectedCats.size === 0) return true;
    return selectedCats.has(cat);
  }), [typeFiltered, categoryParam, selectedCats]);

  // Subcategories for whatever category scope is active (1..n, with counts)
  const subcategories = useMemo(() => {
    const map = new Map();
    categoryFiltered.forEach(p => {
      const name = subcategoryOf(p);
      if (!name) return;
      const image = p.sub_category_image_url || p.category_image_url || p.category_image || null;
      const existing = map.get(name);
      if (!existing) map.set(name, { name, image, count: 1 });
      else {
        existing.count += 1;
        if (!existing.image && image) existing.image = image;
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [categoryFiltered]);

  // A single subcategory that just repeats the category name adds nothing
  const showSubcatStrip = subcategories.length > 0 && !(
    subcategories.length === 1 &&
    categoryParam !== 'All' &&
    subcategories[0].name.toLowerCase() === categoryParam.toLowerCase()
  );

  // Collection lookup: match on id first, fall back to slug
  const collectionIndex = useMemo(() => {
    const build = (items) => {
      const keys = new Set();
      const order = new Map();
      (items || []).forEach((item, i) => {
        [item?.id, item?.slug].forEach(value => {
          if (value === undefined || value === null) return;
          const key = String(value);
          keys.add(key);
          if (!order.has(key)) order.set(key, i);
        });
      });
      return { keys, order };
    };
    return {
      best_selling: build(collections.best_selling),
      trending: build(collections.trending)
    };
  }, [collections]);

  const activeCollection = collectionParam ? collectionIndex[collectionParam] : null;
  const collectionReady = !!activeCollection && activeCollection.keys.size > 0;

  const collectionRank = useCallback((product) => {
    if (!collectionReady) return 0;
    const byId = activeCollection.order.get(String(product.id));
    if (byId !== undefined) return byId;
    const bySlug = product.slug ? activeCollection.order.get(String(product.slug)) : undefined;
    return bySlug === undefined ? Number.MAX_SAFE_INTEGER : bySlug;
  }, [activeCollection, collectionReady]);

  const filteredProducts = useMemo(() => {
    const search = (searchTerm || '').trim().toLowerCase();
    const min = priceMin === '' ? null : parseFloat(priceMin);
    const max = priceMax === '' ? null : parseFloat(priceMax);

    let rows = categoryFiltered
      .map(p => ({ product: p, data: getCardData(p) }))
      .filter(({ product, data }) => {
        if (collectionReady) {
          const inCollection =
            activeCollection.keys.has(String(product.id)) ||
            (product.slug && activeCollection.keys.has(String(product.slug)));
          if (!inCollection) return false;
        }

        if (selectedSubcats.size > 0 && !selectedSubcats.has(subcategoryOf(product))) return false;

        if (search) {
          const haystack = [
            product.item_name,
            product.sub_category || product.subcategory,
            product.category
          ].filter(Boolean).join(' ').toLowerCase();
          if (!haystack.includes(search)) return false;
        }

        if (inStockOnly && data.isUnavailable) return false;
        if (discountOnly && !data.hasDiscount) return false;
        if (min !== null && !Number.isNaN(min) && data.sellingPrice < min) return false;
        if (max !== null && !Number.isNaN(max) && data.sellingPrice > max) return false;

        return true;
      });

    const comparators = {
      price_asc: (a, b) => a.data.sellingPrice - b.data.sellingPrice,
      price_desc: (a, b) => b.data.sellingPrice - a.data.sellingPrice,
      discount: (a, b) => b.data.discountPercent - a.data.discountPercent,
      name_asc: (a, b) => String(a.product.item_name || '').localeCompare(String(b.product.item_name || ''))
    };

    if (comparators[sortBy]) {
      rows = [...rows].sort(comparators[sortBy]);
    } else if (collectionReady) {
      // Featured inside a collection = the order the store owner's summary returned
      rows = [...rows].sort((a, b) => collectionRank(a.product) - collectionRank(b.product));
    }

    return rows;
  }, [
    categoryFiltered, searchTerm, selectedSubcats, inStockOnly, discountOnly,
    priceMin, priceMax, sortBy, collectionReady, activeCollection, collectionRank
  ]);

  // Reset scoped filters when the scope itself changes
  useEffect(() => { setSelectedSubcats(new Set()); }, [categoryParam, currentType, collectionParam]);
  useEffect(() => { setSelectedCats(new Set()); }, [currentType]);

  // ------------------------------------------------------------------
  // 4. FILTER ACTIONS
  // ------------------------------------------------------------------
  const toggleInSet = (setter) => (value) => {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleCat = toggleInSet(setSelectedCats);
  const toggleSubcat = toggleInSet(setSelectedSubcats);

  const clearAllFilters = () => {
    setSelectedCats(new Set());
    setSelectedSubcats(new Set());
    setInStockOnly(false);
    setDiscountOnly(false);
    setPriceMin('');
    setPriceMax('');
    setSortBy('featured');
    setSearchTerm('');
    updateQuery(q => {
      q.delete('category');
      q.delete('collection');
      q.delete('search');
    });
  };

  const activeChips = [];
  if (collectionParam) {
    activeChips.push({
      key: 'collection',
      label: COLLECTION_LABELS[collectionParam] || toTitleCase(collectionParam),
      onClear: () => setCollection('')
    });
  }
  if (categoryParam !== 'All') {
    activeChips.push({ key: 'cat-url', label: toTitleCase(categoryParam), onClear: clearCategoryParam });
  }
  selectedCats.forEach(name => {
    activeChips.push({ key: `cat-${name}`, label: name, onClear: () => toggleCat(name) });
  });
  selectedSubcats.forEach(name => {
    activeChips.push({ key: `sub-${name}`, label: name, onClear: () => toggleSubcat(name) });
  });
  if (inStockOnly) activeChips.push({ key: 'stock', label: 'Available now', onClear: () => setInStockOnly(false) });
  if (discountOnly) activeChips.push({ key: 'disc', label: 'On offer', onClear: () => setDiscountOnly(false) });
  if (priceMin !== '' || priceMax !== '') {
    activeChips.push({
      key: 'price',
      label: `₹${priceMin || 0} – ${priceMax === '' ? 'any' : `₹${priceMax}`}`,
      onClear: () => { setPriceMin(''); setPriceMax(''); }
    });
  }
  if (searchTerm.trim()) {
    activeChips.push({
      key: 'search',
      label: `"${searchTerm.trim()}"`,
      onClear: () => { setSearchTerm(''); updateQuery(q => q.delete('search')); }
    });
  }

  const activeFilterCount = activeChips.length;

  // ------------------------------------------------------------------
  // 5. ACCOUNT + CART
  // ------------------------------------------------------------------
  const checkLoginStatus = () => {
    const token = localStorage.getItem('customer_token');
    const name = localStorage.getItem('customer_name');
    if (token) { setIsLoggedIn(true); setUser({ name: name || 'User' }); }
    else { setIsLoggedIn(false); setUser(null); }
  };

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

  // ------------------------------------------------------------------
  // 6. RENDER HELPERS
  // ------------------------------------------------------------------
  const renderProductCard = (product, data) => {
    const {
      mrp, sellingPrice, imageUrl, isUnavailable,
      unavailableText, hasDiscount, discountPercent, currency
    } = data;

    return (
      <div key={product.id} className="min-product-card">
        <Link to={`/marketplace/item/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div className="min-image-box">
            {isUnavailable && <div className="min-out-badge">{unavailableText}</div>}

            {imageUrl ? (
              <img src={imageUrl} alt={product.item_name} className={`min-product-img ${isUnavailable ? 'grayscale' : ''}`} />
            ) : (
              <div className="min-placeholder-img">{String(product.item_name || '?').charAt(0)}</div>
            )}

            <div className="min-add-overlay">
              <button
                className="min-add-btn"
                disabled={isUnavailable}
                onClick={(e) => {
                  if (product.has_variants) {
                    e.preventDefault();
                    navigate(`/marketplace/item/${product.slug}`);
                  } else {
                    handleAddToCart(product.id, e);
                  }
                }}
              >
                {isUnavailable ? unavailableText : (product.has_variants ? 'Select Options' : 'Add to Cart')}
              </button>
            </div>
          </div>

          <div className="min-details">
            <h3 className="min-title" title={product.item_name}>{product.item_name}</h3>

            <div className="min-price-row">
              <span className="min-price">{currency}{sellingPrice}</span>
              {hasDiscount && (
                <>
                  <span className="min-mrp">{currency}{mrp}</span>
                  {discountPercent > 0 && <span className="min-discount-text">{discountPercent}% off</span>}
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const pageHeading = collectionParam
    ? (COLLECTION_LABELS[collectionParam] || toTitleCase(collectionParam))
    : categoryParam !== 'All'
      ? toTitleCase(categoryParam)
      : (currentType === 'services' || currentType === 'service')
        ? 'All services'
        : currentType === 'goods'
          ? 'All products'
          : 'Everything in store';

  const subcatHeading = categoryParam !== 'All'
    ? `Browse ${toTitleCase(categoryParam)}`
    : (currentType === 'services' || currentType === 'service')
      ? 'Browse services'
      : 'Browse by category';

  if (loading) return <div className="loading-container"><Loader2 size={40} className="animate-spin" /><p>Loading...</p></div>;

  const filtersPanel = (
    <aside className={`shop-filters ${isFilterOpen ? 'is-open' : ''}`} aria-label="Product filters">
      <div className="filters-head">
        <span className="filters-title"><SlidersHorizontal size={16} /> Filters</span>
        <div className="filters-head-actions">
          {activeFilterCount > 0 && (
            <button type="button" className="link-clear" onClick={clearAllFilters}>Clear all</button>
          )}
          <button
            type="button"
            className="filters-close"
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="filters-body">
        {/* Collections */}
        {(collectionIndex.best_selling.keys.size > 0 || collectionIndex.trending.keys.size > 0) && (
          <div className="filter-group">
            <h4 className="filter-group-title">Collections</h4>
            <div className="filter-pill-row">
              {Object.keys(COLLECTION_LABELS).map(key => (
                collectionIndex[key].keys.size > 0 && (
                  <button
                    key={key}
                    type="button"
                    className={`filter-pill ${collectionParam === key ? 'active' : ''}`}
                    onClick={() => setCollection(collectionParam === key ? '' : key)}
                  >
                    {COLLECTION_LABELS[key]}
                  </button>
                )
              ))}
            </div>
          </div>
        )}

        {/* Products / Services */}
        {hasServices && (
          <div className="filter-group">
            <h4 className="filter-group-title">Type</h4>
            <div className="filter-pill-row">
              <button type="button" className={`filter-pill ${!currentType ? 'active' : ''}`} onClick={() => setTypeFilter('')}>All</button>
              <button type="button" className={`filter-pill ${currentType === 'goods' ? 'active' : ''}`} onClick={() => setTypeFilter('goods')}>Products</button>
              <button type="button" className={`filter-pill ${currentType === 'services' ? 'active' : ''}`} onClick={() => setTypeFilter('services')}>Services</button>
            </div>
          </div>
        )}

        {/* Category */}
        {categoryParam !== 'All' ? (
          <div className="filter-group">
            <h4 className="filter-group-title">Category</h4>
            <div className="locked-filter">
              <span>{toTitleCase(categoryParam)}</span>
              <button type="button" onClick={clearCategoryParam} aria-label="Show all categories"><X size={14} /></button>
            </div>
          </div>
        ) : availableCategories.length > 1 && (
          <div className="filter-group">
            <h4 className="filter-group-title">Category</h4>
            <div className="filter-option-list">
              {availableCategories.map(cat => (
                <label key={cat.name} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCats.has(cat.name)}
                    onChange={() => toggleCat(cat.name)}
                  />
                  <span className="filter-option-label">{cat.name}</span>
                  <span className="filter-option-count">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Subcategory (shares state with the tile strip) */}
        {subcategories.length > 1 && (
          <div className="filter-group">
            <h4 className="filter-group-title">Subcategory</h4>
            <div className="filter-option-list">
              {subcategories.map(sub => (
                <label key={sub.name} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedSubcats.has(sub.name)}
                    onChange={() => toggleSubcat(sub.name)}
                  />
                  <span className="filter-option-label">{sub.name}</span>
                  <span className="filter-option-count">{sub.count}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="filter-group">
          <h4 className="filter-group-title">Price</h4>
          <div className="price-inputs">
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              aria-label="Minimum price"
            />
            <span className="price-dash">to</span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              aria-label="Maximum price"
            />
          </div>
        </div>

        {/* Availability / offers */}
        <div className="filter-group">
          <h4 className="filter-group-title">Show only</h4>
          <div className="filter-option-list">
            <label className="filter-option">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
              <span className="filter-option-label">Available now</span>
            </label>
            <label className="filter-option">
              <input type="checkbox" checked={discountOnly} onChange={(e) => setDiscountOnly(e.target.checked)} />
              <span className="filter-option-label">On offer</span>
            </label>
          </div>
        </div>
      </div>

      <div className="filters-foot">
        <button type="button" className="btn-apply-filters" onClick={() => setIsFilterOpen(false)}>
          Show {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="store-body">

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

      {/* --- BANNER --- */}
      {/* <div style={{ width: '100%', margin: 0, padding: 0, paddingTop: '0', lineHeight: 0 }}>
        {banners.length > 0 ? (
          <div style={{ position: 'relative', width: '100%', margin: 0, padding: 0 }}>
            <img
              src={banners[currentBannerIndex]} alt="spacer"
              style={{ width: '100%', height: 'auto', display: 'block', visibility: 'hidden', margin: 0, padding: 0 }}
            />

            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner} alt={`Banner ${index}`}
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block', margin: 0, padding: 0,
                  opacity: index === currentBannerIndex ? 1 : 0, transition: 'opacity 0.5s ease-in-out',
                  pointerEvents: index === currentBannerIndex ? 'auto' : 'none'
                }}
              />
            ))}

            {banners.length > 1 && (
              <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px', lineHeight: 'normal' }}>
                {banners.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentBannerIndex(idx)}
                    style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      backgroundColor: idx === currentBannerIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer', transition: 'background-color 0.3s ease'
                    }}
                  ></span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '80px 20px', textAlign: 'center', background: '#111827', color: 'white', lineHeight: 'normal' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', margin: '0 0 10px 0' }}>Welcome to <br /><span>{businessName}</span></h1>
            <p style={{ margin: 0, color: '#D1D5DB' }}>Quality products, honest savings. Delivered to your door.</p>
          </div>
        )}
      </div> */}

      {/* --- SHOP: FILTERS + RESULTS --- */}
      <div className="shop-wrapper">
        <div className={`shop-layout ${FILTER_SIDE === 'right' ? 'filters-right' : 'filters-left'}`}>

          {filtersPanel}

          {isFilterOpen && (
            <div className="shop-filter-overlay" onClick={() => setIsFilterOpen(false)} />
          )}

          <main className="shop-content">
            <div className="shop-toolbar">
              <div className="shop-toolbar-text">
                <h1 className="shop-heading">{pageHeading}</h1>
                <p className="shop-result-count">
                  {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="shop-toolbar-actions">
                <button type="button" className="filter-toggle-btn" onClick={() => setIsFilterOpen(true)}>
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
                </button>

                <label className="sort-select-wrap">
                  <span className="sort-select-label">Sort</span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className="chip-row">
                {activeChips.map(chip => (
                  <button key={chip.key} type="button" className="applied-chip" onClick={chip.onClear}>
                    {chip.label}
                    <X size={13} />
                  </button>
                ))}
                <button type="button" className="link-clear chip-clear-all" onClick={clearAllFilters}>
                  Clear all
                </button>
              </div>
            )}

            {showSubcatStrip && (
              <section className="subcat-block">
                <h2 className="subcat-heading">{subcatHeading}</h2>

                <ScrollRow className="srow--subcats" ariaLabel="subcategories">
                  <button
                    type="button"
                    className={`subcat-card ${selectedSubcats.size === 0 ? 'active' : ''}`}
                    onClick={() => setSelectedSubcats(new Set())}
                  >
                    <span className="subcat-img-box"><LayoutGrid size={26} /></span>
                    <span className="subcat-label">All</span>
                    <span className="subcat-count">{categoryFiltered.length}</span>
                  </button>

                  {subcategories.map(sub => (
                    <button
                      key={sub.name}
                      type="button"
                      className={`subcat-card ${selectedSubcats.has(sub.name) ? 'active' : ''}`}
                      onClick={() => toggleSubcat(sub.name)}
                      title={sub.name}
                    >
                      <span className="subcat-img-box">
                        {sub.image
                          ? <img src={sub.image} alt="" />
                          : <ImageIcon size={24} />}
                      </span>
                      <span className="subcat-label">{sub.name}</span>
                      <span className="subcat-count">{sub.count}</span>
                    </button>
                  ))}
                </ScrollRow>
              </section>
            )}

            {filteredProducts.length === 0 ? (
              <div className="shop-empty">
                <h3>Nothing matches these filters</h3>
                <p>Widen the price range or clear a filter to see more of the store.</p>
                {activeFilterCount > 0 && (
                  <button type="button" className="btn-view-all" onClick={clearAllFilters}>
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="shop-product-grid">
                {filteredProducts.map(({ product, data }) => renderProductCard(product, data))}
              </div>
            )}

            {(collectionParam || categoryParam !== 'All') && filteredProducts.length > 0 && (
              <div className="shop-reset-row">
                <button
                  type="button"
                  className="btn-view-all"
                  onClick={() => {
                    setSelectedSubcats(new Set());
                    setSelectedCats(new Set());
                    updateQuery(q => { q.delete('category'); q.delete('collection'); });
                  }}
                >
                  View all store items
                </button>
              </div>
            )}
          </main>
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
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} slug={slug} />
    </div>
  );
};

export default StoreFront;