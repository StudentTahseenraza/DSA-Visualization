// algorithms/DynamicProgramming/knapsack01.js
const knapsack01 = (items, capacity) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function knapsack01(items, capacity):',
    '    n = len(items)',
    '    dp = [[0]*(capacity+1) for _ in range(n+1)]',
    '    for i from 1 to n:',
    '        for w from 0 to capacity:',
    '            if items[i-1].weight <= w:',
    '                include = items[i-1].value + dp[i-1][w - items[i-1].weight]',
    '                exclude = dp[i-1][w]',
    '                dp[i][w] = max(include, exclude)',
    '            else:',
    '                dp[i][w] = dp[i-1][w]',
    '    return dp[n][capacity]'
  ];

  const n = items.length;
  
  // Initialize DP table
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  // Track selections for reconstruction
  const selected = Array(n + 1).fill().map(() => Array(capacity + 1).fill(false));

  // Initial step
  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    items: items.map(item => ({ ...item })),
    capacity: capacity,
    currentCell: null,
    dependencies: [],
    action: 'initialize',
    explanation: `Initializing DP table of size ${n+1} x ${capacity+1} with zeros`,
    currentLine: 2,
    selected: JSON.parse(JSON.stringify(selected))
  });
  explanations.push('DP table initialized with zeros');

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    
    for (let w = 0; w <= capacity; w++) {
      const exclude = dp[i - 1][w];
      
      steps.push({
        dpTable: JSON.parse(JSON.stringify(dp)),
        items: items.map(item => ({ ...item })),
        capacity: capacity,
        currentCell: { i, w },
        dependencies: [{ i: i - 1, w }],
        action: 'evaluate-exclude',
        explanation: `Evaluating exclude case for item ${i} (${item.name}) at capacity ${w}: dp[${i-1}][${w}] = ${exclude}`,
        currentLine: 6,
        currentItem: item,
        selected: JSON.parse(JSON.stringify(selected))
      });
      explanations.push(`Exclude case: value = ${exclude}`);

      if (item.weight <= w) {
        const include = item.value + dp[i - 1][w - item.weight];
        
        steps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          items: items.map(item => ({ ...item })),
          capacity: capacity,
          currentCell: { i, w },
          dependencies: [{ i: i - 1, w }, { i: i - 1, w: w - item.weight }],
          action: 'evaluate-include',
          explanation: `Evaluating include case: ${item.value} + dp[${i-1}][${w - item.weight}] = ${include}`,
          currentLine: 7,
          currentItem: item,
          selected: JSON.parse(JSON.stringify(selected))
        });
        explanations.push(`Include case: value = ${include}`);

        if (include > exclude) {
          dp[i][w] = include;
          selected[i][w] = true;
          
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            items: items.map(item => ({ ...item })),
            capacity: capacity,
            currentCell: { i, w },
            dependencies: [{ i: i - 1, w: w - item.weight }],
            action: 'select-include',
            explanation: `Include is better! Setting dp[${i}][${w}] = ${include}`,
            currentLine: 8,
            currentItem: item,
            selected: JSON.parse(JSON.stringify(selected))
          });
          explanations.push(`Including item ${item.name}: value = ${include} (better than ${exclude})`);
        } else {
          dp[i][w] = exclude;
          
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            items: items.map(item => ({ ...item })),
            capacity: capacity,
            currentCell: { i, w },
            dependencies: [{ i: i - 1, w }],
            action: 'select-exclude',
            explanation: `Exclude is better! Setting dp[${i}][${w}] = ${exclude}`,
            currentLine: 8,
            currentItem: item,
            selected: JSON.parse(JSON.stringify(selected))
          });
          explanations.push(`Excluding item ${item.name}: value = ${exclude} (better than ${include})`);
        }
      } else {
        dp[i][w] = exclude;
        
        steps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          items: items.map(item => ({ ...item })),
          capacity: capacity,
          currentCell: { i, w },
          dependencies: [{ i: i - 1, w }],
          action: 'cannot-include',
          explanation: `Item weight ${item.weight} > capacity ${w}, cannot include. Using exclude value: ${exclude}`,
          currentLine: 10,
          currentItem: item,
          selected: JSON.parse(JSON.stringify(selected))
        });
        explanations.push(`Cannot include item ${item.name} (weight ${item.weight} > ${w})`);
      }
    }
  }

  // Reconstruct selected items
  const selectedItems = [];
  let w = capacity;
  for (let i = n; i > 0; i--) {
    if (selected[i][w]) {
      selectedItems.unshift(items[i - 1]);
      w -= items[i - 1].weight;
    }
  }

  const finalValue = dp[n][capacity];

  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    items: items.map(item => ({ ...item })),
    capacity: capacity,
    currentCell: { i: n, w: capacity },
    dependencies: [],
    action: 'complete',
    explanation: `Knapsack complete! Maximum value: ${finalValue}. Selected items: ${selectedItems.map(i => i.name).join(', ')}`,
    currentLine: 11,
    selectedItems: selectedItems,
    finalValue: finalValue,
    final: true
  });
  explanations.push(`Final maximum value: ${finalValue}`);

  return {
    steps,
    explanations,
    pseudocode,
    finalResult: {
      value: finalValue,
      selectedItems: selectedItems,
      dpTable: dp,
      capacity: capacity
    },
    complexity: {
      time: {
        best: 'O(n * W)',
        average: 'O(n * W)',
        worst: 'O(n * W)'
      },
      space: 'O(n * W)',
      explanation: `Time complexity is O(n × W) where n is number of items and W is capacity. Space complexity is O(n × W) for the DP table.`
    },
    patternInsight: {
      overlappingSubproblems: `Each subproblem dp[i][w] depends on previously computed subproblems, showing overlapping nature`,
      optimalSubstructure: `Optimal solution for capacity w with i items uses optimal solutions for capacity w and w-weight with i-1 items`
    }
  };
};

module.exports = knapsack01;