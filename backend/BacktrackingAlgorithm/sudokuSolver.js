// algorithms/sudokuSolver.js
const sudokuSolver = (grid) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Find empty cell in grid',
    'If no empty cell: return true (solved)',
    'For num from 1 to 9:',
    '  if num is valid in current cell:',
    '    place num in cell',
    '    if solveSudoku(): return true',
    '    remove num (backtrack)',
    'return false'
  ];

  const explanation1 = 'Initializing Sudoku solver';
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    currentRow: -1,
    currentCol: -1,
    currentNum: 0,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Solve the Sudoku
  const result = solveSudoku(grid, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    'Sudoku solved successfully!' : 
    'No solution exists for this Sudoku puzzle';
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    currentRow: -1,
    currentCol: -1,
    currentNum: 0,
    currentLine: result ? 2 : 8,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Find empty cell
const findEmptyCell = (grid) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

// Check if number is valid in position
const isValid = (grid, row, col, num) => {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (grid[row][j] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
};

// Recursive backtracking function
const solveSudoku = (grid, steps, explanations) => {
  const [row, col] = findEmptyCell(grid);
  
  // If no empty cell, puzzle is solved
  if (row === -1) {
    const explanation = 'No empty cells found - Sudoku solved!';
    steps.push({
      grid: JSON.parse(JSON.stringify(grid)),
      currentRow: -1,
      currentCol: -1,
      currentNum: 0,
      currentLine: 2,
      action: 'solved'
    });
    explanations.push(explanation);
    return true;
  }

  const explanation1 = `Found empty cell at (${row}, ${col})`;
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    currentRow: row,
    currentCol: col,
    currentNum: 0,
    currentLine: 1,
    action: 'find-empty'
  });
  explanations.push(explanation1);

  // Try numbers 1-9
  for (let num = 1; num <= 9; num++) {
    const explanation2 = `Trying number ${num} at (${row}, ${col})`;
    steps.push({
      grid: JSON.parse(JSON.stringify(grid)),
      currentRow: row,
      currentCol: col,
      currentNum: num,
      currentLine: 3,
      action: 'try-number'
    });
    explanations.push(explanation2);

    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      
      const explanation3 = `Placing ${num} at (${row}, ${col}) - valid move`;
      steps.push({
        grid: JSON.parse(JSON.stringify(grid)),
        currentRow: row,
        currentCol: col,
        currentNum: num,
        currentLine: 4,
        action: 'place-number'
      });
      explanations.push(explanation3);

      if (solveSudoku(grid, steps, explanations)) {
        return true;
      }

      // Backtrack
      grid[row][col] = 0;
      const explanation4 = `Backtracking: removing ${num} from (${row}, ${col})`;
      steps.push({
        grid: JSON.parse(JSON.stringify(grid)),
        currentRow: row,
        currentCol: col,
        currentNum: num,
        currentLine: 7,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }

  return false;
};

module.exports = sudokuSolver;