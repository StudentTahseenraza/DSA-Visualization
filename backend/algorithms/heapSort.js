// algorithms/heapSort.js
const heapSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'build max heap',
    'for i from n-1 to 0:',
    '  swap root with last element',
    '  reduce heap size',
    '  heapify root',
  ];
  const explanations = [
    'Build a max heap from the array.',
    'Iterate from the last index to the first.',
    'Swap the root with the last element.',
    'Reduce the heap size by one.',
    'Heapify the root to maintain heap property.',
  ];

  const array = [...arr];

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      steps.push({
        array: [...arr],
        currentIndices: [left, largest],
        action: 'compare',
        currentLine: 0,
        explanation: `Comparing ${arr[left]} at index ${left} with ${arr[largest]} at index ${largest}.`,
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      steps.push({
        array: [...arr],
        currentIndices: [right, largest],
        action: 'compare',
        currentLine: 0,
        explanation: `Comparing ${arr[right]} at index ${right} with ${arr[largest]} at index ${largest}.`,
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        array: [...arr],
        currentIndices: [i, largest],
        action: 'swap',
        currentLine: 0,
        explanation: `Swapped ${arr[i]} and ${arr[largest]} at indices ${i} and ${largest}.`,
      });
      heapify(arr, n, largest);
    }
  };

  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...array],
      currentIndices: [i],
      action: 'heapify',
      currentLine: 0,
      explanation: `Heapifying subtree rooted at index ${i}.`,
    });
    heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    steps.push({
      array: [...array],
      currentIndices: [0, i],
      action: 'swap',
      currentLine: 2,
      explanation: `Swapped root ${array[i]} with last element ${array[0]} at index ${i}.`,
    });

    steps.push({
      array: [...array],
      currentIndices: [0],
      action: 'heapify',
      currentLine: 4,
      explanation: `Heapifying root after reducing heap size to ${i}.`,
    });
    heapify(array, i, 0);
  }

  return { steps, pseudocode, explanations };
};

module.exports = heapSort;