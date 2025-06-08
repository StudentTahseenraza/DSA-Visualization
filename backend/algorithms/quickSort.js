// algorithms/quickSort.js
const quickSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'if array length <= 1: return array',
    'choose pivot (last element)',
    'partition array around pivot',
    'place pivot in correct position',
    'recursively sort left part',
    'recursively sort right part',
  ];
  const explanations = [
    'Check if array has 1 or fewer elements.',
    'Select the last element as the pivot.',
    'Partition the array around the pivot.',
    'Place the pivot in its final position.',
    'Recursively sort elements before the pivot.',
    'Recursively sort elements after the pivot.',
  ];

  const partition = (arr, low, high) => {
    const pivot = arr[high];
    steps.push({
      array: [...arr],
      pivotIndex: high,
      currentIndices: [low, high],
      action: 'pivot',
      currentLine: 1,
      explanation: `Selected ${pivot} at index ${high} as pivot.`,
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        pivotIndex: high,
        currentIndices: [j, i + 1],
        action: 'compare',
        currentLine: 2,
        explanation: `Comparing ${arr[j]} with pivot ${pivot}.`,
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          pivotIndex: high,
          currentIndices: [i, j],
          action: 'swap',
          currentLine: 2,
          explanation: `Swapped ${arr[i]} and ${arr[j]}.`,
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      pivotIndex: i + 1,
      currentIndices: [i + 1, high],
      action: 'place-pivot',
      currentLine: 3,
      explanation: `Placed pivot ${arr[i + 1]} at index ${i + 1}.`,
    });

    return i + 1;
  };

  const sort = (arr, low, high) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      sort(arr, low, pi - 1);
      sort(arr, pi + 1, high);
    }
  };

  const array = [...arr];
  if (array.length <= 1) {
    steps.push({
      array: [...array],
      currentIndices: [],
      action: 'base-case',
      currentLine: 0,
      explanation: 'Array has 1 or fewer elements, no sorting needed.',
    });
    return { steps, pseudocode, explanations };
  }

  sort(array, 0, array.length - 1);
  return { steps, pseudocode, explanations };
};

module.exports = quickSort;