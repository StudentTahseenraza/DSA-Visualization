// algorithms/index.js
const bubbleSort = require('./Sorting/bubbleSort');
const selectionSort = require('./Sorting/selectionSort');
const insertionSort = require('./Sorting/insertionSort');
const mergeSort = require('./Sorting/mergeSort');
const quickSort = require('./Sorting/quickSort');
const heapSort = require('./Sorting/heapSort');
const bstOperations = require('./algorithms/binarySearchTree');
const avlOperations = require('./algorithms/avlTree');
const graphAlgorithms = require('./algorithms/graphAlgorithms');
const linkedListOperations = require('./algorithms/linkedList');
const heapOperations = require('./algorithms/binaryHeap');
const trieOperations = require('./algorithms/trie');
const powerSet = require('./BacktrackingAlgorithm/powerSet');
const wordSearch = require('./BacktrackingAlgorithm/wordSearch');
const partitionKSubsets = require('./BacktrackingAlgorithm/partitionKSubsets');
const nQueens = require('./BacktrackingAlgorithm/nQueens');
const ratInMaze = require('./BacktrackingAlgorithm/ratInMaze');
const wordBreak = require('./BacktrackingAlgorithm/wordBreak');
const knightsTour = require('./BacktrackingAlgorithm/knightsTour');
const sudokuSolver = require('./BacktrackingAlgorithm/sudokuSolver');
const combinationSum = require('./BacktrackingAlgorithm/combinationSum');
const crosswordSolver = require('./BacktrackingAlgorithm/crosswordSolver');
const hamiltonianCycle = require('./BacktrackingAlgorithm/hamiltonianCycle');
const palindromePartitioning = require('./BacktrackingAlgorithm/palindromePartitioning');
const graphColoring = require('./BacktrackingAlgorithm/graphColoring');
const allPaths = require('./BacktrackingAlgorithm/allPaths');
const permutations = require('./BacktrackingAlgorithm/permutations');
const activitySelection = require('./GreedyAlgorithms/activitySelection');
const fractionalKnapsack = require('./GreedyAlgorithms/fractionalKnapsack');
const huffmanEncoding = require('./GreedyAlgorithms/huffmanEncoding');
const kruskalsAlgorithm = require('./GreedyAlgorithms/kruskalsAlgorithm');
const primsAlgorithm = require('./GreedyAlgorithms/primsAlgorithm');
const jobScheduling = require('./GreedyAlgorithms/jobScheduling');
const coinChange = require('./GreedyAlgorithms/coinChange');
const queueOperations = require('./Stack/queueOperations');
const stackOperations = require('./Stack/stackOperations');
const recursionOperations= require('./Stack/recursionOperations');
const arrayOperations =require('./Arrays/arrayOperations');
const stringOperations =require('./Arrays/stringOperations');
const linearSearch = require('./Searching/linearSearch');
const binarySearch = require('./Searching/binarySearch');

// Add complexity analysis
const complexityAnalysis = require('./routes/complexityAnalysis');

// Add graph coloring to graphAlgorithms if it's not already included
if (!graphAlgorithms.graphColoring) {
  graphAlgorithms.graphColoring = require('./BacktrackingAlgorithm/graphColoring');
}

module.exports = {
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
  allPaths,
  permutations,
  activitySelection,
  fractionalKnapsack,
  huffmanEncoding,
  kruskalsAlgorithm,
  primsAlgorithm,
  jobScheduling,
  coinChange,
  graphColoring,
  queueOperations,
  stackOperations,
  recursionOperations,
  arrayOperations,
  stringOperations,
  complexityAnalysis,
  linearSearch,
  binarySearch
};