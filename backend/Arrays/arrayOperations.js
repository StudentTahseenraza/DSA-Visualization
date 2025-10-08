// backend/arrayOperations.js - COMPLETE WORKING VERSION
class ArrayOperations {
  constructor(initialArray = [5, 2, 8, 1, 4, 3, 6, 7]) {
    this.steps = [];
    this.array = [...initialArray]; // Use spread to avoid reference issues
  }

  insert(value, position) {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: `Inserting ${value} at position ${position}`
    });

    if (position < 0 || position > this.array.length) {
      this.steps.push({
        array: [...this.array],
        action: 'error',
        message: `Invalid position: ${position}`
      });
      return this.steps;
    }

    this.array.splice(position, 0, value);
    
    this.steps.push({
      array: [...this.array],
      action: 'insert',
      position,
      value,
      message: `Inserted ${value} at position ${position}`
    });

    return this.steps;
  }

  delete(position) {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: `Deleting element at position ${position}`
    });

    if (position < 0 || position >= this.array.length) {
      this.steps.push({
        array: [...this.array],
        action: 'error',
        message: `Invalid position: ${position}`
      });
      return this.steps;
    }

    const deletedValue = this.array[position];
    this.array.splice(position, 1);
    
    this.steps.push({
      array: [...this.array],
      action: 'delete',
      position,
      value: deletedValue,
      message: `Deleted ${deletedValue} from position ${position}`
    });

    return this.steps;
  }

  search(value) {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: `Searching for value ${value}`
    });

    for (let i = 0; i < this.array.length; i++) {
      this.steps.push({
        array: [...this.array],
        action: 'compare',
        index: i,
        value: this.array[i],
        target: value,
        message: `Comparing ${this.array[i]} with ${value}`
      });

      if (this.array[i] === value) {
        this.steps.push({
          array: [...this.array],
          action: 'found',
          index: i,
          value,
          message: `Found ${value} at index ${i}`
        });
        return this.steps;
      }
    }

    this.steps.push({
      array: [...this.array],
      action: 'not-found',
      value,
      message: `${value} not found in the array`
    });

    return this.steps;
  }

  traverse() {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: 'Starting array traversal'
    });

    for (let i = 0; i < this.array.length; i++) {
      this.steps.push({
        array: [...this.array],
        action: 'traverse',
        index: i,
        value: this.array[i],
        message: `Element at index ${i}: ${this.array[i]}`
      });
    }

    this.steps.push({
      array: [...this.array],
      action: 'complete',
      message: 'Traversal completed'
    });

    return this.steps;
  }

  update(index, newValue) {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: `Updating element at index ${index} to ${newValue}`
    });

    if (index < 0 || index >= this.array.length) {
      this.steps.push({
        array: [...this.array],
        action: 'error',
        message: `Invalid index: ${index}`
      });
      return this.steps;
    }

    const oldValue = this.array[index];
    this.array[index] = newValue;
    
    this.steps.push({
      array: [...this.array],
      action: 'update',
      index,
      oldValue,
      newValue,
      message: `Updated index ${index} from ${oldValue} to ${newValue}`
    });

    return this.steps;
  }

  rotate(direction, positions) {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: `Rotating array ${direction} by ${positions} positions`
    });

    if (this.array.length === 0) {
      this.steps.push({
        array: [...this.array],
        action: 'error',
        message: 'Cannot rotate empty array'
      });
      return this.steps;
    }

    positions = positions % this.array.length;
    
    if (direction === 'left') {
      for (let i = 0; i < positions; i++) {
        const firstElement = this.array.shift();
        this.array.push(firstElement);
        
        this.steps.push({
          array: [...this.array],
          action: 'rotate-step',
          direction,
          step: i + 1,
          positions,
          message: `Rotation step ${i + 1}: Moved ${firstElement} to end`
        });
      }
    } else {
      for (let i = 0; i < positions; i++) {
        const lastElement = this.array.pop();
        this.array.unshift(lastElement);
        
        this.steps.push({
          array: [...this.array],
          action: 'rotate-step',
          direction,
          step: i + 1,
          positions,
          message: `Rotation step ${i + 1}: Moved ${lastElement} to beginning`
        });
      }
    }

    this.steps.push({
      array: [...this.array],
      action: 'rotate-complete',
      direction,
      positions,
      message: `Rotation completed: ${direction} by ${positions} positions`
    });

    return this.steps;
  }

  reverse() {
    this.steps = [];
    this.steps.push({
      array: [...this.array],
      action: 'start',
      message: 'Reversing the array'
    });

    const mid = Math.floor(this.array.length / 2);
    
    for (let i = 0; i < mid; i++) {
      const j = this.array.length - 1 - i;
      
      // Swap elements
      [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
      
      this.steps.push({
        array: [...this.array],
        action: 'swap',
        index1: i,
        index2: j,
        value1: this.array[j],
        value2: this.array[i],
        message: `Swapped elements at positions ${i} and ${j}`
      });
    }

    this.steps.push({
      array: [...this.array],
      action: 'reverse-complete',
      message: 'Array reversed successfully'
    });

    return this.steps;
  }
}

// Simple function that accepts initial array
const arrayOperations = (operation, initialArray = [5, 2, 8, 1, 4, 3, 6, 7], ...args) => {
  const arrayOp = new ArrayOperations(initialArray);
  
  const pseudocode = {
    insert: [
      'if position is valid:',
      '  shift elements from position to right',
      '  insert value at position',
      'else:',
      '  return error'
    ],
    delete: [
      'if position is valid:',
      '  remove element at position',
      '  shift elements from position+1 to left',
      'else:',
      '  return error'
    ],
    search: [
      'for each element in array:',
      '  if element equals target:',
      '    return index',
      'return not found'
    ],
    traverse: [
      'for each element in array:',
      '  process element'
    ],
    update: [
      'if index is valid:',
      '  replace element at index with new value',
      'else:',
      '  return error'
    ],
    rotate: [
      'if direction is left:',
      '  for each rotation:',
      '    remove first element',
      '    add it to the end',
      'else:',
      '  for each rotation:',
      '    remove last element',
      '    add it to the beginning'
    ],
    reverse: [
      'for i from 0 to middle:',
      '  swap element at i with element at length-1-i'
    ]
  };

  let steps;
  switch (operation) {
    case 'insert':
      steps = arrayOp.insert(args[0], args[1]);
      break;
    case 'delete':
      steps = arrayOp.delete(args[0]);
      break;
    case 'search':
      steps = arrayOp.search(args[0]);
      break;
    case 'traverse':
      steps = arrayOp.traverse();
      break;
    case 'update':
      steps = arrayOp.update(args[0], args[1]);
      break;
    case 'rotate':
      steps = arrayOp.rotate(args[0], args[1]);
      break;
    case 'reverse':
      steps = arrayOp.reverse();
      break;
    default:
      return { steps: [], pseudocode: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], array: arrayOp.array };
};

module.exports = arrayOperations;