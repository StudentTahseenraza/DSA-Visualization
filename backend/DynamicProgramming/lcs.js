// algorithms/DynamicProgramming/lcs.js
const lcs = (str1, str2) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function LCS(str1, str2):',
    '    m = len(str1), n = len(str2)',
    '    dp = [[0]*(n+1) for _ in range(m+1)]',
    '    for i from 1 to m:',
    '        for j from 1 to n:',
    '            if str1[i-1] == str2[j-1]:',
    '                dp[i][j] = dp[i-1][j-1] + 1',
    '            else:',
    '                dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
    '    return dp[m][n]'
  ];

  const m = str1.length;
  const n = str2.length;
  
  // Initialize DP table
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // For tracking the LCS string
  const direction = Array(m + 1).fill().map(() => Array(n + 1).fill(''));

  // Initial step
  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    str1: str1,
    str2: str2,
    currentCell: null,
    dependencies: [],
    action: 'initialize',
    explanation: `Initializing DP table of size ${m+1} x ${n+1} for strings: "${str1}" and "${str2}"`,
    currentLine: 2,
    direction: JSON.parse(JSON.stringify(direction))
  });
  explanations.push(`DP table initialized`);

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        direction[i][j] = 'diag';
        
        steps.push({
          dpTable: JSON.parse(JSON.stringify(dp)),
          str1: str1,
          str2: str2,
          currentCell: { i, j },
          dependencies: [{ i: i - 1, j: j - 1 }],
          action: 'match',
          explanation: `Characters match: '${str1[i-1]}' = '${str2[j-1]}' → dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`,
          currentLine: 6,
          currentChar: str1[i - 1],
          direction: JSON.parse(JSON.stringify(direction))
        });
        explanations.push(`Match found: ${str1[i-1]} = ${str2[j-1]}, LCS length increased to ${dp[i][j]}`);
      } else {
        if (dp[i - 1][j] > dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j];
          direction[i][j] = 'up';
          
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            str1: str1,
            str2: str2,
            currentCell: { i, j },
            dependencies: [{ i: i - 1, j }],
            action: 'take-up',
            explanation: `Characters don't match, taking max from up: dp[${i-1}][${j}] = ${dp[i-1][j]} > dp[${i}][${j-1}] = ${dp[i][j-1]}`,
            currentLine: 8,
            currentChar: str1[i - 1],
            direction: JSON.parse(JSON.stringify(direction))
          });
          explanations.push(`No match, taking value from above: ${dp[i][j]}`);
        } else {
          dp[i][j] = dp[i][j - 1];
          direction[i][j] = 'left';
          
          steps.push({
            dpTable: JSON.parse(JSON.stringify(dp)),
            str1: str1,
            str2: str2,
            currentCell: { i, j },
            dependencies: [{ i, j: j - 1 }],
            action: 'take-left',
            explanation: `Characters don't match, taking max from left: dp[${i}][${j-1}] = ${dp[i][j-1]} >= dp[${i-1}][${j}] = ${dp[i-1][j]}`,
            currentLine: 8,
            currentChar: str1[i - 1],
            direction: JSON.parse(JSON.stringify(direction))
          });
          explanations.push(`No match, taking value from left: ${dp[i][j]}`);
        }
      }
    }
  }

  // Reconstruct LCS string
  let lcsString = '';
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (direction[i][j] === 'diag') {
      lcsString = str1[i - 1] + lcsString;
      i--;
      j--;
    } else if (direction[i][j] === 'up') {
      i--;
    } else {
      j--;
    }
  }

  const finalLength = dp[m][n];

  steps.push({
    dpTable: JSON.parse(JSON.stringify(dp)),
    str1: str1,
    str2: str2,
    currentCell: { i: m, j: n },
    dependencies: [],
    action: 'complete',
    explanation: `LCS complete! Length: ${finalLength}, Sequence: "${lcsString}"`,
    currentLine: 9,
    lcsString: lcsString,
    finalLength: finalLength,
    final: true
  });
  explanations.push(`Final LCS: "${lcsString}" (length ${finalLength})`);

  return {
    steps,
    explanations,
    pseudocode,
    finalResult: {
      length: finalLength,
      sequence: lcsString,
      dpTable: dp
    },
    complexity: {
      time: {
        best: 'O(m × n)',
        average: 'O(m × n)',
        worst: 'O(m × n)'
      },
      space: 'O(m × n)',
      explanation: `Time and space complexity are O(m × n) where m and n are lengths of the input strings.`
    },
    patternInsight: {
      overlappingSubproblems: `Each cell dp[i][j] depends on dp[i-1][j-1], dp[i-1][j], and dp[i][j-1], showing overlapping subproblems`,
      optimalSubstructure: `Optimal LCS for prefixes uses optimal LCS of smaller prefixes`
    }
  };
};

module.exports = lcs;