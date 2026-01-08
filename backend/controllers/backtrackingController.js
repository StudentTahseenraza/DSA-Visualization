const {
  nQueens,
  sudokuSolver,
  ratInMaze,
  knightsTour,
  wordSearch,
  powerSet,
  partitionKSubsets,
  wordBreak,
  combinationSum,
  crosswordSolver,
  hamiltonianCycle,
  palindromePartitioning,
  allPaths,
  permutations,
  graphColoring
} = require("../index");

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

exports.handleBacktrackingAlgorithm = (req, res) => {
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
};