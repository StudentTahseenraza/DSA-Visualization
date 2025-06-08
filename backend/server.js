// server.js
const express = require('express');
const cors = require('cors');
const {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  bstOperations,
  avlOperations,
  graphAlgorithms,
  linkedListOperations,
  heapOperations,
  trieOperations,
} = require('./algorithms/index');

console.log('graphAlgorithms:', graphAlgorithms);

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const PORT = 5000;

app.post('/api/sort/:algorithm', (req, res) => {
  const { algorithm } = req.params;
  const { array } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: 'Array is required' });
  }

  try {
    let result;
    switch (algorithm) {
      case 'bubbleSort':
        result = bubbleSort(array);
        break;
      case 'selectionSort':
        result = selectionSort(array);
        break;
      case 'insertionSort':
        result = insertionSort(array);
        break;
      case 'mergeSort':
        result = mergeSort(array);
        break;
      case 'quickSort':
        result = quickSort(array);
        break;
      case 'heapSort':
        result = heapSort(array);
        break;
      default:
        return res.status(400).json({ error: 'Invalid algorithm' });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/sort/${algorithm}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/bst/:operation', (req, res) => {
  const { operation } = req.params;
  const { value, treeState } = req.body;

  if (typeof value !== 'number' && operation !== 'avlInsert') {
    return res.status(400).json({ error: 'Value must be a number' });
  }

  try {
    let result;
    if (operation === 'avlInsert') {
      result = avlOperations(operation, value, treeState);
    } else {
      result = bstOperations(operation, value, treeState);
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/bst/${operation}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/graph/:algorithm', (req, res) => {
  const { algorithm } = req.params;
  const { graph, start } = req.body;

  if (!graph || !start) {
    return res.status(400).json({ error: 'Graph and start node are required' });
  }

  try {
    let result;
    switch (algorithm) {
      case 'bfs':
        if (!graphAlgorithms.bfs) throw new Error('BFS function not defined');
        result = graphAlgorithms.bfs(graph, start);
        break;
      case 'dfs':
        if (!graphAlgorithms.dfs) throw new Error('DFS function not defined');
        result = graphAlgorithms.dfs(graph, start);
        break;
      case 'dijkstra':
        if (!graphAlgorithms.dijkstra) throw new Error('Dijkstra function not defined');
        result = graphAlgorithms.dijkstra(graph, start);
        break;
      default:
        return res.status(400).json({ error: 'Invalid algorithm' });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/graph/${algorithm}:`, error.message);
    res.status(500).json({ error: `Failed to process ${algorithm}: ${error.message}` });
  }
});

app.post('/api/linkedList/:operation', (req, res) => {
  const { operation } = req.params;
  const { value, listState } = req.body;

  if (typeof value !== 'number' && operation !== 'traverse') {
    return res.status(400).json({ error: 'Value must be a number' });
  }

  try {
    const result = linkedListOperations(operation, value, listState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/linkedList/${operation}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/heap/:operation', (req, res) => {
  const { operation } = req.params;
  const { value, heapState } = req.body;

  if (typeof value !== 'number' && operation !== 'heapify') {
    return res.status(400).json({ error: 'Value must be a number' });
  }

  try {
    const result = heapOperations(operation, value, heapState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/heap/${operation}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/trie/:operation', (req, res) => {
  const { operation } = req.params;
  const { word, trieState } = req.body;

  if (typeof word !== 'string') {
    return res.status(400).json({ error: 'Word must be a string' });
  }

  try {
    const result = trieOperations(operation, word, trieState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/trie/${operation}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});