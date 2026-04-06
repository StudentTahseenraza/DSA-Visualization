// components/StringResultPanel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/StringResultPanel.css';

const StringResultPanel = ({ 
  result, 
  complexity, 
  explanation, 
  optimizationTips, 
  realWorldUseCases,
  codeSnippets,
  operation 
}) => {
  const [activeTab, setActiveTab] = useState('result');
  const [activeLanguage, setActiveLanguage] = useState('javascript');

  if (!result) return null;

  const tabs = [
    { id: 'result', label: '📊 Result', icon: '📊' },
    { id: 'complexity', label: '⏱️ Complexity', icon: '⏱️' },
    { id: 'explanation', label: '📖 Explanation', icon: '📖' },
    { id: 'optimization', label: '💡 Tips', icon: '💡' },
    { id: 'usecases', label: '🌍 Use Cases', icon: '🌍' },
    { id: 'code', label: '💻 Code', icon: '💻' }
  ];

  const languages = [
    { id: 'javascript', label: 'JavaScript', icon: '🟨' },
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'cpp', label: 'C++', icon: '⚙️' }
  ];

  const renderResultContent = () => {
    switch (operation) {
      case "reverse":
        return (
          <div className="result-detail">
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">Original String:</span>
                <span className="result-value original-value">"{result.original}"</span>
              </div>
              <motion.div 
                className="result-item highlight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <span className="result-label">Reversed String:</span>
                <span className="result-value reversed-value">"{result.reversed}"</span>
              </motion.div>
              <div className="result-item">
                <span className="result-label">Length:</span>
                <span className="result-value">{result.length} characters</span>
              </div>
            </div>
          </div>
        );
      
      case "checkPalindrome":
        return (
          <div className="result-detail">
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">String:</span>
                <span className="result-value">"{result.string}"</span>
              </div>
              <motion.div 
                className={`result-item ${result.isPalindrome ? 'success' : 'failure'}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <span className="result-label">Is Palindrome:</span>
                <span className="result-value">
                  {result.isPalindrome ? '✅ Yes' : '❌ No'}
                </span>
              </motion.div>
              <div className="result-item">
                <span className="result-label">Comparisons Made:</span>
                <span className="result-value">{result.comparisons}</span>
              </div>
            </div>
          </div>
        );
      
      case "kmpSearch":
      case "rabinKarpSearch":
        const isKMP = operation === "kmpSearch";
        return (
          <div className="result-detail">
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">Text:</span>
                <span className="result-value">"{result.text}"</span>
              </div>
              <div className="result-item">
                <span className="result-label">Pattern:</span>
                <span className="result-value pattern-value">"{result.pattern}"</span>
              </div>
              <motion.div 
                className={`result-item ${result.matchCount > 0 ? 'success' : 'failure'}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <span className="result-label">Matches Found:</span>
                <span className="result-value">{result.matchCount}</span>
              </motion.div>
              {result.matchCount > 0 && (
                <motion.div 
                  className="result-item matches-list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="result-label">Positions:</span>
                  <div className="position-badges">
                    {result.matches.map((pos, idx) => (
                      <motion.span 
                        key={idx}
                        className="position-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                      >
                        {pos}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              <div className="result-item">
                <span className="result-label">Algorithm:</span>
                <span className="result-value algorithm-badge">{isKMP ? 'Knuth-Morris-Pratt' : 'Rabin-Karp'}</span>
              </div>
            </div>
          </div>
        );
      
      case "longestCommonSubstring":
        return (
          <div className="result-detail">
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">String 1:</span>
                <span className="result-value">"{result.string1}"</span>
              </div>
              <div className="result-item">
                <span className="result-label">String 2:</span>
                <span className="result-value">"{result.string2}"</span>
              </div>
              <motion.div 
                className="result-item highlight"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <span className="result-label">Longest Common Substring:</span>
                <span className="result-value lcs-value">"{result.longestCommonSubstring}"</span>
              </motion.div>
              <div className="result-item">
                <span className="result-label">Length:</span>
                <span className="result-value">{result.length}</span>
              </div>
            </div>
          </div>
        );
      
      case "checkAnagram":
        return (
          <div className="result-detail">
            <div className="result-card">
              <div className="result-item">
                <span className="result-label">String 1:</span>
                <span className="result-value">"{result.string1}"</span>
              </div>
              <div className="result-item">
                <span className="result-label">String 2:</span>
                <span className="result-value">"{result.string2}"</span>
              </div>
              <motion.div 
                className={`result-item ${result.isAnagram ? 'success' : 'failure'}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <span className="result-label">Are Anagrams:</span>
                <span className="result-value">
                  {result.isAnagram ? '✅ Yes' : '❌ No'}
                </span>
              </motion.div>
              {!result.isAnagram && result.reason && (
                <div className="result-item">
                  <span className="result-label">Reason:</span>
                  <span className="result-value">{result.reason}</span>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return <div>Result data not available</div>;
    }
  };

  const renderComplexityContent = () => {
    if (!complexity) return null;
    
    return (
      <div className="complexity-content">
        <div className="complexity-card">
          <div className="complexity-item time-complexity">
            <div className="complexity-header">
              <span className="complexity-icon">⏱️</span>
              <h4>Time Complexity</h4>
            </div>
            <div className="complexity-body">
              <code className="complexity-big-o">{complexity.time}</code>
              <p className="complexity-explanation">{complexity.explanation}</p>
            </div>
          </div>
          <div className="complexity-item space-complexity">
            <div className="complexity-header">
              <span className="complexity-icon">💾</span>
              <h4>Space Complexity</h4>
            </div>
            <div className="complexity-body">
              <code className="complexity-big-o">{complexity.space}</code>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExplanationContent = () => {
    if (!explanation) return null;
    
    return (
      <div className="explanation-content">
        <div className="explanation-card">
          <p>{explanation}</p>
        </div>
      </div>
    );
  };

  const renderOptimizationContent = () => {
    if (!optimizationTips || optimizationTips.length === 0) return null;
    
    return (
      <div className="optimization-content">
        <div className="optimization-list">
          {optimizationTips.map((tip, index) => (
            <motion.li 
              key={index}
              className="optimization-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="tip-icon">💡</span>
              <span className="tip-text">{tip}</span>
            </motion.li>
          ))}
        </div>
      </div>
    );
  };

  const renderUseCasesContent = () => {
    if (!realWorldUseCases || realWorldUseCases.length === 0) return null;
    
    return (
      <div className="usecases-content">
        <div className="usecases-grid">
          {realWorldUseCases.map((useCase, index) => (
            <motion.div 
              key={index}
              className="usecase-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <span className="usecase-icon">🌍</span>
              <span className="usecase-text">{useCase}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderCodeContent = () => {
    if (!codeSnippets) return null;
    
    const currentCode = codeSnippets[activeLanguage];
    
    return (
      <div className="code-content">
        <div className="language-tabs">
          {languages.map(lang => (
            <button
              key={lang.id}
              className={`language-tab ${activeLanguage === lang.id ? 'active' : ''}`}
              onClick={() => setActiveLanguage(lang.id)}
            >
              <span className="lang-icon">{lang.icon}</span>
              <span className="lang-label">{lang.label}</span>
            </button>
          ))}
        </div>
        <motion.div 
          className="code-block"
          key={activeLanguage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <pre>
            <code className={`language-${activeLanguage}`}>
              {currentCode}
            </code>
          </pre>
        </motion.div>
        <div className="code-note">
          <small>💡 Tip: Click on code lines to copy to clipboard</small>
        </div>
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'result':
        return renderResultContent();
      case 'complexity':
        return renderComplexityContent();
      case 'explanation':
        return renderExplanationContent();
      case 'optimization':
        return renderOptimizationContent();
      case 'usecases':
        return renderUseCasesContent();
      case 'code':
        return renderCodeContent();
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="string-result-panel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="result-header">
        <h3>📊 Analysis Dashboard</h3>
        <div className="result-badge">{operation.toUpperCase()}</div>
      </div>

      <div className="result-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`result-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          className="result-content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveTabContent()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default StringResultPanel;