// controllers/dpAnalysisController.js
const fibonacci = require('../DynamicProgramming/fibonacci');
const knapsack01 = require('../DynamicProgramming/knapsack01');
const lcs = require('../DynamicProgramming/lcs');
const coinChange = require('../DynamicProgramming/coinChange');
const editDistance = require('../DynamicProgramming/editDistance');
const matrixChain = require('../DynamicProgramming/matrixChain');

// Complexity Graph Generator
const generateComplexityGraph = (algorithm, maxInputSize = 20) => {
  const best = [];
  const avg = [];
  const worst = [];
  
  for (let size = 1; size <= maxInputSize; size++) {
    switch (algorithm) {
      case 'fibonacci':
        best.push(size);
        avg.push(size);
        worst.push(size);
        break;
      case 'knapsack-dp':
        const capacity = Math.floor(size * 1.5);
        best.push(size * capacity);
        avg.push(size * capacity);
        worst.push(size * capacity);
        break;
      case 'longest-common-subsequence':
        best.push(size * size);
        avg.push(size * size);
        worst.push(size * size);
        break;
      case 'coin-change-dp':
        best.push(size * 5);
        avg.push(size * 5);
        worst.push(size * 5);
        break;
      case 'edit-distance':
        best.push(size * size);
        avg.push(size * size);
        worst.push(size * size);
        break;
      case 'matrix-chain-multiplication':
        best.push(size * size * size);
        avg.push(size * size * size);
        worst.push(size * size * size);
        break;
      default:
        best.push(size);
        avg.push(size);
        worst.push(size);
    }
  }
  
  return { best, avg, worst, inputSizes: Array.from({ length: maxInputSize }, (_, i) => i + 1) };
};

// Complexity Breakdown Calculator
const calculateComplexityBreakdown = (algorithm, params) => {
  switch (algorithm) {
    case 'fibonacci':
      return {
        states: `n = ${params.n} (numbers from 0 to ${params.n})`,
        transitions: `Each state has 1 transition: fib(n) = fib(n-1) + fib(n-2)`,
        totalWork: `Total states (${params.n + 1}) × work per state (1) = O(${params.n})`,
        explanation: `With memoization, each Fibonacci number is computed exactly once. The recursion tree collapses from 2^n nodes to just n+1 unique states.`,
        formula: `T(n) = T(n-1) + T(n-2) + O(1) → With memoization: O(n)`
      };
      
    case 'knapsack-dp':
      const { items, capacity } = params;
      return {
        states: `${items.length} items × ${capacity} capacity = ${items.length * capacity} states`,
        transitions: `Each state evaluates 2 options (include/exclude) → O(1) work per state`,
        totalWork: `${items.length} × ${capacity} × 1 = O(${items.length} × ${capacity})`,
        explanation: `For each item i and capacity w, we compare including vs excluding the item. This builds the optimal solution from smaller subproblems.`,
        formula: `T(n, W) = O(n × W) where n = number of items, W = capacity`
      };
      
    case 'longest-common-subsequence':
      const { str1, str2 } = params;
      return {
        states: `(${str1.length} + 1) × (${str2.length} + 1) = ${(str1.length + 1) * (str2.length + 1)} states`,
        transitions: `Each state takes O(1) time - either match characters or take max of neighbors`,
        totalWork: `O(${str1.length} × ${str2.length})`,
        explanation: `Each cell dp[i][j] depends only on dp[i-1][j-1], dp[i-1][j], and dp[i][j-1]. We fill the table in O(m×n) time.`,
        formula: `T(m, n) = O(m × n) where m = |str1|, n = |str2|`
      };
      
    default:
      return {
        states: "N × M states",
        transitions: "O(1) per state",
        totalWork: "O(N × M)",
        explanation: "Dynamic programming breaks the problem into overlapping subproblems.",
        formula: "T(N, M) = O(N × M)"
      };
  }
};

