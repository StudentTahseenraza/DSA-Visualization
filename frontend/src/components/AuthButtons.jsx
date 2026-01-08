import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/AuthButtons.css';

const AuthButtons = () => {
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();

  const handleLogin = () => {
    openAuthModal('login');
  };

  const handleSignup = () => {
    openAuthModal('signup');
  };

  if (isAuthenticated && user) {
    return (
      <div className="user-profile-dropdown">
        <Link to="/profile" className="profile-link">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </Link>
        <div className="dropdown-menu">
          <Link to="/profile" className="dropdown-item">
            👤 My Profile
          </Link>
          <Link to="/profile" className="dropdown-item">
            ⚙️ Settings
          </Link>
          <Link to="/home" className="dropdown-item">
            📚 My Learning
          </Link>
          <div className="dropdown-divider"></div>
          <button onClick={logout} className="dropdown-item logout-item">
            🚪 Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-buttons">
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      <button className="signup-btn" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;