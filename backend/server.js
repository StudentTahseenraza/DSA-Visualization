// server.js - Updated with Complexity Analysis
const express = require("express");
const cors = require("cors");
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
  powerSet,
  wordSearch,
  partitionKSubsets,
  nQueens,
  ratInMaze,
  wordBreak,
  knightsTour,
  sudokuSolver,
  combinationSum,
  crosswordSolver,
  hamiltonianCycle,
  palindromePartitioning,
  activitySelection,
  fractionalKnapsack,
  huffmanEncoding,
  kruskalsAlgorithm,
  primsAlgorithm,
  jobScheduling,
  coinChange,
  allPaths,
  permutations,
  graphColoring,
  queueOperations,
  stackOperations,
  recursionOperations,
  arrayOperations,
  stringOperations,
  complexityAnalysis,
  linearSearch,
  binarySearch,
} = require("./index");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);
app.use(express.json());

const PORT = 5000;

// Helper function to convert kebab-case to camelCase
const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

// COMPLEXITY ANALYSIS ENDPOINT
app.post("/api/complexity/analyze", (req, res) => {
  const { algorithmId, inputSizes } = req.body;

  if (!algorithmId || !inputSizes || !Array.isArray(inputSizes)) {
    return res.status(400).json({
      error: "Algorithm ID and inputSizes array are required",
    });
  }

  // Validate input sizes
  const validSizes = inputSizes
    .filter((size) => typeof size === "number" && size > 0 && size <= 10000)
    .slice(0, 10); // Limit to 10 sizes for performance

  if (validSizes.length === 0) {
    return res.status(400).json({
      error: "Please provide valid input sizes (positive numbers up to 10000)",
    });
  }

  try {
    const result = complexityAnalysis(algorithmId, validSizes);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error in complexity analysis:", error);
    res.status(500).json({
      success: false,
      error: "Failed to analyze complexity: " + error.message,
    });
  }
});

// GET AVAILABLE ALGORITHMS FOR COMPLEXITY ANALYSIS
app.get("/api/complexity/algorithms", (req, res) => {
  const algorithms = [
    { id: "bubble-sort", name: "Bubble Sort", category: "sorting" },
    { id: "selection-sort", name: "Selection Sort", category: "sorting" },
    { id: "insertion-sort", name: "Insertion Sort", category: "sorting" },
    { id: "merge-sort", name: "Merge Sort", category: "sorting" },
    { id: "quick-sort", name: "Quick Sort", category: "sorting" },
    { id: "heap-sort", name: "Heap Sort", category: "sorting" },
    { id: "binary-search", name: "Binary Search", category: "searching" },
    { id: "linear-search", name: "Linear Search", category: "searching" },
    { id: "fibonacci-dp", name: "Fibonacci (DP)", category: "dp" },
    {
      id: "fibonacci-recursive",
      name: "Fibonacci (Recursive)",
      category: "recursion",
    },
    { id: "bfs", name: "Breadth-First Search", category: "graphs" },
    { id: "dfs", name: "Depth-First Search", category: "graphs" },
    { id: "array-traverse", name: "Array Traversal", category: "arrays" },
    { id: "string-reverse", name: "String Reverse", category: "strings" },
  ];

  res.json({ algorithms });
});

