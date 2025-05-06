import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account');
    }
  };

  const isDisabled = !email || !password || !confirmPassword || password !== confirmPassword;

  return (
    <div className="auth-container centered-main-card">
      <div className="auth-header">Sign Up</div>
      <form className="auth-form" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && <div className="auth-error">{error}</div>}
        <button className="button" type="submit" disabled={isDisabled}>Sign Up</button>
      </form>
      <div className="auth-footer">
        <span>Already have an account?</span>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </div>
  );
};

export default Signup; 