// components/RecursionVisualizer.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/RecursionVisualizer.css';

const RecursionVisualizer = ({ step }) => {
  const [depth, setDepth] = useState(0);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [n, setN] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (step) {
      setDepth(step.depth || 0);
      setAction(step.action || '');
      setMessage(step.message || '');
      setN(step.n !== undefined ? step.n : null);
      setResult(step.result !== undefined ? step.result : null);
    }
  }, [step]);

  const renderRecursionTree = () => {
    const levels = [];
    for (let i = 0; i <= depth; i++) {
      levels.push(
        <div key={i} className={`recursion-level ${i === depth ? 'current' : ''}`}>
          <div className="level-label">Depth {i}</div>
          <div className="level-content">
            {i === depth && action === 'call' && `Calculating f(${n})`}
            {i === depth && action === 'base-case' && `Base case: f(${n}) = ${result}`}
            {i === depth && action === 'return' && `Returning f(${n}) = ${result}`}
          </div>
        </div>
      );
    }
    return levels;
  };

  return (
    <div className="recursion-visualizer">
      <div className="recursion-info">
        <h3>Recursion Visualization</h3>
        <p className="message">{message}</p>
      </div>
      
      <div className="recursion-tree">
        {renderRecursionTree()}
      </div>

      {(action === 'return' || action === 'base-case') && result !== null && (
        <div className="result-container">
          <h4>Result:</h4>
          <div className="result-value">{result}</div>
        </div>
      )}

      {step && step.matrix && (
        <div className="matrix-container">
          <h4>Matrix:</h4>
          <div className="matrix">
            {step.matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((cell, colIndex) => (
                  <span
                    key={colIndex}
                    className={`matrix-cell ${rowIndex === step.x && colIndex === step.y ? 'current' : ''}`}
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecursionVisualizer;