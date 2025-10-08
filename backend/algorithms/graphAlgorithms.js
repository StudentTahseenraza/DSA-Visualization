
const bfs = (graph, start) => {
  if (!graph || typeof graph !== 'object' || !start || typeof start !== 'string') {
    throw new Error('Invalid graph or start node');
  }
  if (!graph[start]) {
    throw new Error(`Start node ${start} not found in graph`);
  }

  const steps = [];
  const pseudocode = [
    'create queue and enqueue start node',
    'mark start node as visited',
    'while queue is not empty:',
    '  dequeue a node',
    '  process node',
    '  enqueue unvisited neighbors',
  ];
  const explanations = [
    'Initialize queue with the start node.',
    'Mark the start node as visited.',
    'Continue while the queue is not empty.',
    'Dequeue a node from the queue.',
    'Process the current node.',
    'Enqueue unvisited neighbors.',
  ];

  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  // Track actual BFS traversal order (nodes in order of visitation)
  const traversalOrder = [start];
  // Track the path as edges: [from, to]
  const edgePath = [];

  steps.push({
    graph: { ...graph },
    queue: [...queue],
    visited: [...visited],
    currentNode: null,
    path: [...traversalOrder],
    edgePath: [...edgePath],
    currentLine: 0,
    action: 'init-queue',
    explanation: `Initialized queue with start node ${start}.`,
  });

  steps.push({
    graph: { ...graph },
    queue: [...queue],
    visited: [...visited],
    currentNode: null,
    path: [...traversalOrder],
    edgePath: [...edgePath],
    currentLine: 1,
    action: 'mark-visited',
    explanation: `Marked node ${start} as visited.`,
  });

  while (queue.length > 0) {
    const currentNode = queue.shift();

    steps.push({
      graph: { ...graph },
      queue: [...queue],
      visited: [...visited],
      currentNode: currentNode,
      path: [...traversalOrder],
      edgePath: [...edgePath],
      currentLine: 3,
      action: 'dequeue',
      explanation: `Dequeued node ${currentNode} from queue.`,
    });

    steps.push({
      graph: { ...graph },
      queue: [...queue],
      visited: [...visited],
      currentNode: currentNode,
      path: [...traversalOrder],
      edgePath: [...edgePath],
      currentLine: 4,
      action: 'process',
      explanation: `Processing node ${currentNode}.`,
    });

    // Get neighbors in alphabetical order for consistent behavior
    const neighbors = Object.keys(graph[currentNode] || {}).sort();
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        traversalOrder.push(neighbor);
        edgePath.push([currentNode, neighbor]); // Track the edge taken

        steps.push({
          graph: { ...graph },
          queue: [...queue],
          visited: [...visited],
          currentNode: neighbor,
          path: [...traversalOrder],
          edgePath: [...edgePath],
          currentLine: 5,
          action: 'enqueue',
          explanation: `Enqueued unvisited neighbor ${neighbor} (edge: ${currentNode}→${neighbor}).`,
        });
      }
    }
  }

  return { 
    steps, 
    pseudocode, 
    explanations,
    traversalOrder: traversalOrder,
    edgePath: edgePath
  };
};

