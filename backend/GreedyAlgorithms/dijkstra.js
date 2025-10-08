// algorithms/dijkstra.js
const dijkstra = (graph, source) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Initialize distance to source as 0, others as infinity',
    'While unvisited vertices exist:',
    '  Select vertex with minimum distance',
    '  For each neighbor:',
    '    Update distance if shorter path found'
  ];

  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const visited = Array(n).fill(false);
  const prev = Array(n).fill(-1);

  dist[source] = 0;

  const explanation1 = `Initializing distances: source ${source} = 0, others = Infinity`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    dist: [...dist],
    visited: [...visited],
    prev: [...prev],
    currentVertex: -1,
    currentLine: 1,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Find shortest paths
  for (let count = 0; count < n - 1; count++) {
    const explanation2 = `Finding next vertex to process (iteration ${count + 1}/${n - 1})`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      dist: [...dist],
      visited: [...visited],
      prev: [...prev],
      currentVertex: -1,
      currentLine: 2,
      action: 'find-next'
    });
    explanations.push(explanation2);

    // Find vertex with minimum distance
    let minDist = Infinity;
    let u = -1;
    
    for (let v = 0; v < n; v++) {
      if (!visited[v] && dist[v] < minDist) {
        minDist = dist[v];
        u = v;
      }
    }

    if (u === -1) break;

    visited[u] = true;

    const explanation3 = `Selected vertex ${u} with distance ${dist[u]}`;
    steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      dist: [...dist],
      visited: [...visited],
      prev: [...prev],
      currentVertex: u,
      currentLine: 3,
      action: 'select-vertex'
    });
    explanations.push(explanation3);

    // Update distances of neighbors
    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] > 0 && dist[u] !== Infinity && 
          dist[u] + graph[u][v] < dist[v]) {
        
        const oldDist = dist[v];
        dist[v] = dist[u] + graph[u][v];
        prev[v] = u;

        const explanation4 = `Updating distance to vertex ${v}: ${oldDist} → ${dist[v]} (via ${u})`;
        steps.push({
          graph: JSON.parse(JSON.stringify(graph)),
          dist: [...dist],
          visited: [...visited],
          prev: [...prev],
          currentVertex: u,
          updatingVertex: v,
          currentLine: 4,
          action: 'update-distance'
        });
        explanations.push(explanation4);
      }
    }
  }

  // Final result
  const finalExplanation = `Shortest paths from vertex ${source} computed`;
  steps.push({
    graph: JSON.parse(JSON.stringify(graph)),
    dist: [...dist],
    visited: [...visited],
    prev: [...prev],
    currentVertex: -1,
    currentLine: 5,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = dijkstra;