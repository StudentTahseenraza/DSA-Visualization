// algorithms/dijkstra.js
const dijkstra = (graph, start) => {
  if (!graph || typeof graph !== 'object' || !start || typeof start !== 'string') {
    throw new Error('Invalid graph or start node');
  }
  if (!graph[start]) {
    throw new Error(`Start node ${start} not found in graph`);
  }

  const steps = [];
  const pseudocode = [
    'initialize distances with infinity',
    'set start node distance to 0',
    'create priority queue',
    'while queue is not empty:',
    '  extract node with minimum distance',
    '  update distances to neighbors',
  ];
  const explanations = [
    'Initialize distances to infinity for all nodes.',
    'Set distance to start node as 0.',
    'Create a priority queue with all nodes.',
    'Continue while the queue is not empty.',
    'Extract the node with the minimum distance.',
    'Update distances to unvisited neighbors.',
  ];

  const distances = {};
  const visited = new Set();
  const queue = [];
  const previous = {};
  const path = [];

  Object.keys(graph).forEach((node) => {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
    queue.push({ node, distance: distances[node] });
  });

  steps.push({
    graph: { ...graph },
    queue: [...queue.map((q) => q.node)],
    visited: [...visited],
    currentNode: null,
    path: [...path],
    distances: { ...distances },
    currentLine: 0,
    action: 'init',
    explanation: `Initialized distances: ${JSON.stringify(distances)}.`,
  });

  steps.push({
    graph: { ...graph },
    queue: [...queue.map((q) => q.node)],
    visited: [...visited],
    currentNode: start,
    path: [...path],
    distances: { ...distances },
    currentLine: 1,
    action: 'set-start',
    explanation: `Set distance to ${start} as 0.`,
  });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const { node } = queue.shift();

    if (visited.has(node)) continue;

    visited.add(node);
    path.push(node);

    steps.push({
      graph: { ...graph },
      queue: [...queue.map((q) => q.node)],
      visited: [...visited],
      currentNode: node,
      path: [...path],
      distances: { ...distances },
      currentLine: 4,
      action: 'process',
      explanation: `Processing node ${node} with distance ${distances[node]}.`,
    });

    Object.entries(graph[node] || {}).forEach(([neighbor, weight]) => {
      if (!visited.has(neighbor)) {
        const newDistance = distances[node] + weight;
        steps.push({
          graph: { ...graph },
          queue: [...queue.map((q) => q.node)],
          visited: [...visited],
          currentNode: neighbor,
          path: [...path],
          distances: { ...distances },
          currentLine: 5,
          action: 'update-distance',
          explanation: `Checking neighbor ${neighbor}: new distance ${newDistance} vs current ${distances[neighbor]}.`,
        });

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = node;
          queue.find((q) => q.node === neighbor).distance = newDistance;
          steps.push({
            graph: { ...graph },
            queue: [...queue.map((q) => q.node)],
            visited: [...visited],
            currentNode: neighbor,
            path: [...path],
            distances: { ...distances },
            currentLine: 5,
            action: 'update-distance',
            explanation: `Updated distance to ${neighbor} to ${newDistance}.`,
          });
        }
      }
    });
  }

  return { steps, pseudocode, explanations };
};

module.exports = { dijkstra };