// frontend/src/components/AnimationArea.jsx (updated to highlight only specific elements)
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/AnimationArea.css';

const AnimationArea = ({ step, algorithm }) => {
  const [activeIndices, setActiveIndices] = useState([]);
  const [currentAction, setCurrentAction] = useState('');
  const [swapStage, setSwapStage] = useState('');
  
  if (!step || !step.array) {
    return <div className="animation-area">Loading...</div>;
  }

  const { array, currentIndex, minIndex, action, comparingIndices, swappingIndices } = step;

  // Handle animation states for comparisons and swaps
  useEffect(() => {
    if (comparingIndices && comparingIndices.length > 0) {
      setActiveIndices(comparingIndices);
      setCurrentAction('comparing');
      setSwapStage('');
      
      const timer = setTimeout(() => {
        setActiveIndices([]);
      }, 600);
      
      return () => clearTimeout(timer);
    }
    
    if (swappingIndices && swappingIndices.length > 0) {
      setActiveIndices(swappingIndices);
      setCurrentAction('swapping');
      
      // Animate the swap in stages
      setSwapStage('start');
      
      const timer1 = setTimeout(() => {
        setSwapStage('middle');
      }, 200);
      
      const timer2 = setTimeout(() => {
        setSwapStage('end');
      }, 400);
      
      const timer3 = setTimeout(() => {
        setActiveIndices([]);
        setSwapStage('');
      }, 800);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
    
    setActiveIndices([]);
    setCurrentAction(action || '');
    setSwapStage('');
  }, [step, comparingIndices, swappingIndices, action]);

  // Calculate maximum value for scaling
  const maxValue = Math.max(...array);
  const scaleFactor = 180 / (maxValue || 1);

  const getBarColor = (index) => {
    // Only apply special colors to active indices
    if (activeIndices.includes(index)) {
      if (currentAction === 'comparing') {
        return '#e74c3c'; // Red for comparison
      }
      if (currentAction === 'swapping') {
        if (swapStage === 'middle') {
          return '#ffffff'; // White during the middle of swap
        }
        return '#f1c40f'; // Yellow for swap
      }
    }
    
    // Default colors for non-active elements
    if (index === currentIndex) return '#f1c40f';
    if (index === minIndex) return '#2ecc71';
    return '#3498db';
  };

  const getBarScale = (index) => {
    if (activeIndices.includes(index)) {
      if (currentAction === 'swapping') {
        return swapStage === 'start' ? 1.1 : 
               swapStage === 'middle' ? 1.2 : 1.1;
      }
      return 1.1;
    }
    return 1;
  };

  const getBarClass = (index) => {
    if (activeIndices.includes(index)) {
      if (currentAction === 'comparing') {
        return 'comparing';
      }
      if (currentAction === 'swapping') {
        return swapStage === 'middle' ? 'swapping-white' : 'swapping';
      }
    }
    return '';
  };

  return (
    <div className="animation-area">
      <AnimatePresence>
        {array.map((value, index) => (
          <motion.div
            key={`${algorithm}-bar-${index}-${value}`}
            className={`bar ${getBarClass(index)} ${
              activeIndices.includes(index) ? 'active' : ''
            }`}
            initial={{ 
              height: 0,
              backgroundColor: '#3498db',
              scale: 1
            }}
            animate={{
              height: `${array[index] * scaleFactor}px`,
              backgroundColor: getBarColor(index),
              scale: getBarScale(index)
            }}
            transition={{ 
              duration: currentAction === 'swapping' ? 0.3 : 0.4,
              ease: 'easeInOut'
            }}
            whileHover={{ scale: 1.08 }}
          >
            <span className="bar-value">{value}</span>
            {activeIndices.includes(index) && (
              <motion.div 
                className="blinking-overlay"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentAction === 'swapping' ? 
                    (swapStage === 'middle' ? 0.8 : [0, 0.6, 0]) : 
                    [0, 0.6, 0]
                }}
                transition={{ 
                  duration: currentAction === 'swapping' ? 0.3 : 0.6,
                  repeat: currentAction === 'comparing' ? 1 : 0
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnimationArea;