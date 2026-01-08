import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [currentView, setCurrentView] = useState(initialView);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setCurrentView(initialView);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`auth-modal-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="auth-modal-container">
        <div className="auth-modal">
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
          
          <div className="auth-header">
            <h2>DSA Visualization</h2>
            <div className="auth-tabs">
              <button
                className={`tab ${currentView === 'login' ? 'active' : ''}`}
                onClick={() => setCurrentView('login')}
              >
                Login
              </button>
              <button
                className={`tab ${currentView === 'signup' ? 'active' : ''}`}
                onClick={() => setCurrentView('signup')}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="auth-content">
            {currentView === 'login' ? (
              <LoginForm onSwitchToSignup={() => setCurrentView('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setCurrentView('login')} />
            )}
          </div>

          {/* Background algorithm visualization */}
          <div className="algorithm-background">
            <div className="algorithm-visualization">
              <div className="sorting-bars">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="sorting-bar" style={{
                    height: `${30 + (i * 15)}px`,
                    animationDelay: `${i * 0.1}s`
                  }}></div>
                ))}
              </div>
              <div className="graph-nodes">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="graph-node" style={{
                    animationDelay: `${i * 0.3}s`,
                    top: `${30 + (i * 20)}%`,
                    left: `${20 + (i * 15)}%`
                  }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;