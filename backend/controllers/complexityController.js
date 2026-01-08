const { complexityAnalysis } = require("../index")

exports.analyzeComplexity = (req, res) => {
  const { algorithmId, inputSizes } = req.body;

  if (!algorithmId || !inputSizes || !Array.isArray(inputSizes)) {
    return res.status(400).json({
      error: "Algorithm ID and inputSizes array are required",
    });
  }

  const validSizes = inputSizes
    .filter((size) => typeof size === "number" && size > 0 && size <= 10000)
    .slice(0, 10);

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
};

exports.getAlgorithms = (req, res) => {
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
};