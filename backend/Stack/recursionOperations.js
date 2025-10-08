// backend/recursionOperations.js
class RecursionOperations {
  constructor() {
    this.steps = [];
  }

  factorial(n, depth = 0) {
    this.steps.push({
      n,
      depth,
      action: 'call',
      message: `Calculating factorial(${n}) at depth ${depth}`
    });

    if (n < 0) {
      this.steps.push({
        n,
        depth,
        action: 'error',
        message: `Factorial not defined for negative numbers: ${n}`
      });
      return -1;
    }

    if (n === 0 || n === 1) {
      this.steps.push({
        n,
        depth,
        action: 'base-case',
        message: `Base case: factorial(${n}) = 1`
      });
      return 1;
    }

    const result = n * this.factorial(n - 1, depth + 1);
    
    this.steps.push({
      n,
      depth,
      result,
      action: 'return',
      message: `Returning factorial(${n}) = ${result}`
    });

    return result;
  }

  fibonacci(n, depth = 0) {
    this.steps.push({
      n,
      depth,
      action: 'call',
      message: `Calculating fibonacci(${n}) at depth ${depth}`
    });

    if (n < 0) {
      this.steps.push({
        n,
        depth,
        action: 'error',
        message: `Fibonacci not defined for negative numbers: ${n}`
      });
      return -1;
    }

    if (n <= 1) {
      this.steps.push({
        n,
        depth,
        action: 'base-case',
        message: `Base case: fibonacci(${n}) = ${n}`
      });
      return n;
    }

    const fib1 = this.fibonacci(n - 1, depth + 1);
    const fib2 = this.fibonacci(n - 2, depth + 1);
    const result = fib1 + fib2;
    
    this.steps.push({
      n,
      depth,
      fib1,
      fib2,
      result,
      action: 'return',
      message: `Returning fibonacci(${n}) = ${fib1} + ${fib2} = ${result}`
    });

    return result;
  }

  towerOfHanoi(n, source = 'A', auxiliary = 'B', destination = 'C', depth = 0) {
    this.steps.push({
      n,
      source,
      auxiliary,
      destination,
      depth,
      action: 'call',
      message: `Solving Tower of Hanoi for ${n} disks from ${source} to ${destination} via ${auxiliary} at depth ${depth}`
    });

    if (n === 1) {
      this.steps.push({
        n,
        source,
        destination,
        depth,
        action: 'move',
        message: `Move disk 1 from ${source} to ${destination}`
      });
      return;
    }

    this.towerOfHanoi(n - 1, source, destination, auxiliary, depth + 1);
    
    this.steps.push({
      n,
      source,
      destination,
      depth,
      action: 'move',
      message: `Move disk ${n} from ${source} to ${destination}`
    });

    this.towerOfHanoi(n - 1, auxiliary, source, destination, depth + 1);
  }

  permutations(str, prefix = '', depth = 0) {
    this.steps.push({
      str,
      prefix,
      depth,
      action: 'call',
      message: `Generating permutations for '${str}' with prefix '${prefix}' at depth ${depth}`
    });

    if (str.length === 0) {
      this.steps.push({
        str,
        prefix,
        depth,
        action: 'base-case',
        message: `Found permutation: '${prefix}'`
      });
      return [prefix];
    }

    const results = [];
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const remaining = str.substring(0, i) + str.substring(i + 1);
      
      this.steps.push({
        str,
        prefix,
        char,
        remaining,
        depth,
        action: 'choose',
        message: `Choosing '${char}', remaining: '${remaining}'`
      });

      const subPermutations = this.permutations(remaining, prefix + char, depth + 1);
      results.push(...subPermutations);
    }

    this.steps.push({
      str,
      prefix,
      depth,
      results,
      action: 'return',
      message: `Returning ${results.length} permutations for '${str}' with prefix '${prefix}'`
    });

