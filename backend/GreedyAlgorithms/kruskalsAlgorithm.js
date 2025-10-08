// algorithms/kruskalsAlgorithm.js
const kruskalsAlgorithm = (graph) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Sort all edges by weight',
    'Initialize MST as empty',
    'For each edge in sorted order:',
    '  If adding edge doesn\'t form cycle:',
    '    Add it to MST'
  ];

  const n = graph.length;
  const edges = [];
  
  // Create list of edges
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (graph[i][j] > 0) {
        edges.push({ u: i, v: j, weight: graph[i][j] });
      }
    }
  }

  const explanation1 = 'Created list of all edges';
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    edges: [...edges],
    mst: [],
    parent: Array(n).fill().map((_, i) => i),
    currentLine: 1,
    action: 'create-edges'
  });
  explanations.push(explanation1);

  // Sort edges by weight
  edges.sort((a, b) => a.weight - b.weight);

  const explanation2 = 'Sorted edges by weight in ascending order';
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    edges: [...edges],
    mst: [],
    parent: Array(n).fill().map((_, i) => i),
    currentLine: 1,
    action: 'sort-edges'
  });
  explanations.push(explanation2);

  const mst = [];
  const parent = Array(n).fill().map((_, i) => i);

  // Find function for union-find
  const find = (i) => {
    if (parent[i] !== i) {
      parent[i] = find(parent[i]);
    }
    return parent[i];
  };

  // Build MST
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    
    const explanation3 = `Considering edge: ${edge.u}-${edge.v} with weight ${edge.weight}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      edges: [...edges],
      mst: [...mst],
      parent: [...parent],
      currentEdge: edge,
      currentLine: 3,
      action: 'consider-edge'
    });
    explanations.push(explanation3);

    const rootU = find(edge.u);
    const rootV = find(edge.v);

    if (rootU !== rootV) {
      const explanation4 = `Adding edge ${edge.u}-${edge.v} to MST (no cycle formed)`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        edges: [...edges],
        mst: [...mst],
        parent: [...parent],
        currentEdge: edge,
        currentLine: 4,
        action: 'add-edge'
      });
      explanations.push(explanation4);

      mst.push(edge);
      parent[rootU] = rootV;
    } else {
      const explanation5 = `Skipping edge ${edge.u}-${edge.v} (would form cycle)`;
      steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        edges: [...edges],
        mst: [...mst],
        parent: [...parent],
        currentEdge: edge,
        currentLine: 4,
        action: 'skip-edge'
      });
      explanations.push(explanation5);
    }

    if (mst.length === n - 1) break;
  }

  // Calculate total weight
  const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);

  // Final result
  const finalExplanation = `MST complete! Total weight: ${totalWeight}, Edges: ${mst.length}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    edges: [...edges],
    mst: [...mst],
    parent: [...parent],
    totalWeight: totalWeight,
    currentLine: 5,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = kruskalsAlgorithm;