// components/BSTViewer.jsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/BSTViewer.css';

const BSTViewer = ({ step }) => {
  if (!step || !step.tree) {
    return <div className="bst-viewer">No tree to display</div>;
  }

  const { tree, currentNode, action } = step;

  const calculateDimensions = (node, level = 0, maxLevel = 0, maxWidth = 0) => {
    if (!node) return { maxLevel, maxWidth };
    const currentWidth = 200 / (1 + level * 0.5);
    maxWidth = Math.max(maxWidth, currentWidth);
    const { maxLevel: leftMaxLevel, maxWidth: leftMaxWidth } = calculateDimensions(
      node.left,
      level + 1,
      maxLevel,
      maxWidth
    );
    const { maxLevel: rightMaxLevel, maxWidth: rightMaxWidth } = calculateDimensions(
      node.right,
      level + 1,
      maxLevel,
      maxWidth
    );
    return {
      maxLevel: Math.max(maxLevel, leftMaxLevel, rightMaxLevel, level),
      maxWidth: Math.max(maxWidth, leftMaxWidth, rightMaxWidth),
    };
  };

  const { maxLevel, maxWidth } = useMemo(() => calculateDimensions(tree), [tree]);

  const svgWidth = Math.max(800, maxWidth * (maxLevel + 1) + 200);
  const svgHeight = Math.max(400, (maxLevel + 1) * 100 + 100);

  const renderTree = (node, x = svgWidth / 2, y = 50, dx = 200, level = 0) => {
    if (!node) return null;
    const isCurrent = currentNode && node.value === currentNode.value;
    const adjustedDx = dx / (1 + level * 0.5);

    return (
      <>
        <motion.g
          key={`node-${node.value}-${x}-${y}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        >
          <motion.circle
            cx={x}
            cy={y}
            r={20}
            fill={
              isCurrent
                ? action === 'insert' || action === 'search'
                  ? '#2ecc71'
                  : '#f1c40f'
                : '#3498db'
            }
            animate={{ cx: x, cy: y }}
            transition={{ duration: 0.3 }}
          />
          <text x={x} y={y + 5} textAnchor="middle" fill="white">
            {node.value}
          </text>
        </motion.g>
        {node.left && (
          <>
            <line x1={x} y1={y + 20} x2={x - adjustedDx} y2={y + 80} stroke="black" />
            {renderTree(node.left, x - adjustedDx, y + 80, adjustedDx / 2, level + 1)}
          </>
        )}
        {node.right && (
          <>
            <line x1={x} y1={y + 20} x2={x + adjustedDx} y2={y + 80} stroke="black" />
            {renderTree(node.right, x + adjustedDx, y + 80, adjustedDx / 2, level + 1)}
          </>
        )}
      </>
    );
  };

  return (
    <div className="bst-viewer">
      <ZoomPanWrapper>
        <svg width={svgWidth} height={svgHeight}>{renderTree(tree)}</svg>
      </ZoomPanWrapper>
    </div>
  );
};

export default BSTViewer;