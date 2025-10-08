// components/BSTViewer.jsx
import { motion } from 'framer-motion';
import { useMemo, useState, useRef, useEffect } from 'react';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/BSTViewer.css';

const BSTViewer = ({ step, algorithm = '' }) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(800, width),
          height: Math.max(500, height - 100)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!step) {
    return <div className="bst-viewer">No tree data to display</div>;
  }

  const { tree, currentNode, action, insertedValue, stepType, path = [] } = step;

  // Calculate tree dimensions for proper SVG sizing
  const calculateTreeDimensions = (node, level = 0) => {
    if (!node) return { depth: 0, width: 0, nodeCount: 0, maxLevelWidth: 0 };
    
    const left = calculateTreeDimensions(node.left, level + 1);
    const right = calculateTreeDimensions(node.right, level + 1);
    
    const currentWidth = 1 + left.width + right.width;
    const maxLevelWidth = Math.max(currentWidth, left.maxLevelWidth, right.maxLevelWidth);
    
    return {
      depth: Math.max(level, left.depth, right.depth),
      width: currentWidth,
      nodeCount: 1 + left.nodeCount + right.nodeCount,
      maxLevelWidth: maxLevelWidth
    };
  };

  const { depth, width, nodeCount, maxLevelWidth } = useMemo(() => 
    calculateTreeDimensions(tree), [tree]);
  
  // Dynamic SVG dimensions based on tree size with better margins
  const horizontalPadding = 100; // Increased padding
  const verticalPadding = 80;
  
  const svgWidth = Math.max(
    dimensions.width, 
    (maxLevelWidth * 120) + horizontalPadding * 2
  );
  const svgHeight = Math.max(
    dimensions.height, 
    (depth + 1) * 120 + verticalPadding * 2
  );

  const renderTree = (node, x, y, level = 0, parentX = null, parentY = null) => {
    if (!node) return null;
    
    const isCurrent = currentNode && node.value === currentNode;
    const isNewlyInserted = stepType === 'insert' && insertedValue === node.value;
    const isInPath = path.includes(node.value);
    const isTraversed = stepType === 'traverse' && path.includes(node.value);
    
    // Calculate dynamic horizontal spacing based on tree width and level
    const baseSpacing = 150;
    const levelReduction = level * 0.15;
    const widthFactor = Math.max(0.5, 1 - (maxLevelWidth / 20));
    const horizontalSpacing = baseSpacing * widthFactor / (1 + levelReduction);
    
    const nodeElements = [];

    // Draw connections first (so they appear behind nodes)
    if (parentX !== null && parentY !== null) {
      const isPathConnection = path.includes(node.value) && path[path.indexOf(node.value) - 1] === (node.parentValue || path[0]);
      
      nodeElements.push(
        <line 
          key={`line-${node.value}-${x}-${y}`}
          x1={parentX} 
          y1={parentY + 25} 
          x2={x} 
          y2={y - 25} 
          stroke={isPathConnection ? "#f1c40f" : "#4a5568"}
          strokeWidth={isPathConnection ? 3 : 2}
          strokeDasharray={isPathConnection ? "5,3" : "none"}
        />
      );
    }

    // Render child nodes first
    if (node.left) {
      const leftX = x - horizontalSpacing;
      const leftY = y + 100;
      const leftResult = renderTree(
        { ...node.left, parentValue: node.value }, 
        leftX, 
        leftY, 
        level + 1, 
        x, 
        y
      );
      if (leftResult) nodeElements.push(...leftResult);
    }

    if (node.right) {
      const rightX = x + horizontalSpacing;
      const rightY = y + 100;
      const rightResult = renderTree(
        { ...node.right, parentValue: node.value }, 
        rightX, 
        rightY, 
        level + 1, 
        x, 
        y
      );
      if (rightResult) nodeElements.push(...rightResult);
    }

    // Render current node (on top of connections)
    const nodeGroup = (
      <g key={`node-${node.value}-${x}-${y}`}>
        {/* Node circle */}
        <motion.circle
          cx={x}
          cy={y}
          r={25}
          fill={getNodeColor(node, isCurrent, isNewlyInserted, isInPath, isTraversed, action)}
          stroke={getNodeStroke(node, isCurrent, isNewlyInserted, isInPath)}
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: level * 0.1 }}
        />
        
        {/* Node value */}
        <text 
          x={x} 
          y={y + 5} 
          textAnchor="middle" 
          fill="white" 
          fontSize="14" 
          fontWeight="bold"
          pointerEvents="none"
        >
          {node.value}
        </text>

        {/* Height indicator for AVL trees */}
        {node.height !== undefined && (
          <text 
            x={x} 
            y={y - 35} 
            textAnchor="middle" 
            fill="#a0aec0" 
            fontSize="10"
            pointerEvents="none"
          >
            h:{node.height}
          </text>
        )}

        {/* Balance factor for AVL trees */}
        {node.balance !== undefined && (
          <text 
            x={x} 
            y={y - 45} 
            textAnchor="middle" 
            fill="#e53e3e" 
            fontSize="10"
            pointerEvents="none"
          >
            b:{node.balance}
          </text>
        )}

        {/* Frequency for BST */}
        {node.frequency > 1 && (
          <text 
            x={x + 20} 
            y={y - 10} 
            textAnchor="middle" 
            fill="#f1c40f" 
            fontSize="10"
            pointerEvents="none"
          >
            x{node.frequency}
          </text>
        )}

        {/* Highlight for current operation */}
        {(isCurrent || isNewlyInserted || isInPath) && (
          <motion.circle
            cx={x}
            cy={y}
            r={32}
            fill="transparent"
            stroke={getHighlightColor(isCurrent, isNewlyInserted, isInPath, action)}
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              repeat: (isCurrent || isNewlyInserted) ? Infinity : 0,
              repeatType: "reverse" 
            }}
          />
        )}

        {/* Path animation for search/traverse */}
        {isInPath && (
          <motion.circle
            cx={x}
            cy={y}
            r={28}
            fill="transparent"
            stroke="#f1c40f"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
        )}
      </g>
    );

    nodeElements.push(nodeGroup);
    return nodeElements;
  };

  const getNodeColor = (node, isCurrent, isNewlyInserted, isInPath, isTraversed, action) => {
    if (isNewlyInserted) return '#e74c3c'; // Red for newly inserted
    if (action === 'delete' && isCurrent) return '#e74c3c'; // Red for node being deleted
    if (isInPath && action === 'search') return '#9b59b6'; // Purple for search path
    if (isInPath && action === 'traverse') return '#3498db'; // Blue for traversal
    if (isCurrent && action === 'insert') return '#f1c40f'; // Yellow for current insertion
    if (isCurrent && action === 'rotate') return '#9b59b6'; // Purple for rotation
    if (isCurrent) return '#3498db'; // Blue for current node
    return '#2ecc71'; // Green for regular nodes
  };

  const getNodeStroke = (node, isCurrent, isNewlyInserted, isInPath) => {
    if (isNewlyInserted) return '#c0392b';
    if (isInPath) return '#f39c12';
    if (isCurrent) return '#f39c12';
    return '#27ae60';
  };

  const getHighlightColor = (isCurrent, isNewlyInserted, isInPath, action) => {
    if (isNewlyInserted) return '#e74c3c';
    if (action === 'delete') return '#e74c3c';
    if (isInPath) return '#f1c40f';
    return '#3498db';
  };

  // Calculate initial root position to ensure tree is centered
  const getRootPosition = () => {
    const centerX = svgWidth / 2;
    const startY = 80;
    
    // If we have tree data, try to better center the tree
    if (tree && width > 0) {
      // Adjust starting X based on tree width to better center it
      const treeWidthEstimate = width * 120;
      return {
        x: Math.max(horizontalPadding, Math.min(svgWidth - horizontalPadding, centerX)),
        y: startY
      };
    }
    
    return { x: centerX, y: startY };
  };

  const rootPos = getRootPosition();

  return (
    <div className="bst-viewer" ref={containerRef}>
      <div className="tree-info">
  <h4>{algorithm.replace(/-/g, ' ').toUpperCase()}</h4>
  {stepType === 'insert' && insertedValue && (
    <p>Inserting value: <strong>{insertedValue}</strong></p>
  )}
  {stepType === 'bulk-insert' && (
    <p>Bulk insertion in progress</p>
  )}
  {stepType === 'search' && currentNode && (
    <p>Searching for: <strong>{currentNode}</strong></p>
  )}
  {stepType === 'delete' && currentNode && (
    <p>Deleting node: <strong>{currentNode}</strong></p>
  )}
  {stepType === 'traverse' && (
    <p>Traversal: <strong>{algorithm.includes('inorder') ? 'Inorder' : algorithm.includes('preorder') ? 'Preorder' : 'Postorder'}</strong></p>
  )}
  {action && <p>Action: <strong>{action}</strong></p>}
  {path && path.length > 0 && (
    <p>Path: <strong>{path.join(' → ')}</strong></p>
  )}
  <p>Total nodes: <strong>{nodeCount}</strong></p>
  {step.currentLine !== undefined && (
    <p>Step: <strong>{currentStep + 1} of {totalSteps}</strong></p>
  )}
</div>
      
      <ZoomPanWrapper 
        initialScale={nodeCount > 8 ? 0.8 : 1}
        minScale={0.3}
        maxScale={3}
        className="bst-zoom-wrapper"
      >
        <svg 
          ref={svgRef}
          width={svgWidth} 
          height={svgHeight} 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            minHeight: '400px'
          }}
        >
          {/* Background grid for better orientation */}
          <defs>
            <pattern id="smallGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2d3748" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
          
          {tree ? renderTree(tree, rootPos.x, rootPos.y) : (
            <text 
              x={svgWidth / 2} 
              y={svgHeight / 2} 
              textAnchor="middle" 
              fill="#a0aec0"
              fontSize="16"
            >
              Empty Tree
            </text>
          )}
        </svg>
      </ZoomPanWrapper>

      <div className="tree-controls">
        <small>Use mouse wheel to zoom • Click and drag to pan • Double click to reset view</small>
      </div>
    </div>
  );
};

export default BSTViewer;