const dfs = (graph, start) => {
  if (!graph || typeof graph !== 'object' || !start || typeof start !== 'string') {
    throw new Error('Invalid graph or start node');
  }
  if (!graph[start]) {
    throw new Error(`Start node ${start} not found in graph`);
  }

  const steps = [];
  const pseudocode = [
    'create stack and push start node',
    'mark start node as visited',
    'while stack is not empty:',
    '  pop a node',
    '  process node',
    '  push unvisited neighbors',
  ];
  const explanations = [
    'Initialize stack with the start node.',
    'Mark the start node as visited.',
    'Continue while the stack is not empty.',
    'Pop a node from the stack.',
    'Process the current node.',
    'Push unvisited neighbors onto the stack.',
  ];

  const visited = new Set();
  const stack = [start];
  visited.add(start);
  const traversalPath = [start];

  steps.push({
    graph: { ...graph },
    stack: [...stack],
    visited: [...visited],
    currentNode: null,
    path: [...traversalPath],
    currentLine: 0,
    action: 'init-stack',
    explanation: `Initialized stack with start node ${start}.`,
  });

  steps.push({
    graph: { ...graph },
    stack: [...stack],
    visited: [...visited],
    currentNode: null,
    path: [...traversalPath],
    currentLine: 1,
    action: 'mark-visited',
    explanation: `Marked node ${start} as visited.`,
  });

  while (stack.length > 0) {
    const currentNode = stack.pop();
    
    // Only add to path when we actually process it (not when we just push it)
    if (!traversalPath.includes(currentNode)) {
      traversalPath.push(currentNode);
    }

    steps.push({
      graph: { ...graph },
      stack: [...stack],
      visited: [...visited],
      currentNode: currentNode,
      path: [...traversalPath],
      currentLine: 3,
      action: 'pop',
      explanation: `Popped node ${currentNode} from stack.`,
    });

    steps.push({
      graph: { ...graph },
      stack: [...stack],
      visited: [...visited],
      currentNode: currentNode,
      path: [...traversalPath],
      currentLine: 4,
      action: 'process',
      explanation: `Processing node ${currentNode}.`,
    });

    // Get neighbors in reverse order for DFS (to maintain left-to-right visualization)
    const neighbors = Object.keys(graph[currentNode] || {}).sort().reverse();
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
        
        steps.push({
          graph: { ...graph },
          stack: [...stack],
          visited: [...visited],
          currentNode: neighbor,
          path: [...traversalPath],
          currentLine: 5,
          action: 'push',
          explanation: `Pushed unvisited neighbor ${neighbor} onto stack.`,
        });
      }
    }
  }

  return { steps, pseudocode, explanations };
};

const dijkstra = (graph, start) => {
  if (!graph || typeof graph !== 'object' || !start || typeof start !== 'string') {
    throw new Error('Invalid graph or start node');
  }
  if (!graph[start]) {
    throw new Error(`Start node ${start} not found in graph`);
  }

  const steps = [];
  const pseudocode = [
    'initialize distances with infinity except start node (0)',
    'create priority queue and add start node',
    'while priority queue is not empty:',
    '  extract node with minimum distance',
    '  for each unvisited neighbor:',
    '    calculate new distance',
    '    if better, update distance and path',
  ];
  const explanations = [
    'Set initial distances to infinity, except start node which is 0.',
    'Add start node to priority queue.',
    'Continue while priority queue is not empty.',
    'Extract node with minimum distance.',
    'Check all neighbors of current node.',
    'Update distance if shorter path found.',
  ];

  const distances = {};
  const previous = {};
  const visited = new Set();
  const path = [start];

  // Initialize distances
  Object.keys(graph).forEach((node) => {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  });

  // Create priority queue (simple array that we'll sort)
  const queue = Object.keys(graph).map(node => ({ node, dist: distances[node] }));

  steps.push({
    graph: { ...graph },
    queue: queue.map(item => item.node),
    visited: [...visited],
    currentNode: null,
    path: [...path],
    distances: { ...distances },
    currentLine: 0,
    action: 'init-distances',
    explanation: `Initialized distances: ${start}=0, others=∞.`,
  });

  while (queue.length > 0) {
    // Sort by distance and get the minimum
    queue.sort((a, b) => a.dist - b.dist);
    const { node: currentNode } = queue.shift();
    
    if (visited.has(currentNode)) continue;
    
    visited.add(currentNode);
    
    // Update path only when we actually visit the node
    if (currentNode !== start && !path.includes(currentNode)) {
      // Reconstruct path to this node
      const nodePath = [];
      let temp = currentNode;
      while (temp !== null) {
        nodePath.unshift(temp);
        temp = previous[temp];
      }
      // Only update if we found a valid path
      if (nodePath.length > 0 && nodePath[0] === start) {
        path.length = 0; // Clear current path
        path.push(...nodePath);
      }
    }

    steps.push({
      graph: { ...graph },
      queue: queue.map(item => item.node),
      visited: [...visited],
      currentNode: currentNode,
      path: [...path],
      distances: { ...distances },
      currentLine: 3,
      action: 'extract-min',
      explanation: `Extracted node ${currentNode} with distance ${distances[currentNode]}.`,
    });

    steps.push({
      graph: { ...graph },
      queue: queue.map(item => item.node),
      visited: [...visited],
      currentNode: currentNode,
      path: [...path],
      distances: { ...distances },
      currentLine: 4,
      action: 'process',
      explanation: `Processing neighbors of ${currentNode}.`,
    });

    const neighbors = Object.keys(graph[currentNode] || {});
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const newDist = distances[currentNode] + graph[currentNode][neighbor];
        
        steps.push({
          graph: { ...graph },
          queue: queue.map(item => item.node),
          visited: [...visited],
          currentNode: neighbor,
          path: [...path],
          distances: { ...distances },
          currentLine: 5,
          action: 'calculate',
          explanation: `Calculating distance to ${neighbor}: ${distances[currentNode]} + ${graph[currentNode][neighbor]} = ${newDist}`,
        });

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentNode;
          
          // Update queue with new distance
          const queueIndex = queue.findIndex(item => item.node === neighbor);
          if (queueIndex !== -1) {
            queue[queueIndex].dist = newDist;
          }

          steps.push({
            graph: { ...graph },
            queue: queue.map(item => item.node),
            visited: [...visited],
            currentNode: neighbor,
            path: [...path],
            distances: { ...distances },
            currentLine: 6,
            action: 'update-distance',
            explanation: `Updated distance to ${neighbor}: ${newDist} (via ${currentNode})`,
          });
        }
      }
    }
  }

  return { steps, pseudocode, explanations };
};