    return results;
  }

  subsets(arr, index = 0, current = [], depth = 0) {
    this.steps.push({
      arr,
      index,
      current: [...current],
      depth,
      action: 'call',
      message: `Generating subsets for array [${arr}] at index ${index}, current: [${current}] at depth ${depth}`
    });

    if (index === arr.length) {
      this.steps.push({
        arr,
        index,
        current: [...current],
        depth,
        action: 'base-case',
        message: `Found subset: [${current}]`
      });
      return [[...current]];
    }

    // Include current element
    current.push(arr[index]);
    this.steps.push({
      arr,
      index,
      current: [...current],
      depth,
      action: 'include',
      message: `Including ${arr[index]}, current: [${current}]`
    });

    const subsetsWith = this.subsets(arr, index + 1, current, depth + 1);
    
    // Exclude current element
    current.pop();
    this.steps.push({
      arr,
      index,
      current: [...current],
      depth,
      action: 'exclude',
      message: `Excluding ${arr[index]}, current: [${current}]`
    });

    const subsetsWithout = this.subsets(arr, index + 1, current, depth + 1);

    const results = [...subsetsWith, ...subsetsWithout];
    
    this.steps.push({
      arr,
      index,
      depth,
      resultsCount: results.length,
      action: 'return',
      message: `Returning ${results.length} subsets for index ${index}`
    });

    return results;
  }

  floodFill(matrix, x, y, newColor, oldColor = null, depth = 0) {
    this.steps.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      x,
      y,
      newColor,
      oldColor,
      depth,
      action: 'call',
      message: `Flood fill at (${x}, ${y}) with new color ${newColor} at depth ${depth}`
    });

    // Validate coordinates
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length) {
      this.steps.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        x,
        y,
        depth,
        action: 'invalid',
        message: `Invalid coordinates (${x}, ${y})`
      });
      return matrix;
    }

    // Initialize oldColor if not provided
    if (oldColor === null) {
      oldColor = matrix[x][y];
      this.steps.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        x,
        y,
        oldColor,
        depth,
        action: 'init',
        message: `Initialized old color: ${oldColor}`
      });
    }

    // Check if already filled or different color
    if (matrix[x][y] !== oldColor || matrix[x][y] === newColor) {
      this.steps.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        x,
        y,
        oldColor,
        newColor,
        depth,
        action: 'skip',
        message: `Skipping (${x}, ${y}) - already filled or different color`
      });
      return matrix;
    }

    // Fill current cell
    matrix[x][y] = newColor;
    this.steps.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      x,
      y,
      newColor,
      depth,
      action: 'fill',
      message: `Filled (${x}, ${y}) with color ${newColor}`
    });

    // Recursively fill neighbors
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
    
    for (const [dx, dy] of directions) {
      this.steps.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        x,
        y,
        dx,
        dy,
        depth,
        action: 'check-neighbor',
        message: `Checking neighbor (${x + dx}, ${y + dy})`
      });

      this.floodFill(matrix, x + dx, y + dy, newColor, oldColor, depth + 1);
    }

    this.steps.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      x,
      y,
      depth,
      action: 'return',
      message: `Returning from flood fill at (${x}, ${y})`
    });

    return matrix;
  }
}

const recursionOperations = (operation, ...args) => {
  const recursion = new RecursionOperations();
  
  const pseudocode = {
    factorial: [
      'if n < 0: return error',
      'if n == 0 or n == 1: return 1 (base case)',
      'else: return n * factorial(n-1)'
    ],
    fibonacci: [
      'if n < 0: return error',
      'if n <= 1: return n (base case)',
      'else: return fibonacci(n-1) + fibonacci(n-2)'
    ],
    towerOfHanoi: [
      'if n == 1: move disk from source to destination',
      'else:',
      '  move n-1 disks from source to auxiliary',
      '  move nth disk from source to destination',
      '  move n-1 disks from auxiliary to destination'
    ],
    permutations: [
      'if string is empty: return prefix (base case)',
      'for each character in string:',
      '  choose character',
      '  recursively find permutations of remaining characters',
      '  add chosen character to each permutation'
    ],
    subsets: [
      'if index == array length: return current subset (base case)',
      'include current element:',
      '  add element to current subset',
      '  recursively find subsets with element included',
      'exclude current element:',
      '  remove element from current subset',
      '  recursively find subsets with element excluded'
    ],
    floodFill: [
      'if coordinates are invalid: return',
      'if color is already new color or different from old color: return',
      'fill current cell with new color',
      'recursively fill up, down, left, and right neighbors'
    ]
  };

  let result;
  switch (operation) {
    case 'factorial':
      result = recursion.factorial(args[0]);
      break;
    case 'fibonacci':
      result = recursion.fibonacci(args[0]);
      break;
    case 'towerOfHanoi':
      recursion.towerOfHanoi(args[0]);
      result = 'Completed';
      break;
    case 'permutations':
      result = recursion.permutations(args[0]);
      break;
    case 'subsets':
      result = recursion.subsets(args[0]);
      break;
    case 'floodFill':
      result = recursion.floodFill(args[0], args[1], args[2], args[3]);
      break;
    default:
      return { steps: [], pseudocode: [], error: 'Invalid operation' };
  }

  return { steps: recursion.steps, pseudocode: pseudocode[operation], result };
};

module.exports = recursionOperations;