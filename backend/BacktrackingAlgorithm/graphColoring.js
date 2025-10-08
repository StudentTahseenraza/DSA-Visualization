// algorithms/graphColoring.js
const graphColoring = (graph, m) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function graphColoringUtil(graph, m, color, v):',
    '  if v == number of vertices:',
    '    return true (coloring complete)',
    '  For each color from 1 to m:',
    '    if color is safe for vertex v:',
    '      assign color to v',
    '      if graphColoringUtil(graph, m, color, v+1): return true',
    '      remove color (backtrack)',
    '  return false'
  ];

  const n = graph.length;
  const color = Array(n).fill(0);
  
  const explanation1 = `Initializing graph coloring with ${m} colors for ${n} vertices`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    color: [...color],
    m: m,
    currentVertex: -1,
    currentColor: 0,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Solve the coloring problem
  const result = graphColoringUtil(graph, m, color, 0, n, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    `Graph can be colored with ${m} colors` : 
    `Graph cannot be colored with ${m} colors`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    color: [...color],
    m: m,
    currentVertex: -1,
    currentColor: 0,
    currentLine: result ? 2 : 8,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Check if color is safe for vertex
const isSafeColor = (graph, v, color, c) => {
  for (let i = 0; i < graph.length; i++) {
    if (graph[v][i] === 1 && color[i] === c) {
      return false;
    }
  }
  return true;
};

// Recursive backtracking function
const graphColoringUtil = (graph, m, color, v, n, steps, explanations) => {
  // All vertices colored
  if (v === n) {
    const explanation = `All ${n} vertices colored successfully!`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      color: [...color],
      m: m,
      currentVertex: v,
      currentColor: 0,
      currentLine: 2,
      action: 'coloring-complete'
    });
    explanations.push(explanation);
    return true;
  }

  const explanation1 = `Coloring vertex ${v}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    color: [...color],
    m: m,
    currentVertex: v,
    currentColor: 0,
    currentLine: 1,
    action: 'color-vertex'
  });
  explanations.push(explanation1);

  // Try all colors
  for (let c = 1; c <= m; c++) {
    const explanation2 = `Trying color ${c} for vertex ${v}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      color: [...color],
      m: m,
      currentVertex: v,
      currentColor: c,
      currentLine: 4,
      action: 'try-color'
    });
    explanations.push(explanation2);

    if (isSafeColor(graph, v, color, c)) {
      color[v] = c;
      
      const explanation3 = `Color ${c} is safe for vertex ${v}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        color: [...color],
        m: m,
        currentVertex: v,
        currentColor: c,
        currentLine: 5,
        action: 'assign-color'
      });
      explanations.push(explanation3);

      if (graphColoringUtil(graph, m, color, v + 1, n, steps, explanations)) {
        return true;
      }

      // Backtrack
      color[v] = 0;
      const explanation4 = `Backtracking: removing color from vertex ${v}`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        color: [...color],
        m: m,
        currentVertex: v,
        currentColor: 0,
        currentLine: 7,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }

  return false;
};

module.exports = graphColoring;