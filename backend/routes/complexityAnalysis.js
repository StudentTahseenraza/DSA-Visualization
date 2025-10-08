// algorithms/algorithms/complexityAnalysis.js
const complexityAnalysis = (algorithmId, inputSizes) => {
  const results = [];
  const explanations = [];
  
  // Execute algorithm for each input size
  for (const size of inputSizes) {
    const testData = generateTestData(size, algorithmId);
    const startTime = process.hrtime();
    
    // Execute the actual algorithm
    executeAlgorithm(algorithmId, testData);
    
    const endTime = process.hrtime(startTime);
    const executionTime = (endTime[0] * 1000 + endTime[1] / 1000000); // Convert to milliseconds
    
    results.push({
      inputSize: size,
      executionTime: executionTime,
      memoryUsage: process.memoryUsage().heapUsed
    });
    
    explanations.push(generateExplanation(algorithmId, size, executionTime));
  }
  
  // Analyze complexity based on runtime data
  const complexityAnalysis = analyzeComplexity(results, algorithmId);
  
  // Generate complexity graphs
  const graphs = generateComplexityGraphs(results, complexityAnalysis);
  
  return {
    results,
    explanations,
    complexityAnalysis,
    graphs
  };
};

// Generate appropriate test data for each algorithm
function generateTestData(size, algorithmId) {
  switch (algorithmId) {
    case 'bubble-sort':
    case 'selection-sort':
    case 'insertion-sort':
    case 'merge-sort':
    case 'quick-sort':
    case 'heap-sort':
      return Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
    
    case 'binary-search':
      const sortedArray = Array.from({ length: size }, (_, i) => i * 2);
      return {
        array: sortedArray,
        target: sortedArray[Math.floor(Math.random() * size)]
      };
    
    case 'linear-search':
      return {
        array: Array.from({ length: size }, () => Math.floor(Math.random() * 1000)),
        target: Math.floor(Math.random() * 1000)
      };
    
    case 'fibonacci-dp':
    case 'fibonacci-recursive':
      return Math.min(size, 35); // Limit for recursive to avoid stack overflow
    
    case 'bfs':
    case 'dfs':
      return generateGraph(size);
    
    case 'array-traverse':
      return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    
    case 'string-reverse':
      return 'a'.repeat(size);
    
    default:
      return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  }
}

// Generate graph for BFS/DFS
function generateGraph(nodeCount) {
  const graph = {};
  const actualNodeCount = Math.min(nodeCount, 50); // Limit graph size for performance
  
  for (let i = 0; i < actualNodeCount; i++) {
    graph[i] = {};
    const connections = Math.min(Math.floor(Math.random() * 3) + 1, actualNodeCount - 1);
    const connectedNodes = new Set();
    
    while (connectedNodes.size < connections) {
      const target = Math.floor(Math.random() * actualNodeCount);
      if (target !== i) connectedNodes.add(target);
    }
    
    connectedNodes.forEach(target => {
      graph[i][target] = 1;
    });
  }
  return { graph, startNode: '0' };
}

// Execute the actual algorithm - USING DIRECT IMPLEMENTATIONS
function executeAlgorithm(algorithmId, testData) {
  switch (algorithmId) {
    case 'bubble-sort':
      return bubbleSortDirect([...testData]);
    
    case 'selection-sort':
      return selectionSortDirect([...testData]);
    
    case 'insertion-sort':
      return insertionSortDirect([...testData]);
    
    case 'merge-sort':
      return mergeSortDirect([...testData]);
    
    case 'quick-sort':
      return quickSortDirect([...testData]);
    
    case 'heap-sort':
      return heapSortDirect([...testData]);
    
    case 'binary-search':
      return binarySearchDirect(testData.array, testData.target);
    
    case 'linear-search':
      return linearSearchDirect(testData.array, testData.target);
    
    case 'fibonacci-dp':
      return fibonacciDPDirect(testData);
    
    case 'fibonacci-recursive':
      return fibonacciRecursiveDirect(testData);
    
    case 'bfs':
      return bfsDirect(testData.graph, testData.startNode);
    
    case 'dfs':
      return dfsDirect(testData.graph, testData.startNode);
    
    case 'array-traverse':
      return arrayTraverseDirect(testData);
    
    case 'string-reverse':
      return stringReverseDirect(testData);
    
    default:
      throw new Error(`Unknown algorithm: ${algorithmId}`);
  }
}

