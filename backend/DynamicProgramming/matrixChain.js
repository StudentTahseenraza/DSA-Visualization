// algorithms/DynamicProgramming/matrixChain.js
const matrixChain = (dimensions) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function matrixChainOrder(dims):',
    '    n = len(dims) - 1',
    '    dp = [[0]*n for _ in range(n)]',
    '    for length from 2 to n:',
    '        for i from 0 to n-length:',
    '            j = i + length - 1',
    '            dp[i][j] = infinity',
    '            for k from i to j-1:',
    '                cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]',
    '                dp[i][j] = min(dp[i][j], cost)',
    '    return dp[0][n-1]'
  ];

  const n = dimensions.length - 1;
  
  // Initialize DP tables
  const dp = Array(n).fill().map(() => Array(n).fill(0));
  const split = Array(n).fill().map(() => Array(n).fill(-1));

  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    dimensions: dimensions,
    currentCell: null,
    action: 'initialize',
    explanation: `Initializing DP table for ${n} matrices`,
    currentLine: 2,
    split: JSON.parse(JSON.stringify(split))
  });
  explanations.push(`DP table initialized`);

  // Fill DP table for chain lengths
  for (let length = 2; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;
      dp[i][j] = Infinity;
      
      steps.push({
        dpTable: JSON.parse(JSON.stringify(dp)),
        dimensions: dimensions,
        currentCell: { i, j },
        currentLength: length,
        action: 'start-compute',
        explanation: `Computing optimal multiplication for matrices ${i+1} to ${j+1} (chain length ${length})`,
        currentLine: 4,
        split: JSON.parse(JSON.stringify(split))
      });
      explanations.push(`Computing for chain from M${i+1} to M${j+1}`);

      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
        
        steps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          dimensions: dimensions,
          currentCell: { i, j },
          splitPoint: k,
          cost: cost,
          action: 'evaluate-split',
          explanation: `Split at ${k+1}: (M${i+1}..M${k+1}) x (M${k+2}..M${j+1}) cost = ${dp[i][k]} + ${dp[k+1][j]} + ${dimensions[i]}×${dimensions[k+1]}×${dimensions[j+1]} = ${cost}`,
          currentLine: 8,
          split: JSON.parse(JSON.stringify(split))
        });
        explanations.push(`Split at k=${k}: cost = ${cost}`);

        if (cost < dp[i][j]) {
          dp[i][j] = cost;
          split[i][j] = k;
          
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            dimensions: dimensions,
            currentCell: { i, j },
            splitPoint: k,
            action: 'update-best',
            explanation: `New best cost for M${i+1}..M${j+1}: ${cost}`,
            currentLine: 9,
            split: JSON.parse(JSON.stringify(split))
          });
          explanations.push(`Updated best cost to ${cost}`);
        }
      }
    }
  }

  // Build optimal parenthesization
  const buildParenthesization = (i, j) => {
    if (i === j) return `M${i + 1}`;
    const k = split[i][j];
    return `(${buildParenthesization(i, k)} × ${buildParenthesization(k + 1, j)})`;
  };

  const optimalOrder = n > 1 ? buildParenthesization(0, n - 1) : `M1`;
  const minOperations = dp[0][n - 1];

  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    dimensions: dimensions,
    currentCell: { i: 0, j: n - 1 },
    action: 'complete',
    explanation: `Matrix Chain complete! Minimum operations: ${minOperations}. Optimal order: ${optimalOrder}`,
    currentLine: 10,
    optimalOrder: optimalOrder,
    minOperations: minOperations,
    final: true
  });
  explanations.push(`Final minimum operations: ${minOperations}`);

  return {
    steps,
    explanations,
    pseudocode,
    finalResult: {
      minOperations: minOperations,
      optimalOrder: optimalOrder,
      dpTable: dp,
      dimensions: dimensions
    },
    complexity: {
      time: {
        best: 'O(n³)',
        average: 'O(n³)',
        worst: 'O(n³)'
      },
      space: 'O(n²)',
      explanation: `Time complexity is O(n³) where n is number of matrices. Space complexity is O(n²) for the DP tables.`
    },
    patternInsight: {
      overlappingSubproblems: `Each subproblem dp[i][j] depends on dp[i][k] and dp[k+1][j] for all k between i and j`,
      optimalSubstructure: `Optimal parenthesization uses optimal parenthesizations of subchains`
    }
  };
};

module.exports = matrixChain;