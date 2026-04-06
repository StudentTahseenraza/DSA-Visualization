// controllers/dpAnalysisController.js
const fibonacci = require('../algorithms/DynamicProgramming/fibonacci');
const knapsack01 = require('../algorithms/DynamicProgramming/knapsack01');
const lcs = require('../algorithms/DynamicProgramming/lcs');
const coinChange = require('../algorithms/DynamicProgramming/coinChange');
const editDistance = require('../algorithms/DynamicProgramming/editDistance');
const matrixChain = require('../algorithms/DynamicProgramming/matrixChain');

// Complexity Graph Generator
const generateComplexityGraph = (algorithm, maxInputSize = 20) => {
  const best = [];
  const avg = [];
  const worst = [];
  
  for (let size = 1; size <= maxInputSize; size++) {
    switch (algorithm) {
      case 'fibonacci':
        best.push(size); // O(n)
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
        explanation: `With memoization, each Fibonacci number is computed exactly once. The recursion tree collapses from 2^n nodes to just n+1 unique states.`
      };
      
    case 'knapsack-dp':
      const { items, capacity } = params;
      return {
        states: `${items.length} items × ${capacity} capacity = ${items.length * capacity} states`,
        transitions: `Each state evaluates 2 options (include/exclude) → O(1) work per state`,
        totalWork: `${items.length} × ${capacity} × 1 = O(${items.length} × ${capacity})`,
        explanation: `For each item i and capacity w, we compare including vs excluding the item. This builds the optimal solution from smaller subproblems.`
      };
      
    case 'longest-common-subsequence':
      const { str1, str2 } = params;
      return {
        states: `(${str1.length} + 1) × (${str2.length} + 1) = ${(str1.length + 1) * (str2.length + 1)} states`,
        transitions: `Each state takes O(1) time - either match characters or take max of neighbors`,
        totalWork: `O(${str1.length} × ${str2.length})`,
        explanation: `Each cell dp[i][j] depends only on dp[i-1][j-1], dp[i-1][j], and dp[i][j-1]. We fill the table in O(m×n) time.`
      };
      
    default:
      return {
        states: "N × M states",
        transitions: "O(1) per state",
        totalWork: "O(N × M)",
        explanation: "Dynamic programming breaks the problem into overlapping subproblems."
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
          `1. fib(0) and fib(1) are base cases → stored in memo table`,
          `2. fib(2) = fib(1) + fib(0) → both already computed`,
          `3. Each subsequent fib(k) uses cached results from fib(k-1) and fib(k-2)`,
          `4. Result: Exponential O(2^n) → Linear O(n)`
        ]
      };
      
    case 'knapsack-dp':
      const { items, capacity } = params;
      const totalCombinations = Math.pow(2, items.length);
      const dpStates = items.length * capacity;
      
      return {
        recursionCalls: totalCombinations,
        dpCalls: dpStates,
        savedCalls: totalCombinations - dpStates,
        savedPercentage: ((totalCombinations - dpStates) / totalCombinations * 100).toFixed(1),
        explanation: `Brute force would check all ${totalCombinations.toLocaleString()} subsets. DP only evaluates ${dpStates} states, saving exponential time!`,
        recursionTree: null,
        dpOptimization: [
          `1. Sort items by value/weight ratio (for greedy) or use DP table`,
          `2. Each cell (i, w) represents optimal value using first i items with capacity w`,
          `3. Decision: include item i (add value, reduce capacity) or exclude it`,
          `4. Optimal substructure: best for i items uses best for i-1 items`
        ]
      };
      
    default:
      return {
        recursionCalls: 0,
        dpCalls: 0,
        savedCalls: 0,
        savedPercentage: 0,
        explanation: "DP reduces exponential time to polynomial time.",
        recursionTree: null,
        dpOptimization: ["Memoization stores computed results", "Tabulation builds bottom-up"]
      };
  }
};

