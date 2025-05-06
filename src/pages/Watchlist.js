import React, { useState } from 'react';
import { useStockData } from '../contexts/StockDataContext';
import { useTheme } from '../contexts/ThemeContext';

const moMovers = [
  { symbol: 'TCS', change: '+2.4%' },
  { symbol: 'RELIANCE', change: '+1.7%' },
  { symbol: 'ITC', change: '-1.1%' },
];
const moTips = [
  'Consider adding more banking stocks for diversification.',
  'IT sector is showing strong momentum this week.',
  'Review your watchlist regularly for new opportunities.',
];

const Watchlist = () => {
  const { stocks, watchlist, addToWatchlist, removeFromWatchlist } = useStockData();
  const [selected, setSelected] = useState('');
  const { theme } = useTheme();
  const isZerodha = theme === 'zerodha-theme';

  const availableToAdd = stocks.filter(s => !watchlist.includes(s.symbol));
  const watchedStocks = stocks.filter(s => watchlist.includes(s.symbol));

  if (isZerodha) {
    return (
      <div className="dashboard-main dashboard-bg">
        <div className="dashboard-header"><span role="img" aria-label="watchlist">👁️</span> Watchlist</div>
        <div className="dashboard-card" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem' }}
            >
              <option value="">Add stock to watchlist</option>
              {availableToAdd.map(stock => (
                <option key={stock.symbol} value={stock.symbol}>{stock.symbol} - {stock.name}</option>
              ))}
            </select>
            <button
              className="button"
              disabled={!selected}
              onClick={() => {
                if (selected) addToWatchlist(selected);
                setSelected('');
              }}
            >Add</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'var(--section-bg)' }}>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Symbol</th>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Name</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Price (₹)</th>
                <th style={{ textAlign: 'center', padding: '0.7rem 1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchedStocks.map(stock => (
                <tr key={stock.symbol}>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>{stock.symbol}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>{stock.name}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{stock.price.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
                    <button className="button outline" onClick={() => removeFromWatchlist(stock.symbol)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {watchedStocks.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888', padding: 24 }}>No stocks in your watchlist.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Motilal Oswal: info-rich watchlist
  return (
    <div className="dashboard-main dashboard-bg">
      <div className="dashboard-header"><span role="img" aria-label="watchlist">👁️</span> Watchlist</div>
      <div className="dashboard-flex-grid">
        <div className="dashboard-flex-left dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="movers">🚀</span> Market Movers</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {moMovers.map((m, idx) => (
              <li key={idx} style={{ marginBottom: 14, fontWeight: 600 }}>
                {m.symbol} <span className={m.change.startsWith('+') ? 'pill-badge' : 'pill-badge red'}>{m.change}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-flex-center dashboard-card">
          <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem' }}
            >
              <option value="">Add stock to watchlist</option>
              {availableToAdd.map(stock => (
                <option key={stock.symbol} value={stock.symbol}>{stock.symbol} - {stock.name}</option>
              ))}
            </select>
            <button
              className="button"
              disabled={!selected}
              onClick={() => {
                if (selected) addToWatchlist(selected);
                setSelected('');
              }}
            >Add</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'var(--section-bg)' }}>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Symbol</th>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Name</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Price (₹)</th>
                <th style={{ textAlign: 'center', padding: '0.7rem 1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchedStocks.map(stock => (
                <tr key={stock.symbol}>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>{stock.symbol}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>{stock.name}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{stock.price.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
                    <button className="button outline" onClick={() => removeFromWatchlist(stock.symbol)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {watchedStocks.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888', padding: 24 }}>No stocks in your watchlist.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="dashboard-flex-right dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="tips">💡</span> Research Tips</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {moTips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: 14, fontSize: '1rem', color: '#1976d2' }}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Watchlist; 