// algorithms/DynamicProgramming/fibonacci.js
const fibonacci = (n) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function fib(n):',
    '    if n <= 1: return n',
    '    if memo[n] exists: return memo[n]',
    '    memo[n] = fib(n-1) + fib(n-2)',
    '    return memo[n]'
  ];

  if (n < 0) {
    return {
      steps: [],
      explanations: ['Invalid input: n must be non-negative'],
      pseudocode,
      finalResult: { error: true, message: 'n must be non-negative' }
    };
  }

  const memo = {};

  const fibRecursive = (k, depth = 0) => {
    // Base case
    if (k <= 1) {
      const result = k;
      memo[k] = result;
      
      steps.push({
        dpTable: { ...memo },
        currentCell: { n: k },
        dependencies: [],
        action: 'base-case',
        explanation: `Base case: fib(${k}) = ${result}`,
        currentLine: 1,
        result: result
      });
      explanations.push(`Base case reached: fib(${k}) = ${result}`);
      return result;
    }

    // Check if already computed
    if (memo[k] !== undefined) {
      steps.push({
        dpTable: { ...memo },
        currentCell: { n: k },
        dependencies: [],
        action: 'memo-hit',
        explanation: `fib(${k}) already computed as ${memo[k]}, using memoization`,
        currentLine: 2,
        result: memo[k]
      });
      explanations.push(`Memoization hit: fib(${k}) = ${memo[k]}`);
      return memo[k];
    }

    // Compute recursively
    steps.push({
      dpTable: { ...memo },
      currentCell: { n: k },
      dependencies: [{ n: k - 1 }, { n: k - 2 }],
      action: 'recursive-call',
      explanation: `Computing fib(${k}) = fib(${k-1}) + fib(${k-2})`,
      currentLine: 3,
    });
    explanations.push(`Recursive call: fib(${k}) = fib(${k-1}) + fib(${k-2})`);

    const result = fibRecursive(k - 1, depth + 1) + fibRecursive(k - 2, depth + 1);
    memo[k] = result;

    steps.push({
      dpTable: { ...memo },
      currentCell: { n: k },
      dependencies: [{ n: k - 1 }, { n: k - 2 }],
      action: 'store-result',
      explanation: `fib(${k}) = ${result}`,
      currentLine: 4,
      result: result
    });
    explanations.push(`Stored fib(${k}) = ${result} in memo table`);

    return result;
  };

  const finalResult = fibRecursive(n);

  // Final summary step
  steps.push({
    dpTable: { ...memo },
    currentCell: null,
    dependencies: [],
    action: 'complete',
    explanation: `Fibonacci calculation complete! fib(${n}) = ${finalResult}`,
    currentLine: 5,
    result: finalResult,
    final: true
  });
  explanations.push(`Final result: fib(${n}) = ${finalResult}`);

  // Build memo array for display
  const memoArray = [];
  for (let i = 0; i <= n; i++) {
    memoArray.push(memo[i] !== undefined ? memo[i] : '?');
  }

  return {
    steps,
    explanations,
    pseudocode,
    finalResult: {
      value: finalResult,
      n: n,
      memoTable: memoArray
    },
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(n)',
        worst: 'O(n)'
      },
      space: 'O(n)',
      explanation: 'With memoization, each Fibonacci number is computed only once, making it O(n) time. Space complexity is O(n) for the memoization table.'
    },
    patternInsight: {
      overlappingSubproblems: `fib(${n}) depends on fib(${n-1}) and fib(${n-2}), which themselves have overlapping computations`,
      optimalSubstructure: 'Optimal solution to fib(n) uses optimal solutions to fib(n-1) and fib(n-2)'
    }
  };
};

module.exports = fibonacci;