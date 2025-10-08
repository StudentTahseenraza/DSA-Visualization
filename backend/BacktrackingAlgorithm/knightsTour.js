// algorithms/knightsTour.js
const knightsTour = (n, startX, startY) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function solveKT(x, y, movei):',
    '  if movei == n*n:',
    '    return true (tour complete)',
    '  For each possible knight move:',
    '    if new position is valid and not visited:',
    '      mark board with move number',
    '      if solveKT(newX, newY, movei+1): return true',
    '      remove mark (backtrack)',
    '  return false'
  ];

  // Initialize chessboard
  const board = Array(n).fill().map(() => Array(n).fill(-1));
  const moves = [
    {dx: 2, dy: 1}, {dx: 1, dy: 2}, {dx: -1, dy: 2}, {dx: -2, dy: 1},
    {dx: -2, dy: -1}, {dx: -1, dy: -2}, {dx: 1, dy: -2}, {dx: 2, dy: -1}
  ];
  
  const explanation1 = `Initializing ${n}x${n} chessboard for Knight's Tour`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    currentX: startX,
    currentY: startY,
    moveNumber: 0,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Start the tour
  board[startX][startY] = 0;
  
  const explanation2 = `Starting Knight's Tour from (${startX}, ${startY})`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    currentX: startX,
    currentY: startY,
    moveNumber: 0,
    currentLine: 0,
    action: 'start-tour'
  });
  explanations.push(explanation2);

  const result = solveKT(startX, startY, 1, board, n, moves, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    `Knight's Tour completed successfully!` : 
    `No solution exists for Knight's Tour from (${startX}, ${startY})`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    currentX: -1,
    currentY: -1,
    moveNumber: n * n,
    currentLine: result ? 2 : 8,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Helper function to check if move is valid
const isValidMoveKT = (x, y, board, n) => {
  return x >= 0 && x < n && y >= 0 && y < n && board[x][y] === -1;
};

// Recursive backtracking function
const solveKT = (x, y, movei, board, n, moves, steps, explanations) => {
  // Check if tour is complete
  if (movei === n * n) {
    const explanation = `Tour complete! All ${n * n} squares visited`;
    steps.push({
      board: JSON.parse(JSON.stringify(board)),
      currentX: x,
      currentY: y,
      moveNumber: movei,
      currentLine: 2,
      action: 'tour-complete'
    });
    explanations.push(explanation);
    return true;
  }

  // Try all possible knight moves
  for (let i = 0; i < moves.length; i++) {
    const nextX = x + moves[i].dx;
    const nextY = y + moves[i].dy;
    
    const explanation1 = `Trying move ${i+1}: from (${x}, ${y}) to (${nextX}, ${nextY})`;
    steps.push({
      board: JSON.parse(JSON.stringify(board)),
      currentX: x,
      currentY: y,
      nextX: nextX,
      nextY: nextY,
      moveNumber: movei,
      currentLine: 4,
      action: 'try-move'
    });
    explanations.push(explanation1);

    if (isValidMoveKT(nextX, nextY, board, n)) {
      board[nextX][nextY] = movei;
      
      const explanation2 = `Moving to (${nextX}, ${nextY}), move number ${movei}`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        currentX: nextX,
        currentY: nextY,
        moveNumber: movei,
        currentLine: 5,
        action: 'make-move'
      });
      explanations.push(explanation2);

      if (solveKT(nextX, nextY, movei + 1, board, n, moves, steps, explanations)) {
        return true;
      }

      // Backtrack: remove the move
      board[nextX][nextY] = -1;
      const explanation3 = `Backtracking: removing move from (${nextX}, ${nextY})`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        currentX: x,
        currentY: y,
        moveNumber: movei,
        currentLine: 7,
        action: 'backtrack'
      });
      explanations.push(explanation3);
    }
  }

  return false;
};

module.exports = knightsTour;