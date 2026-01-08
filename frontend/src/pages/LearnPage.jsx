// components/LearnPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/LearnPage.css';

const LearnPage = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('beginner');

  const learningPaths = {
    beginner: [
      {
        title: "Introduction to Arrays",
        description: "Learn basic array operations and manipulations",
        duration: "30 min",
        level: "Beginner",
        link: "/arrays"
      },
      {
        title: "Basic Sorting Algorithms",
        description: "Understand Bubble Sort, Selection Sort, and Insertion Sort",
        duration: "45 min",
        level: "Beginner",
        link: "/sorting"
      }
    ],
    intermediate: [
      {
        title: "Tree Data Structures",
        description: "Binary Search Trees, AVL Trees, and traversals",
        duration: "60 min",
        level: "Intermediate",
        link: "/trees"
      },
      {
        title: "Graph Algorithms",
        description: "BFS, DFS, and basic graph theory",
        duration: "75 min",
        level: "Intermediate",
        link: "/graphs"
      }
    ],
    advanced: [
      {
        title: "Dynamic Programming",
        description: "Memoization, tabulation, and common DP patterns",
        duration: "90 min",
        level: "Advanced",
        link: "/dynamic-programming"
      },
      {
        title: "Backtracking Algorithms",
        description: "N-Queens, Sudoku Solver, and combinatorial problems",
        duration: "80 min",
        level: "Advanced",
        link: "/backtracking"
      }
    ]
  };

  // FIXED: Additional Learning Resources Section
  const resources = [
    {
      type: "📖",
      title: "Algorithm Design Manual",
      description: "Comprehensive guide to algorithm design and analysis",
      link: "#"
    },
    {
      type: "🎥",
      title: "Data Structures Course",
      description: "Video course covering essential data structures",
      link: "#"
    },
    {
      type: "💻",
      title: "Practice Problems",
      description: "Curated list of algorithm practice problems",
      link: "#"
    },
    {
      type: "📚",
      title: "Big O Cheat Sheet",
      description: "Quick reference for time and space complexities",
      link: "#"
    }
  ];

  return (
    <div className={`learn-page ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="learn-header">
        <nav className="learn-nav">
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

      <div className="learn-container">
        {/* Hero Section */}
        <section className="learn-hero">
          <h1>Learning Resources</h1>
          <p className="hero-subtitle">
            Master Data Structures and Algorithms with our curated learning paths and resources
          </p>
        </section>

        {/* Learning Paths */}
        <section className="learning-paths">
          <h2>Structured Learning Paths</h2>
          <div className="path-categories">
            <button 
              className={`category-btn ${activeCategory === 'beginner' ? 'active' : ''}`}
              onClick={() => setActiveCategory('beginner')}
            >
              🚀 Beginner
            </button>
            <button 
              className={`category-btn ${activeCategory === 'intermediate' ? 'active' : ''}`}
              onClick={() => setActiveCategory('intermediate')}
            >
              ⚡ Intermediate
            </button>
            <button 
              className={`category-btn ${activeCategory === 'advanced' ? 'active' : ''}`}
              onClick={() => setActiveCategory('advanced')}
            >
              🎯 Advanced
            </button>
          </div>

          <div className="path-content">
            <div className="lessons-grid">
              {learningPaths[activeCategory].map((lesson, index) => (
                <div key={index} className="lesson-card" data-level={lesson.level}>
                  <div className="lesson-header">
                    <h3>{lesson.title}</h3>
                    <span className="lesson-duration">{lesson.duration}</span>
                  </div>
                  <p className="lesson-description">{lesson.description}</p>
                  <div className="lesson-footer">
                    <span className="lesson-level">{lesson.level}</span>
                    <Link to={lesson.link} className="lesson-link">
                      Start Learning →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIXED: Additional Learning Resources Section */}
        <section className="additional-resources">
          <h2>Additional Learning Resources</h2>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-icon">{resource.type}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.link} className="resource-link">
                  Explore Resource
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="learning-tips">
          <h2>Learning Tips & Best Practices</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🎯 Practice Regularly</h3>
              <p>Consistent practice is key to mastering algorithms. Try to solve at least one problem daily.</p>
            </div>
            <div className="tip-card">
              <h3>📝 Understand First</h3>
              <p>Focus on understanding the concept before memorizing the implementation.</p>
            </div>
            <div className="tip-card">
              <h3>🔍 Visualize</h3>
              <p>Use our visualizations to see how algorithms work step by step.</p>
            </div>
            <div className="tip-card">
              <h3>💡 Solve Problems</h3>
              <p>Apply what you learn by solving real programming problems.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="learn-cta">
          <div className="cta-content">
            <h2>Start Your Learning Journey Today</h2>
            <p>Join thousands of students mastering Data Structures and Algorithms</p>
            <div className="cta-buttons">
              <Link to="/demo" className="btn btn-primary">
                View Demo
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

export default LearnPage;