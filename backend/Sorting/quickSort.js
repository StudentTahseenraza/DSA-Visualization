// algorithms/quickSort.js (updated)
const quickSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'if low < high:',
    '  pivot = partition(array, low, high)',
    '  quickSort(array, low, pivot-1)',
    '  quickSort(array, pivot+1, high)'
  ];

  let array = [...arr];

  const partition = (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;

    steps.push({
      array: [...array],
      currentIndex: high,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 1,
      action: 'set-pivot',
      explanation: `Setting pivot = ${pivot} at index ${high}`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: -1,
        comparingIndices: [j, high],
        swappingIndices: null,
        currentLine: 1,
        action: 'compare',
        explanation: `Comparing ${array[j]} with pivot ${pivot}`
      });

      if (array[j] < pivot) {
        i++;
        
        steps.push({
          array: [...array],
          currentIndex: j,
          minIndex: -1,
          comparingIndices: null,
          swappingIndices: [i, j],
          currentLine: 1,
          action: 'swap',
          explanation: `Swapping ${array[i]} and ${array[j]}`
        });

        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    steps.push({
      array: [...array],
      currentIndex: high,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: [i + 1, high],
      currentLine: 1,
      action: 'final-swap',
      explanation: `Placing pivot in correct position: swapping ${array[i + 1]} and ${array[high]}`
    });

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  };

  const sort = (array, low = 0, high = array.length - 1) => {
    if (low < high) {
      const pivot = partition(array, low, high);
      sort(array, low, pivot - 1);
      sort(array, pivot + 1, high);
    }
    return array;
  };

  sort(array);

  steps.push({
    array: [...array],
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 4,
    action: 'complete',
    explanation: 'Array is now sorted!'
  });

  return { steps, pseudocode };
};

module.exports = quickSort;