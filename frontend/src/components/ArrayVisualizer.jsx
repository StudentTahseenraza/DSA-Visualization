// components/ArrayVisualizer.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZoomPanWrapper from './ZoomPanWrapper';
import '../styles/ArrayVisualizer.css';

const ArrayVisualizer = ({ step, operation, initialArray = [] }) => {
  const [array, setArray] = useState(initialArray);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [operationElements, setOperationElements] = useState([]);
  const [operationInProgress, setOperationInProgress] = useState(false);

  useEffect(() => {
    if (step) {
      if (step.array) setArray(step.array);
      setCurrentIndex(step.index !== undefined ? step.index : null);
      setComparingIndex(step.comparingIndex !== undefined ? step.comparingIndex : null);
      setFoundIndex(step.foundIndex !== undefined ? step.foundIndex : null);
      setAction(step.action || '');
      setMessage(step.message || '');
      
      // Handle highlighted indices for operations like rotation
      if (step.highlightedIndices) {
        setHighlightedIndices(step.highlightedIndices);
      } else {
        setHighlightedIndices([]);
      }
      
      // Handle special operation elements (for insertions, deletions, etc.)
      if (step.operationElement) {
        setOperationElements([step.operationElement]);
        setOperationInProgress(true);
        
        // Clear operation element after animation
        setTimeout(() => {
          setOperationInProgress(false);
          setOperationElements([]);
        }, 800);
      } else {
        setOperationElements([]);
        setOperationInProgress(false);
      }
    }
  }, [step]);

  const getElementClass = (index) => {
    let classes = 'array-element';
    
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

  const getActionClass = () => {
    switch (action) {
      case 'insert':
        return 'action-insert';
      case 'delete':
        return 'action-delete';
      case 'search':
        return 'action-search';
      case 'traverse':
        return 'action-traverse';
      case 'update':
        return 'action-update';
      case 'rotate':
        return 'action-rotate';
      case 'reverse':
        return 'action-reverse';
      case 'push':
        return 'action-push';
      case 'pop':
        return 'action-pop';
      default:
        return '';
    }
  };

  const renderOperationElements = () => {
    return operationElements.map((element, idx) => {
      let positionStyle = {};
      
      // Position the operation element based on the operation type
      if (action === 'insert' || action === 'push') {
        positionStyle = {
          top: '20px',
          left: `${(currentIndex !== null ? currentIndex : array.length) * 70 + 35}px`,
          transform: 'translateX(-50%)'
        };
      } else if (action === 'delete' || action === 'pop') {
        positionStyle = {
          top: '20px',
          left: `${(currentIndex !== null ? currentIndex : array.length - 1) * 70 + 35}px`,
          transform: 'translateX(-50%)'
        };
      }
      
      return (
        <motion.div
          key={idx}
          className="operation-element"
          initial={{ scale: 0, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={positionStyle}
        >
          <div className="operation-value">{element.value}</div>
          <div className="operation-label">{element.action}</div>
        </motion.div>
      );
    });
  };

  const renderArrayElements = () => {
    return array.map((value, index) => (
      <motion.div
        key={index}
        className={getElementClass(index)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <span className="value">{value}</span>
        <span className="index">{index}</span>
      </motion.div>
    ));
  };

  const renderOperationInfo = () => {
    if (action === 'rotate' && step.direction) {
      return (
        <div className="operation-info">
          <span className="direction-icon">
            {step.direction === 'left' ? '↶' : '↷'}
          </span>
          <span className="positions">{step.positions} positions</span>
        </div>
      );
    }

    if (action === 'swap') {
      return (
        <div className="operation-info">
          <span>Swapping positions {step.index1} and {step.index2}</span>
        </div>
      );
    }

    if (action === 'push') {
      return (
        <div className="operation-info">
          <span>Pushing value {step.value} to the end</span>
        </div>
      );
    }

    if (action === 'pop') {
      return (
        <div className="operation-info">
          <span>Popping value {step.value} from the end</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="array-visualizer-container">
      <ZoomPanWrapper>
        <div className={`array-visualizer ${getActionClass()}`}>
          <div className="array-info">
            <h3>Array {operation ? `- ${operation}` : ''}</h3>
            <p className="message">{message}</p>
          </div>
          
          <div className="array-visualization-area">
            <div className="array-container">
              {renderArrayElements()}
            </div>
            
            <AnimatePresence>
              {operationInProgress && renderOperationElements()}
            </AnimatePresence>
            
            <div className="array-base"></div>
          </div>

          {renderOperationInfo()}
        </div>
      </ZoomPanWrapper>
    </div>
  );
};

export default ArrayVisualizer;