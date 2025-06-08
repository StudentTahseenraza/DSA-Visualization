// components/GraphViewer.jsx
import { motion } from 'framer-motion';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/GraphViewer.css';

const GraphViewer = ({ step }) => {
  if (!step || !step.graph) {
    return <div className="graph-viewer">No graph to display</div>;
  }

  const { graph, queue, stack, visited, currentNode, path, action, distances } = step;

  const nodePositions = Object.keys(graph).reduce((pos, node, i) => {
    const angle = (2 * Math.PI * i) / Object.keys(graph).length;
    pos[node] = { x: 200 + 100 * Math.cos(angle), y: 100 + 100 * Math.sin(angle) };
    return pos;
  }, {});

  const svgWidth = 400;
  const svgHeight = 200;

  const renderEdges = () => {
    const edges = [];
    Object.keys(graph).forEach((node) => {
      Object.keys(graph[node]).forEach((neighbor) => {
        if (node < neighbor) {
          const start = nodePositions[node];
          const end = nodePositions[neighbor];
          if (start && end) {
            edges.push(
              <>
                <line
                  key={`${node}-${neighbor}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="black"
                />
                <text
                  x={(start.x + end.x) / 2}
                  y={(start.y + end.y) / 2}
                  fill="black"
                  textAnchor="middle"
                >
                  {graph[node][neighbor]}
                </text>
              </>
            );
          }
        }
      });
    });
    return edges;
  };

  const renderNodes = () => {
    return Object.keys(graph).map((node) => {
      const isCurrent = node === currentNode;
      const isVisited = visited && visited.includes(node);
      const pos = nodePositions[node] || { x: 0, y: 0 };

      return (
        <motion.g
          key={node}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
        >
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r={20}
            fill={
              isCurrent
                ? action === 'process'
                  ? '#f1c40f'
                  : '#2ecc71'
                : isVisited
                ? '#2ecc71'
                : '#3498db'
            }
            animate={{ fill: isCurrent ? '#f1c40f' : isVisited ? '#2ecc71' : '#3498db' }}
            transition={{ duration: 0.3 }}
          />
          <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill="white">
            {node}
          </text>
          {distances && distances[node] !== Infinity && (
            <text x={pos.x} y={pos.y + 30} textAnchor="middle" fill="black">
              {distances[node]}
            </text>
          )}
        </motion.g>
      );
    });
  };

  return (
    <div className="graph-viewer">
      <ZoomPanWrapper>
        <svg width={svgWidth} height={svgHeight}>
          {renderEdges()}
          {renderNodes()}
        </svg>
      </ZoomPanWrapper>
      <div className="graph-info">
        <p>{stack ? 'Stack' : 'Queue'}: [{(stack || queue || []).join(', ')}]</p>
        <p>Visited: [{(visited || []).join(', ')}]</p>
        <p>Path: [{(path || []).join(', ')}]</p>
        {distances && (
          <p>
            Distances: [
            {Object.entries(distances)
              .map(([node, dist]) => `${node}:${dist === Infinity ? '∞' : dist}`)
              .join(', ')}
            ]
          </p>
        )}
      </div>
    </div>
  );
};

export default GraphViewer;