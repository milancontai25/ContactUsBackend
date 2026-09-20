import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Check, X, Truck, RefreshCw } from 'lucide-react';
import '../assets/css/storefront.css';
import '../assets/css/orderhistory.css';

/* Every order is promised inside 15 days. The countdown is derived from the
   order date on each render rather than stored, so it stays honest across
   refreshes, timezones and a tab left open overnight. */
const DELIVERY_WINDOW_DAYS = 15;
const DAY_MS = 86400000;

/* The seller dashboard moves an order along this track. Anything it sends
   that isn't on the list is treated as pending so the card still renders. */
const STATUS_FLOW = ['pending', 'confirmed', 'processing', 'shipped', 'received'];

const STATUS_COPY = {
  pending: {
    label: 'Pending',
    note: 'We have your order. It is waiting on payment confirmation before we pick it.',
  },
  confirmed: {
    label: 'Confirmed',
    note: 'Payment is confirmed and your items are reserved. Packing starts next.',
  },
  processing: {
    label: 'Processing',
    note: 'Your order is being packed and will be handed to the courier shortly.',
  },
  shipped: {
    label: 'Shipped',
    note: 'On its way. Tracking updates arrive by SMS and email as it moves.',
  },
  received: {
    label: 'Received',
    note: 'Delivered. You can return anything from this order for 7 days.',
  },
  cancelled: {
    label: 'Cancelled',
    note: 'This order was cancelled. Any payment returns to your original method within 5–7 business days.',
  },
};

const normalizeStatus = (raw) => {
  const key = String(raw || '').trim().toLowerCase();
  if (key === 'delivered' || key === 'complete' || key === 'completed') return 'received';
  if (key === 'canceled') return 'cancelled';
  return STATUS_COPY[key] ? key : 'pending';
};

const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const dayStart = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Whole days apart, ignoring the clock — "tomorrow" shouldn't depend on the hour
const daysBetween = (from, to) => Math.round((dayStart(to) - dayStart(from)) / DAY_MS);

const fmtDate = (d) =>
  d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

const fmtEta = (d) =>
  d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const getTracking = (order, now) => {
  const status = normalizeStatus(order.status);
  const placed = parseDate(order.date || order.created_at || order.order_date || order.placed_at);

  if (!placed) return { status, placed: null, tone: 'active', headline: STATUS_COPY[status].label };

  const eta = new Date(placed);
  eta.setDate(eta.getDate() + DELIVERY_WINDOW_DAYS);

  const dayNumber = Math.min(DELIVERY_WINDOW_DAYS, Math.max(0, daysBetween(placed, now)));
  const daysLeft = daysBetween(now, eta);

  if (status === 'cancelled') {
    return { status, placed, eta, dayNumber, daysLeft, tone: 'cancelled', headline: 'Order cancelled' };
  }

  if (status === 'received') {
    const delivered = parseDate(order.delivered_at || order.received_at);
    return {
      status, placed, eta, dayNumber, daysLeft, tone: 'done',
      headline: delivered ? `Delivered on ${fmtDate(delivered)}` : 'Delivered',
    };
  }

  let headline;
  let tone = 'active';
  if (daysLeft > 1) headline = `Arriving in ${plural(daysLeft, 'day')}`;
  else if (daysLeft === 1) headline = 'Arriving tomorrow';
  else if (daysLeft === 0) headline = 'Arriving today';
  else {
    headline = `Running ${plural(Math.abs(daysLeft), 'day')} late`;
    tone = 'late';
  }

  return { status, placed, eta, dayNumber, daysLeft, tone, headline };
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signedOut, setSignedOut] = useState(false);
  // Drives the countdown. Re-reading the clock every minute means a card left
  // open overnight ticks down on its own instead of showing yesterday's count.
  const [now, setNow] = useState(() => new Date());

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      const token = localStorage.getItem('customer_token');

      if (!token) {
        setSignedOut(true);
        setLoading(false);   // without this the page hangs on "Loading…" forever
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${API_BASE_URL}/api/v1/customer/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (cancelled) return;

        // The array arrives wrapped differently depending on the endpoint
        const payload = res.data;
        const rows = Array.isArray(payload)
          ? payload
          : (payload?.results || payload?.orders || payload?.data || []);

        setOrders(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error('Failed to load orders', err.response?.data || err.message);
        if (!cancelled) setError("We couldn't load your orders. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOrders();
    return () => { cancelled = true; };
  }, [API_BASE_URL]);

  // Newest first, whatever order the API returned them in
  const sorted = useMemo(() => {
    return [...orders].sort((a, b) => {
      const da = parseDate(a.date || a.created_at || a.order_date);
      const db = parseDate(b.date || b.created_at || b.order_date);
      return (db?.getTime() || 0) - (da?.getTime() || 0);
    });
  }, [orders]);

  const inTransit = useMemo(
    () => sorted.filter(o => !['received', 'cancelled'].includes(normalizeStatus(o.status))).length,
    [sorted]
  );

  if (loading) {
    return (
      <div className="oh-page">
        <div className="oh-shell">
          <div className="oh-skeletons">
            {[0, 1, 2].map(i => <div key={i} className="oh-skeleton" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="oh-page">
      <div className="oh-shell">

        <header className="oh-header">
          <Link to="/marketplace" className="oh-back"><ArrowLeft size={16} /> Back to store</Link>
          <h1 className="oh-title">My orders</h1>
          {!signedOut && !error && sorted.length > 0 && (
            <p className="oh-subtitle">
              {plural(sorted.length, 'order')}
              {inTransit > 0 && ` · ${inTransit} on the way`}
            </p>
          )}
        </header>

        {signedOut ? (
          <div className="oh-empty">
            <Package size={40} strokeWidth={1.5} />
            <h2>Sign in to see your orders</h2>
            <p>Your order history lives with your account.</p>
            <Link to="/marketplace" className="oh-empty-btn">Go to the store</Link>
          </div>
        ) : error ? (
          <div className="oh-empty">
            <RefreshCw size={40} strokeWidth={1.5} />
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button type="button" className="oh-empty-btn" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : sorted.length === 0 ? (
          <div className="oh-empty">
            <Package size={40} strokeWidth={1.5} />
            <h2>No orders yet</h2>
            <p>Anything you buy will show up here with live delivery tracking.</p>
            <Link to="/marketplace" className="oh-empty-btn">Start shopping</Link>
          </div>
        ) : (
          <div className="oh-list">
            {sorted.map((order, index) => {
              const t = getTracking(order, now);
              const copy = STATUS_COPY[t.status];
              const stepIndex = STATUS_FLOW.indexOf(t.status);
              const items = order.order_items || order.items || [];
              const currency = order.currency_symbol || '₹';
              const tracking = order.tracking_number || order.awb_number;
              const courier = order.courier || order.courier_name;

              // Bar fills with time spent, not steps completed — it's the promise
              const pct = t.placed ? Math.round((t.dayNumber / DELIVERY_WINDOW_DAYS) * 100) : 0;

              return (
                <article key={order.order_number || order.id || index} className="oh-card">

                  <div className="oh-card-top">
                    <div className="oh-ref">
                      <span className="oh-number">#{order.order_number || order.id || '—'}</span>
                      {t.placed && <span className="oh-placed">Placed {fmtDate(t.placed)}</span>}
                    </div>
                    <span className={`oh-pill oh-pill-${t.status}`}>{copy.label}</span>
                  </div>

                  {/* --- DELIVERY COUNTDOWN --- */}
                  <div className={`oh-track oh-track-${t.tone}`}>
                    <div className="oh-track-head">
                      <div>
                        <p className="oh-headline">{t.headline}</p>
                        {t.eta && t.status !== 'cancelled' && t.status !== 'received' && (
                          <p className="oh-eta">Expected by {fmtEta(t.eta)}</p>
                        )}
                      </div>
                      {t.placed && t.status !== 'cancelled' && t.status !== 'received' && (
                        <span className="oh-daycount">
                          Day {t.dayNumber} <em>of {DELIVERY_WINDOW_DAYS}</em>
                        </span>
                      )}
                    </div>

                    {t.status !== 'cancelled' && (
                      <div
                        className="oh-bar"
                        role="progressbar"
                        aria-valuenow={t.status === 'received' ? 100 : pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Delivery progress"
                      >
                        <span
                          className="oh-bar-fill"
                          style={{ width: `${t.status === 'received' ? 100 : Math.max(pct, 3)}%` }}
                        />
                      </div>
                    )}

                    <p className="oh-note">{copy.note}</p>

                    {t.status === 'shipped' && tracking && (
                      <p className="oh-awb">
                        <Truck size={15} aria-hidden="true" />
                        {courier ? `${courier} · ` : ''}<strong>{tracking}</strong>
                      </p>
                    )}
                  </div>

                  {/* --- STATUS STEPS --- */}
                  {t.status === 'cancelled' ? (
                    <div className="oh-cancelled">
                      <X size={15} aria-hidden="true" /> Cancelled before delivery
                    </div>
                  ) : (
                    <ol className="oh-steps" aria-label="Order progress">
                      {STATUS_FLOW.map((step, i) => {
                        const state = i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'todo';
                        return (
                          <li key={step} className={`oh-step is-${state}`}>
                            <span className="oh-step-dot" aria-hidden="true">
                              {state === 'done' && <Check size={11} strokeWidth={3} />}
                            </span>
                            <span className="oh-step-label">{STATUS_COPY[step].label}</span>
                          </li>
                        );
                      })}
                    </ol>
                  )}

                  {/* --- ITEMS --- */}
                  <ul className="oh-items">
                    {items.length === 0 ? (
                      <li className="oh-item oh-item-empty">Item details unavailable</li>
                    ) : items.map((item, i) => {
                      const name = item.product_name || item.item_name || item.name || 'Item';
                      return (
                        <li key={i} className="oh-item">
                          <span className="oh-item-qty">{item.quantity || 1}×</span>
                          <span className="oh-item-name">
                            {name}
                            {item.variant_name && <em className="oh-item-variant">{item.variant_name}</em>}
                          </span>
                          <span className="oh-item-price">
                            {currency}{Number(item.subtotal ?? 0).toFixed(2)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="oh-card-foot">
                    <span className="oh-total">
                      Total <strong>{currency}{Number(order.total_amount ?? 0).toFixed(2)}</strong>
                    </span>
                    {order.payment_status && (
                      <span className="oh-payment">{order.payment_status}</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;