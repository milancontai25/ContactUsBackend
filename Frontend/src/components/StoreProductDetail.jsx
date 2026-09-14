import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Share2, Heart, Minus, Plus, Loader2, PlayCircle, ChevronRight, Check } from 'lucide-react';
import customerApi from '../api/customerAxios';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import CartDrawer from './CartDrawer';
import AuthCustomer from './AuthCustomer';
import '../assets/css/storefront.css';
import '../assets/css/storeproductdetail.css';

/* Stored descriptions are often typed into a plain textarea that hard-wraps,
   so they arrive with <br> tags dropped mid-sentence (and sometimes mid-word:
   "full-<br>grain"). Rejoin those, keep deliberate breaks, and emit real
   paragraphs. Anything that already contains block tags came from a rich-text
   editor and is left completely alone. */
const BLOCK_TAG_RE = /<\s*(p|div|ul|ol|li|table|h[1-6]|section|article|blockquote|figure)\b/i;

const normalizeDescription = (raw) => {
  if (!raw) return '';
  const html = String(raw);
  if (BLOCK_TAG_RE.test(html)) return html;

  const chunks = html
    .replace(/\r\n?/g, '\n')
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .split('\n');

  const endsSentence = (s) => /[.!?:;•]["')\]]?\s*$/.test(s);
  const endsDash = (s) => /[-–—]$/.test(s);

  const paragraphs = [];
  let current = '';

  chunks.forEach((rawChunk) => {
    const chunk = rawChunk.trim();

    if (!chunk) {                          // blank line = real paragraph break
      if (current) { paragraphs.push(current); current = ''; }
      return;
    }
    if (!current) { current = chunk; return; }

    if (endsDash(current)) {
      // "full-" + "grain" is one word; "aesthetics —" + "perfect" needs a space
      current += /-$/.test(current) ? chunk : ` ${chunk}`;
    } else if (current.length >= 55 && !endsSentence(current)) {
      current += ` ${chunk}`;              // hard-wrap artifact
    } else if (chunk.length <= 2) {
      current += ` ${chunk}`;              // stray symbol stranded on its own line
    } else {
      paragraphs.push(current);            // short + finished: a deliberate break
      current = chunk;
    }
  });

  if (current) paragraphs.push(current);

  return paragraphs
    .map(p => `<p>${p.replace(/\s+/g, ' ').trim()}</p>`)
    .join('');
};

const StoreProductDetail = () => {
  const { itemSlug } = useParams();
  const navigate = useNavigate();

  const slug = import.meta.env.VITE_STORE_SLUG;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState(null); // { kind: 'error' | 'success', text }

  // Dynamic Header Menu Toggles
  const [hasProducts, setHasProducts] = useState(true);
  const [hasServices, setHasServices] = useState(false);

  // --- VARIANT & MEDIA STATE ---
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [mediaList, setMediaList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- WISHLIST STATE ---
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Global State
  const [businessName, setBusinessName] = useState('');
  const [businessLogo, setBusinessLogo] = useState('');
  const [socialLinks, setSocialLinks] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAuthCustomer, setShowAuthCustomer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const noticeTimer = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const formatUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const toTitleCase = (str) => {
    if (!str) return '';
    return String(str).toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  // Customers should never see raw API JSON. Log the detail, show a sentence.
  const flash = useCallback((kind, text) => {
    setNotice({ kind, text });
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 5000);
  }, []);

  useEffect(() => () => { if (noticeTimer.current) clearTimeout(noticeTimer.current); }, []);

  // --- VIDEO HELPERS ---
  const isYoutube = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));
  const isInstagram = (url) => url && (url.includes('instagram.com/reel') || url.includes('instagram.com/p'));

  const getYoutubeEmbed = (url) => {
    if (url.includes('/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const getInstagramEmbed = (url) => {
    const cleanUrl = url.split('?')[0];
    const base = cleanUrl.endsWith('/') ? cleanUrl.slice(0, -1) : cleanUrl;
    return `${base}/embed`;
  };

  // --- FETCH ---
  useEffect(() => {
    checkLoginStatus();
    let cancelled = false;

    const fetchProductAndBiz = async () => {
      try {
        setLoading(true);
        const PRODUCT_API_URL = `${API_BASE_URL}/api/v1/business/${slug}/items/${itemSlug}/`;
        const SUMMARY_API_URL = `${API_BASE_URL}/api/v1/business/${slug}/items/summary/`;

        const [productRes, summaryRes] = await Promise.allSettled([
          axios.get(PRODUCT_API_URL),
          axios.get(SUMMARY_API_URL)
        ]);
        if (cancelled) return;

        if (summaryRes.status === 'fulfilled') {
          const sumData = summaryRes.value.data;
          const allSummaryItems = [...(sumData.best_selling || []), ...(sumData.trending || [])];

          const foundServices = allSummaryItems.some(p => p.item_type && String(p.item_type).toLowerCase() === 'service');
          const foundGoods = allSummaryItems.some(p => !p.item_type || ['good', 'goods', 'product', 'products'].includes(String(p.item_type).toLowerCase()));

          setHasServices(foundServices);
          setHasProducts(allSummaryItems.length === 0 ? true : foundGoods);
        } else {
          setHasProducts(true);
          setHasServices(false);
        }

        if (productRes.status === 'fulfilled') {
          const data = productRes.value.data;
          setProduct(data);

          // --- INITIALIZE VARIANTS: prefer the first one actually in stock ---
          if (data.has_variants && Array.isArray(data.variants) && data.variants.length > 0) {
            const firstInStock = data.variants.find(v => Number(v.stock || 0) > 0) || data.variants[0];
            setSelectedVariant(firstInStock);

            const initialAttrs = {};
            (firstInStock.attributes || []).forEach(attr => {
              initialAttrs[attr.attribute_name] = attr.attribute_value;
            });
            setSelectedAttributes(initialAttrs);
          }

          if (data.business) {
            const biz = data.business;
            setBusinessName(biz.business_name || '');
            setBusinessLogo(formatUrl(biz.logo_bucket_url));
            setSocialLinks({
              facebook: biz.facebook_url,
              instagram: biz.instagram_url,
              youtube: biz.youtube_url,
              twitter: biz.x_url
            });
            setContactInfo({
              email: biz.user?.email || '',
              phone: biz.user?.phone ? `${biz.user.phone}` : ''
            });
          } else {
            setBusinessName(slug ? toTitleCase(String(slug).replace(/[-_]/g, ' ')) : 'Store');
          }
        }
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProductAndBiz();
    return () => { cancelled = true; };
  }, [slug, itemSlug]);

  // --- WISHLIST STATUS ---
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isLoggedIn || !product) return;
      try {
        const res = await customerApi.get(`customer/wishlist/`);
        const rows = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        setIsWishlisted(rows.some(row => (row?.item?.id ?? row?.item) === product.id));
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    checkWishlistStatus();
  }, [isLoggedIn, product]);

  // --- MEDIA LIST ---
  useEffect(() => {
    if (!product) return;

    const media = [];

    if (selectedVariant && Array.isArray(selectedVariant.images) && selectedVariant.images.length > 0) {
      selectedVariant.images.forEach(img => {
        if (img.image_url) media.push({ type: 'image', url: formatUrl(img.image_url) });
      });
    } else {
      if (product.item_image_url) media.push({ type: 'image', url: formatUrl(product.item_image_url) });
      if (product.item_image_1) media.push({ type: 'image', url: formatUrl(product.item_image_1) });
      if (product.item_image_2) media.push({ type: 'image', url: formatUrl(product.item_image_2) });
      if (product.item_image_3) media.push({ type: 'image', url: formatUrl(product.item_image_3) });
    }

    if (product.item_video_link) {
      media.push({ type: 'video', url: product.item_video_link });
    }

    setMediaList(media);
    setActiveIndex(0);
  }, [product, selectedVariant]);

  // --- KEEP QUANTITY WITHIN STOCK ---
  useEffect(() => {
    if (!product) return;
    const currentStock = Number((selectedVariant ? selectedVariant.stock : product.quantity_product) || 0);
    if (currentStock > 0 && quantity > currentStock) setQuantity(currentStock);
    else if (currentStock <= 0) setQuantity(1);
  }, [selectedVariant, product]); // eslint-disable-line react-hooks/exhaustive-deps

  const availableAttributes = useMemo(() => {
    if (!product || !product.has_variants || !Array.isArray(product.variants)) return {};
    const attrs = {};
    product.variants.forEach(v => {
      (v.attributes || []).forEach(a => {
        if (!attrs[a.attribute_name]) attrs[a.attribute_name] = new Set();
        attrs[a.attribute_name].add(a.attribute_value);
      });
    });
    const result = {};
    Object.keys(attrs).forEach(key => { result[key] = Array.from(attrs[key]); });
    return result;
  }, [product]);

  // Is any variant carrying this attribute value still in stock?
  const valueInStock = useCallback((attrName, value) => {
    if (!product?.variants) return true;
    return product.variants.some(v =>
      (v.attributes || []).some(a => a.attribute_name === attrName && a.attribute_value === value) &&
      Number(v.stock || 0) > 0
    );
  }, [product]);

  const handleAttributeSelect = (attrName, value) => {
    const newAttrs = { ...selectedAttributes, [attrName]: value };

    let matchingV = product.variants.find(v =>
      (v.attributes || []).every(a => newAttrs[a.attribute_name] === a.attribute_value)
    );

    if (!matchingV) {
      matchingV = product.variants.find(v =>
        (v.attributes || []).some(a => a.attribute_name === attrName && a.attribute_value === value)
      );
      if (matchingV) {
        const updatedAttrs = {};
        (matchingV.attributes || []).forEach(a => { updatedAttrs[a.attribute_name] = a.attribute_value; });
        setSelectedAttributes(updatedAttrs);
        setSelectedVariant(matchingV);
        return;
      }
    }

    setSelectedAttributes(newAttrs);
    if (matchingV) setSelectedVariant(matchingV);
  };

  const getSwatchImage = (attrName, attrValue) => {
    const matchingVariant = product.variants.find(v =>
      (v.attributes || []).some(a => a.attribute_name === attrName && a.attribute_value === attrValue)
    );
    if (matchingVariant && Array.isArray(matchingVariant.images) && matchingVariant.images.length > 0) {
      const primary = matchingVariant.images.find(i => i.is_primary);
      return formatUrl(primary ? primary.image_url : matchingVariant.images[0].image_url);
    }
    return null;
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('customer_token');
    const name = localStorage.getItem('customer_name');
    if (token) { setIsLoggedIn(true); setUser({ name: name || 'User' }); }
    else { setIsLoggedIn(false); setUser(null); }
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_name');
    setIsLoggedIn(false); setUser(null); setIsDropdownOpen(false);
  };

  const requireLogin = (message) => {
    flash('error', message);
    setShowAuthCustomer(true);
  };

  // --- WISHLIST ---
  const handleWishlistToggle = async () => {
    if (!isLoggedIn) return requireLogin('Please sign in to save items.');

    try {
      setWishlistLoading(true);
      if (isWishlisted) {
        await customerApi.delete(`customer/wishlist/`, { data: { item: product.id } });
        setIsWishlisted(false);
        flash('success', 'Removed from your wishlist.');
      } else {
        await customerApi.post(`customer/wishlist/`, { item: product.id });
        setIsWishlisted(true);
        flash('success', 'Saved to your wishlist.');
      }
    } catch (err) {
      console.error("Wishlist action failed", err.response?.data || err.message);
      flash('error', "We couldn't update your wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const variantPayload = () => {
    if (!product.has_variants || !selectedVariant) return {};
    return { variant: selectedVariant.uid || selectedVariant.id || selectedVariant.variant_uid };
  };

  // --- CART ---
  const handleAddToCart = async () => {
    if (!isLoggedIn) return requireLogin('Please sign in to add items to your cart.');

    try {
      setAdding(true);
      await customerApi.post(`customer/cart/add/`, { item: product.id, quantity, ...variantPayload() });
      setIsCartOpen(true);
    } catch (err) {
      console.error("Cart add error:", err.response?.data || err.message);
      flash('error', "We couldn't add that to your cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  // --- BUY NOW ---
  const handleBuyNow = async () => {
    if (!isLoggedIn) return requireLogin('Please sign in to continue to checkout.');

    try {
      setAdding(true);
      await customerApi.post(`customer/cart/add/`, { item: product.id, quantity, ...variantPayload() });

      navigate(`/marketplace/checkout`, {
        state: {
          isBuyNow: true,
          buyNowItems: [{
            product_id: product.id,
            variant_uid: selectedVariant?.uid || selectedVariant?.id || null,
            item_name: product.item_name,
            variant_name: selectedVariant?.variant_name || null,
            gross_amount: selectedVariant ? selectedVariant.selling_price : product.gross_amount,
            quantity,
            image: mediaList[activeIndex]?.url || product.item_image_url
          }]
        }
      });
    } catch (err) {
      console.error("Buy now error:", err.response?.data || err.message);
      flash('error', "We couldn't start checkout. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareTitle = `${product.item_name} - ${businessName}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareTitle, url: currentUrl });
      } catch (err) {
        // user dismissed the sheet — nothing to report
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        flash('success', 'Link copied to clipboard.');
      } catch (err) {
        console.error("Failed to copy link", err);
        flash('error', "We couldn't copy the link.");
      }
    }
  };

  // Cursor-following magnifier. Written straight to the DOM node so moving
  // the mouse doesn't re-render the page.
  const handleZoomMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--zoom-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--zoom-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  if (loading) return <div className="loading-container"><Loader2 size={40} className="animate-spin" /><p>Loading...</p></div>;
  if (!product) return <div className="loading-container">Product not found</div>;

  // --- PRICING & STOCK ---
  const currentPrice = selectedVariant ? parseFloat(selectedVariant.selling_price || 0) : parseFloat(product.gross_amount || 0);
  const currentMrp = selectedVariant ? parseFloat(selectedVariant.mrp || currentPrice) : parseFloat(product.mrp_baseprice || 0);
  const hasDiscount = currentMrp > currentPrice;
  const discountPercent = hasDiscount ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : 0;
  const currency = product.currency_symbol || '₹';

  const stock = Number((selectedVariant ? selectedVariant.stock : product.quantity_product) || 0);
  const isService = product.item_type && String(product.item_type).toLowerCase().includes('service');
  const serviceStatus = String(product.availability_status_service || '').toLowerCase();
  const isUnavailable = isService
    ? (serviceStatus === 'busy' || serviceStatus === 'offline')
    : stock <= 0;
  const lowStock = !isService && stock > 0 && stock <= 5;

  const activeMedia = mediaList[activeIndex] || null;

  const descriptionHeading = (() => {
    if (isService || (!hasProducts && hasServices)) return "Service Description";
    return "Product Description";
  })();

  const descriptionHtml = normalizeDescription(product.description);

  const actionButtons = (compact = false) => (
    <>
      <button
        className="pdp-btn pdp-btn-secondary"
        onClick={handleAddToCart}
        disabled={adding || isUnavailable}
      >
        {adding ? 'Adding…' : (isUnavailable ? 'Unavailable' : 'Add to cart')}
      </button>
      <button
        className="pdp-btn pdp-btn-primary"
        onClick={handleBuyNow}
        disabled={adding || isUnavailable}
      >
        {compact ? 'Buy now' : 'Buy it now'}
      </button>
    </>
  );

  return (
    <div className="pdp-page">

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

      {/* --- BREADCRUMB --- */}
      <div className="pdp-breadcrumb-bar">
        <nav className="pdp-shell pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/marketplace" className="pdp-crumb">Home</Link>
          <ChevronRight size={13} className="pdp-crumb-sep" aria-hidden="true" />
          {product.category ? (
            <Link
              to={`/marketplace/items?category=${encodeURIComponent(product.category)}`}
              className="pdp-crumb"
            >
              {toTitleCase(product.category)}
            </Link>
          ) : (
            <Link to="/marketplace/items" className="pdp-crumb">Items</Link>
          )}
          <ChevronRight size={13} className="pdp-crumb-sep" aria-hidden="true" />
          <span className="pdp-crumb-current">{product.item_name}</span>
        </nav>
      </div>

      <div className="pdp-shell pdp-layout">

        {/* --- LEFT: MEDIA GALLERY --- */}
        <div className="pdp-gallery">
          <div className="pdp-stage" onMouseMove={handleZoomMove}>
            {activeMedia?.type === 'video' ? (
              isYoutube(activeMedia.url) ? (
                <iframe
                  src={getYoutubeEmbed(activeMedia.url)}
                  title={`${product.item_name} video`}
                  className="pdp-embed"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isInstagram(activeMedia.url) ? (
                <iframe
                  src={getInstagramEmbed(activeMedia.url)}
                  title={`${product.item_name} video`}
                  className="pdp-embed"
                  allowFullScreen
                  scrolling="no"
                />
              ) : (
                <video controls className="pdp-video" poster={mediaList[0]?.type === 'image' ? mediaList[0].url : undefined}>
                  <source src={activeMedia.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : activeMedia ? (
              <img src={activeMedia.url} alt={product.item_name} className="pdp-stage-img" />
            ) : (
              <div className="pdp-stage-empty">{String(product.item_name || '?').charAt(0)}</div>
            )}

            {isUnavailable && <span className="pdp-stage-flag">{isService ? 'Not available' : 'Sold out'}</span>}
          </div>

          {mediaList.length > 1 && (
            <div className="pdp-thumbs" role="tablist" aria-label="Product media">
              {mediaList.map((media, idx) => (
                <button
                  key={`${media.url}-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === idx}
                  aria-label={media.type === 'video' ? 'Play video' : `View image ${idx + 1}`}
                  className={`pdp-thumb ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {media.type === 'video' ? (
                    <span className="pdp-thumb-video"><PlayCircle size={22} /></span>
                  ) : (
                    <img src={media.url} alt="" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT: INFO --- */}
        <div className="pdp-info">
          <div className="pdp-info-head">
            <div>
              {product.category && (
                <p className="pdp-eyebrow">{toTitleCase(product.category)}</p>
              )}
              <h1 className="pdp-title">{product.item_name}</h1>
            </div>

            <div className="pdp-icon-actions">
              <button type="button" className="pdp-icon-btn" onClick={handleShare} aria-label="Share this item">
                <Share2 size={18} />
              </button>
              <button
                type="button"
                className={`pdp-icon-btn ${isWishlisted ? 'is-active' : ''}`}
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                aria-pressed={isWishlisted}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} fill={isWishlisted ? '#DC2626' : 'none'} color={isWishlisted ? '#DC2626' : 'currentColor'} />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="pdp-price-block">
            <div className="pdp-price-row">
              <span className="pdp-price">{currency}{currentPrice.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="pdp-mrp">{currency}{currentMrp.toFixed(2)}</span>
                  <span className="pdp-save">{discountPercent}% off</span>
                </>
              )}
            </div>
            <p className="pdp-tax-note">MRP inclusive of all taxes</p>
          </div>

          {/* Variants */}
          {product.has_variants && Object.entries(availableAttributes).map(([attrName, values]) => {
            const isColor = ['color', 'colour'].includes(attrName.toLowerCase());

            return (
              <div key={attrName} className="pdp-variant">
                <p className="pdp-variant-label">
                  {isColor ? toTitleCase(attrName) : `Select ${toTitleCase(attrName)}`}
                  {isColor && selectedAttributes[attrName] && (
                    <span className="pdp-variant-value">{selectedAttributes[attrName]}</span>
                  )}
                </p>

                <div className={isColor ? 'pdp-swatch-row' : 'pdp-pill-row'}>
                  {values.map(val => {
                    const isSelected = selectedAttributes[attrName] === val;
                    const inStock = valueInStock(attrName, val);

                    if (isColor) {
                      const swatchImg = getSwatchImage(attrName, val);
                      return (
                        <button
                          key={val}
                          type="button"
                          className={`pdp-swatch ${isSelected ? 'active' : ''} ${inStock ? '' : 'is-soldout'}`}
                          onClick={() => handleAttributeSelect(attrName, val)}
                          title={inStock ? val : `${val} — sold out`}
                          aria-pressed={isSelected}
                        >
                          {swatchImg
                            ? <img src={swatchImg} alt={val} />
                            : <span className="pdp-swatch-fallback">{val.charAt(0)}</span>}
                          {isSelected && <span className="pdp-swatch-tick"><Check size={12} /></span>}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={val}
                        type="button"
                        className={`pdp-pill ${isSelected ? 'active' : ''} ${inStock ? '' : 'is-soldout'}`}
                        onClick={() => handleAttributeSelect(attrName, val)}
                        title={inStock ? val : `${val} — sold out`}
                        aria-pressed={isSelected}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Stock signal */}
          {isUnavailable ? (
            <p className="pdp-stock pdp-stock-out">
              {isService ? 'This service is currently unavailable.' : 'Currently out of stock.'}
            </p>
          ) : lowStock ? (
            <p className="pdp-stock pdp-stock-low">Only {stock} left in stock.</p>
          ) : null}

          {/* Quantity + actions */}
          <div className="pdp-actions">
            {!isService && (
              <div className="pdp-qty" role="group" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={isUnavailable || quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                  disabled={isUnavailable || quantity >= stock}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            <div className="pdp-action-btns">{actionButtons()}</div>
          </div>

          {notice && (
            <p className={`pdp-notice ${notice.kind === 'error' ? 'is-error' : 'is-success'}`} role="status">
              {notice.text}
            </p>
          )}

          {/* Help */}
          {(contactInfo.phone || contactInfo.email) && (
            <div className="pdp-help">
              <h2 className="pdp-help-title">Have a question?</h2>
              <p className="pdp-help-hours">We reply 24 / 7</p>
              {contactInfo.phone && (
                <p className="pdp-help-row">
                  Call or WhatsApp <a href={`tel:${String(contactInfo.phone).replace(/[^0-9+]/g, '')}`}>{contactInfo.phone}</a>
                </p>
              )}
              {contactInfo.email && (
                <p className="pdp-help-row">
                  Email <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <section className="pdp-description">
        <div className="pdp-shell">
          <h2 className="pdp-description-title">{descriptionHeading}</h2>

          {descriptionHtml ? (
            <div className="pdp-prose" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          ) : (
            <p className="pdp-prose pdp-prose-empty">No description available for this item yet.</p>
          )}
        </div>
      </section>

      {/* --- STICKY MOBILE BUY BAR --- */}
      <div className="pdp-mobile-bar">
        <div className="pdp-mobile-price">
          <span className="pdp-mobile-amount">{currency}{currentPrice.toFixed(2)}</span>
          {hasDiscount && <span className="pdp-mobile-mrp">{currency}{currentMrp.toFixed(2)}</span>}
        </div>
        <div className="pdp-mobile-btns">{actionButtons(true)}</div>
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

export default StoreProductDetail;