// algorithms/allPaths.js
const allPaths = (graph, source, destination) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function findAllPaths(graph, node, path, visited):',
    '  if node == destination:',
    '    add path to result',
    '    return',
    '  For each neighbor of node:',
    '    if neighbor not visited:',
    '      mark neighbor as visited',
    '      add neighbor to path',
    '      findAllPaths(graph, neighbor, path, visited)',
    '      remove neighbor from path (backtrack)',
    '      unmark neighbor as visited'
  ];

  const result = [];
  const visited = Array(graph.length).fill(false);
  visited[source] = true;
  
  const explanation1 = `Finding all paths from ${source} to ${destination}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    source: source,
    destination: destination,
    current: source,
    path: [source],
    visited: [...visited],
    result: [...result],
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Find all paths
  findAllPaths(graph, source, destination, [source], visited, result, steps, explanations);
  
  // Final result
  const finalExplanation = `Found ${result.length} paths from ${source} to ${destination}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    source: source,
    destination: destination,
    current: -1,
    path: [],
    visited: [...visited],
    result: [...result],
    currentLine: 3,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Recursive function to find all paths
const findAllPaths = (graph, node, destination, path, visited, result, steps, explanations) => {
  // Reached destination
  if (node === destination) {
    result.push([...path]);
    
    const explanation = `Found path: ${path.join(' → ')}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      source: path[0],
      destination: destination,
      current: node,
      path: [...path],
      visited: [...visited],
      result: [...result],
      currentLine: 3,
      action: 'found-path'
    });
    explanations.push(explanation);
    return;
  }

  const explanation1 = `At node ${node}, current path: ${path.join(' → ')}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    source: path[0],
    destination: destination,
    current: node,
    path: [...path],
    visited: [...visited],
    result: [...result],
    currentLine: 1,
    action: 'at-node'
  });
  explanations.push(explanation1);

  // Explore all neighbors
  for (const neighbor of graph[node]) {
    const explanation2 = `Checking neighbor ${neighbor} of node ${node}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      source: path[0],
      destination: destination,
      current: node,
      neighbor: neighbor,
      path: [...path],
      visited: [...visited],
      result: [...result],
      currentLine: 5,
      action: 'check-neighbor'
    });
    explanations.push(explanation2);

    if (!visited[neighbor]) {
      visited[neighbor] = true;
      path.push(neighbor);
      
      const explanation3 = `Moving to neighbor ${neighbor}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        source: path[0],
        destination: destination,
        current: neighbor,
        path: [...path],
        visited: [...visited],
        result: [...result],
        currentLine: 6,
        action: 'move-neighbor'
      });
      explanations.push(explanation3);

      findAllPaths(graph, neighbor, destination, path, visited, result, steps, explanations);

      // Backtrack
      path.pop();
      visited[neighbor] = false;
      
      const explanation4 = `Backtracking: returning to node ${node}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        source: path[0],
        destination: destination,
        current: node,
        path: [...path],
        visited: [...visited],
        result: [...result],
        currentLine: 9,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }
};

module.exports = allPaths;