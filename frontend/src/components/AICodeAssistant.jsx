// frontend/src/components/AICodeAssistant.jsx
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const AICodeAssistant = () => {
  const { isDarkMode } = useTheme();
  const externalUrl = "https://code-compass-ai-three.vercel.app/";

  const handleOpenAI = () => {
    window.open(externalUrl, "_blank");
  };

  const features = [
    {
      icon: "🤖",
      title: "AI Code Explanation",
      description: "Get detailed explanations of any code snippet. Understand complex algorithms with AI-powered insights and step-by-step breakdowns.",
      benefits: ["Natural language explanations", "Algorithm analysis", "Time complexity insights"]
    },
    {
      icon: "⚡",
      title: "Code Execution",
      description: "Write, run, and test your code in real-time. See how algorithms behave with different inputs and edge cases.",
      benefits: ["Real-time execution", "Multiple language support", "Edge case testing"]
    },
    {
      icon: "🎨",
      title: "Code Visualization",
      description: "Watch your code come to life! Visualize algorithm execution step-by-step with interactive animations and state tracking.",
      benefits: ["Step-by-step visualization", "State tracking", "Memory visualization"]
    },
  ];

  const benefits = [
    "Real-time code analysis",
    "Algorithm visualization",
    "Debug assistance",
    "Complexity analysis",
    "Code optimization suggestions",
    "Multiple language support",
  ];

  // Styles
  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0f0c29' : '#f5f7fa',
      color: isDarkMode ? '#e2e8f0' : '#1a202c',
      transition: 'all 0.3s ease',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      backgroundColor: isDarkMode ? 'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: isDarkMode ? '1px solid rgba(107, 91, 149, 0.3)' : '1px solid rgba(107, 91, 149, 0.1)',
    },
    backButton: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      textDecoration: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    },
    heroSection: {
      padding: '60px 40px 80px',
      textAlign: 'center',
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: isDarkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.1)',
      padding: '8px 16px',
      borderRadius: '50px',
      marginBottom: '25px',
    },
    heroTitle: {
      fontSize: '4rem',
      marginBottom: '20px',
      lineHeight: '1.2',
    },
    aiGlow: {
      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    heroDescription: {
      fontSize: '1.2rem',
      maxWidth: '700px',
      margin: '0 auto 30px',
      lineHeight: '1.6',
      opacity: 0.9,
    },
    heroStats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    stat: {
      textAlign: 'center',
    },
    statNumber: {
      display: 'block',
      fontSize: '1.8rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    statLabel: {
      fontSize: '0.85rem',
      opacity: 0.7,
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
      color: 'white',
      border: 'none',
      padding: '15px 35px',
      fontSize: '1.1rem',
      fontWeight: 600,
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)',
    },
    section: {
      padding: '80px 40px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      marginBottom: '15px',
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.7,
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
    },
    featureCard: {
      padding: '35px 30px',
      borderRadius: '20px',
      backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.8)' : 'white',
      border: isDarkMode ? '1px solid rgba(107, 91, 149, 0.3)' : '1px solid rgba(107, 91, 149, 0.2)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '20px',
    },
    featureTitle: {
      fontSize: '1.5rem',
      marginBottom: '15px',
    },
    featureDescription: {
      lineHeight: '1.6',
      marginBottom: '20px',
      opacity: 0.8,
    },
    benefitTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    benefitTag: {
      fontSize: '0.75rem',
      padding: '4px 10px',
      background: isDarkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.1)',
      borderRadius: '20px',
    },
    previewSection: {
      padding: '80px 40px',
      backgroundColor: isDarkMode ? 'rgba(26, 32, 44, 0.5)' : 'rgba(0, 0, 0, 0.02)',
    },
    previewCard: {
      maxWidth: '1000px',
      margin: '0 auto',
      borderRadius: '24px',
      overflow: 'hidden',
      backgroundColor: isDarkMode ? '#1a202c' : 'white',
      border: isDarkMode ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid rgba(168, 85, 247, 0.2)',
      boxShadow: isDarkMode ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.1)',
    },
    previewHeader: {
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    },
    previewDots: {
      display: 'flex',
      gap: '8px',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
    previewContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      padding: '25px',
    },
    codePanel: {
      backgroundColor: isDarkMode ? '#0d1117' : '#f6f8fa',
      borderRadius: '12px',
      overflow: 'hidden',
      border: isDarkMode ? '1px solid #30363d' : '1px solid #e1e4e8',
    },
    codeHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 15px',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
      fontSize: '0.8rem',
    },
    codeLines: {
      padding: '15px',
      fontFamily: 'monospace',
      fontSize: '0.75rem',
      lineHeight: '1.8',
    },
    codeLine: {
      padding: '2px 0',
      borderLeft: '3px solid transparent',
    },
    highlightLine: {
      borderLeftColor: '#a855f7',
      backgroundColor: isDarkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
      paddingLeft: '10px',
    },
    aiExplanation: {
      padding: '15px',
      margin: '15px',
      borderRadius: '10px',
      borderLeft: '3px solid #a855f7',
      backgroundColor: isDarkMode ? 'rgba(168, 85, 247, 0.1)' : '#f1f8e9',
    },
    visualizationPanel: {
      padding: '15px',
      borderRadius: '12px',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)',
    },
    vizHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      fontSize: '0.85rem',
    },
    stepIndicator: {
      color: '#a855f7',
      fontWeight: 600,
    },
    arrayBars: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: '12px',
      height: '150px',
      marginBottom: '20px',
    },
    bar: {
      width: '45px',
      background: 'linear-gradient(180deg, #a855f7, #ec4899)',
      borderRadius: '8px 8px 4px 4px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: '8px',
      fontSize: '0.7rem',
      fontWeight: 600,
      color: 'white',
    },
    activeBar: {
      transform: 'scale(1.05)',
      boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)',
    },
    pointerIndicator: {
      display: 'flex',
      justifyContent: 'space-around',
      fontSize: '0.7rem',
      marginTop: '15px',
    },
    pointer: {
      padding: '4px 8px',
      borderRadius: '15px',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
    },
    activePointer: {
      backgroundColor: '#a855f7',
      color: 'white',
    },
    controlButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px',
    },
    controlBtn: {
      padding: '6px 15px',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      backgroundColor: isDarkMode ? '#2d3748' : '#e2e8f0',
      color: isDarkMode ? 'white' : '#1a202c',
    },
    previewFooter: {
      padding: '20px',
      textAlign: 'center',
      borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    },
    launchBtn: {
      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '50px',
      cursor: 'pointer',
    },
    benefitsContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '50px',
      alignItems: 'center',
    },
    benefitsList: {
      marginBottom: '30px',
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 0',
    },
    checkMark: {
      color: '#48bb78',
      fontWeight: 'bold',
    },
    statsCard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      padding: '30px',
      borderRadius: '20px',
      backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.5)' : 'white',
      boxShadow: isDarkMode ? 'none' : '0 4px 6px rgba(0,0,0,0.05)',
    },
    statItem: {
      textAlign: 'center',
      padding: '20px',
    },
    ctaSection: {
      padding: '80px 40px',
      textAlign: 'center',
      background: isDarkMode ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))' : 'linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))',
    },
    mainCtaButton: {
      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
      color: 'white',
      border: 'none',
      padding: '18px 45px',
      fontSize: '1.2rem',
      fontWeight: 700,
      borderRadius: '50px',
      cursor: 'pointer',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <Link to="/home" style={styles.backButton}>
          ← Back to Home
        </Link>
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBadge}>
          <span>✨</span>
          <span>Powered by Advanced AI</span>
        </div>
        <h1 style={styles.heroTitle}>
          <span style={styles.aiGlow}>AI Code</span> Assistant
        </h1>
        <p style={styles.heroDescription}>
          Generate, debug & visualize code using AI. Transform the way you
          learn and understand algorithms with our intelligent assistant.
        </p>
        <div style={styles.heroStats}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>10K+</span>
            <span style={styles.statLabel}>Active Users</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>50K+</span>
            <span style={styles.statLabel}>Code Executions</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>98%</span>
            <span style={styles.statLabel}>Satisfaction Rate</span>
          </div>
        </div>
        <button onClick={handleOpenAI} style={styles.ctaButton}>
          🚀 Try AI Code Visualization →
        </button>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Powerful AI Features</h2>
          <p style={styles.sectionSubtitle}>
            Everything you need to master algorithms and data structures
          </p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
              <div style={styles.benefitTags}>
                {feature.benefits.map((benefit, i) => (
                  <span key={i} style={styles.benefitTag}>✓ {benefit}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section style={styles.previewSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>See It In Action</h2>
          <p style={styles.sectionSubtitle}>
            Experience the power of AI-driven code visualization
          </p>
        </div>
        <div style={styles.previewCard}>
          <div style={styles.previewHeader}>
            <div style={styles.previewDots}>
              <span style={{ ...styles.dot, backgroundColor: '#ff5f56' }}></span>
              <span style={{ ...styles.dot, backgroundColor: '#ffbd2e' }}></span>
              <span style={{ ...styles.dot, backgroundColor: '#27c93f' }}></span>
            </div>
            <span>AI Code Visualizer</span>
          </div>
          <div style={styles.previewContent}>
            <div style={styles.codePanel}>
              <div style={styles.codeHeader}>
                <span>Python</span>
                <span style={{ color: '#a855f7' }}>AI Analysis Active</span>
              </div>
              <div style={styles.codeLines}>
                <div style={{ ...styles.codeLine, ...styles.highlightLine }}>1  def binary_search(arr, target):</div>
                <div style={styles.codeLine}>2      left, right = 0, len(arr) - 1</div>
                <div style={styles.codeLine}>3      while left = right:</div>
                <div style={styles.codeLine}>4          mid = (left + right) // 2</div>
                <div style={styles.codeLine}>5          if arr[mid] == target:</div>
                <div style={styles.codeLine}>6              return mid</div>
                <div style={styles.codeLine}>7          elif arr[mid]  target:</div>
                <div style={styles.codeLine}>8              left = mid + 1</div>
                <div style={styles.codeLine}>9          else:</div>
                <div style={styles.codeLine}>10             right = mid - 1</div>
                <div style={styles.codeLine}>11     return -1</div>
              </div>
              <div style={styles.aiExplanation}>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>🤖 AI Insight</div>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Binary search divides the search interval in half repeatedly. Time complexity: O(log n)</p>
              </div>
            </div>
            <div style={styles.visualizationPanel}>
              <div style={styles.vizHeader}>
                <span>Step-by-Step Visualization</span>
                <span style={styles.stepIndicator}>Step 1/8</span>
              </div>
              <div style={styles.arrayBars}>
                <div style={{ ...styles.bar, height: '30px' }}>2</div>
                <div style={{ ...styles.bar, height: '45px' }}>5</div>
                <div style={{ ...styles.bar, height: '60px', ...styles.activeBar }}>8</div>
                <div style={{ ...styles.bar, height: '40px' }}>12</div>
                <div style={{ ...styles.bar, height: '75px' }}>16</div>
                <div style={{ ...styles.bar, height: '55px' }}>23</div>
                <div style={{ ...styles.bar, height: '38px' }}>38</div>
              </div>
              <div style={styles.pointerIndicator}>
                <span style={styles.pointer}>Left: 0</span>
                <span style={{ ...styles.pointer, ...styles.activePointer }}>Mid: 3 (Current)</span>
                <span style={styles.pointer}>Right: 6</span>
              </div>
              <div style={styles.controlButtons}>
                <button style={styles.controlBtn}>◀ Prev</button>
                <button style={styles.controlBtn}>▶ Play</button>
                <button style={styles.controlBtn}>Next ▶</button>
              </div>
            </div>
          </div>
          <div style={styles.previewFooter}>
            <button onClick={handleOpenAI} style={styles.launchBtn}>
              Launch Interactive Demo →
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.section}>
        <div style={styles.benefitsContainer}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Why Choose AI Code Assistant?</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '30px', opacity: 0.8 }}>
              Whether you're a beginner learning algorithms or an experienced
              developer optimizing code, our AI assistant helps you understand
              and visualize code like never before.
            </p>
            <div style={styles.benefitsList}>
              {benefits.slice(0, 4).map((benefit, index) => (
                <div key={index} style={styles.benefitItem}>
                  <span style={styles.checkMark}>✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <button onClick={handleOpenAI} style={{
              background: 'transparent',
              border: '2px solid #a855f7',
              color: '#a855f7',
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              cursor: 'pointer',
            }}>
              Start Learning with AI →
            </button>
          </div>
          <div style={styles.statsCard}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>50+</div>
              <div style={styles.statLabel}>Algorithms</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>10+</div>
              <div style={styles.statLabel}>Languages</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>AI Support</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>Free</div>
              <div style={styles.statLabel}>To Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Ready to Supercharge Your Learning?</h2>
        <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.8 }}>
          Join thousands of developers using AI to master algorithms and data structures
        </p>
        <button onClick={handleOpenAI} style={styles.mainCtaButton}>
          ✨ Launch AI Code Assistant →
        </button>
        <p style={{ marginTop: '20px', fontSize: '0.85rem', opacity: 0.6 }}>
          Opens in a new tab · Free to use · No credit card required
        </p>
      </section>
    </div>
  );
};

export default AICodeAssistant;