// DIRECT ALGORITHM IMPLEMENTATIONS (to avoid import issues)

function bubbleSortDirect(arr) {
  const array = [...arr];
  let n = array.length;
  let swapped;
  
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  
  return array;
}

function selectionSortDirect(arr) {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  
  return array;
}

function insertionSortDirect(arr) {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  
  return array;
}

function mergeSortDirect(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortDirect(arr.slice(0, mid));
  const right = mergeSortDirect(arr.slice(mid));
  
  return mergeDirect(left, right);
}

function mergeDirect(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}

function quickSortDirect(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (const element of arr) {
    if (element < pivot) left.push(element);
    else if (element > pivot) right.push(element);
    else equal.push(element);
  }
  
  return [...quickSortDirect(left), ...equal, ...quickSortDirect(right)];
}

function heapSortDirect(arr) {
  const array = [...arr];
  const n = array.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDirect(array, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapifyDirect(array, i, 0);
  }
  
  return array;
}

function heapifyDirect(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapifyDirect(arr, n, largest);
  }
}

function binarySearchDirect(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function linearSearchDirect(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function fibonacciDPDirect(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}

function fibonacciRecursiveDirect(n) {
  if (n <= 1) return n;
  return fibonacciRecursiveDirect(n-1) + fibonacciRecursiveDirect(n-2);
}

function bfsDirect(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];
  
  visited.add(startNode);
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    
    const neighbors = graph[node] ? Object.keys(graph[node]) : [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

function dfsDirect(graph, startNode) {
  const visited = new Set();
  const result = [];
  
  function dfsHelper(node) {
    if (!node || visited.has(node)) return;
    
    visited.add(node);
    result.push(node);
    
    const neighbors = graph[node] ? Object.keys(graph[node]) : [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }
  
  dfsHelper(startNode);
  return result;
}

function arrayTraverseDirect(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function stringReverseDirect(str) {
  return str.split('').reverse().join('');
}

// Generate explanation for each run
function generateExplanation(algorithmId, size, time) {
  const algorithmNames = {
    'bubble-sort': 'Bubble Sort',
    'selection-sort': 'Selection Sort',
    'insertion-sort': 'Insertion Sort',
    'merge-sort': 'Merge Sort',
    'quick-sort': 'Quick Sort',
    'heap-sort': 'Heap Sort',
    'binary-search': 'Binary Search',
    'linear-search': 'Linear Search',
    'fibonacci-dp': 'Fibonacci (DP)',
    'fibonacci-recursive': 'Fibonacci (Recursive)',
    'bfs': 'Breadth-First Search',
    'dfs': 'Depth-First Search',
    'array-traverse': 'Array Traversal',
    'string-reverse': 'String Reverse'
  };
  
  return {
    algorithm: algorithmNames[algorithmId] || algorithmId,
    inputSize: size,
    executionTime: time.toFixed(2),
    explanation: `Input size ${size}: ${algorithmNames[algorithmId]} took ${time.toFixed(2)}ms`
  };
}

// Analyze complexity based on runtime data
function analyzeComplexity(results, algorithmId) {
  const sizes = results.map(r => r.inputSize);
  const times = results.map(r => r.executionTime);
  
  // Calculate growth rates
  const growthRates = [];
  for (let i = 1; i < times.length; i++) {
    if (times[i-1] > 0) {
      const timeGrowth = times[i] / times[i-1];
      const sizeGrowth = sizes[i] / sizes[i-1];
      growthRates.push(timeGrowth / sizeGrowth);
    }
  }
  
  const avgGrowth = growthRates.length > 0 ? 
    growthRates.reduce((a, b) => a + b, 0) / growthRates.length : 1;
  
  // Determine complexity based on growth pattern
  let complexity, explanation;
  
  if (avgGrowth < 0.1) {
    complexity = 'O(1)';
    explanation = 'Constant time - execution time remains nearly constant regardless of input size';
  } else if (avgGrowth < 1.5) {
    complexity = 'O(log n)';
    explanation = 'Logarithmic time - execution time grows slowly as input size increases';
  } else if (avgGrowth < 3) {
    complexity = 'O(n)';
    explanation = 'Linear time - execution time grows proportionally with input size';
  } else if (avgGrowth < 10) {
    complexity = 'O(n log n)';
    explanation = 'Linearithmic time - execution time grows slightly faster than linear';
  } else if (avgGrowth < 50) {
    complexity = 'O(n²)';
    explanation = 'Quadratic time - execution time grows with the square of input size';
  } else if (avgGrowth < 200) {
    complexity = 'O(n³)';
    explanation = 'Cubic time - execution time grows with the cube of input size';
  } else {
    complexity = 'O(2ⁿ) or worse';
    explanation = 'Exponential time - execution time grows very rapidly with input size';
  }
  
  return {
    complexity,
    explanation,
    growthRates,
    averageGrowth: avgGrowth,
    theoreticalComplexity: getTheoreticalComplexity(algorithmId)
  };
}

function getTheoreticalComplexity(algorithmId) {
  const complexities = {
    'bubble-sort': 'O(n²)',
    'selection-sort': 'O(n²)',
    'insertion-sort': 'O(n²)',
    'merge-sort': 'O(n log n)',
    'quick-sort': 'O(n log n)',
    'heap-sort': 'O(n log n)',
    'binary-search': 'O(log n)',
    'linear-search': 'O(n)',
    'fibonacci-dp': 'O(n)',
    'fibonacci-recursive': 'O(2ⁿ)',
    'bfs': 'O(V + E)',
    'dfs': 'O(V + E)',
    'array-traverse': 'O(n)',
    'string-reverse': 'O(n)'
  };
  return complexities[algorithmId] || 'Unknown';
}

function generateComplexityGraphs(results, analysis) {
  const sizes = results.map(r => r.inputSize);
  const actualTimes = results.map(r => r.executionTime);
  
  // Generate theoretical curves based on determined complexity
  const theoreticalCurves = generateTheoreticalCurves(sizes, analysis.complexity, Math.max(...actualTimes));
  
  return {
    sizes,
    actualTimes,
    theoreticalCurves,
    bigO: theoreticalCurves.bigO,
    bigOmega: theoreticalCurves.bigOmega,
    bigTheta: theoreticalCurves.bigTheta
  };
}

function generateTheoreticalCurves(sizes, complexity, maxTime) {
  const curves = {
    bigO: [],
    bigOmega: [],
    bigTheta: []
  };
  
  const maxSize = Math.max(...sizes);
  
  sizes.forEach(size => {
    let theoreticalValue;
    
    switch (complexity) {
      case 'O(1)':
        theoreticalValue = maxTime * 0.1;
        break;
      case 'O(log n)':
        theoreticalValue = maxTime * (Math.log2(size + 1) / Math.log2(maxSize + 1));
        break;
      case 'O(n)':
        theoreticalValue = maxTime * (size / maxSize);
        break;
      case 'O(n log n)':
        theoreticalValue = maxTime * ((size * Math.log2(size + 1)) / (maxSize * Math.log2(maxSize + 1)));
        break;
      case 'O(n²)':
        theoreticalValue = maxTime * ((size * size) / (maxSize * maxSize));
        break;
      case 'O(n³)':
        theoreticalValue = maxTime * ((size * size * size) / (maxSize * maxSize * maxSize));
        break;
      default:
        theoreticalValue = maxTime * (size / maxSize);
    }
    
    curves.bigO.push(theoreticalValue * 1.2); // Upper bound
    curves.bigOmega.push(theoreticalValue * 0.8); // Lower bound  
    curves.bigTheta.push(theoreticalValue); // Tight bound
  });
  
  return curves;
}

module.exports = complexityAnalysis;