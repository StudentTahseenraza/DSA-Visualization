// components/QueueVisualizer.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/QueueVisualizer.css';

const QueueVisualizer = ({ step }) => {
  const [queue, setQueue] = useState([]);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (step) {
      setQueue(step.queue || []);
      setAction(step.action || '');
      setMessage(step.message || '');
      setValue(step.value !== undefined ? step.value : null);
    }
  }, [step]);

  return (
    <div className="queue-visualizer">
      <div className="queue-info">
        <h3>Queue Operations</h3>
        <p className="message">{message}</p>
      </div>
      
      <div className="queue-container">
        <div className="queue-front">Front</div>
        <div className="queue-items">
          {queue.length === 0 ? (
            <div className="queue-empty">Queue is empty</div>
          ) : (
            queue.map((item, index) => (
              <motion.div
                key={index}
                className={`queue-item ${index === 0 ? 'front' : ''} ${index === queue.length - 1 ? 'rear' : ''}`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.div>
            ))
          )}
        </div>
        <div className="queue-rear">Rear</div>
      </div>

      {value !== null && (
        <div className="operation-value">
          {action === 'enqueue' && `Enqueuing: ${value}`}
          {action === 'dequeue' && `Dequeued: ${value}`}
        </div>
      )}

      {step && step.visited && (
        <div className="visited-container">
          <h4>Visited Nodes:</h4>
          <div className="visited-nodes">
            {Object.entries(step.visited).map(([node, visited]) => (
              visited && <span key={node} className="visited-node">{node}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueVisualizer;