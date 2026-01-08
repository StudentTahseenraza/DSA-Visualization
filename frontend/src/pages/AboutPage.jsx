// components/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  const teamMembers = [
    {
      name: "Your Name",
      role: "Full Stack Developer",
      bio: "Passionate about creating educational tools that make complex concepts accessible to everyone.",
      avatar: "/images/team/developer1.jpg"
    },
  ];

  const projectMilestones = [
    { year: "2024", event: "Project Conceptualization", description: "Idea born to make DSA learning interactive" },
    { year: "2024", event: "Development Started", description: "Initial implementation of core visualization engine" },
    { year: "2024", event: "First Release", description: "Launch with basic sorting algorithms" },
    { year: "2024", event: "Feature Expansion", description: "Added trees, graphs, and advanced algorithms" },
  ];

  return (
    <div className={`about-page ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="about-header">
        <nav className="about-nav">
          <Link to="/" className="nav-brand">
            <span className="brand-text">DSA VISUALIZER</span>
          </Link>
          <div className="nav-actions">
            <Link to="/home" className="nav-button">
              ← Back to Home
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About DSA Visualizer</h1>
          <p className="hero-subtitle">
            Transforming how students and developers learn Data Structures and Algorithms through interactive visualization
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                DSA Visualizer was created with a simple yet powerful mission: to make learning 
                Data Structures and Algorithms intuitive, engaging, and accessible to everyone.
              </p>
              <p>
                We believe that seeing algorithms in action helps build deeper understanding 
                than just reading about them or writing code. Our platform bridges the gap 
                between theoretical knowledge and practical implementation.
              </p>
            </div>
            <div className="mission-stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Algorithms</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Users</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight - FIXED SECTION */}
        <section className="features-highlight">
          <h2>Why Choose DSA Visualizer?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">👁️</div>
              <h3>Visual Learning</h3>
              <p>See algorithms execute step-by-step with beautiful animations and color coding</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎮</div>
              <h3>Interactive</h3>
              <p>Control the execution speed, step through algorithms, and customize inputs</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3>Comprehensive</h3>
              <p>Coverage from basic arrays to complex graph algorithms and dynamic programming</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3>Educational</h3>
              <p>Detailed explanations, pseudocode, and complexity analysis for each algorithm</p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-items">
                <span className="tech-item">React</span>
                <span className="tech-item">JavaScript</span>
                <span className="tech-item">CSS3</span>
                <span className="tech-item">HTML5</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <div className="tech-items">
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express</span>
                <span className="tech-item">WebSocket</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>Visualization</h3>
              <div className="tech-items">
                <span className="tech-item">Canvas API</span>
                <span className="tech-item">SVG</span>
                <span className="tech-item">D3.js</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <h2>Project Timeline</h2>
          <div className="timeline">
            {projectMilestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h4>{milestone.event}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Start Your Learning Journey</h2>
            <p>Join our community of learners and explore the world of algorithms</p>
            <div className="cta-buttons">
              <Link to="/demo" className="btn btn-primary">
                Try Demo
              </Link>
              <Link to="/home" className="btn btn-secondary">
                Explore Algorithms
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;