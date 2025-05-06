import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const COLORS = ['#1976d2', '#00bcd4', '#ff9800', '#4caf50', '#e91e63', '#9c27b0', '#ff5722', '#607d8b'];

const portfolioData = [
  { name: 'TCS', value: 25 },
  { name: 'INFY', value: 18 },
  { name: 'RELIANCE', value: 22 },
  { name: 'HDFCBANK', value: 15 },
  { name: 'ITC', value: 8 },
  { name: 'SBIN', value: 7 },
  { name: 'BAJFINANCE', value: 3 },
  { name: 'MARUTI', value: 2 },
];

const sectorData = [
  { sector: 'IT', value: 43 },
  { sector: 'Banking', value: 22 },
  { sector: 'FMCG', value: 12 },
  { sector: 'Auto', value: 8 },
  { sector: 'Finance', value: 7 },
  { sector: 'Others', value: 8 },
];

const moInsights = [
  { title: 'Portfolio overweight in IT sector', detail: '43% allocation in IT stocks. Consider diversifying.' },
  { title: 'Top holding: TCS', detail: 'TCS forms 25% of your portfolio.' },
  { title: 'Recent gainers: RELIANCE, HDFCBANK', detail: 'These stocks have outperformed the market this week.' },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#888" fontSize={14} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {portfolioData[index].name} ({portfolioData[index].value}%)
    </text>
  );
};

const Portfolio = () => {
  const { theme } = useTheme();
  const isZerodha = theme === 'zerodha-theme';

  if (isZerodha) {
    return (
      <div className="dashboard-main dashboard-bg">
        <div className="dashboard-header"><span role="img" aria-label="portfolio">📁</span> Portfolio</div>
        <div className="dashboard-flex-grid">
          <div className="dashboard-flex-left dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="pie">📊</span> Portfolio Allocation</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#1976d2"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  isAnimationActive={false}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={48} iconSize={18} wrapperStyle={{ fontSize: 15 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="dashboard-flex-center"></div>
          <div className="dashboard-flex-right dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="summary">🧾</span> Summary</div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total Value: <b>₹12,50,000</b></div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Today's P&L: <span className="pill-badge">+₹2,350</span></div>
            <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total P&L: <span className="pill-badge blue">+₹1,15,000</span></div>
          </div>
        </div>
      </div>
    );
  }

  // Motilal Oswal: info-rich portfolio
  return (
    <div className="dashboard-main dashboard-bg">
      <div className="dashboard-header"><span role="img" aria-label="portfolio">📁</span> Portfolio</div>
      <div className="dashboard-flex-grid">
        <div className="dashboard-flex-left" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="pie">📊</span> Portfolio Allocation</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
                <Pie
                  data={portfolioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#1976d2"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  isAnimationActive={false}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={48} iconSize={18} wrapperStyle={{ fontSize: 15 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-section-title"><span role="img" aria-label="insights">💡</span> Insights</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {moInsights.map((insight, idx) => (
                <li key={idx} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, color: '#1976d2' }}>{insight.title}</div>
                  <div style={{ fontSize: '0.98rem', color: '#555' }}>{insight.detail}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dashboard-flex-center dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="bar">📊</span> Sector Allocation</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={sectorData} margin={{ top: 24, right: 32, left: 8, bottom: 24 }} barSize={32}>
              <XAxis dataKey="sector" stroke="#888" fontSize={15} fontWeight={600} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={15} fontWeight={600} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend iconSize={18} wrapperStyle={{ fontSize: 15 }} />
              <Bar dataKey="value" fill="#1976d2" radius={[8, 8, 0, 0]}>
                <LabelList dataKey="value" position="top" fontSize={15} fontWeight={700} />
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-flex-right dashboard-card">
          <div className="dashboard-section-title"><span role="img" aria-label="summary">🧾</span> Summary</div>
          <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total Value: <b>₹12,50,000</b></div>
          <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Today's P&L: <span className="pill-badge">+₹2,350</span></div>
          <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>Total P&L: <span className="pill-badge blue">+₹1,15,000</span></div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 