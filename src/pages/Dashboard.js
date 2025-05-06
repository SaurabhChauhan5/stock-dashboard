import React from 'react';
import { useStockData } from '../contexts/StockDataContext';
import { useTheme } from '../contexts/ThemeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#1976d2', '#00bcd4', '#ff9800', '#4caf50', '#e91e63', '#9c27b0', '#ff5722', '#607d8b'];

// Mock portfolio allocation data
const portfolioData = [
  { symbol: 'TCS', value: 25 },
  { symbol: 'INFY', value: 18 },
  { symbol: 'RELIANCE', value: 22 },
  { symbol: 'HDFCBANK', value: 15 },
  { symbol: 'ITC', value: 8 },
  { symbol: 'SBIN', value: 7 },
  { symbol: 'BAJFINANCE', value: 3 },
  { symbol: 'MARUTI', value: 2 },
];

const newsData = [
  { title: 'Nifty hits record high as IT stocks rally', time: '10 min ago', source: 'Moneycontrol' },
  { title: 'RBI keeps repo rate unchanged at 6.5%', time: '30 min ago', source: 'ET Markets' },
  { title: 'Reliance Q4 profit beats estimates', time: '1 hr ago', source: 'Reuters' },
  { title: 'HDFC Bank to merge with HDFC Ltd.', time: '2 hr ago', source: 'Bloomberg' },
  { title: 'Infosys announces major US deal', time: '3 hr ago', source: 'CNBC TV18' },
];

const moAnalytics = [
  { label: 'Top Gainer', value: 'TCS', change: '+2.4%' },
  { label: 'Top Loser', value: 'ITC', change: '-1.1%' },
  { label: 'Most Active', value: 'RELIANCE', change: '+1.7%' },
];

const Dashboard = () => {
  const { stocks } = useStockData();
  const { theme } = useTheme();
  const isZerodha = theme === 'zerodha-theme';

  // Minimalist Zerodha dashboard
  if (isZerodha) {
    return (
      <div className="dashboard-main dashboard-bg">
        <div className="dashboard-header"><span role="img" aria-label="dashboard">📊</span> Dashboard</div>
        <div className="dashboard-flex-grid">
          {/* Left: Portfolio Donut Chart */}
          <div className="dashboard-flex-left dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="pie">📊</span> Portfolio Allocation</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="symbol"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#1976d2"
                  label={({ symbol }) => symbol}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Center: Live Stock Prices */}
          <div className="dashboard-flex-center dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="prices">💹</span> Live Stock Prices</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
              <thead>
                <tr style={{ background: 'var(--section-bg)' }}>
                  <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Symbol</th>
                  <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Name</th>
                  <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map(stock => (
                  <tr key={stock.symbol}>
                    <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>{stock.symbol}</td>
                    <td style={{ padding: '0.6rem 1rem' }}>{stock.name}</td>
                    <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{stock.price.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Right: Portfolio Summary (no news) */}
          <div className="dashboard-flex-right dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="summary">🧾</span> Portfolio Summary</div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total Value: <b>₹12,50,000</b></div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Today's P&L: <span className="pill-badge">+₹2,350</span></div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total P&L: <span className="pill-badge blue">+₹1,15,000</span></div>
          </div>
        </div>
      </div>
    );
  }

  // Motilal Oswal: info-rich dashboard
  return (
    <div className="dashboard-main dashboard-bg">
      <div className="dashboard-header"><span role="img" aria-label="dashboard">📈</span> Dashboard</div>
      <div className="dashboard-flex-grid">
        {/* Left: Portfolio Donut Chart + Analytics */}
        <div className="dashboard-flex-left" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="pie">📊</span> Portfolio Allocation</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="symbol"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#1976d2"
                  label={({ symbol }) => symbol}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="analytics">📊</span> Analytics</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {moAnalytics.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 12, fontWeight: 500 }}>
                  {item.label}: <span style={{ color: '#1976d2' }}>{item.value}</span> <span className={item.change.startsWith('+') ? 'pill-badge' : 'pill-badge red'}>{item.change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Center: Live Stock Prices */}
        <div className="dashboard-flex-center dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="prices">💹</span> Live Stock Prices</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'transparent' }}>
            <thead>
              <tr style={{ background: 'var(--section-bg)' }}>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Symbol</th>
                <th style={{ textAlign: 'left', padding: '0.7rem 1rem' }}>Name</th>
                <th style={{ textAlign: 'right', padding: '0.7rem 1rem' }}>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.symbol}>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>{stock.symbol}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>{stock.name}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{stock.price.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right: Portfolio Summary + Market News */}
        <div className="dashboard-flex-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="summary">🧾</span> Portfolio Summary</div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total Value: <b>₹12,50,000</b></div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Today's P&L: <span className="pill-badge">+₹2,350</span></div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total P&L: <span className="pill-badge blue">+₹1,15,000</span></div>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="news">📰</span> Market News & Research</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {newsData.map((news, idx) => (
                <li key={idx} style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 500, color: 'var(--primary-text)' }}>{news.title}</div>
                  <div style={{ fontSize: '0.95rem', color: '#888' }}>{news.time} &middot; {news.source}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 