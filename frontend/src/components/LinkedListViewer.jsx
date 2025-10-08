// components/LinkedListViewer.jsx
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import '../styles/LinkedListViewer.css';

const LinkedListViewer = ({ step }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 300 });

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: Math.max(600, width),
          height: Math.max(250, height)
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!step || !step.nodes) {
    return <div className="linked-list-viewer">No linked list to display</div>;
  }

  const { nodes, currentNode, action } = step;

  // Calculate proper scaling based on node count
  const calculateLayout = () => {
    const totalNodes = nodes.length;
    const containerWidth = containerSize.width - 40; // Account for padding
    const containerHeight = containerSize.height - 60; // Account for info area

    // Base dimensions
    const baseNodeWidth = 80;
    const baseNodeHeight = 60;
    const baseSpacing = 100;

    // Calculate required width
    const requiredWidth = (baseNodeWidth * totalNodes) + (baseSpacing * (totalNodes - 1));
    
    let scaleFactor = 1;
    let finalNodeWidth = baseNodeWidth;
    let finalNodeHeight = baseNodeHeight;
    let finalSpacing = baseSpacing;

    // Scale down based on node count to fit container
    if (requiredWidth > containerWidth) {
      scaleFactor = containerWidth / requiredWidth;
      // More aggressive scaling for many nodes
      scaleFactor = Math.max(0.3, scaleFactor * 0.9);
      
      finalNodeWidth = Math.max(30, baseNodeWidth * scaleFactor);
      finalNodeHeight = Math.max(25, baseNodeHeight * scaleFactor);
      finalSpacing = Math.max(40, baseSpacing * scaleFactor);
    }

    // Calculate centered positions
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
      const y = containerHeight / 2;
      const isCurrent = node.value === currentNode;

      // Calculate font sizes based on scale
      const valueFontSize = Math.max(10, 14 * scaleFactor);
      const indexFontSize = Math.max(8, 10 * scaleFactor);

      // Node background
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
            rx={6}
            fill={
              action === 'insert' && isCurrent
                ? '#2ecc71'
                : action === 'delete' && isCurrent
                ? '#e74c3c'
                : isCurrent
                ? '#f1c40f'
                : '#3498db'
            }
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
            y={y - nodeHeight / 2 - 8}
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
              x={x - 3}
              y={y - nodeHeight / 2 - 3}
              width={nodeWidth + 6}
              height={nodeHeight + 6}
              rx={8}
              fill="transparent"
              stroke="#f1c40f"
              strokeWidth="2"
              strokeDasharray="3,3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.g>
      );

      // Arrows between nodes
      if (index < nodes.length - 1) {
        const arrowStartX = x + nodeWidth;
        const arrowEndX = x + nodeWidth + spacing;
        const arrowY = y;
        const arrowHeadSize = 10 * scaleFactor;

        arrowElements.push(
          <g key={`arrow-${index}`}>
            {/* Arrow line */}
            <line
              x1={arrowStartX}
              y1={arrowY}
              x2={arrowEndX - arrowHeadSize}
              y2={arrowY}
              stroke={action === 'traverse' ? '#f39c12' : '#ecf0f1'}
              strokeWidth={Math.max(1, 2 * scaleFactor)}
              className={action === 'traverse' ? 'traversal-line' : ''}
            />
            
            {/* Arrowhead */}
            <polygon
              points={`
                ${arrowEndX - arrowHeadSize},${arrowY} 
                ${arrowEndX - arrowHeadSize - 6},${arrowY - 5 * scaleFactor} 
                ${arrowEndX - arrowHeadSize - 6},${arrowY + 5 * scaleFactor}
              `}
              fill={action === 'traverse' ? '#f39c12' : '#ecf0f1'}
            />
            
            {/* Next pointer label - only show if there's enough space */}
            {scaleFactor > 0.5 && (
              <text
                x={arrowStartX + spacing / 2}
                y={arrowY - 12}
                textAnchor="middle"
                fill="#bdc3c7"
                style={{ 
                  fontSize: `${Math.max(7, 9 * scaleFactor)}px`,
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                next→
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
                fontSize: `${Math.max(9, 11 * scaleFactor)}px`, 
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              NULL
            </text>
            <circle 
              cx={x + nodeWidth + 8} 
              cy={y} 
              r={2 * scaleFactor} 
              fill="#e74c3c"
            />
          </g>
        );
      }
    });

    return [...arrowElements, ...nodeElements];
  };

  return (
    <div className="linked-list-viewer" ref={containerRef}>
      <div className="linked-list-info">
        <strong>Nodes: {totalNodes}</strong> | 
        Current: <span style={{color: '#f1c40f', fontWeight: 'bold'}}>{currentNode || 'None'}</span> |
        Action: <span style={{
          color: action === 'insert' ? '#2ecc71' : 
                 action === 'delete' ? '#e74c3c' : 
                 action === 'traverse' ? '#f39c12' : '#3498db',
          fontWeight: 'bold'
        }}>{action || 'None'}</span>
        {scaleFactor < 0.8 && (
          <span style={{color: '#e67e22', marginLeft: '10px', fontWeight: 'bold'}}>
            (Scaled: {Math.round(scaleFactor * 100)}%)
          </span>
        )}
      </div>
      
      <div className="linked-list-svg-container">
        <svg 
          width={containerWidth}
          height={containerHeight}
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        >
          {/* Background */}
          <rect width="100%" height="100%" fill="#1a202c" />
          
          {renderList()}
        </svg>
      </div>
      
      {scaleFactor < 0.6 && (
        <div className="scale-info">
          <small>List scaled to fit container. Nodes and spacing reduced for better visibility.</small>
        </div>
      )}
    </div>
  );
};

export default LinkedListViewer;