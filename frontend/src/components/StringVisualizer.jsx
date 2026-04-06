// components/StringVisualizer.jsx - COMPLETE WORKING VERSION
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/StringVisualizer.css';

const StringVisualizer = ({ step, operation, initialString = '', initialPattern = '' }) => {
  const [string, setString] = useState(initialString);
  const [pattern, setPattern] = useState(initialPattern);
  const [leftIndex, setLeftIndex] = useState(null);
  const [rightIndex, setRightIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [foundIndices, setFoundIndices] = useState([]);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');
  const [reversedString, setReversedString] = useState('');
  const [lpsArray, setLpsArray] = useState([]);
  const [dpTable, setDpTable] = useState(null);
  const [charCountMap, setCharCountMap] = useState({});
  const [matchIndices, setMatchIndices] = useState([]);
  const [windowStart, setWindowStart] = useState(null);
  const [patternIndex, setPatternIndex] = useState(null);
  const [textIndex, setTextIndex] = useState(null);
  const [activeLine, setActiveLine] = useState(null);
  const [activeChar, setActiveChar] = useState(null);

  // Process step data whenever it changes
  useEffect(() => {
    if (!step) return;
    
    console.log('Processing step:', step); // Debug log
    
    // Update string
    if (step.string !== undefined) setString(step.string);
    if (step.string1 !== undefined) setString(step.string1);
    if (step.pattern !== undefined) setPattern(step.pattern);
    
    // Update indices - CRITICAL for visualization
    setLeftIndex(step.leftIndex !== undefined ? step.leftIndex : null);
    setRightIndex(step.rightIndex !== undefined ? step.rightIndex : null);
    setCurrentIndex(step.currentIndex !== undefined ? step.currentIndex : 
                    step.index !== undefined ? step.index : null);
    setComparingIndex(step.comparingIndex !== undefined ? step.comparingIndex :
                      step.j !== undefined ? step.j : null);
    setPatternIndex(step.patternIndex !== undefined ? step.patternIndex :
                    step.j !== undefined ? step.j : 
                    step.patIndex !== undefined ? step.patIndex : null);
    setTextIndex(step.textIndex !== undefined ? step.textIndex :
                 step.i !== undefined ? step.i : 
                 step.strIndex !== undefined ? step.strIndex : null);
    
    // Update results
    if (step.matches) setMatchIndices(step.matches);
    if (step.foundIndex !== undefined) setFoundIndices([step.foundIndex]);
    setWindowStart(step.windowStart !== undefined ? step.windowStart : null);
    
    // Update string operations
    if (step.reversed !== undefined) setReversedString(step.reversed);
    if (step.lps) setLpsArray(step.lps);
    if (step.dpTable || step.dp) setDpTable(step.dpTable || step.dp);
    if (step.charCountMap) setCharCountMap(step.charCountMap);
    
    // Update metadata
    setActiveLine(step.activeLine || null);
    setMessage(step.message || '');
    setAction(step.action || '');
    
    // Trigger active character animation
    if (step.leftIndex !== undefined) {
      setActiveChar(step.leftIndex);
      setTimeout(() => setActiveChar(null), 500);
    }
    if (step.rightIndex !== undefined) {
      setActiveChar(step.rightIndex);
      setTimeout(() => setActiveChar(null), 500);
    }
    
  }, [step]);

  // Helper to determine character class based on current step
  const getCharClass = (index) => {
    let classes = 'char';
    
    // Current pointer
    if (currentIndex === index) {
      classes += ' current';
    }
    
    // Left pointer (for palindrome)
    if (leftIndex === index) {
      classes += ' left-pointer';
    }
    
    // Right pointer (for palindrome)
    if (rightIndex === index) {
      classes += ' right-pointer';
    }
    
    // Comparing/active
    if (comparingIndex === index) {
      classes += ' comparing';
    }
    
    // Text pointer (for KMP/Rabin-Karp)
    if (textIndex === index) {
      classes += ' text-pointer';
    }
    
    // Found matches
    if (foundIndices.includes(index) || 
        matchIndices.some(match => index >= match && index < match + (pattern?.length || 0))) {
      classes += ' found';
    }
    
    // Window highlight (for Rabin-Karp)
    if (windowStart !== null && index >= windowStart && index < windowStart + (pattern?.length || 0)) {
      classes += ' window';
    }
    
    // Active animation
    if (activeChar === index) {
      classes += ' active';
    }
    
    return classes;
  };

  const getPatternCharClass = (index) => {
    let classes = 'pattern-char';
    
    if (patternIndex === index) {
      classes += ' pattern-current';
    }
    
    return classes;
  };

  // Render LPS array for KMP
  const renderLPSArray = () => {
    if (!lpsArray || lpsArray.length === 0) return null;
    
    return (
      <motion.div 
        className="lps-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4>🔧 LPS Array (Longest Prefix Suffix)</h4>
        <div className="lps-array">
          {lpsArray.map((value, index) => (
            <motion.div
              key={index}
              className={`lps-value ${patternIndex === index ? 'lps-current' : ''}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="lps-number">{value}</span>
              <span className="lps-index">{index}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render comparison info for palindrome
  const renderComparisonInfo = () => {
    if (action === 'compare' && leftIndex !== null && rightIndex !== null && string[leftIndex] && string[rightIndex]) {
      const isMatch = string[leftIndex] === string[rightIndex];
      return (
        <motion.div 
          className={`comparison-info ${isMatch ? 'match-success' : 'match-failure'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="comparison-arrow">
            <motion.span 
              className="left-char"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: isMatch ? 2 : 0 }}
            >
              '{string[leftIndex]}'
            </motion.span>
            <span className="arrow">{isMatch ? '✓' : '✗'}</span>
            <motion.span 
              className="right-char"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: isMatch ? 2 : 0, delay: 0.25 }}
            >
              '{string[rightIndex]}'
            </motion.span>
          </div>
          <div className="comparison-detail">
            {isMatch ? '✓ Characters match!' : '✗ Characters do not match!'}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  // Render reverse operation display
  const renderReverseDisplay = () => {
    if (reversedString && action !== 'reverse-step') {
      return (
        <motion.div 
          className="reverse-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="reverse-original">
            <strong>Original:</strong> {string}
          </div>
          <div className="reverse-result">
            <strong>Reversed:</strong> 
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {reversedString}
            </motion.span>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  // Render character count map for anagram
  const renderCharCountMap = () => {
    if (Object.keys(charCountMap).length === 0) return null;
    
    return (
      <motion.div 
        className="char-count-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4>📈 Character Frequency</h4>
        <div className="char-count-grid">
          {Object.entries(charCountMap).map(([char, count]) => (
            <div key={char} className="char-count-item">
              <span className="char-display">{char}</span>
              <span className="count-display">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="string-visualizer-container">
      <div className="string-visualizer">
        {/* Header with step message */}
        <div className="string-info">
          <h3>{operation ? operation.toUpperCase().replace(/([A-Z])/g, ' $1').trim() : 'String Operation'}</h3>
          <motion.p 
            className="message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={message}
          >
            {message || 'Ready to visualize'}
          </motion.p>
          {activeLine !== null && (
            <div className="active-line-badge">Line {activeLine}</div>
          )}
        </div>

        {/* Main String Display */}
        <div className="string-container">
          <AnimatePresence>
            {string.split('').map((char, index) => (
              <motion.div
                key={index}
                className={getCharClass(index)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                layout
              >
                {char}
                <span className="char-index">{index}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pointer Indicators */}
        {(leftIndex !== null || rightIndex !== null || textIndex !== null) && (
          <div className="pointer-indicators">
            {leftIndex !== null && (
              <div className="pointer left-pointer-label" style={{ left: `${(leftIndex / string.length) * 100}%` }}>
                <span className="pointer-arrow">↓</span>
                <span className="pointer-text">left = {leftIndex}</span>
              </div>
            )}
            {rightIndex !== null && (
              <div className="pointer right-pointer-label" style={{ left: `${(rightIndex / string.length) * 100}%` }}>
                <span className="pointer-arrow">↓</span>
                <span className="pointer-text">right = {rightIndex}</span>
              </div>
            )}
            {textIndex !== null && (
              <div className="pointer text-pointer-label" style={{ left: `${(textIndex / string.length) * 100}%` }}>
                <span className="pointer-arrow">↓</span>
                <span className="pointer-text">i = {textIndex}</span>
              </div>
            )}
          </div>
        )}

        {/* Pattern Display for Search Algorithms */}
        {pattern && (
          <div className="pattern-container">
            <h4>🔍 Pattern: {pattern}</h4>
            <div className="pattern-string">
              {pattern.split('').map((char, index) => (
                <motion.div
                  key={index}
                  className={getPatternCharClass(index)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {char}
                  <span className="pattern-index">{index}</span>
                </motion.div>
              ))}
            </div>
            {patternIndex !== null && (
              <div className="pattern-pointer" style={{ left: `${(patternIndex / pattern.length) * 100}%` }}>
                <span className="pointer-arrow">↑</span>
                <span className="pointer-text">j = {patternIndex}</span>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Content */}
        {renderLPSArray()}
        {renderComparisonInfo()}
        {renderReverseDisplay()}
        {renderCharCountMap()}

        {/* Match Summary */}
        {matchIndices.length > 0 && action === 'kmp-complete' && (
          <motion.div 
            className="match-summary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🎯 Found at positions: {matchIndices.join(', ')}
          </motion.div>
        )}

        {action === 'palindrome' && (
          <motion.div 
            className="success-message"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            ✅ String is a palindrome!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StringVisualizer;