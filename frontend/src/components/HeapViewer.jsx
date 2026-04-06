// components/HeapViewer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState, useRef, useEffect } from 'react';
import '../styles/HeapViewer.css';

const HeapViewer = ({ step }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 });

  if (!step || !step.heap) {
    return <div className="heap-viewer">No heap to display</div>;
  }

  const { heap, currentIndices, action } = step;

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const calculateDimensions = (arr) => {
    if (!arr || arr.length === 0) return { maxLevel: 0, maxWidth: 200, maxHeight: 100 };
    const maxLevel = Math.floor(Math.log2(arr.length));
    // Calculate based on number of elements
    const maxWidth = Math.pow(2, maxLevel) * 120; // Increased spacing
    const maxHeight = (maxLevel + 1) * 100;
    return { maxLevel, maxWidth, maxHeight };
  };

  const { maxLevel, maxWidth, maxHeight } = useMemo(() => calculateDimensions(heap), [heap]);

  // Calculate SVG dimensions based on content
  const svgWidth = Math.max(800, maxWidth + 100);
  const svgHeight = Math.max(400, maxHeight + 100);

  // Get node color based on action and state
  const getNodeColor = (isCurrent, actionType) => {
    if (!isCurrent) return '#3498db';
    
    switch(actionType) {
      case 'insert':
        return '#2ecc71';
      case 'extract':
        return '#e74c3c';
      case 'swap':
        return '#f39c12';
      case 'compare':
        return '#9b59b6';
      case 'heapify':
      case 'heapify-node':
        return '#e67e22';
      case 'bulk-insert':
        return '#1abc9c';
      default:
        return '#2ecc71';
    }
  };

  const renderHeap = (arr, index = 0, x = svgWidth / 2, y = 60, dx = 180, level = 0) => {
    if (index >= arr.length || arr[index] === null || arr[index] === undefined) return null;
    
    const isCurrent = currentIndices && currentIndices.includes(index);
    // Adjust spacing based on level
    const adjustedDx = dx / (1 + level * 0.4);
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    const nodeColor = getNodeColor(isCurrent, action);

    return (
      <g key={`node-${index}`}>
        {/* Lines to children - render first so they're behind nodes */}
        {leftChild < arr.length && arr[leftChild] !== null && arr[leftChild] !== undefined && (
          <motion.line
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            x1={x}
            y1={y + 22}
            x2={x - adjustedDx}
            y2={y + 70}
            stroke="#718096"
            strokeWidth={2}
            className="heap-line"
          />
        )}
        {rightChild < arr.length && arr[rightChild] !== null && arr[rightChild] !== undefined && (
          <motion.line
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            x1={x}
            y1={y + 22}
            x2={x + adjustedDx}
            y2={y + 70}
            stroke="#718096"
            strokeWidth={2}
            className="heap-line"
          />
        )}

        {/* Node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
          onHoverStart={() => setHoveredNode(index)}
          onHoverEnd={() => setHoveredNode(null)}
        >
          <motion.circle
            cx={x}
            cy={y}
            r={24}
            fill={nodeColor}
            stroke={isCurrent ? "#fff" : "none"}
            strokeWidth={isCurrent ? 3 : 1}
            strokeOpacity={0.8}
            animate={{
              scale: isCurrent ? [1, 1.08, 1] : 1,
              boxShadow: isCurrent ? "0 0 20px rgba(46, 204, 113, 0.8)" : "none"
            }}
            transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 0.5 }}
            style={{ cursor: 'pointer' }}
            className="heap-node"
          />
          <text 
            x={x} 
            y={y + 6} 
            textAnchor="middle" 
            fill="white" 
            fontSize="14"
            fontWeight="bold"
            className="heap-node-text"
          >
            {arr[index]}
          </text>
          
          {/* Index label */}
          <text 
            x={x} 
            y={y - 15} 
            textAnchor="middle" 
            fill="#a0aec0" 
            fontSize="10"
            className="heap-index-text"
          >
            [{index}]
          </text>
          
          {/* Tooltip on hover */}
          {hoveredNode === index && (
            <motion.rect
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              x={x - 35}
              y={y - 45}
              width={70}
              height={22}
              rx={4}
              fill="#2d3748"
              stroke="#4a5568"
              strokeWidth={1}
            >
              <title>Index: {index}, Value: {arr[index]}</title>
            </motion.rect>
          )}
        </motion.g>

        {/* Render children */}
        {renderHeap(arr, leftChild, x - adjustedDx, y + 70, adjustedDx / 1.5, level + 1)}
        {renderHeap(arr, rightChild, x + adjustedDx, y + 70, adjustedDx / 1.5, level + 1)}
      </g>
    );
  };

  return (
    <div className="heap-viewer-container" ref={containerRef}>
      <div className="heap-viewer-scroll-wrapper">
        <div className="heap-viewer-svg-wrapper" style={{ minWidth: `${svgWidth}px`, minHeight: `${svgHeight}px` }}>
          <svg 
            width={svgWidth} 
            height={svgHeight} 
            className="heap-svg"
            style={{ display: 'block' }}
          >
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
              </filter>
            </defs>
            <g filter="url(#shadow)">
              {renderHeap(heap)}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeapViewer;