import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const mockOrders = [
  { id: 1, symbol: 'TCS', type: 'Buy', qty: 10, price: 3805.2, status: 'Filled', time: '09:21:15' },
  { id: 2, symbol: 'RELIANCE', type: 'Sell', qty: 5, price: 2910.5, status: 'Open', time: '09:22:10' },
  { id: 3, symbol: 'INFY', type: 'Buy', qty: 12, price: 1442.8, status: 'Filled', time: '09:23:02' },
  { id: 4, symbol: 'HDFCBANK', type: 'Buy', qty: 8, price: 1752.1, status: 'Rejected', time: '09:24:18' },
  { id: 5, symbol: 'ITC', type: 'Sell', qty: 20, price: 438.7, status: 'Filled', time: '09:25:44' },
  { id: 6, symbol: 'SBIN', type: 'Buy', qty: 15, price: 799.9, status: 'Open', time: '09:26:30' },
];

const moResearch = [
  { title: 'Buy TCS for Q2 results', detail: 'Strong earnings expected, target ₹4,000.' },
  { title: 'Hold RELIANCE', detail: 'Awaiting clarity on retail business.' },
  { title: 'Avoid ITC', detail: 'Short-term headwinds in FMCG segment.' },
];

const statusColors = {
  Filled: '#4caf50',
  Open: '#1976d2',
  Rejected: '#e53935',
};

const Orders = () => {
  const { theme } = useTheme();
  const isZerodha = theme === 'zerodha-theme';

  const filled = mockOrders.filter(o => o.status === 'Filled').length;
  const open = mockOrders.filter(o => o.status === 'Open').length;
  const rejected = mockOrders.filter(o => o.status === 'Rejected').length;

  if (isZerodha) {
    return (
      <div className="dashboard-main dashboard-bg">
        <div className="dashboard-header"><span role="img" aria-label="orders">📑</span> Orders</div>
        <div className="dashboard-card" style={{ maxWidth: 800, margin: '0 auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'var(--section-bg)' }}>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Time</th>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Symbol</th>
                <th style={{ textAlign: 'center', padding: '0.7rem 1rem' }}>Type</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Price (₹)</th>
                <th style={{ textAlign: 'center', padding: '0.7rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ padding: '0.6rem 1rem' }}>{order.time}</td>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>{order.symbol}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center', color: order.type === 'Buy' ? '#1976d2' : '#e53935', fontWeight: 600 }}>{order.type}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{order.qty}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{order.price.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
                    <span style={{ color: statusColors[order.status], fontWeight: 600 }}>{order.status}</span>
                  </td>
                </tr>
              ))}
              {mockOrders.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: 24 }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Motilal Oswal: info-rich orders
  return (
    <div className="dashboard-main dashboard-bg">
      <div className="dashboard-header"><span role="img" aria-label="orders">📑</span> Orders</div>
      <div className="dashboard-flex-grid">
        <div className="dashboard-flex-left dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="analytics">📊</span> Order Analytics</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '1.08rem' }}>
            <li style={{ marginBottom: 10 }}>Filled: <span className="pill-badge">{filled}</span></li>
            <li style={{ marginBottom: 10 }}>Open: <span className="pill-badge blue">{open}</span></li>
            <li style={{ marginBottom: 10 }}>Rejected: <span className="pill-badge red">{rejected}</span></li>
          </ul>
        </div>
        <div className="dashboard-flex-center dashboard-card">
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'var(--section-bg)' }}>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Time</th>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Symbol</th>
                <th style={{ textAlign: 'center', padding: '0.7rem 1rem' }}>Type</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Price (₹)</th>
                <th style={{ textAlign: 'center', padding: '0.7rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ padding: '0.6rem 1rem' }}>{order.time}</td>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>{order.symbol}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center', color: order.type === 'Buy' ? '#1976d2' : '#e53935', fontWeight: 600 }}>{order.type}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right' }}>{order.qty}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{order.price.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
                    <span style={{ color: statusColors[order.status], fontWeight: 600 }}>{order.status}</span>
                  </td>
                </tr>
              ))}
              {mockOrders.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: 24 }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="dashboard-flex-right dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="research">🔎</span> Research Calls</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {moResearch.map((call, idx) => (
              <li key={idx} style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 600, color: '#1976d2' }}>{call.title}</div>
                <div style={{ fontSize: '0.98rem', color: '#555' }}>{call.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders; 