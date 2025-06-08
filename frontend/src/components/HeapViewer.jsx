// components/HeapViewer.jsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/HeapViewer.css';

const HeapViewer = ({ step }) => {
  if (!step || !step.heap) {
    return <div className="heap-viewer">No heap to display</div>;
  }

  const { heap, currentIndices, action } = step;

  const calculateDimensions = (arr) => {
    if (!arr || arr.length === 0) return { maxLevel: 0, maxWidth: 200 };
    const maxLevel = Math.floor(Math.log2(arr.length));
    const maxWidth = Math.pow(2, maxLevel) * 100;
    return { maxLevel, maxWidth };
  };

  const { maxLevel, maxWidth } = useMemo(() => calculateDimensions(heap), [heap]);

  const svgWidth = Math.max(800, maxWidth + 200);
  const svgHeight = Math.max(400, (maxLevel + 1) * 100 + 100);

  const renderHeap = (arr, index = 0, x = svgWidth / 2, y = 50, dx = 200, level = 0) => {
    if (index >= arr.length || arr[index] === null) return null;
    const isCurrent = currentIndices && currentIndices.includes(index);
    const adjustedDx = dx / (1 + level * 0.5);
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;

    return (
      <>
        <motion.g
          key={`node-${index}-${x}-${y}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        >
          <motion.circle
            cx={x}
            cy={y}
            r={20}
            fill={
              isCurrent
                ? action === 'heapify' || action === 'swap'
                  ? '#f1c40f'
                  : '#2ecc71'
                : '#3498db'
            }
            animate={{ cx: x, cy: y }}
            transition={{ duration: 0.3 }}
          />
          <text x={x} y={y + 5} textAnchor="middle" fill="white">
            {arr[index]}
          </text>
        </motion.g>
        {leftChild < arr.length && arr[leftChild] !== null && (
          <>
            <line x1={x} y1={y + 20} x2={x - adjustedDx} y2={y + 80} stroke="black" />
            {renderHeap(arr, leftChild, x - adjustedDx, y + 80, adjustedDx / 2, level + 1)}
          </>
        )}
        {rightChild < arr.length && arr[rightChild] !== null && (
          <>
            <line x1={x} y1={y + 20} x2={x + adjustedDx} y2={y + 80} stroke="black" />
            {renderHeap(arr, rightChild, x + adjustedDx, y + 80, adjustedDx / 2, level + 1)}
          </>
        )}
      </>
    );
  };

  return (
    <div className="heap-viewer">
      <ZoomPanWrapper>
        <svg width={svgWidth} height={svgHeight}>{renderHeap(heap)}</svg>
      </ZoomPanWrapper>
    </div>
  );
};

export default HeapViewer;