// Memoization vs Recursion Insight
const calculateMemoizationInsight = (algorithm, params) => {
  switch (algorithm) {
    case 'fibonacci':
      const { n } = params;
      const recursionCalls = Math.pow(2, n) - 1;
      const dpCalls = n + 1;
      const savedCalls = recursionCalls - dpCalls;
      
      return {
        recursionCalls,
        dpCalls,
        savedCalls,
        savedPercentage: ((savedCalls / recursionCalls) * 100).toFixed(1),
        explanation: `Without DP, fib(${n}) would make ${recursionCalls.toLocaleString()} recursive calls. With memoization, only ${dpCalls} unique states are computed, saving ${savedCalls.toLocaleString()} (${((savedCalls / recursionCalls) * 100).toFixed(1)}%) redundant calculations!`,
        recursionTree: generateRecursionTreeSample(n),
        dpOptimization: [
          "Step 1: Create memoization table (array) to store computed results",
          "Step 2: Check if result exists in memo before computing",
          "Step 3: Store computed result in memo for future use",
          "Step 4: Each number computed only once - O(n) time complexity"
        ],
        visualComparison: {
          withoutDP: `${recursionCalls.toLocaleString()} calls`,
          withDP: `${dpCalls} calls`,
          improvement: `${((savedCalls / recursionCalls) * 100).toFixed(1)}% faster`
        }
      };
      
    case 'knapsack-dp':
      const { items, capacity } = params;
      const totalCombinations = Math.pow(2, items.length);
      const dpStates = items.length * capacity;
      
      return {
        recursionCalls: totalCombinations,
        dpCalls: dpStates,
        savedCalls: totalCombinations - dpStates,
        savedPercentage: totalCombinations > 0 ? ((totalCombinations - dpStates) / totalCombinations * 100).toFixed(1) : 0,
        explanation: `Brute force would check all ${totalCombinations.toLocaleString()} subsets. DP only evaluates ${dpStates} states, saving exponential time!`,
        recursionTree: null,
        dpOptimization: [
          "Step 1: Create DP table of size (n+1) × (W+1)",
          "Step 2: Fill table row by row using optimal substructure",
          "Step 3: For each cell, decide include or exclude current item",
          "Step 4: Final answer at dp[n][W] - optimal solution found!"
        ],
        visualComparison: {
          withoutDP: `${totalCombinations.toLocaleString()} subsets`,
          withDP: `${dpStates} states`,
          improvement: totalCombinations > 0 ? `${((totalCombinations - dpStates) / totalCombinations * 100).toFixed(1)}% faster` : 'N/A'
        }
      };
      
    default:
      return {
        recursionCalls: 0,
        dpCalls: 0,
        savedCalls: 0,
        savedPercentage: 0,
        explanation: "DP reduces exponential time to polynomial time.",
        recursionTree: null,
        dpOptimization: ["Memoization stores computed results", "Tabulation builds bottom-up"],
        visualComparison: {
          withoutDP: "Exponential",
          withDP: "Polynomial",
          improvement: "Significant"
        }
      };
  }
};

// Generate recursion tree sample
const generateRecursionTreeSample = (n) => {
  if (n > 5) return { message: `Tree too large (2^${n} nodes). Shows exponential growth!`, size: Math.pow(2, n) };
  
  const buildTree = (k, depth = 0) => {
    if (k <= 1) return { value: k, children: [] };
    return {
      value: k,
      children: [buildTree(k - 1, depth + 1), buildTree(k - 2, depth + 1)],
      repeated: k > 2
    };
  };
  
  return buildTree(n);
};

