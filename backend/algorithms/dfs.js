// algorithms/dfs.js
const dfs = (graph, start) => {
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

    const neighbors = graph[node] || [];
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

module.exports = { dfs };