// Implement Prim's Algorithm
const prim = (graph, start) => {
  if (!graph || typeof graph !== 'object' || !start || typeof start !== 'string') {
    throw new Error('Invalid graph or start node');
  }
  if (!graph[start]) {
    throw new Error(`Start node ${start} not found in graph`);
  }

  const steps = [];
  const pseudocode = [
    'initialize MST with start node',
    'create priority queue with edges from start',
    'while queue not empty and MST not complete:',
    '  extract minimum weight edge',
    '  if node not in MST, add it',
    '  add edges from new node to queue',
  ];
  const explanations = [
    'Start with initial node in MST.',
    'Add all edges from start node to priority queue.',
    'Continue until all nodes are in MST.',
    'Get the minimum weight edge.',
    'Add the new node to MST if not already included.',
    'Add edges from the new node to priority queue.',
  ];

  const mst = new Set([start]);
  const mstEdges = [];
  const visited = new Set([start]);
  const path = [start];

  // Priority queue: [weight, from, to]
  const queue = [];
  
  // Add initial edges from start node
  Object.keys(graph[start] || {}).forEach(neighbor => {
    queue.push({
      weight: graph[start][neighbor],
      from: start,
      to: neighbor
    });
  });
  queue.sort((a, b) => a.weight - b.weight);

  steps.push({
    graph: { ...graph },
    queue: queue.map(item => item.to),
    visited: [...visited],
    currentNode: start,
    path: [...path],
    mstEdges: [...mstEdges],
    currentLine: 0,
    action: 'init',
    explanation: `Started Prim's algorithm from node ${start}.`,
  });

  while (queue.length > 0 && mst.size < Object.keys(graph).length) {
    const { weight, from, to } = queue.shift();
    
    if (mst.has(to)) continue;

    steps.push({
      graph: { ...graph },
      queue: queue.map(item => item.to),
      visited: [...visited],
      currentNode: to,
      path: [...path],
      mstEdges: [...mstEdges],
      currentLine: 3,
      action: 'extract-min',
      explanation: `Extracted edge ${from}-${to} with weight ${weight}.`,
    });

    // Add to MST
    mst.add(to);
    visited.add(to);
    path.push(to);
    mstEdges.push({ from, to, weight });

    steps.push({
      graph: { ...graph },
      queue: queue.map(item => item.to),
      visited: [...visited],
      currentNode: to,
      path: [...path],
      mstEdges: [...mstEdges],
      currentLine: 4,
      action: 'add-to-mst',
      explanation: `Added node ${to} to MST via edge from ${to}.`,
    });

    // Add edges from the new node
    Object.keys(graph[to] || {}).forEach(neighbor => {
      if (!mst.has(neighbor)) {
        queue.push({
          weight: graph[to][neighbor],
          from: to,
          to: neighbor
        });
      }
    });
    queue.sort((a, b) => a.weight - b.weight);

    steps.push({
      graph: { ...graph },
      queue: queue.map(item => item.to),
      visited: [...visited],
      currentNode: to,
      path: [...path],
      mstEdges: [...mstEdges],
      currentLine: 5,
      action: 'add-edges',
      explanation: `Added edges from ${to} to priority queue.`,
    });
  }

  return { steps, pseudocode, explanations, mst: Array.from(mst), mstEdges };
};