// Array Operations Endpoint
app.post("/api/array/:operation", (req, res) => {
  const { operation } = req.params;
  const { array, value, position, direction, positions } = req.body;

  console.log('Array operation request:', {
    operation,
    array,
    value,
    position,
    direction,
    positions
  });

  try {
    let result;

    // Use the provided array or default array
    const currentArray = array && Array.isArray(array) ? array : [5, 2, 8, 1, 4, 3, 6, 7];

    switch (operation) {
      case "insert":
        if (value === undefined || position === undefined) {
          return res.status(400).json({ error: "Value and position are required for insert operation" });
        }
        result = arrayOperations('insert', currentArray, parseInt(value), parseInt(position));
        break;
      case "delete":
        if (position === undefined) {
          return res.status(400).json({ error: "Position is required for delete operation" });
        }
        result = arrayOperations('delete', currentArray, parseInt(position));
        break;
      case "search":
        if (value === undefined) {
          return res.status(400).json({ error: "Value is required for search operation" });
        }
        result = arrayOperations('search', currentArray, parseInt(value));
        break;
      case "traverse":
        result = arrayOperations('traverse', currentArray);
        break;
      case "update":
        if (value === undefined || position === undefined) {
          return res.status(400).json({ error: "Value and position are required for update operation" });
        }
        result = arrayOperations('update', currentArray, parseInt(position), parseInt(value));
        break;
      case "rotate":
        if (direction === undefined || positions === undefined) {
          return res.status(400).json({ error: "Direction and positions are required for rotate operation" });
        }
        result = arrayOperations('rotate', currentArray, direction, parseInt(positions));
        break;
      case "reverse":
        result = arrayOperations('reverse', currentArray);
        break;
      case "push":
        if (value === undefined) {
          return res.status(400).json({ error: "Value is required for push operation" });
        }
        // For push, insert at the end
        result = arrayOperations('insert', currentArray, parseInt(value), currentArray.length);
        break;
      case "pop":
        // For pop, delete from the end
        result = arrayOperations('delete', currentArray, currentArray.length - 1);
        break;
      default:
        return res.status(400).json({ error: `Invalid array operation: ${operation}` });
    }

    console.log('Operation result:', {
      stepsLength: result.steps ? result.steps.length : 0,
      hasPseudocode: !!result.pseudocode,
      arrayLength: result.array ? result.array.length : 0
    });

    res.json({
      steps: result.steps || [],
      pseudocode: result.pseudocode || [],
      array: result.array || currentArray,
      explanations: (result.steps || []).map((step) => step.message || 'Step completed'),
    });

  } catch (error) {
    console.error(`Error in /api/array/${operation}:`, error);
    res.status(500).json({ 
      error: "Internal server error in array operation",
      details: error.message 
    });
  }
});

