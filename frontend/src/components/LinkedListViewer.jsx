// components/LinkedListViewer.jsx
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import '../styles/LinkedListViewer.css';

const LinkedListViewer = ({ step }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 220 });

  // Debug log to see what step data we're receiving
  useEffect(() => {
    console.log('LinkedListViewer received step:', step);
  }, [step]);

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: Math.max(600, width),
          height: Math.min(250, Math.max(180, height - 20))
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // If no step, show message
  if (!step) {
    return <div className="linked-list-viewer">
      <div className="empty-list-message">
        <p>No step data available</p>
        <small>Run an operation to see visualization</small>
      </div>
    </div>;
  }

  // Extract nodes from step, handling different possible structures
  let nodes = [];
  
  // Case 1: step has nodes array directly
  if (step.nodes && Array.isArray(step.nodes)) {
    nodes = step.nodes;
  } 
  // Case 2: step has list property (linked list object)
  else if (step.list && typeof step.list === 'object') {
    const convertToList = (head) => {
      const result = [];
      let current = head;
      while (current) {
        result.push({ 
          value: current.value,
          visited: false 
        });
        current = current.next;
      }
      return result;
    };
    nodes = convertToList(step.list);
  } 
  // Case 3: step has array property
  else if (step.array && Array.isArray(step.array)) {
    nodes = step.array.map(val => ({ value: val }));
  }
  // Case 4: step has data property with nodes
  else if (step.data && step.data.nodes && Array.isArray(step.data.nodes)) {
    nodes = step.data.nodes;
  }

  // If we have a list in the step but couldn't extract nodes, try to get it from the list property
  if (nodes.length === 0 && step.list) {
    const convertToList = (head) => {
      const result = [];
      let current = head;
      while (current) {
        result.push({ value: current.value });
        current = current.next;
      }
      return result;
    };
    nodes = convertToList(step.list);
  }

  // If still no nodes, show empty message
  if (nodes.length === 0) {
    return (
      <div className="linked-list-viewer">
        <div className="empty-list-message">
          <p>Empty Linked List</p>
          <small>Use the controls to insert nodes</small>
          {step.action && <small className="action-info">Operation: {step.action}</small>}
        </div>
      </div>
    );
  }

  const { currentNode, action, message, path } = step;

  // Calculate proper scaling based on node count
  const calculateLayout = () => {
    const totalNodes = nodes.length;
    const containerWidth = containerSize.width - 40;
    const containerHeight = containerSize.height - 70;

    const baseNodeWidth = 70;
    const baseNodeHeight = 45;
    const baseSpacing = 80;

    const requiredWidth = (baseNodeWidth * totalNodes) + (baseSpacing * (totalNodes - 1));
    
    let scaleFactor = 1;
    let finalNodeWidth = baseNodeWidth;
    let finalNodeHeight = baseNodeHeight;
    let finalSpacing = baseSpacing;

    if (requiredWidth > containerWidth) {
      scaleFactor = containerWidth / requiredWidth;
      scaleFactor = Math.max(0.4, scaleFactor * 0.95);
      
      finalNodeWidth = Math.max(40, baseNodeWidth * scaleFactor);
      finalNodeHeight = Math.max(30, baseNodeHeight * scaleFactor);
      finalSpacing = Math.max(50, baseSpacing * scaleFactor);
    }

    const totalWidth = (finalNodeWidth * totalNodes) + (finalSpacing * (totalNodes - 1));
    const startX = Math.max(20, (containerWidth - totalWidth) / 2);
    
    return {
      nodeWidth: finalNodeWidth,
      nodeHeight: finalNodeHeight,
      spacing: finalSpacing,
      containerWidth,
      containerHeight,
      startX,
      totalWidth,
      scaleFactor,
      totalNodes
    };
  };

  const { nodeWidth, nodeHeight, spacing, containerWidth, containerHeight, startX, scaleFactor, totalNodes } = calculateLayout();

  const renderList = () => {
    const nodeElements = [];
    const arrowElements = [];
    
    nodes.forEach((node, index) => {
      const x = startX + (nodeWidth + spacing) * index;
      const y = containerHeight / 2 + 10;
      const isCurrent = node.value === currentNode;
      const isVisited = node.visited;
      const isFound = node.isFound || node.isTarget;
      const isTarget = node.isTarget;

      // Calculate font sizes based on scale
      const valueFontSize = Math.max(11, 14 * scaleFactor);
      const indexFontSize = Math.max(9, 10 * scaleFactor);

      // Determine node color based on state and action
      let nodeColor = '#3498db'; // Default blue
      
      if (action?.includes('delete') && isCurrent) {
        nodeColor = '#e74c3c'; // Red for delete
      } else if (action?.includes('search') && isCurrent) {
        nodeColor = '#f39c12'; // Yellow for search
      } else if (action?.includes('traverse') && isCurrent) {
        nodeColor = '#9b59b6'; // Purple for traverse
      } else if (isFound) {
        nodeColor = '#27ae60'; // Green for found
      } else if (isVisited) {
        nodeColor = '#2ecc71'; // Light green for visited
      } else if (isCurrent) {
        nodeColor = '#f1c40f'; // Yellow for current
      }

      // Node group
      nodeElements.push(
        <motion.g
          key={`node-${node.value}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Node rectangle */}
          <rect
            x={x}
            y={y - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={5}
            fill={nodeColor}
            stroke="#2980b9"
            strokeWidth="2"
          />
          
          {/* Node value */}
          <text
            x={x + nodeWidth / 2}
            y={y + 4}
            textAnchor="middle"
            fill="white"
            style={{ 
              fontSize: `${valueFontSize}px`,
              fontWeight: 'bold',
              pointerEvents: 'none',
              userSelect: 'none',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            {node.value}
          </text>
          
          {/* Node index label */}
          <text
            x={x + nodeWidth / 2}
            y={y - nodeHeight / 2 - 5}
            textAnchor="middle"
            fill="#ecf0f1"
            style={{ 
              fontSize: `${indexFontSize}px`,
              pointerEvents: 'none',
              userSelect: 'none',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            [{index}]
          </text>

          {/* Current node highlight */}
          {isCurrent && (
            <motion.rect
              x={x - 2}
              y={y - nodeHeight / 2 - 2}
              width={nodeWidth + 4}
              height={nodeHeight + 4}
              rx={6}
              fill="transparent"
              stroke="#f1c40f"
              strokeWidth="2"
              strokeDasharray="3,3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Found node highlight */}
          {isFound && (
            <motion.circle
              cx={x + nodeWidth / 2}
              cy={y}
              r={nodeWidth / 2}
              fill="transparent"
              stroke="#27ae60"
              strokeWidth="2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 0.5 }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
        </motion.g>
      );

      // Arrows between nodes
      if (index < nodes.length - 1) {
        const arrowStartX = x + nodeWidth;
        const arrowEndX = x + nodeWidth + spacing;
        const arrowY = y;
        const arrowHeadSize = 8 * scaleFactor;

        let arrowColor = '#ecf0f1';
        if (action?.includes('traverse') && (isCurrent || (path?.includes(node.value)))) {
          arrowColor = '#f39c12';
        } else if (path && path.includes(node.value) && path.includes(nodes[index + 1]?.value)) {
          arrowColor = '#f39c12';
        }

        arrowElements.push(
          <g key={`arrow-${index}`}>
            <line
              x1={arrowStartX}
              y1={arrowY}
              x2={arrowEndX - arrowHeadSize}
              y2={arrowY}
              stroke={arrowColor}
              strokeWidth={Math.max(1, 2 * scaleFactor)}
              className={action?.includes('traverse') ? 'traversal-line' : ''}
            />
            
            <polygon
              points={`
                ${arrowEndX - arrowHeadSize},${arrowY} 
                ${arrowEndX - arrowHeadSize - 5 * scaleFactor},${arrowY - 4 * scaleFactor} 
                ${arrowEndX - arrowHeadSize - 5 * scaleFactor},${arrowY + 4 * scaleFactor}
              `}
              fill={arrowColor}
            />
            
            {scaleFactor > 0.6 && (
              <text
                x={arrowStartX + spacing / 2}
                y={arrowY - 12}
                textAnchor="middle"
                fill="#bdc3c7"
                style={{ 
                  fontSize: `${Math.max(8, 9 * scaleFactor)}px`,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                next
              </text>
            )}
          </g>
        );
      } else {
        // Last node NULL pointer
        nodeElements.push(
          <g key={`null-${index}`}>
            <text
              x={x + nodeWidth + 20}
              y={y + 4}
              textAnchor="middle"
              fill="#e74c3c"
              style={{ 
                fontSize: `${Math.max(10, 11 * scaleFactor)}px`, 
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              NULL
            </text>
            <circle 
              cx={x + nodeWidth + 10} 
              cy={y} 
              r={3 * scaleFactor} 
              fill="#e74c3c"
            />
          </g>
        );
      }
    });

    return [...arrowElements, ...nodeElements];
  };

  // Get action display name
  const getActionDisplay = () => {
    if (!action) return 'None';
    return action.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div className="linked-list-viewer" ref={containerRef}>
      <div className="linked-list-info">
        <div className="info-stats">
          <span><strong>Nodes:</strong> {totalNodes}</span>
          <span className="separator">|</span>
          <span><strong>Current:</strong> <span style={{color: '#f1c40f', fontWeight: 'bold'}}>{currentNode || 'None'}</span></span>
          <span className="separator">|</span>
          <span><strong>Action:</strong> <span style={{
            color: action?.includes('insert') ? '#2ecc71' : 
                   action?.includes('delete') ? '#e74c3c' : 
                   action?.includes('search') ? '#f39c12' : 
                   action?.includes('traverse') ? '#9b59b6' : '#3498db',
            fontWeight: 'bold'
          }}>{getActionDisplay()}</span></span>
          {scaleFactor < 0.8 && (
            <>
              <span className="separator">|</span>
              <span style={{color: '#e67e22', fontWeight: 'bold'}}>
                {Math.round(scaleFactor * 100)}%
              </span>
            </>
          )}
        </div>
        {message && (
          <div className="step-message">
            {message}
          </div>
        )}
        {path && path.length > 0 && (
          <div className="path-info">
            <strong>Path:</strong> {path.join(' → ')}
          </div>
        )}
      </div>
      
      <div className="linked-list-svg-container">
        <svg 
          width={containerWidth}
          height={containerHeight}
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background */}
          <rect width="100%" height="100%" fill="#1a202c" />
          
          {renderList()}
        </svg>
      </div>
    </div>
  );
};

export default LinkedListViewer;