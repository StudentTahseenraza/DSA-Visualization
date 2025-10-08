// algorithms/hamiltonianCycle.js
const hamiltonianCycle = (graph) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function hamCycleUtil(graph, path, pos):',
    '  if pos == number of vertices:',
    '    if edge from last to first vertex exists:',
    '      return true (cycle found)',
    '    else: return false',
    '  For each vertex v (except start):',
    '    if v can be added to path:',
    '      add v to path',
    '      if hamCycleUtil(graph, path, pos+1): return true',
    '      remove v from path (backtrack)',
    '  return false'
  ];

  const n = graph.length;
  const path = Array(n).fill(-1);
  path[0] = 0; // Start from vertex 0
  
  const explanation1 = `Initializing Hamiltonian cycle search for ${n} vertices`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    path: [...path],
    currentVertex: 0,
    currentPosition: 0,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Solve the Hamiltonian cycle problem
  const result = hamCycleUtil(graph, path, 1, n, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    'Hamiltonian cycle exists!' : 
    'No Hamiltonian cycle exists';
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    path: [...path],
    currentVertex: -1,
    currentPosition: -1,
    currentLine: result ? 4 : 11,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Check if vertex can be added to path
const isSafeVertex = (graph, v, path, pos) => {
  // Check if vertex is adjacent to previous vertex
  if (graph[path[pos - 1]][v] === 0) {
    return false;
  }

  // Check if vertex already in path
  for (let i = 0; i < pos; i++) {
    if (path[i] === v) {
      return false;
    }
  }

  return true;
};

// Recursive backtracking function
const hamCycleUtil = (graph, path, pos, n, steps, explanations) => {
  // All vertices included in path
  if (pos === n) {
    // Check if there's an edge from last to first vertex
    if (graph[path[pos - 1]][path[0]] === 1) {
      const explanation = `Hamiltonian cycle found: ${path.join(' → ')} → ${path[0]}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        path: [...path],
        currentVertex: path[0],
        currentPosition: pos,
        currentLine: 4,
        action: 'cycle-found'
      });
      explanations.push(explanation);
      return true;
    }
    return false;
  }

  const explanation1 = `Finding next vertex for position ${pos}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    path: [...path],
    currentVertex: -1,
    currentPosition: pos,
    currentLine: 1,
    action: 'find-next'
  });
  explanations.push(explanation1);

  // Try different vertices as next candidate
  for (let v = 1; v < n; v++) {
    const explanation2 = `Trying vertex ${v} for position ${pos}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      path: [...path],
      currentVertex: v,
      currentPosition: pos,
      currentLine: 6,
      action: 'try-vertex'
    });
    explanations.push(explanation2);

    if (isSafeVertex(graph, v, path, pos)) {
      path[pos] = v;
      
      const explanation3 = `Vertex ${v} added to path at position ${pos}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        path: [...path],
        currentVertex: v,
        currentPosition: pos,
        currentLine: 7,
        action: 'add-vertex'
      });
      explanations.push(explanation3);

      if (hamCycleUtil(graph, path, pos + 1, n, steps, explanations)) {
        return true;
      }

      // Backtrack
      path[pos] = -1;
      const explanation4 = `Backtracking: removing vertex from position ${pos}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        path: [...path],
        currentVertex: -1,
        currentPosition: pos,
        currentLine: 9,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }

  return false;
};

module.exports = hamiltonianCycle;