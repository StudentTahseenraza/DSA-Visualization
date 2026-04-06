// components/BSTViewer.jsx - Updated version
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState, useRef, useEffect } from 'react';
import '../styles/BSTViewer.css';

const BSTViewer = ({ step, algorithm = '' }) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [currentTree, setCurrentTree] = useState(null);
  const [transitioningNodes, setTransitioningNodes] = useState(new Set());
  const [deletedNodes, setDeletedNodes] = useState(new Set());

  // Update current tree whenever step changes
  useEffect(() => {
    if (step && step.tree) {
      // Handle deletion animation
      if (step.action === 'delete-removing' && step.removedNode) {
        setDeletedNodes(prev => new Set(prev).add(step.removedNode));
        setTransitioningNodes(prev => new Set(prev).add(step.removedNode));

        // Remove after animation completes
        setTimeout(() => {
          setDeletedNodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(step.removedNode);
            return newSet;
          });
          setTransitioningNodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(step.removedNode);
            return newSet;
          });
          setCurrentTree(step.tree);
        }, 500);
      }
      else if (step.action === 'delete-replacing' && step.currentNode) {
        setTransitioningNodes(prev => new Set(prev).add(step.currentNode));
        setTimeout(() => {
          setTransitioningNodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(step.currentNode);
            return newSet;
          });
          setCurrentTree(step.tree);
        }, 400);
      }
      else if (step.action === 'value-replaced') {
        // For value replacement, just update the tree
        setCurrentTree(step.tree);
      }
      else {
        setCurrentTree(step.tree);
        // Clear deleted nodes when not in deletion
        if (step.action !== 'delete-removing' && step.action !== 'delete-replacing') {
          setDeletedNodes(new Set());
          setTransitioningNodes(new Set());
        }
      }
    }
  }, [step]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(600, width),
          height: Math.max(400, height)
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

  const tree = currentTree || step.tree;
  const { currentNode, action, insertedValue, stepType, path = [] } = step;

  const isDeleteOperation = stepType === 'delete' || action === 'delete';

  // Check if node exists in tree
  const nodeExists = (node, value) => {
    if (!node) return false;
    if (node.value === value) return true;
    return nodeExists(node.left, value) || nodeExists(node.right, value);
  };

  // Calculate tree dimensions for proper sizing
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

  // Dynamic spacing based on tree size
  const horizontalPadding = 60;
  const verticalPadding = 60;
  const nodeRadius = 25;
  const levelHeight = 100;

  // Calculate node positions
  const calculateNodePositions = (node, x, y, level = 0, positions = {}) => {
    if (!node) return positions;

    const horizontalSpacing = Math.max(80, 180 / Math.pow(level + 1, 0.7));

    positions[node.value] = { x, y, level, node };

    if (node.left) {
      calculateNodePositions(node.left, x - horizontalSpacing, y + levelHeight, level + 1, positions);
    }
    if (node.right) {
      calculateNodePositions(node.right, x + horizontalSpacing, y + levelHeight, level + 1, positions);
    }

    return positions;
  };

  // Find root position
  const findRootPosition = () => {
    const centerX = Math.max(400, (maxLevelWidth * 70) / 2);
    const startY = 60;
    return { x: centerX, y: startY };
  };

  const rootPos = findRootPosition();
  const nodePositions = tree ? calculateNodePositions(tree, rootPos.x, rootPos.y) : {};

  // Calculate SVG dimensions based on content
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  Object.values(nodePositions).forEach(pos => {
    minX = Math.min(minX, pos.x - nodeRadius - 10);
    maxX = Math.max(maxX, pos.x + nodeRadius + 10);
    minY = Math.min(minY, pos.y - nodeRadius - 10);
    maxY = Math.max(maxY, pos.y + nodeRadius + 10);
  });

  const svgWidth = Math.max(800, (maxX - minX) + horizontalPadding * 2);
  const svgHeight = Math.max(500, (maxY - minY) + verticalPadding * 2);
  const viewBoxX = Math.max(0, minX - horizontalPadding);
  const viewBoxY = Math.max(0, minY - verticalPadding);

  const getNodeColor = (nodeValue, isCurrent, isNewlyInserted, isInPath, isTraversed, actionType) => {
    if (transitioningNodes.has(nodeValue)) return '#e74c3c';
    if (isNewlyInserted) return '#2ecc71';
    if (actionType === 'delete' && isCurrent) return '#e74c3c';
    if (isInPath && actionType === 'search') return '#f39c12';
    if (isInPath && actionType === 'traverse') return '#3498db';
    if (isCurrent && actionType === 'insert') return '#2ecc71';
    if (isCurrent && actionType === 'rotate') return '#9b59b6';
    if (isCurrent) return '#3498db';
    return '#27ae60';
  };

  const getNodeStroke = (nodeValue, isCurrent, isNewlyInserted, isInPath) => {
    if (transitioningNodes.has(nodeValue)) return '#c0392b';
    if (isNewlyInserted) return '#27ae60';
    if (isInPath) return '#f39c12';
    if (isCurrent) return '#f39c12';
    return '#2ecc71';
  };

  const getHighlightColor = (isCurrent, isNewlyInserted, isInPath, actionType) => {
    if (isNewlyInserted) return '#2ecc71';
    if (actionType === 'delete') return '#e74c3c';
    if (isInPath) return '#f1c40f';
    return '#3498db';
  };

  // Render connections
  const renderConnections = () => {
    const connections = [];
    const added = new Set();

    const addConnection = (parent, child) => {
      const key = `${parent.value}-${child.value}`;
      if (added.has(key)) return;
      added.add(key);

      const parentPos = nodePositions[parent.value];
      const childPos = nodePositions[child.value];

      if (parentPos && childPos) {
        const isPathConnection = path.includes(child.value) && path[path.indexOf(child.value) - 1] === parent.value;
        const isTransitioning = transitioningNodes.has(child.value);

        connections.push(
          <motion.line
            key={`line-${parent.value}-${child.value}`}
            x1={parentPos.x}
            y1={parentPos.y + nodeRadius - 5}
            x2={childPos.x}
            y2={childPos.y - nodeRadius + 5}
            stroke={isTransitioning ? '#e74c3c' : (isPathConnection ? "#f1c40f" : "#718096")}
            strokeWidth={isPathConnection ? 3 : 2}
            strokeDasharray={isPathConnection ? "6,3" : "none"}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        );
      }
    };

    const traverse = (node) => {
      if (!node) return;
      if (node.left) {
        addConnection(node, node.left);
        traverse(node.left);
      }
      if (node.right) {
        addConnection(node, node.right);
        traverse(node.right);
      }
    };

    traverse(tree);
    return connections;
  };

  // Render nodes
  const renderNodes = () => {
    const nodes = [];

    Object.entries(nodePositions).forEach(([value, pos]) => {
      const node = pos.node;

      // Skip if node is marked as deleted
      if (deletedNodes.has(parseInt(value)) || deletedNodes.has(value)) {
        return;
      }

      const isCurrent = currentNode && node.value === currentNode;
      const isNewlyInserted = stepType === 'insert' && insertedValue === node.value;
      const isInPath = path && path.includes(node.value);
      const isBeingDeleted = transitioningNodes.has(node.value);
      const nodeExistsInTree = nodeExists(tree, node.value);

      if (!nodeExistsInTree && isBeingDeleted) {
        // Render fading out node
        nodes.push(
          <motion.g
            key={`node-${node.value}`}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius}
              fill="#e74c3c"
              stroke="#c0392b"
              strokeWidth="3"
            />
            <text
              x={pos.x}
              y={pos.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
            >
              {node.value}
            </text>
            <motion.text
              x={pos.x}
              y={pos.y - 15}
              textAnchor="middle"
              fill="#e74c3c"
              fontSize="10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Deleting...
            </motion.text>
          </motion.g>
        );
        return;
      }

      if (!nodeExistsInTree && !isBeingDeleted) return;

      const nodeColor = getNodeColor(node.value, isCurrent, isNewlyInserted, isInPath, action);
      const nodeStroke = getNodeStroke(node.value, isCurrent, isNewlyInserted, isInPath);
      const highlightColor = getHighlightColor(isCurrent, isNewlyInserted, isInPath, action);

      // Determine if this node is being replaced
      const isBeingReplaced = step.action === 'delete-replacing' && step.currentNode === node.value;

      nodes.push(
        <motion.g
          key={`node-${node.value}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: isBeingReplaced ? [0, 10, 0] : 0,
            y: isBeingReplaced ? [0, -10, 0] : 0
          }}
          transition={{
            duration: 0.4,
            delay: pos.level * 0.05,
            type: "spring",
            stiffness: 400,
            damping: 20
          }}
          layout
        >
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill={nodeColor}
            stroke={nodeStroke}
            strokeWidth="3"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            animate={
              (isCurrent || isNewlyInserted || isBeingReplaced) && !transitioningNodes.has(node.value)
                ? {
                  scale: [1, 1.08, 1],
                  transition: { duration: 0.6, repeat: isCurrent ? Infinity : 1, repeatDelay: 0.4 }
                }
                : {}
            }
          />

          <text
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            pointerEvents="none"
          >
            {node.value}
          </text>

          {/* Show "Replacing" label for nodes being replaced */}
          {isBeingReplaced && (
            <motion.text
              x={pos.x}
              y={pos.y - 20}
              textAnchor="middle"
              fill="#f39c12"
              fontSize="9"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Replacing...
            </motion.text>
          )}

          {(isCurrent || isNewlyInserted || isInPath) && !transitioningNodes.has(node.value) && (
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius + 6}
              fill="transparent"
              stroke={highlightColor}
              strokeWidth="2"
              strokeDasharray="6,4"
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{
                duration: 0.8,
                repeat: (isCurrent || isNewlyInserted) ? Infinity : 0,
                repeatDelay: 0.3
              }}
            />
          )}

          {node.frequency && node.frequency > 1 && (
            <text
              x={pos.x + 18}
              y={pos.y - 12}
              textAnchor="middle"
              fill="#f1c40f"
              fontSize="10"
              fontWeight="bold"
            >
              x{node.frequency}
            </text>
          )}
        </motion.g>
      );
    });

    return nodes;
  };

  const deletedNodeStillExists = currentNode && nodeExists(tree, currentNode);

  return (
    <div className="bst-viewer" ref={containerRef}>
      <div className="tree-info">
        <h4>{algorithm.replace(/-/g, ' ').toUpperCase()}</h4>
        {stepType === 'insert' && insertedValue && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Inserting value: <strong>{insertedValue}</strong>
          </motion.p>
        )}
        {stepType === 'bulk-insert' && (
          <p>Bulk insertion in progress</p>
        )}
        {stepType === 'search' && currentNode && (
          <p>Searching for: <strong>{currentNode}</strong></p>
        )}
        {stepType === 'delete' && currentNode && (
          <motion.p
            className="delete-message"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Deleting node: <strong>{currentNode}</strong> -
            {deletedNodeStillExists ? ' Node found, removing...' : ' Node successfully removed!'}
          </motion.p>
        )}
        {stepType === 'traverse' && (
          <p>Traversal: <strong>
            {algorithm.includes('inorder') ? 'Inorder' :
              algorithm.includes('preorder') ? 'Preorder' :
                algorithm.includes('postorder') ? 'Postorder' : 'Traversal'}
          </strong></p>
        )}
        {action && action !== 'traverse' && <p>Action: <strong>{action}</strong></p>}
        {path && path.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Path: <strong>{path.join(' → ')}</strong>
          </motion.p>
        )}
        <p>Total nodes: <strong>{nodeCount}</strong> | Tree height: <strong>{depth + 1}</strong></p>
      </div>

      {/* Scrollable container instead of ZoomPanWrapper */}
      <div className="bst-scroll-container">
        <div
          className="bst-svg-wrapper"
          style={{
            minWidth: `${svgWidth}px`,
            minHeight: `${svgHeight}px`
          }}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`${viewBoxX} ${viewBoxY} ${svgWidth} ${svgHeight}`}
            className="bst-svg"
            style={{ display: 'block' }}
          >
            <defs>
              <pattern id="smallGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#2d3748" strokeWidth="0.5" />
              </pattern>
              <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            <g filter="url(#nodeShadow)">
              {renderConnections()}
              {renderNodes()}
            </g>
          </svg>
        </div>
      </div>

      <div className="tree-controls">
        <small>🔍 Use scroll wheel to zoom • Click and drag to pan • Double click to reset</small>
      </div>
    </div>
  );
};

export default BSTViewer;