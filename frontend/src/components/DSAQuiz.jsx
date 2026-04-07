// frontend/src/components/DSAQuiz.jsx
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

const DSAQuiz = () => {
  const { isDarkMode } = useTheme();
  const externalUrl = "https://quiz-dsa-part.vercel.app/";

  const handleOpenQuiz = () => {
    window.open(externalUrl, "_blank");
  };

  const features = [
    {
      icon: "🧠",
      title: "AI Tutor Explanations",
      description: "Get intelligent explanations for every algorithm step. Our AI tutor breaks down complex concepts into easy-to-understand analogies and examples.",
    },
    {
      icon: "📊",
      title: "Interactive Sorting Visualizations",
      description: "Watch sorting algorithms like Bubble Sort, Quick Sort, and Merge Sort in action with real-time visual feedback and step-by-step execution.",
    },
    {
      icon: "🎯",
      title: "Algorithm Quizzes & Challenges",
      description: "Test your knowledge with interactive quizzes. Track your progress and master algorithm concepts through hands-on challenges.",
    },
  ];

  const algorithms = [
    "Bubble Sort",
    "Quick Sort", 
    "Merge Sort",
    "Insertion Sort",
    "Selection Sort",
    "Binary Search",
  ];

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
      background: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
      padding: '8px 16px',
      borderRadius: '50px',
      marginBottom: '25px',
    },
    heroTitle: {
      fontSize: '4rem',
      marginBottom: '20px',
      lineHeight: '1.2',
    },
    heroGlow: {
      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
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
      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    statLabel: {
      fontSize: '0.85rem',
      opacity: 0.7,
    },
    ctaButton: {
      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      color: 'white',
      border: 'none',
      padding: '15px 35px',
      fontSize: '1.1rem',
      fontWeight: 600,
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
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
    algorithmTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px',
    },
    algorithmTag: {
      fontSize: '0.75rem',
      padding: '4px 10px',
      background: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)',
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
      border: isDarkMode ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(245, 158, 11, 0.2)',
    },
    previewHeader: {
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      background: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
    },
    previewContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      padding: '25px',
    },
    quizPanel: {
      backgroundColor: isDarkMode ? '#0d1117' : '#f6f8fa',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    quizHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 15px',
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
    },
    progressBar: {
      height: '4px',
      background: isDarkMode ? '#2d3748' : '#e2e8f0',
      borderRadius: '2px',
      overflow: 'hidden',
    },
    progressFill: {
      width: '33%',
      height: '100%',
      background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
    },
    questionText: {
      padding: '20px',
      fontSize: '1rem',
      fontWeight: 500,
    },
    optionsList: {
      padding: '0 20px 20px',
    },
    option: {
      padding: '10px 15px',
      margin: '8px 0',
      borderRadius: '8px',
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
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
      color: '#f59e0b',
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
      background: 'linear-gradient(180deg, #f59e0b, #ef4444)',
      borderRadius: '8px 8px 4px 4px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: '8px',
      fontSize: '0.7rem',
      fontWeight: 600,
      color: 'white',
    },
    comparingBar: {
      transform: 'scale(1.05)',
      boxShadow: '0 0 15px rgba(245, 158, 11, 0.5)',
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
      backgroundColor: '#f59e0b',
      color: 'white',
    },
    aiExplanationBox: {
      marginTop: '15px',
      padding: '12px',
      borderRadius: '10px',
      backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
      borderLeft: '3px solid #f59e0b',
    },
    previewFooter: {
      padding: '20px',
      textAlign: 'center',
      borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
    },
    launchBtn: {
      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '50px',
      cursor: 'pointer',
    },
    ctaSection: {
      padding: '80px 40px',
      textAlign: 'center',
      background: isDarkMode ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))' : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(239, 68, 68, 0.05))',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to="/home" style={styles.backButton}>
          ← Back to Home
        </Link>
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBadge}>
          <span>🧠</span>
          <span>AI-Powered Learning Platform</span>
        </div>
        <h1 style={styles.heroTitle}>
          <span style={styles.heroGlow}>DSA Quiz</span> & Learning Center
        </h1>
        <p style={styles.heroDescription}>
          Master algorithms through interactive learning, practice, and AI-powered analysis.
          Test your knowledge with quizzes and get intelligent explanations.
        </p>
        <div style={styles.heroStats}>
          <div style={styles.stat}>
            <span style={styles.statNumber}>50+</span>
            <span style={styles.statLabel}>Interactive Lessons</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>200+</span>
            <span style={styles.statLabel}>Quiz Questions</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statNumber}>100%</span>
            <span style={styles.statLabel}>Free Access</span>
          </div>
        </div>
        <button onClick={handleOpenQuiz} style={styles.ctaButton}>
          🧠 Start Learning Now →
        </button>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Interactive Learning Features</h2>
          <p style={styles.sectionSubtitle}>
            Everything you need to master algorithms through practice
          </p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview Section */}
      <section style={styles.previewSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>See It In Action</h2>
          <p style={styles.sectionSubtitle}>
            Experience interactive sorting visualization with AI tutor
          </p>
        </div>
        <div style={styles.previewCard}>
          <div style={styles.previewHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🧠</span>
              <span>Bubble Sort - Step 1 of 3</span>
            </div>
            <span style={{ fontSize: '0.8rem' }}>Score: 0/0</span>
          </div>
          <div style={styles.previewContent}>
            <div style={styles.quizPanel}>
              <div style={styles.quizHeader}>
                <span>Current State</span>
                <span>Comparing elements at index 0 and 1</span>
              </div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>
              <div style={styles.questionText}>
                <strong>What happens next in Bubble Sort?</strong>
              </div>
              <div style={styles.optionsList}>
                <div style={styles.option}>Swap 5 and 2</div>
                <div style={{ ...styles.option, backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)' }}>✓ Move to next pair</div>
                <div style={styles.option}>Restart from beginning</div>
                <div style={styles.option}>Finish sorting</div>
              </div>
              <div style={styles.aiExplanationBox}>
                <strong>🤖 AI Tutor Explanation</strong>
                <p style={{ margin: '8px 0 0', fontSize: '0.85rem' }}>
                  Bubble Sort compares adjacent elements and swaps them if they're in the wrong order.
                  After comparing 5 and 2, since 5 > 2, we swap them so the larger element "bubbles up".
                </p>
              </div>
            </div>
            <div style={styles.visualizationPanel}>
              <div style={styles.vizHeader}>
                <span>Bubble Sort Visualization</span>
                <span style={styles.stepIndicator}>Step 1/8</span>
              </div>
              <div style={styles.arrayBars}>
                <div style={{ ...styles.bar, height: '30px' }}>5</div>
                <div style={{ ...styles.bar, height: '45px', ...styles.comparingBar }}>2</div>
                <div style={{ ...styles.bar, height: '60px' }}>8</div>
                <div style={{ ...styles.bar, height: '40px' }}>1</div>
                <div style={{ ...styles.bar, height: '75px' }}>9</div>
              </div>
              <div style={styles.pointerIndicator}>
                <span style={{ ...styles.pointer, ...styles.activePointer }}>Comparing (Index 0,1)</span>
                <span style={styles.pointer}>Sorted: None</span>
              </div>
              <div style={{ marginTop: '15px', fontSize: '0.75rem', opacity: 0.7 }}>
                💡 Larger elements "bubble up" to the end
              </div>
            </div>
          </div>
          <div style={styles.previewFooter}>
            <button onClick={handleOpenQuiz} style={styles.launchBtn}>
              Launch Interactive Quiz Platform →
            </button>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Algorithms You'll Master</h2>
          <p style={styles.sectionSubtitle}>
            From basic sorting to advanced graph algorithms
          </p>
        </div>
        <div style={styles.featuresGrid}>
          {algorithms.map((algo, index) => (
            <div key={index} style={{ ...styles.featureCard, textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                {index === 0 && "🫧"}
                {index === 1 && "⚡"}
                {index === 2 && "🔄"}
                {index === 3 && "📝"}
                {index === 4 && "🎯"}
                {index === 5 && "🔍"}
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{algo}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧠</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Ready to Test Your Knowledge?</h2>
        <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.8 }}>
          Join thousands of learners mastering DSA through interactive quizzes
        </p>
        <button onClick={handleOpenQuiz} style={styles.ctaButton}>
          🧠 Start Your Learning Journey →
        </button>
        <p style={{ marginTop: '20px', fontSize: '0.85rem', opacity: 0.6 }}>
          Opens in a new tab · Free to use · No signup required
        </p>
      </section>
    </div>
  );
};

export default DSAQuiz;