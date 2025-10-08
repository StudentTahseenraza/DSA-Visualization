// components/DemoPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/DemoPage.css';

const DemoPage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Welcome to DSA Visualizer",
      description: "An interactive platform to learn and visualize Data Structures and Algorithms",
      image: "/images/demo/welcome.png",
      video: "/videos/demo/welcome.mp4"
    },
    {
      title: "Choose Your Algorithm",
      description: "Select from various categories like Sorting, Trees, Graphs, and more",
      image: "/images/demo/choose-algo.png",
      video: "/videos/demo/choose-algo.mp4"
    },
    {
      title: "Interactive Visualization",
      description: "Watch algorithms come to life with step-by-step animations",
      image: "/images/demo/visualization.png",
      video: "/videos/demo/visualization.mp4"
    },
    {
      title: "Control & Customize",
      description: "Adjust speed, input data, and control the animation playback",
      image: "/images/demo/controls.png",
      video: "/videos/demo/controls.mp4"
    },
    {
      title: "Learn with Pseudocode",
      description: "Follow along with highlighted pseudocode and explanations",
      image: "/images/demo/pseudocode.png",
      video: "/videos/demo/pseudocode.mp4"
    }
  ];

  const features = [
    {
      icon: "⚡",
      title: "Real-time Visualization",
      description: "See algorithms execute in real-time with beautiful animations"
    },
    {
      icon: "🎮",
      title: "Interactive Controls",
      description: "Pause, play, step through, and customize algorithm execution"
    },
    {
      icon: "📚",
      title: "Multiple Categories",
      description: "Sorting, Trees, Graphs, Dynamic Programming, and more"
    },
    {
      icon: "🔍",
      title: "Step-by-Step Explanation",
      description: "Understand each step with detailed explanations and pseudocode"
    },
    {
      icon: "🎨",
      title: "Customizable Inputs",
      description: "Use predefined data or create your own custom inputs"
    },
    {
      icon: "📊",
      title: "Performance Analysis",
      description: "Compare algorithms and analyze time/space complexity"
    }
  ];

  const quickStartSteps = [
    "Navigate to the Homepage to see all algorithm categories",
    "Click on any category (e.g., Sorting, Trees, Graphs)",
    "Select a specific algorithm from the sidebar",
    "Configure your input data or use the default",
    "Click 'Run Algorithm' to start visualization",
    "Use playback controls to pause, step through, or reset",
    "Follow along with the pseudocode and explanations"
  ];

  return (
    <div className={`demo-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <header className="demo-header">
        <nav className="demo-nav">
          <Link to="/" className="nav-brand">
            <span className="brand-text">VISUALIZE</span>
          </Link>
          <div className="nav-actions">
            <Link to="/home" className="nav-button primary">
              Start Visualizing →
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="demo-container">
        {/* Hero Section */}
        <section className="demo-hero">
          <div className="hero-content">
            <h1>Welcome to DSA Visualizer</h1>
            <p className="hero-subtitle">
              Learn Data Structures and Algorithms through interactive visualizations and step-by-step demonstrations
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('quick-start').scrollIntoView({ behavior: 'smooth' })}
              >
                Quick Start Guide
              </button>
              <Link to="/home" className="btn btn-secondary">
                Explore All Algorithms
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card sorting">Sorting</div>
              <div className="card trees">Trees</div>
              <div className="card graphs">Graphs</div>
              <div className="card dp">DP</div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="demo-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`tab ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            🎮 Interactive Guide
          </button>
          <button 
            className={`tab ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            ⭐ Features
          </button>
          <button 
            className={`tab ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            📹 Video Tutorial
          </button>
        </nav>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <section className="overview-tab">
              <div className="overview-content">
                <div className="text-content">
                  <h2>What is DSA Visualizer?</h2>
                  <p>
                    DSA Visualizer is an interactive educational platform designed to help students, 
                    developers, and computer science enthusiasts understand Data Structures and Algorithms 
                    through visual demonstrations.
                  </p>
                  <div className="key-points">
                    <div className="point">
                      <span className="point-icon">👁️</span>
                      <div>
                        <h4>Visual Learning</h4>
                        <p>See abstract concepts come to life with animations</p>
                      </div>
                    </div>
                    <div className="point">
                      <span className="point-icon">🎯</span>
                      <div>
                        <h4>Interactive Experience</h4>
                        <p>Control the execution and explore different scenarios</p>
                      </div>
                    </div>
                    <div className="point">
                      <span className="point-icon">📈</span>
                      <div>
                        <h4>Comprehensive Coverage</h4>
                        <p>From basic arrays to complex graph algorithms</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="visual-content">
                  <div className="demo-preview">
                    <div className="algorithm-visualization">
                      <div className="array-bars">
                        {[5, 2, 8, 1, 9, 3, 7].map((height, index) => (
                          <div 
                            key={index}
                            className="array-bar"
                            style={{ height: `${height * 30}px` }}
                          ></div>
                        ))}
                      </div>
                      <div className="visualization-controls">
                        <button>▶️ Play</button>
                        <button>⏸️ Pause</button>
                        <button>⏩ Step</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Interactive Guide Tab */}
          {activeTab === 'guide' && (
            <section className="guide-tab" id="quick-start">
              <h2>Quick Start Guide</h2>
              <div className="guide-steps">
                {quickStartSteps.map((step, index) => (
                  <div key={index} className="guide-step">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="interactive-demo">
                <h3>Try It Yourself</h3>
                <p>Experience a live demo of our sorting visualization:</p>
                <div className="live-demo">
                  <div className="demo-controls">
                    <select className="demo-select">
                      <option>Bubble Sort</option>
                      <option>Quick Sort</option>
                      <option>Merge Sort</option>
                    </select>
                    <button className="demo-btn">Generate Random Array</button>
                    <button className="demo-btn primary">Run Algorithm</button>
                  </div>
                  <div className="demo-visualization">
                    <div className="sorting-demo">
                      {[3, 7, 2, 8, 1, 9, 4].map((value, index) => (
                        <div 
                          key={index}
                          className="demo-bar"
                          style={{ height: `${value * 25}px` }}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <section className="features-tab">
              <h2>Amazing Features</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="categories-showcase">
                <h3>Supported Algorithm Categories</h3>
                <div className="categories-grid">
                  <div className="category-card">
                    <h4>Sorting Algorithms</h4>
                    <ul>
                      <li>Bubble Sort</li>
                      <li>Quick Sort</li>
                      <li>Merge Sort</li>
                      <li>Heap Sort</li>
                    </ul>
                  </div>
                  <div className="category-card">
                    <h4>Data Structures</h4>
                    <ul>
                      <li>Arrays & Lists</li>
                      <li>Trees (BST, AVL)</li>
                      <li>Graphs</li>
                      <li>Hash Tables</li>
                    </ul>
                  </div>
                  <div className="category-card">
                    <h4>Advanced Algorithms</h4>
                    <ul>
                      <li>Dynamic Programming</li>
                      <li>Graph Algorithms</li>
                      <li>Backtracking</li>
                      <li>Greedy Algorithms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Video Tutorial Tab */}
          {activeTab === 'video' && (
            <section className="video-tab">
              <h2>Video Tutorial</h2>
              <div className="video-container">
                <div className="video-placeholder">
                  <div className="video-player">
                    <div className="play-button-large">▶</div>
                    <p>Project Overview & Demo Video</p>
                    <span className="video-duration">15:30</span>
                  </div>
                  <div className="video-description">
                    <h4>Complete Project Walkthrough</h4>
                    <p>
                      Watch this comprehensive tutorial to learn how to use all features of DSA Visualizer, 
                      from basic navigation to advanced algorithm visualization techniques.
                    </p>
                    <ul>
                      <li>🎥 Complete interface overview</li>
                      <li>🔄 Step-by-step algorithm execution</li>
                      <li>⚙️ Customization and settings</li>
                      <li>📊 Performance comparison features</li>
                    </ul>
                  </div>
                </div>
                
                <div className="video-chapters">
                  <h4>Video Chapters</h4>
                  <div className="chapters-list">
                    <div className="chapter">
                      <span className="chapter-time">0:00</span>
                      <span className="chapter-title">Introduction</span>
                    </div>
                    <div className="chapter">
                      <span className="chapter-time">2:30</span>
                      <span className="chapter-title">Interface Overview</span>
                    </div>
                    <div className="chapter">
                      <span className="chapter-time">5:45</span>
                      <span className="chapter-title">Sorting Algorithms Demo</span>
                    </div>
                    <div className="chapter">
                      <span className="chapter-time">9:15</span>
                      <span className="chapter-title">Tree Visualizations</span>
                    </div>
                    <div className="chapter">
                      <span className="chapter-time">12:30</span>
                      <span className="chapter-title">Advanced Features</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Call to Action */}
        <section className="demo-cta">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students and developers mastering DSA with visual learning</p>
            <div className="cta-buttons">
              <Link to="/home" className="btn btn-large btn-primary">
                Explore All Algorithms
              </Link>
              <Link to="/learn" className="btn btn-large btn-secondary">
                Learning Resources
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DemoPage;