// components/SearchViewer.jsx
import { motion } from 'framer-motion';
import '../styles/SearchViewer.css';

const SearchViewer = ({ step, algorithm }) => {
  // Provide default values and ensure arrays are always arrays
  const {
    array = [],
    currentIndex = -1,
    target = null,
    left = -1,
    right = -1,
    mid = -1,
    comparingIndices = [], // Default to empty array instead of null
    foundIndex = -1
  } = step || {}; // Add fallback for step being null/undefined

  const isBinarySearch = algorithm === 'binary-search';

  // Ensure comparingIndices is always an array
  const safeComparingIndices = Array.isArray(comparingIndices) ? comparingIndices : [];

  return (
    <div className="search-visualization">
      <div className="search-info">
        <div className="target-info">Target: {target !== null ? target : 'N/A'}</div>
        {foundIndex !== -1 && foundIndex !== undefined && (
          <div className="found-info">Found at index: {foundIndex}</div>
        )}
        {isBinarySearch && (left !== -1 || right !== -1) && (
          <div className="bounds-info">
            Search Range: [{left}, {right}]
          </div>
        )}
      </div>

      <div className="array-container">
        {array.map((value, index) => {
          let className = 'array-element';
          
          if (foundIndex === index) {
            className += ' found';
          } else if (safeComparingIndices.includes(index)) {
            className += ' comparing';
          } else if (isBinarySearch && index >= left && index <= right) {
            className += ' search-range';
          } else if (isBinarySearch && (index < left || index > right)) {
            className += ' excluded';
          } else if (currentIndex === index) {
            className += ' current';
          }

          return (
            <motion.div
              key={index}
              className={className}
              initial={false}
              animate={{
                scale: safeComparingIndices.includes(index) ? 1.1 : 1,
                transition: { duration: 0.3 }
              }}
            >
              <div className="element-value">{value}</div>
              <div className="element-index">{index}</div>
              {isBinarySearch && mid === index && (
                <div className="mid-indicator">MID</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="search-legend">
        <div className="legend-item">
          <div className="legend-color comparing"></div>
          <span>Comparing</span>
        </div>
        <div className="legend-item">
          <div className="legend-color found"></div>
          <span>Found</span>
        </div>
        {isBinarySearch && (
          <>
            <div className="legend-item">
              <div className="legend-color search-range"></div>
              <span>Search Range</span>
            </div>
            <div className="legend-item">
              <div className="legend-color excluded"></div>
              <span>Excluded</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchViewer;