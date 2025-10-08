// algorithms/primsAlgorithm.js
const primsAlgorithm = (graph) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Initialize MST with arbitrary starting vertex',
    'While MST doesn\'t include all vertices:',
    '  Find minimum weight edge connecting MST to outside',
    '  Add this edge and vertex to MST'
  ];

  const n = graph.length;
  const parent = Array(n).fill(-1);
  const key = Array(n).fill(Infinity);
  const inMST = Array(n).fill(false);

  // Start with vertex 0
  key[0] = 0;
  parent[0] = -1;

  const explanation1 = 'Initializing MST with vertex 0';
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    parent: [...parent],
    key: [...key],
    inMST: [...inMST],
    currentVertex: -1,
    currentLine: 1,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Build MST
  for (let count = 0; count < n - 1; count++) {
    const explanation2 = `Finding next vertex to add to MST (iteration ${count + 1}/${n - 1})`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      parent: [...parent],
      key: [...key],
      inMST: [...inMST],
      currentVertex: -1,
      currentLine: 2,
      action: 'find-next'
    });
    explanations.push(explanation2);

    // Find minimum key vertex not in MST
    let min = Infinity;
    let u = -1;
    
    for (let v = 0; v < n; v++) {
      if (!inMST[v] && key[v] < min) {
        min = key[v];
        u = v;
      }
    }

    inMST[u] = true;

    const explanation3 = `Selected vertex ${u} with key value ${key[u]}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      parent: [...parent],
      key: [...key],
      inMST: [...inMST],
      currentVertex: u,
      currentLine: 3,
      action: 'select-vertex'
    });
    explanations.push(explanation3);

    // Update key values of adjacent vertices
    for (let v = 0; v < n; v++) {
      if (graph[u][v] > 0 && !inMST[v] && graph[u][v] < key[v]) {
        const explanation4 = `Updating key for vertex ${v} from ${key[v]} to ${graph[u][v]}`;
        steps.push({
          graph: JSON.parse(JSON.stringify(graph)),
          parent: [...parent],
          key: [...key],
          inMST: [...inMST],
          currentVertex: u,
          updatingVertex: v,
          currentLine: 3,
          action: 'update-key'
        });
        explanations.push(explanation4);

        key[v] = graph[u][v];
        parent[v] = u;
      }
    }
  }

  // Calculate total weight
  let totalWeight = 0;
  for (let i = 1; i < n; i++) {
    totalWeight += graph[i][parent[i]];
  }

  // Final result
  const finalExplanation = `MST complete! Total weight: ${totalWeight}`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    parent: [...parent],
    key: [...key],
    inMST: [...inMST],
    totalWeight: totalWeight,
    currentVertex: -1,
    currentLine: 4,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = primsAlgorithm;