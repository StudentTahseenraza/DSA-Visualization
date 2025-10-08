// algorithms/fibonacci.js
const fibonacci = (n) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'if n <= 1:',
    '  return n',
    'else:',
    '  return fibonacci(n-1) + fibonacci(n-2)',
    '',
    'Memoized version:',
    'if n in memo:',
    '  return memo[n]',
    'if n <= 1:',
    '  return n',
    'memo[n] = fib(n-1) + fib(n-2)',
    'return memo[n]'
  ];

  // Memoization table for DP approach
  const memo = {};
  const result = fibDP(n, memo, steps, explanations);
  
  // Final step showing the result
  const finalExplanation = `Fibonacci(${n}) = ${result}`;
  steps.push({
    array: Object.values(memo),
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 11,
    action: 'complete',
    memo: {...memo}
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Helper function for DP approach
const fibDP = (n, memo, steps, explanations) => {
  // Check if already computed
  if (n in memo) {
    const explanation = `Found fib(${n}) = ${memo[n]} in memo`;
    steps.push({
      array: Object.values(memo),
      currentIndex: n,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 7,
      action: 'memo-hit',
      memo: {...memo}
    });
    explanations.push(explanation);
    return memo[n];
  }

  // Base cases
  if (n <= 1) {
    memo[n] = n;
    const explanation = `Base case: fib(${n}) = ${n}`;
    steps.push({
      array: Object.values(memo),
      currentIndex: n,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 9,
      action: 'base-case',
      memo: {...memo}
    });
    explanations.push(explanation);
    return n;
  }

  // Recursive case with memoization
  const explanation = `Computing fib(${n}) = fib(${n-1}) + fib(${n-2})`;
  steps.push({
    array: Object.values(memo),
    currentIndex: n,
    minIndex: -1,
    comparingIndices: [n-1, n-2],
    swappingIndices: null,
    currentLine: 10,
    action: 'compute',
    memo: {...memo}
  });
  explanations.push(explanation);

  memo[n] = fibDP(n-1, memo, steps, explanations) + fibDP(n-2, memo, steps, explanations);
  
  const resultExplanation = `Computed fib(${n}) = ${memo[n]}`;
  steps.push({
    array: Object.values(memo),
    currentIndex: n,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 10,
    action: 'computed',
    memo: {...memo}
  });
  explanations.push(resultExplanation);

  return memo[n];
};

module.exports = fibonacci;