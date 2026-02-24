// components/StackVisualizer.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/StackVisualizer.css';

const StackVisualizer = ({ step }) => {
  const [stack, setStack] = useState([]);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [animatingValue, setAnimatingValue] = useState(null);

  useEffect(() => {
    if (step) {
      setStack(step.stack || []);
      setAction(step.action || '');
      setMessage(step.message || '');
      setValue(step.value !== undefined ? step.value : null);
      setHighlightIndex(step.highlightIndex !== undefined ? step.highlightIndex : -1);
      
      // Handle animation states
      if (step.action === 'push-start' && step.value) {
        setAnimatingValue(step.value);
        setTimeout(() => setAnimatingValue(null), 500);
      }
    }
  }, [step]);

  // Get stack container height based on number of elements
  const getStackHeight = () => {
    const baseHeight = 60; // Height per element
    return Math.max(200, stack.length * baseHeight + 40);
  };

  return (
    <div className="stack-visualizer">
      <div className="stack-info">
        <h3>Stack Operations</h3>
        <p className="message">{message}</p>
      </div>
      
      <div className="stack-visualization-container">
        {/* Stack representation */}
        <div className="stack-frame">
          <div className="stack-header">STACK</div>
          <div 
            className="stack-container" 
            style={{ height: `${getStackHeight()}px` }}
          >
            <div className="stack-base">Base</div>
            
            <div className="stack-items-wrapper">
              <AnimatePresence mode="popLayout">
                {stack.length === 0 ? (
                  <motion.div 
                    className="stack-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Stack is empty
                  </motion.div>
                ) : (
                  stack.map((item, index) => {
                    const isTop = index === stack.length - 1;
                    const isHighlighted = highlightIndex === index;
                    
                    return (
                      <motion.div
                        key={`${item}-${index}-${stack.length}`}
                        className={`stack-item ${isTop ? 'top' : ''} ${isHighlighted ? 'highlight' : ''}`}
                        initial={{ 
                          y: action === 'push' && isTop ? 100 : 0,
                          opacity: action === 'push' && isTop ? 0 : 1,
                          scale: action === 'push' && isTop ? 0.8 : 1,
                          x: action === 'pop' && isTop ? 100 : 0
                        }}
                        animate={{ 
                          y: 0, 
                          opacity: 1,
                          scale: 1,
                          x: 0
                        }}
                        exit={{
                          y: -100,
                          opacity: 0,
                          scale: 0.8,
                          x: action === 'pop' && isTop ? 100 : 0
                        }}
                        transition={{ 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }}
                        layout
                      >
                        <div className="stack-item-content">
                          <span className="stack-item-value">{item}</span>
                          {isTop && (
                            <motion.span 
                              className="stack-top-label"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              TOP
                            </motion.span>
                          )}
                        </div>
                        
                        {isTop && (
                          <motion.div 
                            className="top-pointer"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="pointer-arrow">↑</div>
                            <div className="pointer-label">Stack Pointer</div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
            
            <div className="stack-footer"></div>
          </div>
        </div>

        {/* Animating value that flies into stack */}
        <AnimatePresence>
          {animatingValue !== null && action === 'push-start' && (
            <motion.div
              className="floating-value"
              initial={{ 
                x: -200, 
                y: -100, 
                opacity: 1,
                scale: 1.2
              }}
              animate={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0.8
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="floating-value-content">
                {animatingValue}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Operation value display */}
        {value !== null && (action === 'push' || action === 'pop' || action === 'peek') && (
          <motion.div 
            className="operation-value-container"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {action === 'push' && (
              <div className="push-value">
                <span className="operation-icon">➕</span>
                <span>Pushed: <strong>{value}</strong></span>
              </div>
            )}
            {action === 'pop' && (
              <div className="pop-value">
                <span className="operation-icon">➖</span>
                <span>Popped: <strong>{value}</strong></span>
              </div>
            )}
            {action === 'peek' && (
              <div className="peek-value">
                <span className="operation-icon">👁️</span>
                <span>Top element: <strong>{value}</strong></span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Stack pointer position indicator */}
      <div className="stack-pointer-info">
        <div className="pointer-info-item">
          <span className="info-label">Stack Size:</span>
          <span className="info-value">{stack.length}</span>
        </div>
        <div className="pointer-info-item">
          <span className="info-label">Top Index:</span>
          <span className="info-value">{stack.length > 0 ? stack.length - 1 : -1}</span>
        </div>
        <div className="pointer-info-item">
          <span className="info-label">Stack Pointer:</span>
          <span className="info-value">SP → {stack.length > 0 ? `position ${stack.length - 1}` : 'null'}</span>
        </div>
      </div>

      {/* Output display for conversions */}
      {step && step.output && (
        <motion.div 
          className="output-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Output:</h4>
          <div className="output">
            {step.output.join(' ')}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StackVisualizer;