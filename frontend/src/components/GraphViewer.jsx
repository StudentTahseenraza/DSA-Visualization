// components/GraphViewer.jsx
import { motion } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import '../styles/GraphViewer.css';

const GraphViewer = ({ step, algorithm = '' }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: Math.max(800, containerRef.current.clientWidth),
          height: Math.max(500, containerRef.current.clientHeight)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate node positions with proper scaling
  const { nodePositions, svgWidth, svgHeight } = useMemo(() => {
    const displayGraph = step?.graph || {};

    const nodes = Object.keys(displayGraph);
    const positions = {};

    if (nodes.length === 0) {
      return {
        nodePositions: {},
        svgWidth: 600,
        svgHeight: 400
      };
    }

    // Calculate dynamic SVG dimensions based on number of nodes
    const nodeCount = nodes.length;
    const baseWidth = 800;
    const baseHeight = 500;

    // Scale up for many nodes
    let svgWidth = baseWidth;
    let svgHeight = baseHeight;

    if (nodeCount > 12) {
      svgWidth = baseWidth + (nodeCount - 12) * 40;
      svgHeight = baseHeight + (nodeCount - 12) * 30;
    } else if (nodeCount > 8) {
      svgWidth = baseWidth + 100;
      svgHeight = baseHeight + 80;
    }

    const margin = 80;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = Math.min(svgWidth, svgHeight) * 0.35;

    nodes.forEach((node, index) => {
      const angle = (2 * Math.PI * index) / nodeCount - Math.PI / 2;
      positions[node] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    return {
      nodePositions: positions,
      svgWidth,
      svgHeight
    };
  }, [step?.graph, dimensions]);

  // Render all edges
  // components/GraphViewer.jsx (updated renderEdges function)

  const renderEdges = () => {
    const displayGraph = step?.graph || {};
    const {
      edgePath = [],      // For BFS/DFS/Dijkstra - edges taken during traversal
      mstEdges = [],      // For Prim/Kruskal - edges in MST
      currentEdge = null, // For Kruskal - edge currently being processed
      path = [],
      currentNode
    } = step || {};

    const edges = [];
    const addedEdges = new Set();

    Object.keys(displayGraph).forEach((node) => {
      const neighbors = displayGraph[node];
      if (neighbors && typeof neighbors === 'object') {
        Object.keys(neighbors).forEach((neighbor) => {
          const edgeKey = [node, neighbor].sort().join('-');
          if (!addedEdges.has(edgeKey)) {
            addedEdges.add(edgeKey);

            const start = nodePositions[node];
            const end = nodePositions[neighbor];

            if (start && end) {
              // Check different types of edge highlighting
              const isInEdgePath = edgePath && edgePath.some(([from, to]) =>
                (from === node && to === neighbor) || (from === neighbor && to === node)
              );

              const isInMST = mstEdges && mstEdges.some(edge =>
                (edge.from === node && edge.to === neighbor) ||
                (edge.from === neighbor && edge.to === node)
              );

              const isCurrentEdge = currentEdge && (
                (currentEdge.from === node && currentEdge.to === neighbor) ||
                (currentEdge.from === neighbor && currentEdge.to === node)
              );

              // Determine edge color and style based on what it represents
              let edgeColor = '#718096'; // Default gray
              let edgeWidth = 2;
              let isDashed = false;
              let glowEffect = false;

              if (isInMST) {
                edgeColor = '#2ecc71'; // Green for MST edges
                edgeWidth = 4;
              } else if (isInEdgePath) {
                edgeColor = '#e74c3c'; // Red for traversal path edges
                edgeWidth = 4;
                glowEffect = true;
              } else if (isCurrentEdge) {
                edgeColor = '#9b59b6'; // Purple for currently processing edge
                edgeWidth = 4;
                isDashed = true;
                glowEffect = true;
              }

              return (
                <g key={`edge-${node}-${neighbor}`}>
                  {/* Edge line */}
                  <motion.line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={edgeColor}
                    strokeWidth={edgeWidth}
                    strokeDasharray={isDashed ? "6,4" : "none"}
                    initial={{ strokeOpacity: 0, pathLength: 0 }}
                    animate={{
                      strokeOpacity: 1,
                      pathLength: 1,
                      ...(glowEffect && {
                        stroke: [edgeColor, '#ffffff', edgeColor],
                      })
                    }}
                    transition={{
                      duration: 0.5,
                      ...(glowEffect && {
                        stroke: { duration: 0.8, repeat: Infinity }
                      })
                    }}
                  />

                  {/* Edge weight background */}
                  <rect
                    x={(start.x + end.x) / 2 - 18}
                    y={(start.y + end.y) / 2 - 12}
                    width="36"
                    height="20"
                    rx="4"
                    fill="#1a1a2e"
                    stroke={edgeColor}
                    strokeWidth="1.5"
                  />

                  {/* Edge weight */}
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2}
                    fill={edgeColor === '#718096' ? '#a0aec0' : edgeColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {neighbors[neighbor]}
                  </text>

                  {/* Animation for current edge being processed */}
                  {isCurrentEdge && (
                    <>
                      <motion.circle
                        cx={(start.x + end.x) / 2}
                        cy={(start.y + end.y) / 2}
                        r="10"
                        fill="#9b59b6"
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      {/* Direction arrow for current edge */}
                      <motion.polygon
                        points={`${end.x - 8},${end.y - 4} ${end.x},${end.y} ${end.x - 8},${end.y + 4}`}
                        fill="#9b59b6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </>
                  )}

                  {/* Small arrow indicator for path direction */}
                  {isInEdgePath && !isCurrentEdge && (
                    <polygon
                      points={`${end.x - 6},${end.y - 3} ${end.x},${end.y} ${end.x - 6},${end.y + 3}`}
                      fill="#e74c3c"
                      opacity="0.8"
                    />
                  )}
                </g>
              );
            }
          }
        });
      }
    });

    return edges;
  };

  // Render all nodes
  const renderNodes = () => {
    const displayGraph = step?.graph || {};
    const {
      queue = [],
      visited = [],
      currentNode,
      path = [],
      distances = {},
      stack = []
    } = step || {};

    return Object.keys(displayGraph).map((node, idx) => {
      const pos = nodePositions[node];
      if (!pos) return null;

      const isCurrent = node === currentNode;
      const isVisited = visited && visited.includes(node);
      const isInPath = path && path.includes(node);
      const isInQueue = queue && queue.includes(node);
      const isInStack = stack && stack.includes(node);

      let nodeColor = '#4a5568'; // Default gray
      let nodeStroke = '#2d3748';
      let glowColor = '';

      if (isCurrent) {
        nodeColor = '#e74c3c'; // Red for current
        nodeStroke = '#c0392b';
        glowColor = 'rgba(231, 76, 60, 0.5)';
      } else if (isInPath) {
        nodeColor = '#27ae60'; // Green for path
        nodeStroke = '#229954';
        glowColor = 'rgba(39, 174, 96, 0.3)';
      } else if (isVisited) {
        nodeColor = '#3498db'; // Blue for visited
        nodeStroke = '#2980b9';
      } else if (isInQueue || isInStack) {
        nodeColor = '#f1c40f'; // Yellow for queued/stack
        nodeStroke = '#f39c12';
      }

      const nodeRadius = Math.min(24, Math.max(18, 40 - Object.keys(displayGraph).length));

      return (
        <motion.g
          key={node}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.03 }}
        >
          {/* Glow effect for current/path nodes */}
          {(isCurrent || isInPath) && (
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius + 8}
              fill={glowColor}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                r: [nodeRadius + 5, nodeRadius + 12, nodeRadius + 5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}

          {/* Node circle */}
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill={nodeColor}
            stroke={nodeStroke}
            strokeWidth={3}
            whileHover={{ scale: 1.1, cursor: 'pointer' }}
            animate={{
              fill: nodeColor,
              stroke: nodeStroke,
              scale: isCurrent ? [1, 1.05, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Node label */}
          <text
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={nodeRadius * 0.6}
            fontWeight="bold"
            dominantBaseline="middle"
          >
            {node}
          </text>

          {/* Distance display for Dijkstra */}
          {distances && distances[node] !== undefined && distances[node] !== Infinity && (
            <text
              x={pos.x}
              y={pos.y + nodeRadius + 15}
              textAnchor="middle"
              fill="#f1c40f"
              fontSize="10"
              fontWeight="bold"
            >
              {distances[node]}
            </text>
          )}

          {/* Animation ring for current node */}
          {isCurrent && (
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius + 4}
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
          )}
        </motion.g>
      );
    });
  };

  // Get current action description
  const getActionDescription = () => {
    if (!step) return 'No graph data to display';

    const { action, currentNode, queue = [], visited = [], path = [], edgePath = [] } = step;

    switch (action) {
      case 'init-queue':
        return `Initialized queue with start node ${queue[0]}`;
      case 'init-stack':
        return `Initialized stack with start node ${queue[0] || stack[0]}`;
      case 'mark-visited':
        return `Marked node ${currentNode} as visited`;
      case 'dequeue':
        return `Dequeued node ${currentNode}`;
      case 'pop':
        return `Popped node ${currentNode} from stack`;
      case 'process':
        return `Processing node ${currentNode}`;
      case 'enqueue':
      case 'push':
        const lastEdge = edgePath && edgePath.length > 0 ? edgePath[edgePath.length - 1] : null;
        return lastEdge ? `Added ${currentNode} via edge ${lastEdge[0]}→${lastEdge[1]}` : `Added ${currentNode}`;
      case 'extract-min':
        return `Extracted node ${currentNode} with minimum distance`;
      case 'update-distance':
        return `Updated distance to ${currentNode}`;
      case 'add-to-mst':
        return `Added node ${currentNode} to MST`;
      case 'process-edge':
        return `Processing edge ${step.currentEdge?.from}→${step.currentEdge?.to}`;
      case 'add-edge':
        return `Added edge to MST`;
      case 'skip-cycle':
        return `Skipped edge (would create cycle)`;
      case 'complete':
        return `Algorithm complete! ${visited.length} nodes visited`;
      default:
        return `Current action: ${action || 'processing'}`;
    }
  };

  const displayGraph = step?.graph || {};
  const {
    queue = [],
    stack = [],
    visited = [],
    path = [],
    distances = {},
    edgePath = [],
    mstEdges = []
  } = step || {};

  if (Object.keys(displayGraph).length === 0) {
    return (
      <div className="graph-viewer">
        <div className="graph-info">
          <h4>GRAPH VISUALIZATION</h4>
          <p className="action-description">No graph data to display. Create a graph using the controls above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="graph-viewer" ref={containerRef}>
      <div className="graph-header">
        <h3>{algorithm.replace(/-/g, ' ').toUpperCase()}</h3>
        <p className="action-description">{getActionDescription()}</p>
      </div>

      {/* Graph Statistics */}
      <div className="graph-stats">
        {queue.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Queue:</span>
            <span className="stat-value">[{queue.join(', ')}]</span>
          </div>
        )}

        {stack && stack.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Stack:</span>
            <span className="stat-value">[{stack.join(', ')}]</span>
          </div>
        )}

        {visited.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Visited:</span>
            <span className="stat-value">[{visited.join(', ')}]</span>
          </div>
        )}

        {path.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Traversal Order:</span>
            <span className="stat-value">[{path.join(' → ')}]</span>
          </div>
        )}

        {edgePath && edgePath.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Edges Taken:</span>
            <span className="stat-value">
              {edgePath.map(([from, to]) => `${from}→${to}`).join(', ')}
            </span>
          </div>
        )}

        {mstEdges && mstEdges.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">MST Edges:</span>
            <span className="stat-value">
              {mstEdges.map(edge => `${edge.from}-${edge.to}(${edge.weight})`).join(', ')}
            </span>
          </div>
        )}

        {Object.keys(distances).length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Distances:</span>
            <span className="stat-value">
              {Object.entries(distances)
                .map(([node, dist]) => `${node}:${dist === Infinity ? '∞' : dist}`)
                .join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Main Graph Visualization with Scroll */}
      <div className="graph-visualization-scroll">
        <div className="graph-svg-container" style={{ minWidth: `${svgWidth}px`, minHeight: `${svgHeight}px` }}>
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '10px',
              border: '2px solid #34495e',
              display: 'block'
            }}
          >
            {renderEdges()}
            {renderNodes()}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="graph-legend">
        <div className="legend-item">
          <div className="legend-color current"></div>
          <span>Current Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color visited"></div>
          <span>Visited</span>
        </div>
        <div className="legend-item">
          <div className="legend-color path"></div>
          <span>In Path</span>
        </div>
        <div className="legend-item">
          <div className="legend-color queue"></div>
          <span>In Queue/Stack</span>
        </div>
        <div className="legend-item">
          <div className="legend-color mst-edge"></div>
          <span>MST Edge</span>
        </div>
        <div className="legend-item">
          <div className="legend-color traversal-edge"></div>
          <span>Traversal Edge</span>
        </div>
      </div>
    </div>
  );
};

export default GraphViewer;