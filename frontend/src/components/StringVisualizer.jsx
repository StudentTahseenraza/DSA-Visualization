// components/StringVisualizer.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ZoomPanWrapper from './ZoomPanWrapper';
import '../styles/StringVisualizer.css';

const StringVisualizer = ({ step, operation, initialString = '' }) => {
  const [string, setString] = useState(initialString);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [pattern, setPattern] = useState('');
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [lpsArray, setLpsArray] = useState([]);

  useEffect(() => {
    if (step) {
      if (step.string !== undefined) setString(step.string);
      setCurrentIndex(step.index !== undefined ? step.index : null);
      setComparingIndex(step.comparingIndex !== undefined ? step.comparingIndex : null);
      setFoundIndex(step.foundIndex !== undefined ? step.foundIndex : null);
      setPattern(step.pattern || '');
      setAction(step.action || '');
      setMessage(step.message || '');
      
      if (step.highlightedIndices) {
        setHighlightedIndices(step.highlightedIndices);
      } else {
        setHighlightedIndices([]);
      }
      
      if (step.lps) {
        setLpsArray(step.lps);
      }
    }
  }, [step]);

  const getCharClass = (index) => {
    let classes = 'char';
    
    if (index === currentIndex) {
      classes += ' current';
    }
    if (index === comparingIndex) {
      classes += ' comparing';
    }
    if (index === foundIndex) {
      classes += ' found';
    }
    if (highlightedIndices.includes(index)) {
      classes += ' highlighted';
    }
    
    return classes;
  };

  return (
    <div className="string-visualizer-container">
      <ZoomPanWrapper>
        <div className="string-visualizer">
          <div className="string-info">
            <h3>String {operation ? `- ${operation}` : ''}</h3>
            <p className="message">{message}</p>
          </div>
          
          <div className="string-container">
            {string.split('').map((char, index) => (
              <motion.div
                key={index}
                className={getCharClass(index)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                layout
              >
                {char}
                <span className="char-index">{index}</span>
              </motion.div>
            ))}
          </div>

          {pattern && (
            <div className="pattern-container">
              <h4>Pattern: {pattern}</h4>
              <div className="pattern-string">
                {pattern.split('').map((char, index) => (
                  <span key={index} className="pattern-char">
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {lpsArray.length > 0 && (
            <div className="lps-container">
              <h4>LPS Array:</h4>
              <div className="lps-array">
                {lpsArray.map((value, index) => (
                  <div key={index} className="lps-value">
                    <span className="lps-number">{value}</span>
                    <span className="lps-index">{index}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {action === 'compare' && step.leftIndex !== undefined && (
            <div className="comparison-info">
              Comparing indices {step.leftIndex} and {step.rightIndex}
            </div>
          )}
        </div>
      </ZoomPanWrapper>
    </div>
  );
};

export default StringVisualizer;