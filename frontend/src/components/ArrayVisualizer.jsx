// components/ArrayVisualizer.jsx - UPDATED with enhanced animations
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [insertingValue, setInsertingValue] = useState(null);
  const [insertingIndex, setInsertingIndex] = useState(null);
  const [pushingValue, setPushingValue] = useState(null);
  const [poppingValue, setPoppingValue] = useState(null);
  
  // Enhanced animation states
  const [swappingIndices, setSwappingIndices] = useState(null);
  const [movingElement, setMovingElement] = useState(null);
  const [rotatingElements, setRotatingElements] = useState([]);
  const [shiftDirection, setShiftDirection] = useState(null);
  
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (step) {
      // Update array
      if (step.array) {
        setArray(step.array);
      }
      
      // Handle different operation types with enhanced animations
      if (step.action === 'delete' && step.index !== undefined) {
        // Enhanced delete animation
        setDeletingIndex(step.index);
        setTimeout(() => {
          setDeletingIndex(null);
        }, 500);
      }
      
      if (step.action === 'insert' && step.value !== undefined && step.index !== undefined) {
        // Enhanced insert animation with position
        setInsertingValue(step.value);
        setInsertingIndex(step.index);
        setShiftDirection('right');
        setTimeout(() => {
          setInsertingValue(null);
          setInsertingIndex(null);
          setShiftDirection(null);
        }, 500);
      }
      
      // Handle swap animation for reverse operation
      if (step.action === 'swap' && step.index1 !== undefined && step.index2 !== undefined) {
        setSwappingIndices({ from: step.index1, to: step.index2 });
        setTimeout(() => {
          setSwappingIndices(null);
        }, 500);
      }
      
      // Handle rotate step animation
      if (step.action === 'rotate-step' && step.direction && step.value !== undefined) {
        setRotatingElements([{ value: step.value, direction: step.direction, step: step.step }]);
        setTimeout(() => {
          setRotatingElements([]);
        }, 400);
      }
      
      if (step.action === 'push' && step.value !== undefined) {
        setPushingValue(step.value);
        setTimeout(() => {
          setPushingValue(null);
        }, 500);
      }
      
      if (step.action === 'pop' && step.value !== undefined) {
        setPoppingValue(step.value);
        setTimeout(() => {
          setPoppingValue(null);
        }, 500);
      }
      
      setCurrentIndex(step.index !== undefined ? step.index : null);
      setComparingIndex(step.comparingIndex !== undefined ? step.comparingIndex : null);
      setFoundIndex(step.foundIndex !== undefined ? step.foundIndex : null);
      setAction(step.action || '');
      setMessage(step.message || '');
      
      if (step.highlightedIndices) {
        setHighlightedIndices(step.highlightedIndices);
      } else {
        setHighlightedIndices([]);
      }
      
      if (step.operationElement) {
        setOperationElements([step.operationElement]);
        setOperationInProgress(true);
        
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

  // Scroll to show current element when traversing
  useEffect(() => {
    if (currentIndex !== null && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = container.querySelector(`.array-element-${currentIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

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
    if (deletingIndex === index) {
      classes += ' deleting';
    }
    if (insertingIndex === index) {
      classes += ' inserting';
    }
    if (swappingIndices && (index === swappingIndices.from || index === swappingIndices.to)) {
      classes += ' swapping';
    }
    if (rotatingElements.length > 0 && rotatingElements[0].value === array[index]) {
      classes += ' rotating';
    }
    
    return classes;
  };

  const getElementAnimation = (index) => {
    // Enhanced animations for moving elements
    if (swappingIndices) {
      if (index === swappingIndices.from) {
        return {
          initial: { x: 0 },
          animate: { x: (swappingIndices.to - swappingIndices.from) * 70 },
          transition: { duration: 0.4, ease: "easeInOut" }
        };
      }
      if (index === swappingIndices.to) {
        return {
          initial: { x: 0 },
          animate: { x: (swappingIndices.from - swappingIndices.to) * 70 },
          transition: { duration: 0.4, ease: "easeInOut" }
        };
      }
    }
    
    if (shiftDirection === 'right' && index > insertingIndex) {
      return {
        initial: { x: -70 },
        animate: { x: 0 },
        transition: { duration: 0.3, delay: (index - insertingIndex) * 0.05 }
      };
    }
    
    if (shiftDirection === 'left' && index >= deletingIndex) {
      return {
        initial: { x: 70 },
        animate: { x: 0 },
        transition: { duration: 0.3, delay: (index - deletingIndex) * 0.05 }
      };
    }
    
    return null;
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
      case 'swap':
        return 'action-swap';
      default:
        return '';
    }
  };

  const renderOperationElements = () => {
    return operationElements.map((element, idx) => {
      let positionStyle = {};
      
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

  // Render rotating element animation for rotate operation
  const renderRotatingElements = () => {
    return rotatingElements.map((elem, idx) => (
      <motion.div
        key={idx}
        className="operation-element rotating-element"
        initial={{ x: elem.direction === 'left' ? 0 : 0, opacity: 1 }}
        animate={{ 
          x: elem.direction === 'left' ? -70 : 70,
          opacity: 0 
        }}
        transition={{ duration: 0.4 }}
        style={{
          top: '20px',
          left: elem.direction === 'left' ? '0px' : `${(array.length - 1) * 70}px`,
          position: 'absolute'
        }}
      >
        <div className="operation-value">{elem.value}</div>
        <div className="operation-label">Moving</div>
      </motion.div>
    ));
  };

  const renderPushingElement = () => {
    if (!pushingValue) return null;
    return (
      <motion.div
        className="operation-element push-element"
        initial={{ scale: 0, opacity: 0, x: 100 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          top: '20px',
          right: '0',
          position: 'absolute'
        }}
      >
        <div className="operation-value">{pushingValue}</div>
        <div className="operation-label">Push</div>
      </motion.div>
    );
  };

  const renderPoppingElement = () => {
    if (!poppingValue) return null;
    return (
      <motion.div
        className="operation-element pop-element"
        initial={{ scale: 1, opacity: 1, x: 0 }}
        animate={{ scale: 0, opacity: 0, x: 100 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          top: '20px',
          right: '0',
          position: 'absolute'
        }}
      >
        <div className="operation-value">{poppingValue}</div>
        <div className="operation-label">Pop</div>
      </motion.div>
    );
  };

  const renderArrayElements = () => {
    return array.map((value, index) => {
      const animation = getElementAnimation(index);
      
      return (
        <motion.div
          key={`${index}-${value}`}
          className={`${getElementClass(index)} array-element-${index}`}
          initial={animation?.initial || { scale: 0, opacity: 0 }}
          animate={animation?.animate || { scale: 1, opacity: 1 }}
          transition={animation?.transition || { duration: 0.3, delay: index * 0.02 }}
          layout
        >
          <span className="value">{value}</span>
          <span className="index">{index}</span>
        </motion.div>
      );
    });
  };

  const renderOperationInfo = () => {
    if (action === 'rotate' && step?.direction) {
      return (
        <div className="operation-info">
          <span className="direction-icon">
            {step.direction === 'left' ? '↶' : '↷'}
          </span>
          <span className="positions">{step.positions} positions</span>
          {step.step && <span className="step-info">Step {step.step} of {step.positions}</span>}
        </div>
      );
    }

    if (action === 'swap') {
      return (
        <div className="operation-info">
          <span>🔄 Swapping positions {step?.index1} and {step?.index2}</span>
          <span className="swap-animation">Values: {step?.value1} ↔ {step?.value2}</span>
        </div>
      );
    }

    if (action === 'push') {
      return (
        <div className="operation-info">
          <span>📥 Pushing value {step?.value} to the end</span>
        </div>
      );
    }

    if (action === 'pop') {
      return (
        <div className="operation-info">
          <span>📤 Popping value {step?.value} from the end</span>
        </div>
      );
    }

    if (action === 'insert' && insertingValue) {
      return (
        <div className="operation-info">
          <span>✨ Inserting {insertingValue} at position {insertingIndex}</span>
          <span className="shift-info">Shifting elements right...</span>
        </div>
      );
    }

    if (action === 'delete' && deletingIndex !== null) {
      return (
        <div className="operation-info">
          <span>🗑️ Deleting element at position {deletingIndex}</span>
          <span className="shift-info">Shifting elements left...</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`array-visualizer-container ${getActionClass()}`}>
      <div className="array-info">
        <h3>Array Visualization</h3>
        <p className="message">{message || 'Ready for operations'}</p>
      </div>
      
      <div className="array-scroll-container" ref={scrollContainerRef}>
        <div className="array-visualization-area">
          <div className="array-container">
            {renderArrayElements()}
          </div>
          
          <AnimatePresence>
            {operationInProgress && renderOperationElements()}
            {pushingValue && renderPushingElement()}
            {poppingValue && renderPoppingElement()}
            {renderRotatingElements()}
          </AnimatePresence>
          
          <div className="array-base"></div>
        </div>
      </div>

      {renderOperationInfo()}

      <div className="array-footer">
        <div className="array-stats">
          <span>Size: {array.length}</span>
          {array.length > 0 && (
            <>
              <span>Min: {Math.min(...array)}</span>
              <span>Max: {Math.max(...array)}</span>
              <span>Sum: {array.reduce((a, b) => a + b, 0)}</span>
              <span>Avg: {(array.reduce((a, b) => a + b, 0) / array.length).toFixed(1)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;