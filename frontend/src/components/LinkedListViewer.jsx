// components/LinkedListViewer.jsx
import { motion } from 'framer-motion';
import '../styles/LinkedListViewer.css';

const LinkedListViewer = ({ step }) => {
  if (!step || !step.nodes) {
    return <div className="linked-list-viewer">No linked list to display</div>;
  }

  const { nodes, currentNode, action } = step;

  const renderList = () => {
    const nodeElements = [];
    let x = 50;
    const y = 100;
    const spacing = 100;

    nodes.forEach((node, index) => {
      const isCurrent = node.value === currentNode;
      nodeElements.push(
        <motion.g
          key={`node-${node.value}-${index}`}
          initial={{ opacity: 0, x: x - 20 }}
          animate={{ opacity: 1, x, transition: { duration: 0.5 } }}
        >
          <motion.rect
            x={x}
            y={y - 20}
            width={60}
            height={40}
            rx={5}
            fill={
              action === 'insert' && isCurrent
                ? '#2ecc71'
                : action === 'delete' && isCurrent
                ? '#e74c3c'
                : isCurrent
                ? '#f1c40f'
                : '#3498db'
            }
            animate={{ fill: isCurrent ? '#f1c40f' : '#3498db' }}
            transition={{ duration: 0.3 }}
          />
          <text x={x + 30} y={y + 5} textAnchor="middle" fill="white">
            {node.value}
          </text>
        </motion.g>
      );

      if (node.next !== null) {
        nodeElements.push(
          <line
            key={`arrow-${index}`}
            x1={x + 60}
            y1={y}
            x2={x + spacing}
            y2={y}
            stroke="black"
            markerEnd="url(#arrowhead)"
          />
        );
      }

      x += spacing;
    });

    return nodeElements;
  };

  return (
    <div className="linked-list-viewer">
      <svg width="800" height="200">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
        {renderList()}
      </svg>
    </div>
  );
};

export default LinkedListViewer;