// algorithms/wordSearch.js
const wordSearch = (board, word) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'For each cell in board:',
    '  if current cell matches first letter:',
    '    mark cell as visited',
    '    if searchWord(board, word, index+1, x, y): return true',
    '    unmark cell (backtrack)',
    'return false'
  ];

  const rows = board.length;
  const cols = board[0].length;
  const visited = Array(rows).fill().map(() => Array(cols).fill(false));
  
  const explanation1 = `Searching for word "${word}" in ${rows}x${cols} board`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    visited: JSON.parse(JSON.stringify(visited)),
    word: word,
    currentIndex: 0,
    currentX: -1,
    currentY: -1,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Try starting from each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const explanation2 = `Checking cell (${i}, ${j}) with letter "${board[i][j]}"`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        visited: JSON.parse(JSON.stringify(visited)),
        word: word,
        currentIndex: 0,
        currentX: i,
        currentY: j,
        currentLine: 1,
        action: 'check-cell'
      });
      explanations.push(explanation2);

      if (board[i][j] === word[0]) {
        visited[i][j] = true;
        
        const explanation3 = `Starting search from (${i}, ${j}) - first letter matches`;
        steps.push({
          board: JSON.parse(JSON.stringify(board)),
          visited: JSON.parse(JSON.stringify(visited)),
          word: word,
          currentIndex: 1,
          currentX: i,
          currentY: j,
          currentLine: 2,
          action: 'start-search'
        });
        explanations.push(explanation3);

        if (searchWord(board, word, 1, i, j, visited, steps, explanations)) {
          return { steps, pseudocode, explanations, found: true };
        }

        // Backtrack
        visited[i][j] = false;
        const explanation4 = `Backtracking: unvisiting (${i}, ${j})`;
        steps.push({
          board: JSON.parse(JSON.stringify(board)),
          visited: JSON.parse(JSON.stringify(visited)),
          word: word,
          currentIndex: 0,
          currentX: i,
          currentY: j,
          currentLine: 5,
          action: 'backtrack'
        });
        explanations.push(explanation4);
      }
    }
  }

  // Final result
  const finalExplanation = `Word "${word}" not found in the board`;
  steps.push({
    board: JSON.parse(JSON.stringify(board)),
    visited: JSON.parse(JSON.stringify(visited)),
    word: word,
    currentIndex: -1,
    currentX: -1,
    currentY: -1,
    currentLine: 6,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, found: false };
};

// Recursive search function
const searchWord = (board, word, index, x, y, visited, steps, explanations) => {
  // Word found
  if (index === word.length) {
    const explanation = `Word "${word}" found!`;
    steps.push({
      board: JSON.parse(JSON.stringify(board)),
      visited: JSON.parse(JSON.stringify(visited)),
      word: word,
      currentIndex: index,
      currentX: x,
      currentY: y,
      currentLine: 4,
      action: 'word-found'
    });
    explanations.push(explanation);
    return true;
  }

  const directions = [
    {dx: 1, dy: 0}, {dx: -1, dy: 0},
    {dx: 0, dy: 1}, {dx: 0, dy: -1}
  ];

  // Try all four directions
  for (const {dx, dy} of directions) {
    const newX = x + dx;
    const newY = y + dy;

    // Check if new position is valid
    if (newX >= 0 && newX < board.length && 
        newY >= 0 && newY < board[0].length &&
        !visited[newX][newY] && 
        board[newX][newY] === word[index]) {
      
      visited[newX][newY] = true;
      
      const explanation1 = `Moving to (${newX}, ${newY}) - letter "${board[newX][newY]}" matches`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        visited: JSON.parse(JSON.stringify(visited)),
        word: word,
        currentIndex: index + 1,
        currentX: newX,
        currentY: newY,
        currentLine: 4,
        action: 'continue-search'
      });
      explanations.push(explanation1);

      if (searchWord(board, word, index + 1, newX, newY, visited, steps, explanations)) {
        return true;
      }

      // Backtrack
      visited[newX][newY] = false;
      const explanation2 = `Backtracking: unvisiting (${newX}, ${newY})`;
      steps.push({
        board: JSON.parse(JSON.stringify(board)),
        visited: JSON.parse(JSON.stringify(visited)),
        word: word,
        currentIndex: index,
        currentX: x,
        currentY: y,
        currentLine: 5,
        action: 'backtrack'
      });
      explanations.push(explanation2);
    }
  }

  return false;
};

module.exports = wordSearch;