// Operation-level explanations - COMPLETE VERSION
const generateOperationExplanations = (algorithm, params, steps = []) => {
  const explanations = [];
  
  switch (algorithm) {
    case 'fibonacci':
      explanations.push({
        step: 1,
        title: "Base Cases",
        description: "The first two Fibonacci numbers are defined as fib(0) = 0 and fib(1) = 1. These are our base cases that stop the recursion.",
        visual: "fib(0) = 0, fib(1) = 1",
        formula: "Base: F(0) = 0, F(1) = 1"
      });
      explanations.push({
        step: 2,
        title: "Recursive Relation",
        description: "For n > 1, fib(n) = fib(n-1) + fib(n-2). Each number depends on the two previous numbers.",
        visual: "fib(5) = fib(4) + fib(3)",
        formula: "F(n) = F(n-1) + F(n-2) for n ≥ 2"
      });
      explanations.push({
        step: 3,
        title: "Memoization (Optimization)",
        description: "Store each computed fib(k) in a memo table. Before computing, check if already calculated.",
        visual: "if memo[n] exists: return memo[n]",
        formula: "Memo[n] = F(n) after computation"
      });
      explanations.push({
        step: 4,
        title: "Time Complexity Analysis",
        description: "Without memoization: O(2^n). With memoization: O(n) - each number computed once.",
        visual: `Computes ${params.n + 1} unique values instead of 2^${params.n} recursive calls`,
        formula: "T(n) = O(n) with memoization"
      });
      break;
      
    case 'knapsack-dp':
      explanations.push({
        step: 1,
        title: "State Definition",
        description: "dp[i][w] represents the maximum value achievable using first i items with capacity w.",
        visual: `dp[${params.items?.length || 3}][${params.capacity || 50}] = maximum value`,
        formula: "dp[i][w] = max value for i items, capacity w"
      });
      explanations.push({
        step: 2,
        title: "Base Case Initialization",
        description: "With 0 items or 0 capacity, the maximum value is 0.",
        visual: "dp[0][w] = 0 for all w, dp[i][0] = 0 for all i",
        formula: "Base: dp[0][w] = dp[i][0] = 0"
      });
      explanations.push({
        step: 3,
        title: "Decision at Each State",
        description: "For each item, we decide to include it (if weight fits) or exclude it.",
        visual: "include = value[i] + dp[i-1][w - weight[i]], exclude = dp[i-1][w]",
        formula: "dp[i][w] = max(include, exclude)"
      });
      explanations.push({
        step: 4,
        title: "Table Filling Order",
        description: "Fill the DP table row by row, left to right. Each cell depends on previous row.",
        visual: "Process items sequentially, for each capacity from 0 to W",
        formula: "Bottom-up tabulation: O(n × W) time"
      });
      explanations.push({
        step: 5,
        title: "Solution Reconstruction",
        description: "Trace back from dp[n][W] to find which items were selected.",
        visual: "If dp[i][w] != dp[i-1][w], item i was selected",
        formula: "Backtrack to get selected items"
      });
      break;
      
    case 'longest-common-subsequence':
      const { str1, str2 } = params;
      explanations.push({
        step: 1,
        title: "Problem Understanding",
        description: "Find the longest sequence that appears in both strings in the same order (not necessarily contiguous).",
        visual: `LCS of "${str1 || 'ABCD'}" and "${str2 || 'ACD'}" is "ACD"`,
        formula: "Length of LCS = dp[m][n]"
      });
      explanations.push({
        step: 2,
        title: "DP Table Setup",
        description: "Create a table of size (m+1) × (n+1) where m = len(str1), n = len(str2).",
        visual: `Table size: ${(str1?.length || 4) + 1} × ${(str2?.length || 3) + 1}`,
        formula: "dp[i][j] = LCS length for prefixes str1[0..i-1] and str2[0..j-1]"
      });
      explanations.push({
        step: 3,
        title: "Match Case",
        description: "When characters match, we add 1 to the diagonal value.",
        visual: `if str1[${str1?.length - 1 || 3}] == str2[${str2?.length - 1 || 2}]: dp[i][j] = dp[i-1][j-1] + 1`,
        formula: "Match: dp[i][j] = dp[i-1][j-1] + 1"
      });
      explanations.push({
        step: 4,
        title: "Mismatch Case",
        description: "When characters differ, take maximum of left and top cells.",
        visual: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`,
        formula: "Mismatch: dp[i][j] = max(up, left)"
      });
      explanations.push({
        step: 5,
        title: "Backtracking for Sequence",
        description: "Follow diagonal arrows from dp[m][n] to reconstruct the actual LCS string.",
        visual: "If characters match, add to result and move diagonal; else move to max neighbor",
        formula: "Reconstruct by tracing back optimal path"
      });
      break;
      
    default:
      explanations.push({
        step: 1,
        title: "Dynamic Programming Approach",
        description: "Break problem into overlapping subproblems and store results.",
        visual: "Use table to store computed values",
        formula: "Optimal substructure + overlapping subproblems"
      });
  }
  
  return explanations;
};

// Pattern insights - COMPLETE VERSION
const generatePatternInsights = (algorithm, params) => {
  const insights = {
    overlappingSubproblems: "",
    optimalSubstructure: "",
    stateDefinition: "",
    transition: "",
    realWorldAnalogy: "",
    whenToUse: "",
    commonMistakes: []
  };
  
  switch (algorithm) {
    case 'fibonacci':
      insights.overlappingSubproblems = "fib(5) calls fib(4) and fib(3), but fib(4) also calls fib(3) again - creating overlap! Without DP, fib(3) is computed multiple times.";
      insights.optimalSubstructure = "The nth Fibonacci number depends on the (n-1)th and (n-2)th numbers. Solving smaller subproblems leads to the solution.";
      insights.stateDefinition = "dp[n] = the nth Fibonacci number";
      insights.transition = "dp[n] = dp[n-1] + dp[n-2] for n ≥ 2, with base cases dp[0] = 0, dp[1] = 1";
      insights.realWorldAnalogy = "Like rabbit population growth (Fibonacci's original problem) - each generation depends on the previous two!";
      insights.whenToUse = "When a problem can be broken into smaller instances of the same problem with overlapping calculations.";
      insights.commonMistakes = [
        "Forgetting base cases (fib(0) and fib(1))",
        "Not using memoization, leading to exponential time",
        "Using recursion without caching for large n"
      ];
      break;
      
    case 'knapsack-dp':
      insights.overlappingSubproblems = "The subproblem for capacity w with i items is reused when considering different combinations of items. Many subsets share the same (i, w) state.";
      insights.optimalSubstructure = "Optimal solution for capacity W with N items uses optimal solutions for capacity W-wi with N-1 items. If we remove item i, the remaining solution is optimal for the reduced capacity.";
      insights.stateDefinition = "dp[i][w] = maximum value achievable using first i items with total capacity w";
      insights.transition = "dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]]) (if weight[i] ≤ w)";
      insights.realWorldAnalogy = "Like packing a suitcase for a trip - deciding whether to include each item based on remaining space and value!";
      insights.whenToUse = "When you have limited capacity and need to maximize value, and items cannot be broken (0/1).";
      insights.commonMistakes = [
        "Forgetting to check if item weight fits in capacity",
        "Using greedy approach (doesn't work for 0/1 knapsack)",
        "Not initializing base cases properly"
      ];
      break;
      
    case 'longest-common-subsequence':
      insights.overlappingSubproblems = "LCS(i, j) depends on LCS(i-1, j-1), LCS(i-1, j), and LCS(i, j-1). These subproblems are reused many times when building the table.";
      insights.optimalSubstructure = "The LCS of two strings contains the LCS of their prefixes. If we know LCS of prefixes, we can build the full LCS.";
      insights.stateDefinition = "dp[i][j] = length of LCS for first i chars of str1 and first j chars of str2";
      insights.transition = "if str1[i] == str2[j]: dp[i][j] = dp[i-1][j-1] + 1 else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])";
      insights.realWorldAnalogy = "Like finding common interests between two friends - comparing their preferences step by step! Also used in DNA sequence alignment.";
      insights.whenToUse = "When comparing two sequences to find common patterns (DNA sequencing, version control diff, plagiarism detection).";
      insights.commonMistakes = [
        "Confusing subsequence with substring (subsequence doesn't need to be contiguous)",
        "Incorrectly handling the base cases (empty strings)",
        "Forgetting to reconstruct the actual sequence"
      ];
      break;
      
    default:
      insights.overlappingSubproblems = "Subproblems are reused multiple times during computation.";
      insights.optimalSubstructure = "Optimal solution contains optimal solutions to subproblems.";
      insights.stateDefinition = "Define what each DP cell represents.";
      insights.transition = "Define how to compute current state from previous states.";
      insights.realWorldAnalogy = "Breaking complex problems into simpler, overlapping subproblems!";
      insights.whenToUse = "When problem has optimal substructure and overlapping subproblems.";
      insights.commonMistakes = ["Not identifying correct state", "Wrong transition formula", "Incorrect base cases"];
  }
  
  return insights;
};

// Optimization tips
const generateOptimizationTips = (algorithm, params) => {
  const tips = [];
  
  switch (algorithm) {
    case 'fibonacci':
      tips.push({
        title: "💾 Space Optimization",
        description: "Since we only need the last two values, we can use O(1) space instead of O(n).",
        code: "let a = 0, b = 1; for(let i = 2; i <= n; i++) { [a, b] = [b, a + b]; } return b;",
        benefit: "Reduces space from O(n) to O(1)"
      });
      tips.push({
        title: "⚡ Iterative Approach",
        description: "Bottom-up tabulation is often faster than recursion with memoization.",
        benefit: "Avoids function call overhead"
      });
      break;
      
    case 'knapsack-dp':
      tips.push({
        title: "💾 Space Optimization",
        description: "Use 1D array instead of 2D since we only need previous row.",
        code: "let dp = new Array(W+1).fill(0); for(let item of items) { for(let w = W; w >= item.weight; w--) { dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value); } }",
        benefit: "Reduces space from O(n×W) to O(W)"
      });
      tips.push({
        title: "⚡ Early Exit",
        description: "Sort items by value/weight ratio and stop when remaining capacity is 0.",
        benefit: "Potentially faster for large capacities"
      });
      break;
      
    case 'longest-common-subsequence':
      tips.push({
        title: "💾 Space Optimization",
        description: "Use 2 rows instead of full table since each row only depends on previous row.",
        code: "let prev = new Array(n+1).fill(0); for(let i = 1; i <= m; i++) { let curr = new Array(n+1).fill(0); for(let j = 1; j <= n; j++) { if(str1[i-1] === str2[j-1]) curr[j] = prev[j-1] + 1; else curr[j] = Math.max(prev[j], curr[j-1]); } prev = curr; }",
        benefit: "Reduces space from O(m×n) to O(n)"
      });
      break;
  }
  
  return tips;
};

// Main handler - COMPLETE VERSION
const handleDPAnalysis = (req, res) => {
  const { algorithm } = req.params;
  const requestBody = req.body;
  
  try {
    let result;
    let analysisData = {};
    let params = {};
    
    switch (algorithm) {
      case 'fibonacci':
        params = { n: requestBody.n };
        result = fibonacci(requestBody.n);
        analysisData = {
          finalResult: result.finalResult,
          complexity: result.complexity,
          complexityBreakdown: calculateComplexityBreakdown('fibonacci', params),
          complexityGraph: generateComplexityGraph('fibonacci', Math.min(requestBody.n, 20)),
          memoizationInsight: calculateMemoizationInsight('fibonacci', params),
          operationExplanation: generateOperationExplanations('fibonacci', params, result.steps),
          patternInsight: generatePatternInsights('fibonacci', params),
          optimizationTips: generateOptimizationTips('fibonacci', params)
        };
        break;
        
      case 'knapsack-dp':
        params = { items: requestBody.items, capacity: requestBody.capacity };
        result = knapsack01(requestBody.items, requestBody.capacity);
        analysisData = {
          finalResult: result.finalResult,
          complexity: result.complexity,
          complexityBreakdown: calculateComplexityBreakdown('knapsack-dp', params),
          complexityGraph: generateComplexityGraph('knapsack-dp', Math.min(requestBody.items.length, 15)),
          memoizationInsight: calculateMemoizationInsight('knapsack-dp', params),
          operationExplanation: generateOperationExplanations('knapsack-dp', params, result.steps),
          patternInsight: generatePatternInsights('knapsack-dp', params),
          optimizationTips: generateOptimizationTips('knapsack-dp', params)
        };
        break;
        
      case 'longest-common-subsequence':
        params = { str1: requestBody.str1, str2: requestBody.str2 };
        result = lcs(requestBody.str1, requestBody.str2);
        analysisData = {
          finalResult: result.finalResult,
          complexity: result.complexity,
          complexityBreakdown: calculateComplexityBreakdown('longest-common-subsequence', params),
          complexityGraph: generateComplexityGraph('longest-common-subsequence', Math.min(Math.max(requestBody.str1.length, requestBody.str2.length), 15)),
          memoizationInsight: calculateMemoizationInsight('longest-common-subsequence', params),
          operationExplanation: generateOperationExplanations('longest-common-subsequence', params, result.steps),
          patternInsight: generatePatternInsights('longest-common-subsequence', params),
          optimizationTips: generateOptimizationTips('longest-common-subsequence', params)
        };
        break;
        
      default:
        return res.status(400).json({ error: `Unknown DP algorithm: ${algorithm}` });
    }
    
    // Combine results with analysis
    const response = {
      ...result,
      ...analysisData
    };
    
    res.json(response);
    
  } catch (error) {
    console.error(`Error in /api/dp/${algorithm}:`, error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};

module.exports = { handleDPAnalysis };