// components/GraphViewer.jsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/GraphViewer.css';

const GraphViewer = ({ step, algorithm = '' }) => {
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
    
    // Fixed SVG dimensions for consistent display
    const svgWidth = 800;
    const svgHeight = 500;
    const margin = 80;
    
    const nodeCount = nodes.length;
    
    // Use circular layout for all graph sizes
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = Math.min(svgWidth, svgHeight) * 0.35;
    
    nodes.forEach((node, index) => {
      const angle = (2 * Math.PI * index) / nodeCount - Math.PI / 2; // Start from top
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
  }, [step?.graph]);

  // Render all edges
  const renderEdges = () => {
    const displayGraph = step?.graph || {};
    const { edgePath = [], path = [], currentNode } = step || {};

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
              // Check if this edge is in the BFS traversal path
              const isInEdgePath = edgePath && edgePath.some(([from, to]) => 
                (from === node && to === neighbor) || (from === neighbor && to === node)
              );
              
              // Check if this edge is currently being processed
              const isCurrentEdge = edgePath && edgePath.length > 0 && 
                edgePath[edgePath.length - 1][0] === node && 
                edgePath[edgePath.length - 1][1] === neighbor;

              edges.push(
                <g key={`edge-${node}-${neighbor}`}>
                  <motion.line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={isInEdgePath ? '#e74c3c' : isCurrentEdge ? '#9b59b6' : '#3498db'}
                    strokeWidth={isInEdgePath ? 4 : isCurrentEdge ? 3 : 2}
                    initial={{ strokeOpacity: 0 }}
                    animate={{ strokeOpacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Edge weight */}
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 - 8}
                    fill="#ffffff"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    style={{ textShadow: '0 0 3px #000000' }}
                  >
                    {neighbors[neighbor]}
                  </text>

                  {/* Animation for current edge being processed */}
                  {isCurrentEdge && (
                    <motion.circle
                      cx={(start.x + end.x) / 2}
                      cy={(start.y + end.y) / 2}
                      r="6"
                      fill="#9b59b6"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
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
      distances = {} 
    } = step || {};

    return Object.keys(displayGraph).map((node) => {
      const pos = nodePositions[node];
      if (!pos) return null;

      const isCurrent = node === currentNode;
      const isVisited = visited.includes(node);
      const isInPath = path.includes(node);
      const isInQueue = queue.includes(node);

      let nodeColor = '#95a5a6'; // Default gray
      let nodeStroke = '#34495e';
      
      if (isCurrent) {
        nodeColor = '#e74c3c'; // Red for current
        nodeStroke = '#c0392b';
      } else if (isInPath) {
        nodeColor = '#27ae60'; // Green for path
        nodeStroke = '#229954';
      } else if (isVisited) {
        nodeColor = '#3498db'; // Blue for visited
        nodeStroke = '#2980b9';
      } else if (isInQueue) {
        nodeColor = '#f1c40f'; // Yellow for queued
        nodeStroke = '#f39c12';
      }

      const nodeRadius = 20;
      const fontSize = 12;

      return (
        <motion.g
          key={node}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Node circle */}
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r={nodeRadius}
            fill={nodeColor}
            stroke={nodeStroke}
            strokeWidth={3}
            animate={{
              fill: nodeColor,
              stroke: nodeStroke
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Node label */}
          <text 
            x={pos.x} 
            y={pos.y + 5} 
            textAnchor="middle" 
            fill="#ffffff" 
            fontSize={fontSize}
            fontWeight="bold"
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
              style={{ textShadow: '0 0 3px #000000' }}
            >
              {distances[node]}
            </text>
          )}
          
          {/* Animation for current node */}
          {isCurrent && (
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius + 6}
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                repeatType: "reverse" 
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
      case 'mark-visited':
        return `Marked node ${currentNode} as visited`;
      case 'dequeue':
        return `Dequeued node ${currentNode}`;
      case 'process':
        return `Processing node ${currentNode}`;
      case 'enqueue':
        { const lastEdge = edgePath && edgePath.length > 0 ? edgePath[edgePath.length - 1] : null;
        return lastEdge ? `Enqueued ${currentNode} via edge ${lastEdge[0]}→${lastEdge[1]}` : `Enqueued ${currentNode}`; }
      case 'complete':
        return `Algorithm complete! Visited: ${visited.join(', ')}`;
      default:
        return `Current action: ${action || 'processing'}`;
    }
  };

  const displayGraph = step?.graph || {};
  const { 
    queue = [], 
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
    <div className="graph-viewer">
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

      {/* Main Graph Visualization */}
      <div className="graph-visualization-container">
        <ZoomPanWrapper>
          <svg 
            width={svgWidth} 
            height={svgHeight} 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ 
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '10px',
              border: '2px solid #34495e'
            }}
          >
            {renderEdges()}
            {renderNodes()}
          </svg>
        </ZoomPanWrapper>
      </div>
    </div>
  );
};

export default GraphViewer;