// Implement Kruskal's Algorithm
const kruskal = (graph) => {
  if (!graph || typeof graph !== 'object') {
    throw new Error('Invalid graph');
  }

  const steps = [];
  const pseudocode = [
    'sort all edges by weight',
    'initialize empty MST',
    'for each edge in sorted order:',
    '  if adding edge doesn\'t form cycle:',
    '    add edge to MST',
  ];
  const explanations = [
    'Sort all edges in the graph by weight.',
    'Start with empty minimum spanning tree.',
    'Process each edge in increasing order of weight.',
    'Check if adding this edge would create a cycle.',
    'Add the edge to MST if no cycle is formed.',
  ];

  // Get all edges
  const edges = [];
  const nodes = Object.keys(graph);
  const visited = new Set();
  const path = [];
  const mstEdges = [];

  nodes.forEach(node => {
    Object.keys(graph[node] || {}).forEach(neighbor => {
      // Avoid duplicates
      if (node < neighbor) {
        edges.push({
          from: node,
          to: neighbor,
          weight: graph[node][neighbor]
        });
      }
    });
  });

  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  steps.push({
    graph: { ...graph },
    edges: [...edges],
    visited: [...visited],
    currentNode: null,
    path: [...path],
    mstEdges: [...mstEdges],
    currentLine: 0,
    action: 'sort-edges',
    explanation: `Sorted ${edges.length} edges by weight.`,
  });

  // Union-Find data structure for cycle detection
  const parent = {};
  nodes.forEach(node => parent[node] = node);

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  const union = (node1, node2) => {
    const root1 = find(node1);
    const root2 = find(node2);
    if (root1 !== root2) {
      parent[root2] = root1;
      return true;
    }
    return false;
  };

  for (const edge of edges) {
    steps.push({
      graph: { ...graph },
      edges: edges.filter(e => e !== edge),
      visited: [...visited],
      currentNode: null,
      path: [...path],
      mstEdges: [...mstEdges],
      currentLine: 2,
      action: 'process-edge',
      explanation: `Processing edge ${edge.from}-${edge.to} (weight: ${edge.weight}).`,
    });

    if (union(edge.from, edge.to)) {
      if (!visited.has(edge.from)) {
        visited.add(edge.from);
        path.push(edge.from);
      }
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        path.push(edge.to);
      }
      mstEdges.push(edge);

      steps.push({
        graph: { ...graph },
        edges: edges.filter(e => e !== edge),
        visited: [...visited],
        currentNode: null,
        path: [...path],
        mstEdges: [...mstEdges],
        currentLine: 4,
        action: 'add-edge',
        explanation: `Added edge ${edge.from}-${edge.to} to MST.`,
      });
    } else {
      steps.push({
        graph: { ...graph },
        edges: edges.filter(e => e !== edge),
        visited: [...visited],
        currentNode: null,
        path: [...path],
        mstEdges: [...mstEdges],
        currentLine: 3,
        action: 'skip-cycle',
        explanation: `Skipped edge ${edge.from}-${edge.to} (would create cycle).`,
      });
    }
  }

  return { steps, pseudocode, explanations, mst: Array.from(visited), mstEdges };
};

module.exports = { bfs, dfs, dijkstra, prim, kruskal };