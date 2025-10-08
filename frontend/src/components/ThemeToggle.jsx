// components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            <span className="sun">☀️</span>
            <span className="moon">🌙</span>
          </div>
        </div>
        <div className="toggle-glow"></div>
      </button>
    </div>
  );
};

export default ThemeToggle;