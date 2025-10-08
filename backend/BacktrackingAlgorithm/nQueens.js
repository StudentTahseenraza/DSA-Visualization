// algorithms/nQueens.js
const nQueens = (n) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function solveNQueens(board, col):',
    '  if col >= n:',
    '    return true (solution found)',
    '  for each row in board:',
    '    if isSafe(board, row, col):',
    '      place queen at (row, col)',
    '      if solveNQueens(board, col+1):',
    '        return true',
    '      remove queen (backtrack)',
    '  return false'
  ];

  // Initialize empty board
  const board = Array(n).fill().map(() => Array(n).fill(0));
  
  const explanation1 = `Initializing ${n}x${n} chessboard`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    currentRow: -1,
    currentCol: -1,
    checkingPositions: null,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Solve the problem
  const result = solveNQueens(board, 0, n, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    `Solution found for ${n}-Queens problem!` : 
    `No solution exists for ${n}-Queens problem`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    currentRow: -1,
    currentCol: -1,
    checkingPositions: null,
    currentLine: result ? 2 : 9,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Helper function to check if a queen can be placed safely
const isSafe = (board, row, col, n) => {
  // Check left side of current row
  for (let i = 0; i < col; i++) {
    if (board[row][i] === 1) return false;
  }

  // Check upper diagonal
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) return false;
  }

  // Check lower diagonal
  for (let i = row, j = col; i < n && j >= 0; i++, j--) {
    if (board[i][j] === 1) return false;
  }

  return true;
};

// Recursive backtracking function
const solveNQueens = (board, col, n, steps, explanations) => {
  // Base case: all queens placed
  if (col >= n) {
    const explanation = `All queens placed successfully! Solution found.`;
    steps.push({
      board: JSON.parse(JSON.stringify(board)),
      currentRow: -1,
      currentCol: col,
      checkingPositions: null,
      currentLine: 2,
      action: 'solution-found'
    });
    explanations.push(explanation);
    return true;
  }

  // Try placing queen in each row of current column
  for (let row = 0; row < n; row++) {
    const explanation1 = `Trying to place queen at row ${row}, column ${col}`;
    steps.push({
      board: JSON.parse(JSON.stringify(board)),
      currentRow: row,
      currentCol: col,
      checkingPositions: null,
      currentLine: 4,
      action: 'try-row'
    });
    explanations.push(explanation1);

    // Check if placement is safe
    if (isSafe(board, row, col, n)) {
      const explanation2 = `Placement at (${row}, ${col}) is safe. Placing queen.`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        currentRow: row,
        currentCol: col,
        checkingPositions: null,
        currentLine: 5,
        action: 'place-queen'
      });
      explanations.push(explanation2);

      // Place queen
      board[row][col] = 1;

      // Recursively try next column
      const explanation3 = `Moving to next column: ${col + 1}`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        currentRow: row,
        currentCol: col,
        checkingPositions: null,
        currentLine: 6,
        action: 'move-next'
      });
      explanations.push(explanation3);

      if (solveNQueens(board, col + 1, n, steps, explanations)) {
        return true;
      }

      // Backtrack: remove queen
      const explanation4 = `Backtracking: removing queen from (${row}, ${col})`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        currentRow: row,
        currentCol: col,
        checkingPositions: null,
        currentLine: 8,
        action: 'backtrack'
      });
      explanations.push(explanation4);

      board[row][col] = 0;
    } else {
      const explanation5 = `Placement at (${row}, ${col}) is not safe. Trying next row.`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        currentRow: row,
        currentCol: col,
        checkingPositions: null,
        currentLine: 5,
        action: 'not-safe'
      });
      explanations.push(explanation5);
    }
  }

  // No solution found in this path
  const explanation6 = `No safe placement found in column ${col}. Backtracking.`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    currentRow: -1,
    currentCol: col,
    checkingPositions: null,
    currentLine: 9,
    action: 'no-solution-column'
  });
  explanations.push(explanation6);

  return false;
};

module.exports = nQueens;