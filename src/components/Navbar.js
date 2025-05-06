import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Navbar.css';

const getInitials = (email) => email ? email[0].toUpperCase() : '';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const isZerodha = theme === 'zerodha-theme';
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Nav links as a component for reuse
  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} aria-current="page">Dashboard</NavLink>
      <NavLink to="/watchlist" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Watchlist</NavLink>
      <NavLink to="/portfolio" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Portfolio</NavLink>
      <NavLink to="/orders" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Orders</NavLink>
      {/* MO: Research dropdown */}
      {!isZerodha && (
        <div className="nav-dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <button className="nav-link nav-dropdown-btn">Research ▼</button>
          {showDropdown && (
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-item">Market Outlook</div>
              <div className="nav-dropdown-item">Top Picks</div>
              <div className="nav-dropdown-item">Analyst Calls</div>
            </div>
          )}
        </div>
      )}
    </>
  );

  // User actions (theme, dark, login/logout)
  const userActions = (
    <>
      <button className="button outline" style={{ marginRight: 8 }} onClick={toggleTheme}>
        {isZerodha ? 'Zerodha' : 'Motilal Oswal'} Theme
      </button>
      <button className="button outline" style={{ marginRight: 8 }} onClick={toggleDarkMode}>
        {isDark ? '🌙 Dark' : '☀️ Light'}
      </button>

      {!user ? (
        <button className="button outline"><NavLink to="/login" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Login</NavLink></button>
      ) : (
        <>
          {!isZerodha && (
            <span className="nav-avatar" title={user.email}>{getInitials(user.email)}</span>
          )}
          <span className="nav-link" style={{ fontWeight: 400, opacity: 0.8 }}>{user.email}</span>
          <button className="button outline" onClick={handleLogout}>Logout</button>
        </>
      )}
      <div></div>
    </>
  );

  return (
    <nav className={isZerodha ? 'navbar zerodha-navbar' : 'navbar mo-navbar'}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span role="img" aria-label="logo">{isZerodha ? '📈' : '💰'}</span>
        Stock DB
        {!isZerodha && <span className="mo-pro-badge">PRO</span>}
      </div>
      {/* Hamburger for mobile */}
      <button className="nav-hamburger" aria-label="Menu" onClick={() => setMobileMenu(m => !m)}>
        <span className="nav-hamburger-bar"></span>
        <span className="nav-hamburger-bar"></span>
        <span className="nav-hamburger-bar"></span>
      </button>
      <div className={`nav-links${mobileMenu ? ' nav-links-mobile-open' : ''}`}>
        {navLinks}
        {userActions}
      </div>
      {/* Mobile overlay menu */}
      {mobileMenu && (
        <div className="nav-mobile-overlay" onClick={() => setMobileMenu(false)}>
          <div className="nav-mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="nav-mobile-logo">{isZerodha ? '📈' : '💰'} Stock DB</div>
            <div className="nav-mobile-links">{navLinks}</div>
            <div className="nav-mobile-actions">{userActions}</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 