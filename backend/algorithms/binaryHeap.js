// algorithms/binaryHeap.js
class BinaryHeap {
  constructor() {
    this.values = [];
    this.steps = [];
  }

  insert(value) {
    this.steps = [];
    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'start',
      currentLine: 0,
      explanation: 'Starting heap insertion.',
    });

    this.values.push(value);
    this.steps.push({
      heap: [...this.values],
      currentIndices: [this.values.length - 1],
      action: 'insert',
      currentLine: 1,
      explanation: `Inserted ${value} at index ${this.values.length - 1}.`,
    });

    this.bubbleUp();
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
        currentLine: 2,
        explanation: `Comparing ${this.values[index]} at index ${index} with parent ${this.values[parentIndex]} at index ${parentIndex}.`,
      });

      if (this.values[index] <= this.values[parentIndex]) break;
      [this.values[index], this.values[parentIndex]] = [this.values[parentIndex], this.values[index]];
      this.steps.push({
        heap: [...this.values],
        currentIndices: [index, parentIndex],
        action: 'swap',
        currentLine: 3,
        explanation: `Swapped ${this.values[parentIndex]} and ${this.values[index]} at indices ${parentIndex} and ${index}.`,
      });
      index = parentIndex;
    }
  }

  extractMax() {
    this.steps = [];
    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'start',
      currentLine: 0,
      explanation: 'Starting extract max operation.',
    });

    if (this.values.length === 0) {
      this.steps.push({
        heap: [],
        currentIndices: [],
        action: 'empty',
        currentLine: 1,
        explanation: 'Heap is empty.',
      });
      return this.steps;
    }

    const max = this.values[0];
    this.values[0] = this.values.pop();
    this.steps.push({
      heap: [...this.values],
      currentIndices: [0, this.values.length],
      action: 'swap',
      currentLine: 2,
      explanation: `Swapped root ${max} with last element ${this.values[0]}.`,
    });

    this.sinkDown();
    return this.steps;
  }

  sinkDown() {
    let index = 0;
    const length = this.values.length;

    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let largest = index;

      if (leftChild < length) {
        this.steps.push({
          heap: [...this.values],
          currentIndices: [leftChild, largest],
          action: 'compare',
          currentLine: 3,
          explanation: `Comparing ${this.values[leftChild]} at index ${leftChild} with ${this.values[largest]} at index ${largest}.`,
        });
        if (this.values[leftChild] > this.values[largest]) largest = leftChild;
      }

      if (rightChild < length) {
        this.steps.push({
          heap: [...this.values],
          currentIndices: [rightChild, largest],
          action: 'compare',
          currentLine: 3,
          explanation: `Comparing ${this.values[rightChild]} at index ${rightChild} with ${this.values[largest]} at index ${largest}.`,
        });
        if (this.values[rightChild] > this.values[largest]) largest = rightChild;
      }

      if (largest === index) break;

      [this.values[index], this.values[largest]] = [this.values[largest], this.values[index]];
      this.steps.push({
        heap: [...this.values],
        currentIndices: [index, largest],
        action: 'swap',
        currentLine: 4,
        explanation: `Swapped ${this.values[index]} and ${this.values[largest]} at indices ${index} and ${largest}.`,
      });
      index = largest;
    }
  }

  heapify() {
    this.steps = [];
    this.steps.push({
      heap: [...this.values],
      currentIndices: [],
      action: 'start',
      currentLine: 0,
      explanation: 'Starting heapify operation.',
    });

    for (let i = Math.floor(this.values.length / 2) - 1; i >= 0; i--) {
      this.steps.push({
        heap: [...this.values],
        currentIndices: [i],
        action: 'heapify',
        currentLine: 5,
        explanation: `Heapifying subtree rooted at index ${i}.`,
      });
      this.sinkDownAt(i);
    }

    return this.steps;
  }

  sinkDownAt(index) {
    const length = this.values.length;

    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let largest = index;

      if (leftChild < length && this.values[leftChild] > this.values[largest]) largest = leftChild;
      if (rightChild < length && this.values[rightChild] > this.values[largest]) largest = rightChild;

      if (largest === index) break;

      [this.values[index], this.values[largest]] = [this.values[largest], this.values[index]];
      this.steps.push({
        heap: [...this.values],
        currentIndices: [index, largest],
        action: 'swap',
        currentLine: 4,
        explanation: `Swapped ${this.values[index]} and ${this.values[largest]} at indices ${index} and ${largest}.`,
      });
      index = largest;
    }
  }
}

const heapOperations = (operation, value, heapState) => {
  const heap = new BinaryHeap();
  if (heapState) heap.values = heapState;

  const pseudocode = {
    insert: [
      'insert value at end',
      'bubble up to maintain heap property',
      'compare with parent',
      'swap if larger',
    ],
    extractMax: [
      'if empty: return',
      'swap root with last',
      'remove last',
      'sink down to maintain heap property',
    ],
    heapify: ['for each non-leaf node:', '  sink down to maintain heap property'],
  };
  const explanations = {
    insert: [
      'Start inserting a new value.',
      'Insert value at the end of the heap.',
      'Compare with parent to bubble up.',
      'Swap with parent if larger.',
    ],
    extractMax: [
      'Start extracting maximum value.',
      'Heap is empty, nothing to extract.',
      'Swap root with last element.',
      'Sink down to maintain heap property.',
    ],
    heapify: ['Start heapifying.', 'Sink down non-leaf nodes to maintain heap property.'],
  };

  let steps;
  if (operation === 'insert') {
    steps = heap.insert(value);
  } else if (operation === 'extractMax') {
    steps = heap.extractMax();
  } else if (operation === 'heapify') {
    steps = heap.heapify();
  } else {
    return { steps: [], pseudocode: [], explanations: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], explanations: explanations[operation], heap: heap.values };
};

module.exports = heapOperations;