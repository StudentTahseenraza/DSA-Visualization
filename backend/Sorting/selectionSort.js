// algorithms/selectionSort.js (updated)
const selectionSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'for i from 0 to n-2:',
    '  minIndex = i',
    '  for j from i+1 to n-1:',
    '    if arr[j] < arr[minIndex]:',
    '      minIndex = j',
    '  swap arr[i] and arr[minIndex]'
  ];

  let array = [...arr];
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    steps.push({
      array: [...array],
      currentIndex: i,
      minIndex: minIndex,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 1,
      action: 'set-min',
      explanation: `Set minIndex = ${i} (value: ${array[i]})`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: minIndex,
        comparingIndices: [j, minIndex],
        swappingIndices: null,
        currentLine: 2,
        action: 'compare',
        explanation: `Comparing ${array[j]} (index ${j}) with current min ${array[minIndex]} (index ${minIndex})`
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...array],
          currentIndex: j,
          minIndex: minIndex,
          comparingIndices: [j, minIndex],
          swappingIndices: null,
          currentLine: 3,
          action: 'update-min',
          explanation: `New min found: ${array[j]} at index ${j}`
        });
      }
    }

    if (minIndex !== i) {
      steps.push({
        array: [...array],
        currentIndex: i,
        minIndex: minIndex,
        comparingIndices: null,
        swappingIndices: [i, minIndex],
        currentLine: 4,
        action: 'swap-start',
        explanation: `Swapping ${array[i]} (index ${i}) with ${array[minIndex]} (index ${minIndex})`
      });

      // Perform swap
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      steps.push({
        array: [...array],
        currentIndex: i,
        minIndex: minIndex,
        comparingIndices: null,
        swappingIndices: [i, minIndex],
        currentLine: 4,
        action: 'swap-end',
        explanation: `Swapped! New values: ${array[i]} at index ${i}, ${array[minIndex]} at index ${minIndex}`
      });
    }
  }

  steps.push({
    array: [...array],
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 5,
    action: 'complete',
    explanation: 'Array is now sorted!'
  });

  return { steps, pseudocode };
};

module.exports = selectionSort;