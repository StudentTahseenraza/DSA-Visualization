// components/QueueVisualizer.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/QueueVisualizer.css';

const QueueVisualizer = ({ step }) => {
  const [queue, setQueue] = useState([]);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(null);
  const [animatingValue, setAnimatingValue] = useState(null);

  useEffect(() => {
    if (step) {
      setQueue(step.queue || []);
      setAction(step.action || '');
      setMessage(step.message || '');
      setValue(step.value !== undefined ? step.value : null);
      
      // Handle animation states
      if (step.action === 'enqueue-start' && step.value) {
        setAnimatingValue(step.value);
        setTimeout(() => setAnimatingValue(null), 500);
      }
    }
  }, [step]);

  return (
    <div className="queue-visualizer">
      <div className="queue-info">
        <h3>Queue Operations</h3>
        <p className="message">{message}</p>
      </div>
      
      <div className="queue-visualization-container">
        {/* Queue representation */}
        <div className="queue-frame">
          <div className="queue-header">QUEUE</div>
          
          <div className="queue-container">
            <div className="queue-front-indicator">
              <span className="indicator-label">FRONT</span>
              <span className="indicator-arrow">↓</span>
            </div>
            
            <div className="queue-items-container">
              <AnimatePresence mode="popLayout">
                {queue.length === 0 ? (
                  <motion.div 
                    className="queue-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Queue is empty
                  </motion.div>
                ) : (
                  queue.map((item, index) => {
                    const isFront = index === 0;
                    const isRear = index === queue.length - 1;
                    
                    return (
                      <motion.div
                        key={`${item}-${index}-${queue.length}`}
                        className={`queue-item ${isFront ? 'front' : ''} ${isRear ? 'rear' : ''}`}
                        initial={{ 
                          x: action === 'enqueue' && isRear ? 100 : 0,
                          opacity: action === 'enqueue' && isRear ? 0 : 1,
                          scale: action === 'enqueue' && isRear ? 0.8 : 1
                        }}
                        animate={{ 
                          x: 0, 
                          opacity: 1,
                          scale: 1
                        }}
                        exit={{
                          x: -100,
                          opacity: 0,
                          scale: 0.8
                        }}
                        transition={{ 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }}
                        layout
                      >
                        <span className="queue-item-value">{item}</span>
                        {isFront && (
                          <motion.span 
                            className="queue-front-label"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            FRONT
                          </motion.span>
                        )}
                        {isRear && (
                          <motion.span 
                            className="queue-rear-label"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            REAR
                          </motion.span>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
            
            <div className="queue-rear-indicator">
              <span className="indicator-label">REAR</span>
              <span className="indicator-arrow">↓</span>
            </div>
          </div>
        </div>

        {/* Animating value that flies into queue */}
        <AnimatePresence>
          {animatingValue !== null && action === 'enqueue-start' && (
            <motion.div
              className="floating-value"
              initial={{ 
                x: 200, 
                y: -50, 
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
        {value !== null && (action === 'enqueue' || action === 'dequeue' || action === 'front') && (
          <motion.div 
            className="operation-value-container"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {action === 'enqueue' && (
              <div className="enqueue-value">
                <span className="operation-icon">➕</span>
                <span>Enqueued: <strong>{value}</strong></span>
              </div>
            )}
            {action === 'dequeue' && (
              <div className="dequeue-value">
                <span className="operation-icon">➖</span>
                <span>Dequeued: <strong>{value}</strong></span>
              </div>
            )}
            {action === 'front' && (
              <div className="front-value">
                <span className="operation-icon">👁️</span>
                <span>Front element: <strong>{value}</strong></span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Queue information */}
      <div className="queue-info-panel">
        <div className="info-item">
          <span className="info-label">Queue Size:</span>
          <span className="info-value">{queue.length}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Front Index:</span>
          <span className="info-value">{queue.length > 0 ? 0 : -1}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Rear Index:</span>
          <span className="info-value">{queue.length > 0 ? queue.length - 1 : -1}</span>
        </div>
      </div>

      {/* Additional content for complex operations */}
      {step && step.visited && (
        <motion.div 
          className="visited-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4>Visited Nodes:</h4>
          <div className="visited-nodes">
            {Object.entries(step.visited).map(([node, visited]) => (
              visited && (
                <span key={node} className="visited-node">
                  {node}
                </span>
              )
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QueueVisualizer;