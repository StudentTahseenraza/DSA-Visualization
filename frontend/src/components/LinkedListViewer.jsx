// components/LinkedListViewer.jsx
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import '../styles/LinkedListViewer.css';

const LinkedListViewer = ({ step, listType = 'singly' }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 300 });

  useEffect(() => {
    console.log('LinkedListViewer received step:', step, 'listType:', listType);
  }, [step, listType]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: Math.max(600, width),
          height: Math.min(340, Math.max(280, height - 20))
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!step) {
    return <div className="linked-list-viewer">
      <div className="empty-list-message">
        <p>No step data available</p>
        <small>Run an operation to see visualization</small>
      </div>
    </div>;
  }

  let nodes = [];
  
  if (step.nodes && Array.isArray(step.nodes)) {
    nodes = step.nodes;
  } 
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
  else if (step.array && Array.isArray(step.array)) {
    nodes = step.array.map(val => ({ value: val }));
  }
  else if (step.data && step.data.nodes && Array.isArray(step.data.nodes)) {
    nodes = step.data.nodes;
  }

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
  const isDoubly = listType === 'doubly';

  const calculateLayout = () => {
    const totalNodes = nodes.length;
    const containerWidth = containerSize.width - 40;
    const containerHeight = containerSize.height - 90;

    const baseNodeWidth = isDoubly ? 130 : 70;
    const baseNodeHeight = 55;
    const baseSpacing = isDoubly ? 70 : 80;

    const requiredWidth = (baseNodeWidth * totalNodes) + (baseSpacing * (totalNodes - 1));
    
    let scaleFactor = 1;
    let finalNodeWidth = baseNodeWidth;
    let finalNodeHeight = baseNodeHeight;
    let finalSpacing = baseSpacing;

    if (requiredWidth > containerWidth) {
      scaleFactor = containerWidth / requiredWidth;
      scaleFactor = Math.max(0.5, scaleFactor * 0.95);
      
      finalNodeWidth = Math.max(isDoubly ? 90 : 45, baseNodeWidth * scaleFactor);
      finalNodeHeight = Math.max(45, baseNodeHeight * scaleFactor);
      finalSpacing = Math.max(40, baseSpacing * scaleFactor);
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

  // Render Singly Linked List
  const renderSinglyList = () => {
    const nodeElements = [];
    const arrowElements = [];
    
    nodes.forEach((node, index) => {
      const x = startX + (nodeWidth + spacing) * index;
      const y = containerHeight / 2 + 15;
      const isCurrent = node.value === currentNode;
      const isVisited = node.visited;
      const isFound = node.isFound || node.isTarget;

      const valueFontSize = Math.max(11, 14 * scaleFactor);
      const indexFontSize = Math.max(9, 10 * scaleFactor);

      let nodeColor = '#3498db';
      
      if (action?.includes('delete') && isCurrent) {
        nodeColor = '#e74c3c';
      } else if (action?.includes('search') && isCurrent) {
        nodeColor = '#f39c12';
      } else if (action?.includes('traverse') && isCurrent) {
        nodeColor = '#9b59b6';
      } else if (isFound) {
        nodeColor = '#27ae60';
      } else if (isVisited) {
        nodeColor = '#2ecc71';
      } else if (isCurrent) {
        nodeColor = '#f1c40f';
      }

      nodeElements.push(
        <motion.g
          key={`node-${node.value}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <rect
            x={x}
            y={y - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={6}
            fill={nodeColor}
            stroke="#2980b9"
            strokeWidth="2"
          />
          
          <text
            x={x + nodeWidth / 2}
            y={y + 5}
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

          {isCurrent && (
            <motion.rect
              x={x - 2}
              y={y - nodeHeight / 2 - 2}
              width={nodeWidth + 4}
              height={nodeHeight + 4}
              rx={7}
              fill="transparent"
              stroke="#f1c40f"
              strokeWidth="2"
              strokeDasharray="3,3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

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

      if (index < nodes.length - 1) {
        const arrowStartX = x + nodeWidth;
        const arrowEndX = x + nodeWidth + spacing;
        const arrowY = y;
        const arrowHeadSize = 8 * scaleFactor;

        let arrowColor = '#ecf0f1';
        if (action?.includes('traverse') && (isCurrent || (path?.includes(node.value)))) {
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
                style={{ fontSize: `${Math.max(8, 9 * scaleFactor)}px` }}
              >
                next
              </text>
            )}
          </g>
        );
      } else {
        nodeElements.push(
          <g key={`null-${index}`}>
            <text
              x={x + nodeWidth + 20}
              y={y + 5}
              textAnchor="middle"
              fill="#e74c3c"
              style={{ fontSize: `${Math.max(10, 11 * scaleFactor)}px`, fontWeight: 'bold' }}
            >
              NULL
            </text>
            <circle cx={x + nodeWidth + 10} cy={y} r={3 * scaleFactor} fill="#e74c3c" />
          </g>
        );
      }
    });

    return [...arrowElements, ...nodeElements];
  };

  // Render Doubly Linked List with PREV | DATA | NEXT structure AND double arrows
  const renderDoublyList = () => {
    const nodeElements = [];
    const nextArrowElements = [];
    const prevArrowElements = [];
    
    nodes.forEach((node, index) => {
      const x = startX + (nodeWidth + spacing) * index;
      const y = containerHeight / 2 + 15;
      const isCurrent = node.value === currentNode;
      const isVisited = node.visited;
      const isFound = node.isFound || node.isTarget;

      const valueFontSize = Math.max(12, 16 * scaleFactor);
      const sectionFontSize = Math.max(8, 10 * scaleFactor);
      const indexFontSize = Math.max(9, 11 * scaleFactor);
      
      const sectionWidth = nodeWidth / 3;

      let nodeColor = '#3498db';
      
      if (action?.includes('delete') && isCurrent) {
        nodeColor = '#e74c3c';
      } else if (action?.includes('search') && isCurrent) {
        nodeColor = '#f39c12';
      } else if (action?.includes('traverse') && isCurrent) {
        nodeColor = '#9b59b6';
      } else if (isFound) {
        nodeColor = '#27ae60';
      } else if (isVisited) {
        nodeColor = '#2ecc71';
      } else if (isCurrent) {
        nodeColor = '#f1c40f';
      }

      let prevValue = 'NULL';
      if (index > 0) {
        prevValue = nodes[index - 1].value;
      }
      
      let nextValue = 'NULL';
      if (index < nodes.length - 1) {
        nextValue = nodes[index + 1].value;
      }

      nodeElements.push(
        <motion.g
          key={`node-${node.value}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Main node rectangle */}
          <rect
            x={x}
            y={y - nodeHeight / 2}
            width={nodeWidth}
            height={nodeHeight}
            rx={6}
            fill="#2d3748"
            stroke={nodeColor}
            strokeWidth="2.5"
          />
          
          {/* Divider lines */}
          <line
            x1={x + sectionWidth}
            y1={y - nodeHeight / 2}
            x2={x + sectionWidth}
            y2={y + nodeHeight / 2}
            stroke="#4a5568"
            strokeWidth="1"
          />
          <line
            x1={x + nodeWidth - sectionWidth}
            y1={y - nodeHeight / 2}
            x2={x + nodeWidth - sectionWidth}
            y2={y + nodeHeight / 2}
            stroke="#4a5568"
            strokeWidth="1"
          />
          
          {/* PREV Section */}
          <rect
            x={x}
            y={y - nodeHeight / 2}
            width={sectionWidth}
            height={nodeHeight}
            rx={6}
            fill={isCurrent && action?.includes('traverse-backward') ? '#f39c12' : '#1a202c'}
            opacity="0.7"
          />
          <text
            x={x + sectionWidth / 2}
            y={y - 6}
            textAnchor="middle"
            fill="#a0aec0"
            style={{ fontSize: `${sectionFontSize}px`, fontFamily: 'Arial, sans-serif' }}
          >
            PREV
          </text>
          <text
            x={x + sectionWidth / 2}
            y={y + 14}
            textAnchor="middle"
            fill="#ecc94b"
            style={{ fontSize: `${Math.max(9, 11 * scaleFactor)}px`, fontWeight: 'bold', fontFamily: 'monospace' }}
          >
            {prevValue}
          </text>
          
          {/* DATA Section */}
          <rect
            x={x + sectionWidth}
            y={y - nodeHeight / 2}
            width={nodeWidth - (2 * sectionWidth)}
            height={nodeHeight}
            fill={nodeColor}
            opacity="0.9"
          />
          <text
            x={x + nodeWidth / 2}
            y={y - 6}
            textAnchor="middle"
            fill="#e2e8f0"
            style={{ fontSize: `${sectionFontSize}px`, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
          >
            DATA
          </text>
          <text
            x={x + nodeWidth / 2}
            y={y + 14}
            textAnchor="middle"
            fill="white"
            style={{ fontSize: `${valueFontSize}px`, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
          >
            {node.value}
          </text>
          
          {/* NEXT Section */}
          <rect
            x={x + nodeWidth - sectionWidth}
            y={y - nodeHeight / 2}
            width={sectionWidth}
            height={nodeHeight}
            rx={6}
            fill={isCurrent && action?.includes('traverse') ? '#f39c12' : '#1a202c'}
            opacity="0.7"
          />
          <text
            x={x + nodeWidth - sectionWidth / 2}
            y={y - 6}
            textAnchor="middle"
            fill="#a0aec0"
            style={{ fontSize: `${sectionFontSize}px`, fontFamily: 'Arial, sans-serif' }}
          >
            NEXT
          </text>
          <text
            x={x + nodeWidth - sectionWidth / 2}
            y={y + 14}
            textAnchor="middle"
            fill="#ecc94b"
            style={{ fontSize: `${Math.max(9, 11 * scaleFactor)}px`, fontWeight: 'bold', fontFamily: 'monospace' }}
          >
            {nextValue}
          </text>

          {/* Index label */}
          <text
            x={x + nodeWidth / 2}
            y={y - nodeHeight / 2 - 8}
            textAnchor="middle"
            fill="#a0aec0"
            style={{ fontSize: `${indexFontSize}px`, fontFamily: 'Arial, sans-serif' }}
          >
            Node [{index}]
          </text>

          {/* Current node highlight */}
          {isCurrent && (
            <motion.rect
              x={x - 3}
              y={y - nodeHeight / 2 - 3}
              width={nodeWidth + 6}
              height={nodeHeight + 6}
              rx={8}
              fill="transparent"
              stroke="#f1c40f"
              strokeWidth="2.5"
              strokeDasharray="4,4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Found node highlight */}
          {isFound && (
            <motion.circle
              cx={x + nodeWidth / 2}
              cy={y}
              r={nodeWidth / 2 + 5}
              fill="transparent"
              stroke="#27ae60"
              strokeWidth="2.5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 0.4 }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
        </motion.g>
      );

      // NEXT Arrow (Forward direction) - above the node
      if (index < nodes.length - 1) {
        const arrowStartX = x + nodeWidth;
        const arrowEndX = x + nodeWidth + spacing;
        const arrowY = y - 15;
        const arrowHeadSize = 8 * scaleFactor;

        let arrowColor = '#718096';
        if (action?.includes('traverse') && (isCurrent || (path?.includes(node.value)))) {
          arrowColor = '#f39c12';
        }

        nextArrowElements.push(
          <g key={`next-arrow-${index}`}>
            <line
              x1={arrowStartX}
              y1={arrowY}
              x2={arrowEndX - arrowHeadSize}
              y2={arrowY}
              stroke={arrowColor}
              strokeWidth={Math.max(1.5, 2.5 * scaleFactor)}
              className={action?.includes('traverse') ? 'traversal-line' : ''}
            />
            <polygon
              points={`
                ${arrowEndX - arrowHeadSize},${arrowY} 
                ${arrowEndX - arrowHeadSize - 6 * scaleFactor},${arrowY - 5 * scaleFactor} 
                ${arrowEndX - arrowHeadSize - 6 * scaleFactor},${arrowY + 5 * scaleFactor}
              `}
              fill={arrowColor}
            />
            {scaleFactor > 0.6 && (
              <text
                x={arrowStartX + spacing / 2}
                y={arrowY - 8}
                textAnchor="middle"
                fill="#718096"
                style={{ fontSize: `${Math.max(8, 10 * scaleFactor)}px`, fontFamily: 'Arial, sans-serif' }}
              >
                next →
              </text>
            )}
          </g>
        );
      }

      // PREV Arrow (Backward direction) - below the node
      if (index > 0) {
        const arrowStartX = x;
        const arrowEndX = x - spacing;
        const arrowY = y + 25;
        const arrowHeadSize = 8 * scaleFactor;

        let arrowColor = '#718096';
        if (action?.includes('traverse-backward') && (isCurrent || (path?.includes(node.value)))) {
          arrowColor = '#f39c12';
        }

        prevArrowElements.push(
          <g key={`prev-arrow-${index}`}>
            <line
              x1={arrowStartX}
              y1={arrowY}
              x2={arrowEndX + arrowHeadSize}
              y2={arrowY}
              stroke={arrowColor}
              strokeWidth={Math.max(1.5, 2.5 * scaleFactor)}
              strokeDasharray="5,3"
              className={action?.includes('traverse-backward') ? 'traversal-line-backward' : ''}
            />
            <polygon
              points={`
                ${arrowEndX + arrowHeadSize},${arrowY} 
                ${arrowEndX + arrowHeadSize + 6 * scaleFactor},${arrowY - 5 * scaleFactor} 
                ${arrowEndX + arrowHeadSize + 6 * scaleFactor},${arrowY + 5 * scaleFactor}
              `}
              fill={arrowColor}
            />
            {scaleFactor > 0.6 && (
              <text
                x={arrowEndX + spacing / 2}
                y={arrowY + 18}
                textAnchor="middle"
                fill="#718096"
                style={{ fontSize: `${Math.max(8, 10 * scaleFactor)}px`, fontFamily: 'Arial, sans-serif' }}
              >
                ← prev
              </text>
            )}
          </g>
        );
      }
    });

    return [...prevArrowElements, ...nextArrowElements, ...nodeElements];
  };

  const getActionDisplay = () => {
    if (!action) return 'None';
    return action.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div className={`linked-list-viewer ${isDoubly ? 'doubly-mode' : 'singly-mode'}`} ref={containerRef}>
      <div className="linked-list-info">
        <div className="info-stats">
          <span><strong>List Type:</strong> 
            <span style={{color: isDoubly ? '#9b59b6' : '#3498db', fontWeight: 'bold', marginLeft: '5px'}}>
              {isDoubly ? 'Doubly Linked List' : 'Singly Linked List'}
            </span>
          </span>
          <span className="separator">|</span>
          <span><strong>Nodes:</strong> {totalNodes}</span>
          <span className="separator">|</span>
          <span><strong>Current Node:</strong> 
            <span style={{color: '#f1c40f', fontWeight: 'bold', marginLeft: '5px'}}>
              {currentNode !== undefined && currentNode !== null ? currentNode : 'None'}
            </span>
          </span>
          <span className="separator">|</span>
          <span><strong>Action:</strong> 
            <span style={{
              color: action?.includes('insert') ? '#2ecc71' : 
                     action?.includes('delete') ? '#e74c3c' : 
                     action?.includes('search') ? '#f39c12' : 
                     action?.includes('traverse') ? '#9b59b6' : '#3498db',
              fontWeight: 'bold',
              marginLeft: '5px'
            }}>{getActionDisplay()}</span>
          </span>
        </div>
        {message && (
          <div className="step-message">
            📌 {message}
          </div>
        )}
        {path && path.length > 0 && (
          <div className="path-info">
            🗺️ <strong>Traversal Path:</strong> {path.join(' → ')}
          </div>
        )}
        {isDoubly && (
          <div className="doubly-hint">
            <span className="hint-icon">🔗</span>
            <span className="hint-text">Each node: PREV | DATA | NEXT | Double arrows show bidirectional links (→ next above, ← prev below)</span>
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
          <rect width="100%" height="100%" fill="#1a202c" />
          {isDoubly ? renderDoublyList() : renderSinglyList()}
        </svg>
      </div>
    </div>
  );
};

export default LinkedListViewer;