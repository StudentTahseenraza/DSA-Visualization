// algorithms/ratInMaze.js
const ratInMaze = (maze) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function solveMaze(maze, x, y, sol, visited):',
    '  if (x,y) is destination:',
    '    return true',
    '  if (x,y) is valid and not visited:',
    '    mark (x,y) as visited and part of path',
    '    if solveMaze(maze, x+1, y, sol, visited): return true',
    '    if solveMaze(maze, x, y+1, sol, visited): return true',
    '    if solveMaze(maze, x-1, y, sol, visited): return true',
    '    if solveMaze(maze, x, y-1, sol, visited): return true',
    '    unmark (x,y) (backtrack)',
    '  return false'
  ];

  const n = maze.length;
  const solution = Array(n).fill().map(() => Array(n).fill(0));
  const visited = Array(n).fill().map(() => Array(n).fill(false));
  
  const explanation1 = `Initializing ${n}x${n} maze and solution matrix`;
  steps.push({
    maze: JSON.parse(JSON.stringify(maze)),
    solution: JSON.parse(JSON.stringify(solution)),
    visited: JSON.parse(JSON.stringify(visited)),
    currentX: 0,
    currentY: 0,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Solve the maze
  const result = solveMaze(maze, 0, 0, solution, visited, n, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    `Path found from (0,0) to (${n-1},${n-1})!` : 
    `No path exists from (0,0) to (${n-1},${n-1})`;
  steps.push({
    maze: JSON.parse(JSON.stringify(maze)),
    solution: JSON.parse(JSON.stringify(solution)),
    visited: JSON.parse(JSON.stringify(visited)),
    currentX: -1,
    currentY: -1,
    currentLine: result ? 2 : 11,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

// Helper function to check if move is valid
const isValidMove = (maze, x, y, n, visited) => {
  return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1 && !visited[x][y];
};

// Recursive backtracking function
const solveMaze = (maze, x, y, solution, visited, n, steps, explanations) => {
  // Check if we reached destination
  if (x === n - 1 && y === n - 1) {
    solution[x][y] = 1;
    visited[x][y] = true;
    const explanation = `Reached destination at (${x}, ${y})!`;
    steps.push({
      maze: JSON.parse(JSON.stringify(maze)),
      solution: JSON.parse(JSON.stringify(solution)),
      visited: JSON.parse(JSON.stringify(visited)),
      currentX: x,
      currentY: y,
      currentLine: 2,
      action: 'destination-reached'
    });
    explanations.push(explanation);
    return true;
  }

  // Check if current position is valid
  if (isValidMove(maze, x, y, n, visited)) {
    const explanation1 = `Checking position (${x}, ${y})`;
    steps.push({
      maze: JSON.parse(JSON.stringify(maze)),
      solution: JSON.parse(JSON.stringify(solution)),
      visited: JSON.parse(JSON.stringify(visited)),
      currentX: x,
      currentY: y,
      currentLine: 3,
      action: 'check-position'
    });
    explanations.push(explanation1);

    // Mark this cell as visited and part of solution path
    solution[x][y] = 1;
    visited[x][y] = true;
    
    const explanation2 = `Marking (${x}, ${y}) as part of path`;
    steps.push({
      maze: JSON.parse(JSON.stringify(maze)),
      solution: JSON.parse(JSON.stringify(solution)),
      visited: JSON.parse(JSON.stringify(visited)),
      currentX: x,
      currentY: y,
      currentLine: 4,
      action: 'mark-path'
    });
    explanations.push(explanation2);

    // Try moving in all four directions
    const directions = [
      {dx: 1, dy: 0, dir: 'down', line: 5},
      {dx: 0, dy: 1, dir: 'right', line: 6},
      {dx: -1, dy: 0, dir: 'up', line: 7},
      {dx: 0, dy: -1, dir: 'left', line: 8}
    ];

    for (const {dx, dy, dir, line} of directions) {
      const newX = x + dx;
      const newY = y + dy;
      
      const explanation3 = `Trying to move ${dir} to (${newX}, ${newY})`;
      steps.push({
        maze: JSON.parse(JSON.stringify(maze)),
        solution: JSON.parse(JSON.stringify(solution)),
        visited: JSON.parse(JSON.stringify(visited)),
        currentX: x,
        currentY: y,
        nextX: newX,
        nextY: newY,
        currentLine: line,
        action: 'try-move'
      });
      explanations.push(explanation3);

      if (solveMaze(maze, newX, newY, solution, visited, n, steps, explanations)) {
        return true;
      }
    }

    // Backtrack: unmark this cell
    solution[x][y] = 0;
    visited[x][y] = false;
    const explanation4 = `Backtracking: unmarking (${x}, ${y})`;
    steps.push({
      maze: JSON.parse(JSON.stringify(maze)),
      solution: JSON.parse(JSON.stringify(solution)),
      visited: JSON.parse(JSON.stringify(visited)),
      currentX: x,
      currentY: y,
      currentLine: 9,
      action: 'backtrack'
    });
    explanations.push(explanation4);
  }

  return false;
};

module.exports = ratInMaze;