// components/TrieViewer.jsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/TrieViewer.css';

const TrieViewer = ({ step }) => {
  if (!step || !step.trie) {
    return <div className="trie-viewer">No trie to display</div>;
  }

  const { trie, currentNode, path, action } = step;

  const calculateDimensions = (node, level = 0, maxLevel = 0, maxWidth = 0) => {
    if (!node) return { maxLevel, maxWidth };
    const children = Object.values(node.children || {});
    const currentWidth = children.length * 100;
    maxWidth = Math.max(maxWidth, currentWidth || 200);
    let newMaxLevel = Math.max(maxLevel, level);
    for (const child of children) {
      const { maxLevel: childMaxLevel, maxWidth: childMaxWidth } = calculateDimensions(
        child,
        level + 1,
        newMaxLevel,
        maxWidth
      );
      newMaxLevel = Math.max(newMaxLevel, childMaxLevel);
      maxWidth = Math.max(maxWidth, childMaxWidth);
    }
    return { maxLevel: newMaxLevel, maxWidth };
  };

  const { maxLevel, maxWidth } = useMemo(() => calculateDimensions(trie), [trie]);

  const svgWidth = Math.max(800, maxWidth + 200);
  const svgHeight = Math.max(400, (maxLevel + 1) * 100 + 100);

  const renderTrie = (node, x = svgWidth / 2, y = 50, dx = 200, level = 0) => {
    if (!node) return null;
    const isCurrent = currentNode && node.char === currentNode.char && node.isEnd === currentNode.isEnd;
    const isInPath = path && path.some((p) => p.char === node.char && p.isEnd === node.isEnd);
    const adjustedDx = dx / (1 + level * 0.5);
    const children = Object.entries(node.children || {});
    const childSpacing = adjustedDx / Math.max(children.length, 1);

    return (
      <>
        <motion.g
          key={`node-${node.char}-${node.isEnd}-${x}-${y}`}
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
                : isInPath
                ? '#e74c3c'
                : node.isEnd
                ? '#2ecc71'
                : '#3498db'
            }
            animate={{ cx: x, cy: y }}
            transition={{ duration: 0.3 }}
          />
          <text x={x} y={y + 5} textAnchor="middle" fill="white">
            {node.char || '*'}
          </text>
        </motion.g>
        {children.map(([char, child], i) => {
          const childX = x - adjustedDx / 2 + (i + 0.5) * childSpacing;
          return (
            <>
              <line x1={x} y1={y + 20} x2={childX} y2={y + 80} stroke="black" />
              <text x={(x + childX) / 2} y={(y + 20 + y + 80) / 2} fill="black">
                {char}
              </text>
              {renderTrie(child, childX, y + 80, adjustedDx / 2, level + 1)}
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="trie-viewer">
      <ZoomPanWrapper>
        <svg width={svgWidth} height={svgHeight}>{renderTrie(trie)}</svg>
      </ZoomPanWrapper>
    </div>
  );
};

export default TrieViewer;