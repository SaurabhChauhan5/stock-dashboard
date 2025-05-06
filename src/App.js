import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import { StockDataProvider } from './contexts/StockDataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StockDataProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
                  <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </main>
            </div>
          </Router>
        </StockDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 