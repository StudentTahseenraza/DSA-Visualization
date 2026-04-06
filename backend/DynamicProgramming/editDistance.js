// algorithms/DynamicProgramming/editDistance.js
const editDistance = (str1, str2) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function editDistance(str1, str2):',
    '    m = len(str1), n = len(str2)',
    '    dp = [[0]*(n+1) for _ in range(m+1)]',
    '    for i from 0 to m: dp[i][0] = i',
    '    for j from 0 to n: dp[0][j] = j',
    '    for i from 1 to m:',
    '        for j from 1 to n:',
    '            if str1[i-1] == str2[j-1]:',
    '                dp[i][j] = dp[i-1][j-1]',
    '            else:',
    '                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])',
    '    return dp[m][n]'
  ];

  const m = str1.length;
  const n = str2.length;
  
  // Initialize DP table
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    str1: str1,
    str2: str2,
    currentCell: null,
    dependencies: [],
    action: 'initialize',
    explanation: `Initializing DP table: dp[i][0] = i (${m} deletions), dp[0][j] = j (${n} insertions)`,
    currentLine: 3,
    operations: []
  });
  explanations.push(`Base cases initialized`);

  // Track operations for reconstruction
  const operations = Array(m + 1).fill().map(() => Array(n + 1).fill(''));

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        operations[i][j] = 'match';
        
        steps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          str1: str1,
          str2: str2,
          currentCell: { i, j },
          dependencies: [{ i: i - 1, j: j - 1 }],
          action: 'match',
          explanation: `Characters match: '${str1[i-1]}' = '${str2[j-1]}' → dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${dp[i][j]}`,
          currentLine: 8,
          currentChar: str1[i - 1],
          operations: JSON.parse(JSON.stringify(operations))
        });
        explanations.push(`Match: no operation needed`);
      } else {
        const deleteCost = dp[i - 1][j] + 1;
        const insertCost = dp[i][j - 1] + 1;
        const replaceCost = dp[i - 1][j - 1] + 1;
        
        const minCost = Math.min(deleteCost, insertCost, replaceCost);
        
        steps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          str1: str1,
          str2: str2,
          currentCell: { i, j },
          dependencies: [{ i: i - 1, j }, { i, j: j - 1 }, { i: i - 1, j: j - 1 }],
          action: 'evaluate',
          explanation: `Computing costs: Delete=${deleteCost}, Insert=${insertCost}, Replace=${replaceCost}`,
          currentLine: 10,
          currentChar: str1[i - 1],
          operations: JSON.parse(JSON.stringify(operations))
        });
        explanations.push(`Comparing costs: delete(${deleteCost}), insert(${insertCost}), replace(${replaceCost})`);

        if (minCost === deleteCost) {
          dp[i][j] = deleteCost;
          operations[i][j] = 'delete';
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            str1: str1,
            str2: str2,
            currentCell: { i, j },
            dependencies: [{ i: i - 1, j }],
            action: 'delete',
            explanation: `Choose DELETE: dp[${i}][${j}] = ${deleteCost}`,
            currentLine: 10,
            currentChar: str1[i - 1],
            operations: JSON.parse(JSON.stringify(operations))
          });
          explanations.push(`Best operation: delete '${str1[i-1]}'`);
        } else if (minCost === insertCost) {
          dp[i][j] = insertCost;
          operations[i][j] = 'insert';
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            str1: str1,
            str2: str2,
            currentCell: { i, j },
            dependencies: [{ i, j: j - 1 }],
            action: 'insert',
            explanation: `Choose INSERT: dp[${i}][${j}] = ${insertCost}`,
            currentLine: 10,
            currentChar: str2[j - 1],
            operations: JSON.parse(JSON.stringify(operations))
          });
          explanations.push(`Best operation: insert '${str2[j-1]}'`);
        } else {
          dp[i][j] = replaceCost;
          operations[i][j] = 'replace';
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            str1: str1,
            str2: str2,
            currentCell: { i, j },
            dependencies: [{ i: i - 1, j: j - 1 }],
            action: 'replace',
            explanation: `Choose REPLACE: dp[${i}][${j}] = ${replaceCost}`,
            currentLine: 10,
            currentChar: str1[i - 1],
            targetChar: str2[j - 1],
            operations: JSON.parse(JSON.stringify(operations))
          });
          explanations.push(`Best operation: replace '${str1[i-1]}' with '${str2[j-1]}'`);
        }
      }
    }
  }

  // Reconstruct operations sequence
  const operationSequence = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && operations[i][j] === 'match') {
      operationSequence.unshift({ type: 'match', char: str1[i - 1] });
      i--; j--;
    } else if (i > 0 && operations[i][j] === 'delete') {
      operationSequence.unshift({ type: 'delete', char: str1[i - 1] });
      i--;
    } else if (j > 0 && operations[i][j] === 'insert') {
      operationSequence.unshift({ type: 'insert', char: str2[j - 1] });
      j--;
    } else if (i > 0 && j > 0 && operations[i][j] === 'replace') {
      operationSequence.unshift({ type: 'replace', from: str1[i - 1], to: str2[j - 1] });
      i--; j--;
    } else if (i > 0) {
      operationSequence.unshift({ type: 'delete', char: str1[i - 1] });
      i--;
    } else if (j > 0) {
      operationSequence.unshift({ type: 'insert', char: str2[j - 1] });
      j--;
    }
  }

  const finalDistance = dp[m][n];

  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    str1: str1,
    str2: str2,
    currentCell: { i: m, j: n },
    dependencies: [],
    action: 'complete',
    explanation: `Edit Distance complete! Distance: ${finalDistance}`,
    currentLine: 11,
    operationSequence: operationSequence,
    finalDistance: finalDistance,
    final: true
  });
  explanations.push(`Final edit distance: ${finalDistance}`);

  return {
    steps,
    explanations,
    pseudocode,
    finalResult: {
      distance: finalDistance,
      operations: operationSequence,
      str1: str1,
      str2: str2
    },
    complexity: {
      time: {
        best: 'O(m × n)',
        average: 'O(m × n)',
        worst: 'O(m × n)'
      },
      space: 'O(m × n)',
      explanation: `Time and space complexity are O(m × n) where m and n are lengths of the strings.`
    },
    patternInsight: {
      overlappingSubproblems: `Each cell dp[i][j] depends on dp[i-1][j], dp[i][j-1], and dp[i-1][j-1]`,
      optimalSubstructure: `Optimal edit distance uses optimal distances of smaller substrings`
    }
  };
};

module.exports = editDistance;