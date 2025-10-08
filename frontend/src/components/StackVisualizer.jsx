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

  useEffect(() => {
    if (step) {
      setStack(step.stack || []);
      setAction(step.action || '');
      setMessage(step.message || '');
      setValue(step.value !== undefined ? step.value : null);
      setHighlightIndex(step.highlightIndex !== undefined ? step.highlightIndex : -1);
    }
  }, [step]);

  return (
    <div className="stack-visualizer">
      <div className="stack-info">
        <h3>Stack Operations</h3>
        <p className="message">{message}</p>
      </div>
      
      <div className="stack-container">
        <div className="stack-base">Base</div>
        <div className="stack-items">
          <AnimatePresence>
            {stack.length === 0 ? (
              <div className="stack-empty">Stack is empty</div>
            ) : (
              stack.map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  className={`stack-item ${
                    index === stack.length - 1 ? 'top' : ''
                  } ${
                    highlightIndex === index ? 'highlight' : ''
                  }`}
                  initial={{ 
                    y: action === 'push' && index === stack.length - 1 ? -100 : 0,
                    opacity: action === 'push' && index === stack.length - 1 ? 0 : 1,
                    scale: action === 'push' && index === stack.length - 1 ? 0.8 : 1
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{
                    y: -100,
                    opacity: 0,
                    scale: 0.8
                  }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120
                  }}
                  layout
                >
                  <div className="stack-item-content">
                    <span className="stack-item-value">{item}</span>
                    {index === stack.length - 1 && (
                      <span className="stack-top-label">TOP</span>
                    )}
                  </div>
                  <div className="stack-pointer">
                    {index === stack.length - 1 && (
                      <div className="top-pointer">↑</div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <div className="stack-pointer-container">
          <div className="stack-pointer-label">Stack Pointer</div>
          <div className="stack-pointer-arrow">↑</div>
          <div className="stack-pointer-position">
            {stack.length > 0 ? stack.length - 1 : -1}
          </div>
        </div>
      </div>

      {value !== null && (
        <div className="operation-value">
          {action === 'push' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="push-value"
            >
              Pushing: <strong>{value}</strong>
            </motion.div>
          )}
          {action === 'pop' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="pop-value"
            >
              Popped: <strong>{value}</strong>
            </motion.div>
          )}
        </div>
      )}

      {step && step.output && (
        <div className="output-container">
          <h4>Output:</h4>
          <div className="output">
            {step.output.join(' ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default StackVisualizer;