// String Operations Endpoint
app.post("/api/string/:operation", (req, res) => {
  const { operation } = req.params;
  const { value, pattern, stringState, str2 } = req.body;

  try {
    let result;
    switch (operation) {
      case "reverse":
        result = stringOperations("reverse", stringState);
        break;
      case "checkPalindrome":
        result = stringOperations("checkPalindrome", stringState);
        break;
      case "kmpSearch":
        result = stringOperations("kmpSearch", pattern, stringState);
        break;
      case "rabinKarpSearch":
        result = stringOperations("rabinKarpSearch", pattern, stringState);
        break;
      case "longestCommonSubstring":
        result = stringOperations("longestCommonSubstring", stringState, str2);
        break;
      case "checkAnagram":
        result = stringOperations("checkAnagram", stringState, str2);
        break;
      default:
        return res.status(400).json({ error: "Invalid string operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/string/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Stack Operations Endpoint
app.post("/api/stack/:operation", (req, res) => {
  const { operation } = req.params;
  const { value, expression, stackState } = req.body;

  try {
    let result;
    switch (operation) {
      case "push":
        result = stackOperations("push", value, stackState);
        break;
      case "pop":
        result = stackOperations("pop", stackState);
        break;
      case "peek":
        result = stackOperations("peek", stackState);
        break;
      case "infixToPostfix":
        result = stackOperations("infixToPostfix", expression, stackState);
        break;
      case "checkParentheses":
        result = stackOperations("checkParentheses", expression, stackState);
        break;
      case "evaluatePostfix":
        result = stackOperations("evaluatePostfix", expression, stackState);
        break;
      default:
        return res.status(400).json({ error: "Invalid stack operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/stack/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Queue Operations Endpoint
app.post("/api/queue/:operation", (req, res) => {
  const { operation } = req.params;
  const { value, graph, start, petrol, distance, n, queueState } = req.body;

  try {
    let result;
    switch (operation) {
      case "enqueue":
        result = queueOperations("enqueue", value, queueState);
        break;
      case "dequeue":
        result = queueOperations("dequeue", queueState);
        break;
      case "front":
        result = queueOperations("front", queueState);
        break;
      case "bfs":
        result = queueOperations("bfs", graph, start, queueState);
        break;
      case "generateBinaryNumbers":
        result = queueOperations("generateBinaryNumbers", n, queueState);
        break;
      case "circularTour":
        result = queueOperations("circularTour", petrol, distance, queueState);
        break;
      default:
        return res.status(400).json({ error: "Invalid queue operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/queue/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Recursion Operations Endpoint
app.post("/api/recursion/:operation", (req, res) => {
  const { operation } = req.params;
  const { n, str, arr, matrix, x, y, newColor, prefix } = req.body;

  try {
    let result;
    switch (operation) {
      case "factorial":
        result = recursionOperations("factorial", n);
        break;
      case "fibonacci":
        result = recursionOperations("fibonacci", n);
        break;
      case "towerOfHanoi":
        result = recursionOperations("towerOfHanoi", n);
        break;
      case "permutations":
        result = recursionOperations("permutations", str, prefix);
        break;
      case "subsets":
        result = recursionOperations("subsets", arr);
        break;
      case "floodFill":
        result = recursionOperations("floodFill", matrix, x, y, newColor);
        break;
      default:
        return res.status(400).json({ error: "Invalid recursion operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/recursion/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sorting algorithms endpoint
app.post("/api/sort/:algorithm", (req, res) => {
  let { algorithm } = req.params;
  const { array } = req.body;

  algorithm = kebabToCamel(algorithm);

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }

  try {
    let result;
    switch (algorithm) {
      case "bubbleSort":
        result = bubbleSort(array);
        break;
      case "selectionSort":
        result = selectionSort(array);
        break;
      case "insertionSort":
        result = insertionSort(array);
        break;
      case "mergeSort":
        result = mergeSort(array);
        break;
      case "quickSort":
        result = quickSort(array);
        break;
      case "heapSort":
        result = heapSort(array);
        break;
      default:
        return res.status(400).json({ error: "Invalid algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/sort/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Graph algorithms endpoint
// Graph algorithms endpoint
app.post("/api/graph/:algorithm", (req, res) => {
  try {
    let { algorithm } = req.params;

    if (!req.body) {
      return res.status(400).json({
        error: "Request body is required for graph algorithms",
      });
    }

    const { graph, start } = req.body;

    console.log(`Graph Algorithm Request:`, { algorithm, graph, start }); // Debug log

    // For Kruskal's algorithm, start node is not needed
    if (algorithm === "kruskals-algorithm") {
      if (!graph || Object.keys(graph).length === 0) {
        return res.status(400).json({
          error: "Graph is required for Kruskal's algorithm",
        });
      }
    } else if (algorithm === "prims-algorithm") {
      // For Prim's algorithm, start node is required
      if (!graph || !start) {
        return res.status(400).json({
          error: "Graph and start node are required for Prim's algorithm",
        });
      }
    } else {
      // For other algorithms (BFS, DFS, Dijkstra), both are required
      if (!graph || !start) {
        return res.status(400).json({
          error: "Graph and start node are required",
        });
      }
    }

    let result;
    switch (algorithm) {
      case "breadth-first-search":
        result = graphAlgorithms.bfs(graph, start);
        break;
      case "depth-first-search":
        result = graphAlgorithms.dfs(graph, start);
        break;
      case "dijkstra":
        result = graphAlgorithms.dijkstra(graph, start);
        break;
      case "prims-algorithm":
        result = graphAlgorithms.prim(graph, start);
        break;
      case "kruskals-algorithm":
        result = graphAlgorithms.kruskal(graph);
        break;
      default:
        return res.status(400).json({
          error: "Invalid algorithm",
          algorithm: algorithm,
          supportedAlgorithms: [
            "breadth-first-search",
            "depth-first-search",
            "dijkstra",
            "prims-algorithm",
            "kruskals-algorithm",
          ],
        });
    }

    res.json(result);
  } catch (error) {
    console.error(`Error in /api/graph/${req.params.algorithm}:`, error);
    res.status(500).json({
      error: "Internal server error in graph algorithm",
      message: error.message,
      algorithm: req.params.algorithm,
    });
  }
});

// BST operations endpoint
app.post("/api/bst/:operation", (req, res) => {
  try {
    const { operation } = req.params;

    // Check if body exists
    if (!req.body) {
      return res.status(400).json({
        error: "Request body is required",
        receivedBody: req.body,
      });
    }

    const { value, treeState, options = {} } = req.body;

    // console.log(`BST Operation: ${operation}`, { value, options }); // Debug log

    // Validate required fields based on operation type
    if (operation === "bulk-insert") {
      if (!value || !Array.isArray(value)) {
        return res.status(400).json({
          error: "Array of values is required for bulk insert",
          operation: operation,
          receivedValue: value,
        });
      }
    } else if (operation.startsWith("traverse-")) {
      // No value validation needed for traverse operations
    } else if (operation !== "traverse" && value === undefined) {
      return res.status(400).json({
        error: "Value is required for this operation",
        operation: operation,
        receivedValue: value,
      });
    }

    // For numeric operations, validate value is a number
    if (
      ["insert", "search", "delete"].includes(operation) &&
      typeof value !== "number"
    ) {
      return res.status(400).json({
        error: "Value must be a number for this operation",
        receivedValue: value,
        type: typeof value,
      });
    }

    let result;

    // Handle AVL tree operations
    if (operation === "avlInsert") {
      result = avlOperations(operation, value, treeState);
    }
    // Handle BST operations
    else {
      // Map operation names to match the bstOperations function
      let bstOperation = operation;
      let bstValue = value;
      let bstOptions = {};

      // Handle bulk insert - send as array to bstOperations
      if (operation === "bulk-insert") {
        bstOperation = "insert"; // bstOperations handles arrays for insert
        bstValue = value; // This should be an array
      }
      // Handle traversal operations
      else if (operation.startsWith("traverse-")) {
        bstOperation = "traverse";
        const order = operation.replace("traverse-", "");
        bstOptions = { order };
        bstValue = null; // No value needed
      }
      // Handle regular operations
      else {
        bstOperation = operation;
        bstValue = value;
      }

      // console.log(`Calling bstOperations with:`, {
      //   operation: bstOperation,
      //   value: bstValue,
      //   options: bstOptions
      // }); // Debug log

      result = bstOperations(bstOperation, bstValue, treeState, bstOptions);
    }

    res.json(result);
  } catch (error) {
    console.error("Error in BST operation:", error);
    res.status(500).json({
      error: "Internal server error in BST operation",
      message: error.message,
      stack: error.stack,
    });
  }
});

// Linked List operations endpoint
app.post("/api/linkedList/:operation", (req, res) => {
  const { operation } = req.params;
  const { value, listState } = req.body;

  // For bulk-insert, value should be an array
  if (operation === "bulk-insert") {
    if (!Array.isArray(value)) {
      return res
        .status(400)
        .json({ error: "For bulk-insert, value must be an array" });
    }
  }
  // For regular insert/delete, value should be a number
  else if (typeof value !== "number" && operation !== "traverse") {
    return res.status(400).json({ error: "Value must be a number" });
  }

  try {
    const result = linkedListOperations(operation, value, listState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/linkedList/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Heap operations endpoint
app.post("/api/heap/:operation", (req, res) => {
  const { operation } = req.params;
  const { value, heapState } = req.body;

  if (typeof value !== "number" && operation !== "heapify") {
    return res.status(400).json({ error: "Value must be a number" });
  }

  try {
    const result = heapOperations(operation, value, heapState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/heap/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Trie operations endpoint
app.post("/api/trie/:operation", (req, res) => {
  const { operation } = req.params;
  const { word, trieState } = req.body;

  if (typeof word !== "string") {
    return res.status(400).json({ error: "Word must be a string" });
  }

  try {
    const result = trieOperations(operation, word, trieState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/trie/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Backtracking algorithms endpoint
app.post("/api/backtracking/:algorithm", (req, res) => {
  const { algorithm } = req.params;

  try {
    let result;
    switch (algorithm) {
      case "n-queens":
        const { n } = req.body;
        result = nQueens(n || 4);
        break;
      case "sudoku-solver":
        const { grid } = req.body;
        result = sudokuSolver(grid);
        break;
      case "rat-in-maze":
        const { maze } = req.body;
        result = ratInMaze(maze);
        break;
      case "knights-tour":
        const { n: knightN, startX, startY } = req.body;
        result = knightsTour(knightN || 5, startX || 0, startY || 0);
        break;
      case "word-search":
        const { board, word } = req.body;
        result = wordSearch(board, word);
        break;
      case "graph-coloring":
        const { graph: coloringGraph, m } = req.body;
        const graphMatrix = convertGraphToMatrix(coloringGraph || defaultGraph);
        result = graphColoring(graphMatrix, m || 3);
        break;
      case "hamiltonian-cycle":
        const { graph: hamiltonianGraph } = req.body;
        result = hamiltonianCycle(hamiltonianGraph);
        break;
      case "power-set":
        const { set } = req.body;
        result = powerSet(set || [1, 2, 3]);
        break;
      case "partition-k-subsets":
        const { nums, k } = req.body;
        result = partitionKSubsets(nums || [4, 3, 2, 3, 5, 2, 1], k || 4);
        break;
      case "word-break":
        const { s, wordDict } = req.body;
        result = wordBreak(s || "leetcode", wordDict || ["leet", "code"]);
        break;
      case "combination-sum":
        const { candidates, target } = req.body;
        result = combinationSum(candidates || [2, 3, 6, 7], target || 7);
        break;
      case "crossword-solver":
        const { crossword, words } = req.body;
        result = crosswordSolver(crossword, words);
        break;
      case "palindrome-partitioning":
        const { str } = req.body;
        result = palindromePartitioning(str || "aab");
        break;
      case "generate-permutations":
        const { items } = req.body;
        result = permutations(items || [1, 2, 3]);
        break;
      case "all-paths-graph":
        const { graph, source, destination } = req.body;
        result = allPaths(graph || defaultGraph, source || 0, destination || 3);
        break;
      default:
        return res
          .status(400)
          .json({ error: "Invalid backtracking algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/backtracking/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Greedy algorithms endpoint
app.post("/api/greedy/:algorithm", (req, res) => {
  const { algorithm } = req.params;

  try {
    let result;
    switch (algorithm) {
      case "activity-selection":
        const { activities } = req.body;
        result = activitySelection(activities);
        break;
      case "fractional-knapsack":
        const { items, capacity } = req.body;
        result = fractionalKnapsack(items, capacity);
        break;
      case "job-scheduling":
        const { jobs } = req.body;
        result = jobScheduling(jobs);
        break;
      case "huffman-encoding":
        const { text } = req.body;
        result = huffmanEncoding(text);
        break;
      case "prims-algorithm":
        const { graph: primsGraph } = req.body;
        result = primsAlgorithm(primsGraph);
        break;
      case "kruskals-algorithm":
        const { graph: kruskalsGraph } = req.body;
        result = kruskalsAlgorithm(kruskalsGraph);
        break;
      case "dijkstras-algorithm":
        const { graph: dijkstraGraph, source } = req.body;
        result = graphAlgorithms.dijkstra(dijkstraGraph, source);
        break;
      case "coin-change-greedy":
        const { coins, amount } = req.body;
        result = coinChange(coins, amount);
        break;
      default:
        return res.status(400).json({ error: "Invalid greedy algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/greedy/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper functions
function convertGraphToMatrix(graphObj) {
  const nodes = Object.keys(graphObj)
    .map(Number)
    .sort((a, b) => a - b);
  const n = nodes.length;
  const matrix = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (const [node, neighbors] of Object.entries(graphObj)) {
    const nodeIndex = nodes.indexOf(parseInt(node));
    for (const neighbor of Object.keys(neighbors)) {
      const neighborIndex = nodes.indexOf(parseInt(neighbor));
      if (neighborIndex !== -1) {
        matrix[nodeIndex][neighborIndex] = 1;
        matrix[neighborIndex][nodeIndex] = 1;
      }
    }
  }

  return matrix;
}

const defaultGraph = {
  0: [1, 2],
  1: [3],
  2: [3],
  3: [],
};

// Dynamic Programming algorithms endpoint
app.post("/api/dp/:algorithm", (req, res) => {
  const { algorithm } = req.params;

  try {
    let result;
    switch (algorithm) {
      case "fibonacci":
        const { n } = req.body;
        result = { value: fibonacci(n), steps: [] };
        break;
      case "knapsack-dp":
        const { items, capacity } = req.body;
        result = knapsackDP(items, capacity);
        break;
      case "longest-common-subsequence":
        const { str1, str2 } = req.body;
        result = LCS(str1, str2);
        break;
      case "matrix-chain-multiplication":
        const { dimensions } = req.body;
        result = matrixChainMultiplication(dimensions);
        break;
      case "coin-change-dp":
        const { coins, amount } = req.body;
        result = coinChangeDP(coins, amount);
        break;
      case "edit-distance":
        const { str1: editStr1, str2: editStr2 } = req.body;
        result = editDistance(editStr1, editStr2);
        break;
      default:
        return res
          .status(400)
          .json({ error: "Invalid dynamic programming algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/dp/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/search/:algorithm", (req, res) => {
  const { algorithm } = req.params;
  const { array, target } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }

  if (typeof target !== "number") {
    return res.status(400).json({ error: "Target number is required" });
  }

  try {
    let result;
    switch (algorithm) {
      case "linear-search":
        result = linearSearch(array, target);
        break;
      case "binary-search":
        result = binarySearch(array, target);
        break;
      default:
        return res.status(400).json({ error: "Invalid search algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/search/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Placeholder DP functions (to be implemented)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function knapsackDP(items, capacity) {
  return { maxValue: 0, selectedItems: [] };
}

function LCS(str1, str2) {
  return { length: 0, sequence: "" };
}

function matrixChainMultiplication(dimensions) {
  return { minOperations: 0, order: "" };
}

function coinChangeDP(coins, amount) {
  return { minCoins: 0, coinsUsed: [] };
}

function editDistance(str1, str2) {
  return { distance: 0, operations: [] };
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log(`Complexity Analysis API available at /api/complexity/analyze`);
});
