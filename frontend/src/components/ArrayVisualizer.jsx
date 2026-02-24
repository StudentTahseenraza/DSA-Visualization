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
  
  // User input states
  const [userArrayInput, setUserArrayInput] = useState('');
  const [userValue, setUserValue] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [userDirection, setUserDirection] = useState('left');
  const [userPositions, setUserPositions] = useState('1');
  const [customArray, setCustomArray] = useState(initialArray);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    if (step) {
      if (step.array) {
        setArray(step.array);
        setCustomArray(step.array);
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

  // Parse user array input
  const parseArrayInput = (input) => {
    if (!input.trim()) return [];
    
    // Split by comma or space and convert to numbers
    const elements = input.split(/[,\s]+/).filter(item => item.trim() !== '');
    return elements.map(item => {
      const num = Number(item.trim());
      return isNaN(num) ? item.trim() : num;
    });
  };

  const handleArrayInputChange = (e) => {
    setUserArrayInput(e.target.value);
    setInputError('');
  };

  const handleSetCustomArray = () => {
    const parsedArray = parseArrayInput(userArrayInput);
    if (parsedArray.length === 0) {
      setInputError('Please enter valid array elements');
      return;
    }
    setCustomArray(parsedArray);
    setArray(parsedArray);
    setMessage(`Custom array set: [${parsedArray.join(', ')}]`);
    setInputError('');
  };

  const handleResetToDefault = () => {
    const defaultArray = [5, 2, 8, 1, 4, 3, 6, 7];
    setCustomArray(defaultArray);
    setArray(defaultArray);
    setUserArrayInput(defaultArray.join(', '));
    setMessage('Reset to default array');
    setInputError('');
  };

  const handlePerformOperation = async () => {
    if (!operation) {
      setInputError('Please select an operation first');
      return;
    }

    // Validate inputs based on operation
    let url = `http://localhost:5000/api/array/${operation}`;
    let body = {
      array: customArray
    };

    switch (operation) {
      case 'insert':
      case 'update':
        if (!userValue || !userPosition) {
          setInputError(`Value and position are required for ${operation} operation`);
          return;
        }
        body.value = Number(userValue);
        body.position = Number(userPosition);
        break;
      
      case 'delete':
        if (!userPosition) {
          setInputError('Position is required for delete operation');
          return;
        }
        body.position = Number(userPosition);
        break;
      
      case 'search':
        if (!userValue) {
          setInputError('Value is required for search operation');
          return;
        }
        body.value = Number(userValue);
        break;
      
      case 'push':
        if (!userValue) {
          setInputError('Value is required for push operation');
          return;
        }
        body.value = Number(userValue);
        break;
      
      case 'rotate':
        if (!userPositions) {
          setInputError('Number of positions is required for rotate operation');
          return;
        }
        body.direction = userDirection;
        body.positions = Number(userPositions);
        break;
      
      case 'traverse':
      case 'reverse':
      case 'pop':
        // No additional parameters needed
        break;
      
      default:
        setInputError('Invalid operation');
        return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Operation failed');
      }

      const data = await response.json();
      
      // Update the visualizer with the first step
      if (data.steps && data.steps.length > 0) {
        // You'll need to implement a step-by-step animation controller
        // For now, we'll just set the final array
        setArray(data.array);
        setMessage(`${operation} operation completed successfully`);
      }
      
      setInputError('');
      
    } catch (error) {
      console.error('Error performing operation:', error);
      setInputError(error.message || 'Failed to perform operation');
    }
  };

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
    if (action === 'rotate' && step?.direction) {
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
          <span>Swapping positions {step?.index1} and {step?.index2}</span>
        </div>
      );
    }

    if (action === 'push') {
      return (
        <div className="operation-info">
          <span>Pushing value {step?.value} to the end</span>
        </div>
      );
    }

    if (action === 'pop') {
      return (
        <div className="operation-info">
          <span>Popping value {step?.value} from the end</span>
        </div>
      );
    }

    return null;
  };

  const renderInputControls = () => {
    return (
      <div className="input-controls">
        <div className="input-section">
          <h4>Custom Array Input</h4>
          <div className="input-group">
            <input
              type="text"
              value={userArrayInput}
              onChange={handleArrayInputChange}
              placeholder="Enter numbers (e.g., 5,2,8,1,4,3,6,7)"
              className="array-input"
            />
            <button onClick={handleSetCustomArray} className="btn-set">
              Set Array
            </button>
            <button onClick={handleResetToDefault} className="btn-reset">
              Reset to Default
            </button>
          </div>
          <div className="current-array-display">
            Current Array: [{customArray.join(', ')}]
          </div>
        </div>

        <div className="input-section">
          <h4>Operation Parameters</h4>
          <div className="operation-controls">
            {(operation === 'insert' || operation === 'update' || operation === 'push' || operation === 'search') && (
              <div className="control-group">
                <label>Value:</label>
                <input
                  type="number"
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
            )}

            {(operation === 'insert' || operation === 'update' || operation === 'delete') && (
              <div className="control-group">
                <label>Position:</label>
                <input
                  type="number"
                  value={userPosition}
                  onChange={(e) => setUserPosition(e.target.value)}
                  placeholder="Enter index"
                  min="0"
                  max={customArray.length}
                />
              </div>
            )}

            {operation === 'rotate' && (
              <>
                <div className="control-group">
                  <label>Direction:</label>
                  <select value={userDirection} onChange={(e) => setUserDirection(e.target.value)}>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Positions:</label>
                  <input
                    type="number"
                    value={userPositions}
                    onChange={(e) => setUserPositions(e.target.value)}
                    placeholder="Number of positions"
                    min="1"
                  />
                </div>
              </>
            )}

            <button onClick={handlePerformOperation} className="btn-perform">
              Perform {operation} Operation
            </button>
          </div>
        </div>

        {inputError && <div className="error-message">{inputError}</div>}
      </div>
    );
  };

  return (
    <div className="array-visualizer-container">
      {renderInputControls()}
      
      <ZoomPanWrapper>
        <div className={`array-visualizer ${getActionClass()}`}>
          <div className="array-info">
            <h3>Array {operation ? `- ${operation.charAt(0).toUpperCase() + operation.slice(1)}` : 'Visualizer'}</h3>
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