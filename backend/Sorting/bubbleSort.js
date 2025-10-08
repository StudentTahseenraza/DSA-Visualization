// algorithms/bubbleSort.js
const bubbleSort = (arr) => {
  const steps = [];
  const explanations = []; // Add explanations array
  const pseudocode = [
    'do',
    '  swapped = false',
    '  for i = 1 to indexOfLastUnsortedElement-1',
    '    if leftElement > rightElement',
    '      swap(leftElement, rightElement)',
    '      swapped = true',
    'while swapped'
  ];

  let array = [...arr];
  let n = array.length;
  let swapped;

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

  do {
    swapped = false;
    const initExplanation = 'Set swapped = false';
    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 1,
      action: 'init'
    });
    explanations.push(initExplanation);

    for (let i = 0; i < n - 1; i++) {
      // Show comparison
      const compareExplanation = `Comparing ${array[i]} (index ${i}) and ${array[i + 1]} (index ${i + 1})`;
      steps.push({
        array: [...array],
        currentIndex: i,
        minIndex: i + 1,
        comparingIndices: [i, i + 1],
        swappingIndices: null,
        currentLine: 2,
        action: 'compare'
      });
      explanations.push(compareExplanation);

      if (array[i] > array[i + 1]) {
        const decisionExplanation = `${array[i]} > ${array[i + 1]} - will swap`;
        steps.push({
          array: [...array],
          currentIndex: i,
          minIndex: i + 1,
          comparingIndices: [i, i + 1],
          swappingIndices: null,
          currentLine: 3,
          action: 'decision'
        });
        explanations.push(decisionExplanation);

        // Show swap starting
        const swapStartExplanation = `Starting swap of ${array[i]} and ${array[i + 1]}`;
        steps.push({
          array: [...array],
          currentIndex: i,
          minIndex: i + 1,
          comparingIndices: null,
          swappingIndices: [i, i + 1],
          currentLine: 4,
          action: 'swap-start'
        });
        explanations.push(swapStartExplanation);

        // Show swap in progress
        const swapMiddleExplanation = `Swapping ${array[i]} and ${array[i + 1]}`;
        steps.push({
          array: [...array],
          currentIndex: i,
          minIndex: i + 1,
          comparingIndices: null,
          swappingIndices: [i, i + 1],
          currentLine: 4,
          action: 'swap-middle'
        });
        explanations.push(swapMiddleExplanation);

        // Perform the actual swap
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;

        // Show swap completed
        const swapEndExplanation = `Swapped ${array[i]} and ${array[i + 1]} at indices ${i} and ${i + 1}`;
        steps.push({
          array: [...array],
          currentIndex: i,
          minIndex: i + 1,
          comparingIndices: null,
          swappingIndices: [i, i + 1],
          currentLine: 4,
          action: 'swap-end'
        });
        explanations.push(swapEndExplanation);

        const flagExplanation = 'Set swapped = true';
        steps.push({
          array: [...array],
          currentIndex: i,
          minIndex: i + 1,
          comparingIndices: null,
          swappingIndices: null,
          currentLine: 5,
          action: 'set-flag'
        });
        explanations.push(flagExplanation);
      }
    }
    n--;
  } while (swapped);

  // Final sorted state
  const completeExplanation = 'Array is now sorted!';
  steps.push({
    array: [...array],
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 6,
    action: 'complete'
  });
  explanations.push(completeExplanation);

  return { steps, pseudocode, explanations }; // Return explanations array
};

module.exports = bubbleSort;