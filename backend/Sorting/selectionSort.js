// backend/algorithms/Sorting/selectionSort.js (updated to match pattern)

const selectionSort = (arr) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'for i from 0 to n-1:',
    '  minIndex = i',
    '  for j from i+1 to n-1:',
    '    if arr[j] < arr[minIndex]:',
    '      minIndex = j',
    '  if minIndex != i:',
    '    swap(arr[i], arr[minIndex])'
  ];

  let array = [...arr];
  let n = array.length;

  if (n <= 1) {
    const explanation = 'Array is already sorted';
    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: -1,
      action: 'complete'
    });
    explanations.push(explanation);
    return { steps, pseudocode, explanations };
  }

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Set initial minimum
    const setMinExplanation = `Setting minimum to ${array[i]} at index ${i}`;
    steps.push({
      array: [...array],
      currentIndex: i,
      minIndex: minIndex,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 1,
      action: 'set-min',
      explanation: setMinExplanation
    });
    explanations.push(setMinExplanation);

    // Find minimum in unsorted portion
    for (let j = i + 1; j < n; j++) {
      const compareExplanation = `Comparing ${array[j]} with current minimum ${array[minIndex]}`;
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: minIndex,
        comparingIndices: [j, minIndex],
        swappingIndices: null,
        currentLine: 2,
        action: 'compare',
        explanation: compareExplanation
      });
      explanations.push(compareExplanation);

      if (array[j] < array[minIndex]) {
        const updateMinExplanation = `New minimum found: ${array[j]} at index ${j}`;
        steps.push({
          array: [...array],
          currentIndex: j,
          minIndex: j,
          comparingIndices: [j, minIndex],
          swappingIndices: null,
          currentLine: 3,
          action: 'update-min',
          explanation: updateMinExplanation
        });
        explanations.push(updateMinExplanation);
        minIndex = j;
      }
    }

    // Swap if necessary
    if (minIndex !== i) {
      const swapStartExplanation = `Swapping ${array[i]} (index ${i}) with minimum ${array[minIndex]} (index ${minIndex})`;
      steps.push({
        array: [...array],
        currentIndex: i,
        minIndex: minIndex,
        comparingIndices: null,
        swappingIndices: [i, minIndex],
        currentLine: 5,
        action: 'swap-start',
        explanation: swapStartExplanation
      });
      explanations.push(swapStartExplanation);

      // Perform swap
      [array[i], array[minIndex]] = [array[minIndex], array[i]];

      const swapEndExplanation = `After swap: ${array[i]} at index ${i}, ${array[minIndex]} at index ${minIndex}`;
      steps.push({
        array: [...array],
        currentIndex: i,
        minIndex: minIndex,
        comparingIndices: null,
        swappingIndices: [i, minIndex],
        currentLine: 5,
        action: 'swap-end',
        explanation: swapEndExplanation
      });
      explanations.push(swapEndExplanation);
    }
  }

  // Final sorted state
  const completeExplanation = 'Array is now sorted!';
  steps.push({
    array: [...array],
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 6,
    action: 'complete',
    explanation: completeExplanation
  });
  explanations.push(completeExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = selectionSort;