// algorithms/graphAlgorithms.js
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
  let path = [start];

  steps.push({
    graph: { ...graph },
    queue: [...queue],
    visited: [...visited],
    currentNode: null,
    path: [...path],
    currentLine: 0,
    action: 'init-queue',
    explanation: `Initialized queue with start node ${start}.`,
  });

  steps.push({
    graph: { ...graph },
    queue: [...queue],
    visited: [...visited],
    currentNode: null,
    path: [...path],
    currentLine: 1,
    action: 'mark-visited',
    explanation: `Marked node ${start} as visited.`,
  });

  while (queue.length > 0) {
    const node = queue.shift();
    path.push(node);

    steps.push({
      graph: { ...graph },
      queue: [...queue],
      visited: [...visited],
      currentNode: node,
      path: [...path],
      currentLine: 3,
      action: 'dequeue',
      explanation: `Dequeued node ${node} from queue.`,
    });

    steps.push({
      graph: { ...graph },
      queue: [...queue],
      visited: [...visited],
      currentNode: node,
      path: [...path],
      currentLine: 4,
      action: 'process',
      explanation: `Processing node ${node}.`,
    });

    const neighbors = Array.isArray(graph[node]) ? graph[node] : [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);

        steps.push({
          graph: { ...graph },
          queue: [...queue],
          visited: [...visited],
          currentNode: neighbor,
          path: [...path],
          currentLine: 5,
          action: 'enqueue',
          explanation: `Enqueued unvisited neighbor ${neighbor}.`,
        });
      }
    }
  }

  return { steps, pseudocode, explanations };
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
  let path = [start];

  steps.push({
    graph: { ...graph },
    stack: [...stack],
    visited: [...visited],
    currentNode: null,
    path: [...path],
    currentLine: 0,
    action: 'init-stack',
    explanation: `Initialized stack with start node ${start}.`,
  });

  steps.push({
    graph: { ...graph },
    stack: [...stack],
    visited: [...visited],
    currentNode: null,
    path: [...path],
    currentLine: 1,
    action: 'mark-visited',
    explanation: `Marked node ${start} as visited.`,
  });

  while (stack.length > 0) {
    const node = stack.pop();
    path.push(node);

    steps.push({
      graph: { ...graph },
      stack: [...stack],
      visited: [...visited],
      currentNode: node,
      path: [...path],
      currentLine: 3,
      action: 'pop',
      explanation: `Popped node ${node} from stack.`,
    });

    steps.push({
      graph: { ...graph },
      stack: [...stack],
      visited: [...visited],
      currentNode: node,
      path: [...path],
      currentLine: 4,
      action: 'process',
      explanation: `Processing node ${node}.`,
    });

    const neighbors = Array.isArray(graph[node]) ? graph[node] : [];
    for (const neighbor of neighbors.reverse()) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        visited.add(neighbor);

        steps.push({
          graph: { ...graph },
          stack: [...stack],
          visited: [...visited],
          currentNode: neighbor,
          path: [...path],
          currentLine: 5,
          action: 'push',
          explanation: `Pushed unvisited neighbor ${neighbor} onto stack.`,
        });
      }
    }
  }

  return { steps, pseudocode, explanations };
};

module.exports = { bfs, dfs };