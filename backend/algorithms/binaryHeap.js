// backend/algorithms/binaryHeap.js

class BinaryHeap {
  constructor(isMinHeap = false) {
    this.values = [];
    this.steps = [];
    this.isMinHeap = isMinHeap;
    this.comparisons = 0;
    this.swaps = 0;
    this.resultMessage = null;
  }

  // Helper to compare based on heap type
  shouldSwap(child, parent) {
    if (this.isMinHeap) {
      return child < parent;
    }
    return child > parent;
  }

  // Single Insert
  insert(value) {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'start',
      explanation: `Starting ${this.isMinHeap ? 'min' : 'max'} heap insertion operation for value ${value}.`,
    });

    this.values.push(value);
    const insertedIndex = this.values.length - 1;
    
    this.steps.push({
      heap: [...this.values],
      currentIndices: [insertedIndex],
      action: 'insert',
      explanation: `Inserted value ${value} at index ${insertedIndex}.`,
    });

    this.bubbleUp();
    
    this.resultMessage = `Successfully inserted ${value} into the ${this.isMinHeap ? 'min' : 'max'} heap.`;
    
    return this.steps;
  }

  // Bulk Insert
  bulkInsert(values) {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    if (!values || values.length === 0) {
      this.steps.push({
        heap: [...this.values],
        currentIndices: [],
        action: 'error',
        explanation: 'No values provided for bulk insertion.',
      });
      this.resultMessage = 'No values to insert.';
      return this.steps;
    }

    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'start',
      explanation: `Starting bulk insertion of ${values.length} values: [${values.join(', ')}]`,
    });

    // Add all values to the end of the heap
    for (let i = 0; i < values.length; i++) {
      this.values.push(values[i]);
      this.steps.push({
        heap: [...this.values],
        currentIndices: [this.values.length - 1],
        action: 'bulk-insert',
        explanation: `Added value ${values[i]} at index ${this.values.length - 1}. (${i + 1}/${values.length})`,
      });
    }

    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'heapify-start',
      explanation: `All ${values.length} values added. Now heapifying to maintain heap property...`,
    });

    // Heapify from the last parent node
    const startIdx = Math.floor(this.values.length / 2) - 1;
    
    for (let i = startIdx; i >= 0; i--) {
      this.steps.push({
        heap: [...this.values],
        currentIndices: [i],
        action: 'heapify-node',
        explanation: `Heapifying subtree rooted at index ${i} (value: ${this.values[i]}).`,
      });
      this.sinkDownAt(i);
    }
    
    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'complete',
      explanation: `Bulk insertion complete. ${values.length} values inserted and heap property restored. Current heap: [${this.values.join(', ')}]`,
    });
    
    this.resultMessage = `Successfully inserted ${values.length} values: [${values.join(', ')}] into the ${this.isMinHeap ? 'min' : 'max'} heap.`;
    
    return this.steps;
  }

  bubbleUp() {
    let index = this.values.length - 1;
    
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      
      this.steps.push({
        heap: [...this.values],
        currentIndices: [index, parentIndex],
        action: 'compare',
        explanation: `Comparing ${this.values[index]} at index ${index} with parent ${this.values[parentIndex]} at index ${parentIndex}.`,
      });

      if (!this.shouldSwap(this.values[index], this.values[parentIndex])) {
        this.steps.push({
          heap: [...this.values],
          currentIndices: [index],
          action: 'stop',
          explanation: `Heap property satisfied at index ${index}.`,
        });
        break;
      }
      
      [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];
      this.swaps++;
      
      this.steps.push({
        heap: [...this.values],
        currentIndices: [index, parentIndex],
        action: 'swap',
        explanation: `Swapped ${this.values[parentIndex]} and ${this.values[index]}.`,
      });
      
      index = parentIndex;
    }
  }

  extract() {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'start',
      explanation: `Starting extract operation.`,
    });

    if (this.values.length === 0) {
      this.steps.push({
        heap: [],
        currentIndices: [],
        action: 'empty',
        explanation: 'Heap is empty. Nothing to extract.',
      });
      this.resultMessage = 'Heap is empty.';
      return { steps: this.steps, extractedValue: null };
    }

    const extracted = this.values[0];
    const lastValue = this.values.pop();
    
    if (this.values.length > 0) {
      this.values[0] = lastValue;
      this.steps.push({
        heap: [...this.values],
        currentIndices: [0],
        action: 'extract',
        explanation: `Extracted root ${extracted}, moved last element ${lastValue} to root.`,
      });
      this.sinkDown();
    }
    
    this.resultMessage = `Extracted ${extracted} from the heap.`;
    return { steps: this.steps, extractedValue: extracted };
  }

  deleteValue(value) {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    const indexToDelete = this.values.findIndex(v => v === value);
    
    if (indexToDelete === -1) {
      this.steps.push({
        heap: [...this.values],
        action: 'not-found',
        explanation: `Value ${value} not found in heap.`,
      });
      return { steps: this.steps, deletedValue: null };
    }

    const deletedValue = this.values[indexToDelete];
    const lastValue = this.values.pop();
    
    if (indexToDelete !== this.values.length) {
      this.values[indexToDelete] = lastValue;
      this.restoreHeapProperty(indexToDelete);
    }
    
    this.resultMessage = `Deleted ${deletedValue} from the heap.`;
    return { steps: this.steps, deletedValue: deletedValue };
  }

  restoreHeapProperty(index) {
    // Try to bubble up
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.shouldSwap(this.values[currentIndex], this.values[parentIndex])) {
        [this.values[currentIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
    this.sinkDownAt(currentIndex);
  }

  sinkDown() {
    this.sinkDownAt(0);
  }

  sinkDownAt(index) {
    const length = this.values.length;
    let currentIndex = index;
    
    while (true) {
      let leftChild = 2 * currentIndex + 1;
      let rightChild = 2 * currentIndex + 2;
      let swapIndex = null;
      let element = this.values[currentIndex];

      if (leftChild < length && this.shouldSwap(this.values[leftChild], element)) {
        swapIndex = leftChild;
      }

      if (rightChild < length) {
        const compareElement = swapIndex !== null ? this.values[swapIndex] : element;
        if (this.shouldSwap(this.values[rightChild], compareElement)) {
          swapIndex = rightChild;
        }
      }

      if (swapIndex === null) break;

      [this.values[currentIndex], this.values[swapIndex]] = [this.values[swapIndex], this.values[currentIndex]];
      this.swaps++;
      currentIndex = swapIndex;
    }
  }

  heapify(arr) {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    if (arr && Array.isArray(arr)) {
      this.values = [...arr];
    }
    
    this.steps.push({
      heap: [...this.values],
      action: 'start',
      explanation: `Starting heapify on array: [${this.values.join(', ')}]`,
    });

    const startIdx = Math.floor(this.values.length / 2) - 1;
    
    for (let i = startIdx; i >= 0; i--) {
      this.steps.push({
        heap: [...this.values],
        currentIndices: [i],
        action: 'heapify',
        explanation: `Heapifying at index ${i}`,
      });
      this.sinkDownAt(i);
    }
    
    this.resultMessage = `Heapified array into ${this.isMinHeap ? 'min' : 'max'} heap.`;
    return this.steps;
  }

  getStats() {
    return {
      comparisons: this.comparisons,
      swaps: this.swaps,
      totalSteps: this.steps.length,
      heapSize: this.values.length,
      resultMessage: this.resultMessage,
      heapArray: this.values,
      isMinHeap: this.isMinHeap,
      root: this.values.length > 0 ? this.values[0] : null
    };
  }
}

// Main heapOperations function
function heapOperations(operation, value, heapState, isMinHeap = false) {
  console.log(`heapOperations called: operation=${operation}, isMinHeap=${isMinHeap}`);
  
  const heap = new BinaryHeap(isMinHeap);
  
  if (heapState && Array.isArray(heapState)) {
    heap.values = [...heapState];
    console.log(`Loaded heap state with ${heap.values.length} values`);
  }

  const pseudocode = {
    insert: [
      'function insert(value):',
      '  1. Add value to end of array',
      '  2. Bubble up to maintain heap property',
      '  3. Compare with parent and swap if needed',
      '  4. Repeat until heap property is satisfied'
    ],
    'bulk-insert': [
      'function bulkInsert(values):',
      '  1. Add all values to end of array',
      '  2. Heapify from last parent to root',
      '  3. Each node sinks down to maintain heap property',
      '  4. Result is a valid heap'
    ],
    extract: [
      'function extract():',
      '  1. Store root value',
      '  2. Move last element to root',
      '  3. Sink down to maintain heap property',
      '  4. Return extracted value'
    ],
    delete: [
      'function delete(value):',
      '  1. Find index of value',
      '  2. Replace with last element',
      '  3. Restore heap property',
      '  4. Return deleted value'
    ],
    heapify: [
      'function heapify(array):',
      '  1. Start from last parent node',
      '  2. Sink down each node',
      '  3. Repeat until root',
      '  4. Result is a valid heap'
    ]
  };

  const explanations = {
    insert: [
      'Insertion adds element at end, then bubbles up',
      'Time complexity: O(log n)'
    ],
    'bulk-insert': [
      'Bulk insert adds all elements at once, then heapifies',
      'More efficient than individual inserts: O(n) vs O(n log n)'
    ],
    extract: [
      'Extract removes root and restores heap property',
      'Time complexity: O(log n)'
    ],
    delete: [
      'Delete removes specific value and restores heap',
      'Time complexity: O(n) to find + O(log n) to restore'
    ],
    heapify: [
      'Heapify converts array to heap in O(n) time',
      'Most efficient way to build a heap'
    ]
  };

  let stepsResult;
  let resultValue = null;
  
  try {
    if (operation === 'insert') {
      stepsResult = heap.insert(value);
      resultValue = `Inserted ${value}`;
    } else if (operation === 'bulk-insert') {
      stepsResult = heap.bulkInsert(value);
      resultValue = `Bulk inserted ${value.length} values`;
    } else if (operation === 'extract') {
      const result = heap.extract();
      stepsResult = result.steps;
      resultValue = result.extractedValue ? `Extracted ${result.extractedValue}` : 'Heap empty';
    } else if (operation === 'delete') {
      const result = heap.deleteValue(value);
      stepsResult = result.steps;
      resultValue = result.deletedValue ? `Deleted ${result.deletedValue}` : 'Value not found';
    } else if (operation === 'heapify') {
      stepsResult = heap.heapify(value);
      resultValue = 'Heapified array';
    } else {
      return { error: `Unknown operation: ${operation}` };
    }
  } catch (error) {
    console.error(`Error in ${operation}:`, error);
    return { error: error.message };
  }

  const stats = heap.getStats();
  
  return {
    steps: stepsResult,
    pseudocode: pseudocode[operation] || pseudocode.insert,
    explanations: explanations[operation] || explanations.insert,
    heap: heap.values,
    stats: stats,
    result: resultValue,
    operation: operation
  };
}

// Export the function
module.exports = { heapOperations };