// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage';
import AlgorithmPage from './components/AlgorithmPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';
import DemoPage from './pages/DemoPage';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/:category" element={<AlgorithmPage />} />
            <Route path="/algorithm-compare" element={<AlgorithmPage />} />
            <Route path="/complexity-analysis" element={<AlgorithmPage />} />
            {/* New Routes */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/demo" element={<DemoPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;