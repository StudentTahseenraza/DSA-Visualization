// algorithms/crosswordSolver.js
const crosswordSolver = (grid, words) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Find empty slots in grid (horizontal and vertical)',
    'Sort words by length (descending)',
    'function solveCrossword(words, index):',
    '  if index == words length: return true (solved)',
    '  For each slot that can fit current word:',
    '    if word fits in slot:',
    '      place word in slot',
    '      if solveCrossword(words, index+1): return true',
    '      remove word from slot (backtrack)',
    '  return false'
  ];

  // Find all empty slots
  const slots = findSlots(grid);
  
  const explanation1 = `Solving crossword with ${words.length} words. Found ${slots.length} slots`;
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    words: [...words],
    slots: [...slots],
    currentWordIndex: -1,
    currentSlotIndex: -1,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Sort words by length (descending)
  words.sort((a, b) => b.length - a.length);
  
  const explanation2 = `Sorted words by length: [${words.join(', ')}]`;
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    words: [...words],
    slots: [...slots],
    currentWordIndex: -1,
    currentSlotIndex: -1,
    currentLine: 2,
    action: 'sort-words'
  });
  explanations.push(explanation2);

  // Solve the crossword
  const result = solveCrossword(grid, words, 0, slots, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    'Crossword solved successfully!' : 
    'Cannot solve the crossword with given words';
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    words: [...words],
    slots: [...slots],
    currentWordIndex: words.length,
    currentSlotIndex: -1,
    currentLine: result ? 3 : 9,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Find all empty slots in grid
const findSlots = (grid) => {
  const slots = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Find horizontal slots
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '-' && (j === 0 || grid[i][j - 1] === '#')) {
        let length = 0;
        while (j + length < cols && grid[i][j + length] === '-') {
          length++;
        }
        if (length > 1) {
          slots.push({ row: i, col: j, length, direction: 'horizontal' });
        }
      }
    }
  }

  // Find vertical slots
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      if (grid[i][j] === '-' && (i === 0 || grid[i - 1][j] === '#')) {
        let length = 0;
        while (i + length < rows && grid[i + length][j] === '-') {
          length++;
        }
        if (length > 1) {
          slots.push({ row: i, col: j, length, direction: 'vertical' });
        }
      }
    }
  }

  return slots;
};

// Check if word can be placed in slot
const canPlaceWord = (grid, slot, word) => {
  if (slot.length !== word.length) {
    return false;
  }

  const { row, col, length, direction } = slot;

  if (direction === 'horizontal') {
    for (let j = 0; j < length; j++) {
      const currentChar = grid[row][col + j];
      if (currentChar !== '-' && currentChar !== word[j]) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      const currentChar = grid[row + i][col];
      if (currentChar !== '-' && currentChar !== word[i]) {
        return false;
      }
    }
  }

  return true;
};

// Place word in slot
const placeWord = (grid, slot, word) => {
  const { row, col, length, direction } = slot;
  const changes = [];

  if (direction === 'horizontal') {
    for (let j = 0; j < length; j++) {
      if (grid[row][col + j] === '-') {
        grid[row][col + j] = word[j];
        changes.push({ row, col: col + j, prev: '-', new: word[j] });
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      if (grid[row + i][col] === '-') {
        grid[row + i][col] = word[i];
        changes.push({ row: row + i, col, prev: '-', new: word[i] });
      }
    }
  }

  return changes;
};

// Remove word from slot (backtrack)
const removeWord = (grid, changes) => {
  for (const change of changes) {
    grid[change.row][change.col] = change.prev;
  }
};

// Recursive backtracking function
const solveCrossword = (grid, words, index, slots, steps, explanations) => {
  // All words placed
  if (index === words.length) {
    const explanation = `All words placed successfully!`;
    steps.push({
      grid: JSON.parse(JSON.stringify(grid)),
      words: [...words],
      slots: [...slots],
      currentWordIndex: index,
      currentSlotIndex: -1,
      currentLine: 3,
      action: 'solved'
    });
    explanations.push(explanation);
    return true;
  }

  const word = words[index];
  const explanation1 = `Processing word "${word}" (${index + 1}/${words.length})`;
  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    words: [...words],
    slots: [...slots],
    currentWordIndex: index,
    currentSlotIndex: -1,
    currentLine: 3,
    action: 'process-word'
  });
  explanations.push(explanation1);

  // Try to place word in each slot
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const explanation2 = `Trying to place "${word}" in slot at (${slot.row}, ${slot.col}), ${slot.direction}, length ${slot.length}`;
    steps.push({
      grid: JSON.parse(JSON.stringify(grid)),
      words: [...words],
      slots: [...slots],
      currentWordIndex: index,
      currentSlotIndex: i,
      currentLine: 5,
      action: 'try-slot'
    });
    explanations.push(explanation2);

    if (canPlaceWord(grid, slot, word)) {
      const changes = placeWord(grid, slot, word);
      
      const explanation3 = `Placed "${word}" in slot at (${slot.row}, ${slot.col})`;
      steps.push({
        grid: JSON.parse(JSON.stringify(grid)),
        words: [...words],
        slots: [...slots],
        currentWordIndex: index,
        currentSlotIndex: i,
        currentLine: 6,
        action: 'place-word'
      });
      explanations.push(explanation3);

      if (solveCrossword(grid, words, index + 1, slots, steps, explanations)) {
        return true;
      }

      // Backtrack
      removeWord(grid, changes);
      const explanation4 = `Backtracking: removing "${word}" from slot at (${slot.row}, ${slot.col})`;
      steps.push({
        grid: JSON.parse(JSON.stringify(grid)),
        words: [...words],
        slots: [...slots],
        currentWordIndex: index,
        currentSlotIndex: i,
        currentLine: 8,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }

  return false;
};

module.exports = crosswordSolver;