// Generate recursion tree sample
const generateRecursionTreeSample = (n) => {
  if (n > 5) return `Tree too large (2^${n} nodes). Shows exponential growth!`;
  
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

// Operation-level explanations
const generateOperationExplanations = (algorithm, stepData) => {
  const explanations = [];
  
  switch (algorithm) {
    case 'longest-common-subsequence':
      explanations.push(
        "📊 **DP Table Construction**: Each cell dp[i][j] represents the LCS length for prefixes str1[0..i-1] and str2[0..j-1]",
        "🎯 **Base Case**: dp[0][j] = 0 and dp[i][0] = 0 (empty string has LCS length 0)",
        "🔄 **Match Case**: When str1[i-1] == str2[j-1], dp[i][j] = dp[i-1][j-1] + 1",
        "📈 **Mismatch Case**: When characters differ, dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
        "🔍 **Backtracking**: To reconstruct LCS, follow diagonal arrows from dp[m][n]"
      );
      break;
      
    case 'knapsack-dp':
      explanations.push(
        "📊 **State Definition**: dp[i][w] = maximum value using first i items with capacity w",
        "🎯 **Base Case**: dp[0][w] = 0 (no items, value 0 for any capacity)",
        "🔀 **Decision at each state**: For item i with weight wi and value vi",
        "   • **Exclude**: dp[i-1][w] (same value without using item i)",
        "   • **Include**: vi + dp[i-1][w-wi] (if wi ≤ w)",
        "✨ **Optimal Choice**: dp[i][w] = max(exclude, include)",
        "💡 **Why this works**: Optimal solution either includes or excludes item i"
      );
      break;
      
    case 'fibonacci':
      explanations.push(
        "📊 **State Definition**: dp[n] = nth Fibonacci number",
        "🎯 **Base Cases**: dp[0] = 0, dp[1] = 1",
        "🔄 **Transition**: dp[n] = dp[n-1] + dp[n-2]",
        "💾 **Memoization**: Store computed results to avoid recalculation",
        "⚡ **Optimization**: Reduces time from O(2^n) to O(n)"
      );
      break;
      
    default:
      explanations.push("Operation explanation will appear here");
  }
  
  return explanations;
};

// Pattern insights
const generatePatternInsights = (algorithm, params) => {
  const insights = {
    overlappingSubproblems: "",
    optimalSubstructure: "",
    stateDefinition: "",
    transition: "",
    realWorldAnalogy: ""
  };
  
  switch (algorithm) {
    case 'longest-common-subsequence':
      insights.overlappingSubproblems = "LCS(i, j) depends on LCS(i-1, j-1), LCS(i-1, j), and LCS(i, j-1). These subproblems are reused many times when building the table.";
      insights.optimalSubstructure = "The LCS of two strings contains the LCS of their prefixes. Optimal solution to the whole problem uses optimal solutions to subproblems.";
      insights.stateDefinition = "dp[i][j] = length of LCS for first i chars of str1 and first j chars of str2";
      insights.transition = "if str1[i] == str2[j]: dp[i][j] = dp[i-1][j-1] + 1 else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])";
      insights.realWorldAnalogy = "Like finding common interests between two friends - comparing their preferences step by step!";
      break;
      
    case 'knapsack-dp':
      insights.overlappingSubproblems = "The subproblem for capacity w with i items is reused when considering different combinations of items.";
      insights.optimalSubstructure = "Optimal solution for capacity W with N items uses optimal solutions for capacity W-wi with N-1 items.";
      insights.stateDefinition = "dp[i][w] = maximum value achievable with first i items and capacity w";
      insights.transition = "dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])";
      insights.realWorldAnalogy = "Like packing a suitcase - deciding whether to include each item based on remaining space!";
      break;
      
    case 'fibonacci':
      insights.overlappingSubproblems = "fib(5) calls fib(4) and fib(3), but fib(4) also calls fib(3) again - creating overlap!";
      insights.optimalSubstructure = "The nth Fibonacci number depends on the (n-1)th and (n-2)th numbers.";
      insights.stateDefinition = "dp[n] = nth Fibonacci number";
      insights.transition = "dp[n] = dp[n-1] + dp[n-2]";
      insights.realWorldAnalogy = "Like rabbit population growth - each generation depends on the previous two!";
      break;
      
    default:
      insights.overlappingSubproblems = "Subproblems are reused multiple times during computation.";
      insights.optimalSubstructure = "Optimal solution contains optimal solutions to subproblems.";
      insights.stateDefinition = "Define what each DP cell represents.";
      insights.transition = "Define how to compute current state from previous states.";
      insights.realWorldAnalogy = "Breaking complex problems into simpler, overlapping subproblems!";
  }
  
  return insights;
};

// Main handler
const handleDPAnalysis = (req, res) => {
  const { algorithm } = req.params;
  const requestBody = req.body;
  
  try {
    let result;
    let analysisData = {};
    
    switch (algorithm) {
      case 'fibonacci':
        result = fibonacci(requestBody.n);
        analysisData = {
          finalResult: result.finalResult,
          complexity: result.complexity,
          complexityBreakdown: calculateComplexityBreakdown('fibonacci', { n: requestBody.n }),
          complexityGraph: generateComplexityGraph('fibonacci', Math.min(requestBody.n, 20)),
          memoizationInsight: calculateMemoizationInsight('fibonacci', { n: requestBody.n }),
          operationExplanation: generateOperationExplanations('fibonacci', result.steps),
          patternInsight: generatePatternInsights('fibonacci', { n: requestBody.n })
        };
        break;
        
      case 'knapsack-dp':
        result = knapsack01(requestBody.items, requestBody.capacity);
        analysisData = {
          finalResult: result.finalResult,
          complexity: result.complexity,
          complexityBreakdown: calculateComplexityBreakdown('knapsack-dp', { 
            items: requestBody.items, 
            capacity: requestBody.capacity 
          }),
          complexityGraph: generateComplexityGraph('knapsack-dp', Math.min(requestBody.items.length, 15)),
          memoizationInsight: calculateMemoizationInsight('knapsack-dp', { 
            items: requestBody.items, 
            capacity: requestBody.capacity 
          }),
          operationExplanation: generateOperationExplanations('knapsack-dp', result.steps),
          patternInsight: generatePatternInsights('knapsack-dp', { 
            items: requestBody.items, 
            capacity: requestBody.capacity 
          })
        };
        break;
        
      case 'longest-common-subsequence':
        result = lcs(requestBody.str1, requestBody.str2);
        analysisData = {
          finalResult: result.finalResult,
          complexity: result.complexity,
          complexityBreakdown: calculateComplexityBreakdown('longest-common-subsequence', { 
            str1: requestBody.str1, 
            str2: requestBody.str2 
          }),
          complexityGraph: generateComplexityGraph('longest-common-subsequence', Math.min(Math.max(requestBody.str1.length, requestBody.str2.length), 15)),
          memoizationInsight: calculateMemoizationInsight('longest-common-subsequence', { 
            str1: requestBody.str1, 
            str2: requestBody.str2 
          }),
          operationExplanation: generateOperationExplanations('longest-common-subsequence', result.steps),
          patternInsight: generatePatternInsights('longest-common-subsequence', { 
            str1: requestBody.str1, 
            str2: requestBody.str2 
          })
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