// algorithms/insertionSort.js (updated)
const insertionSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'for i from 1 to n-1:',
    '  key = arr[i]',
    '  j = i-1',
    '  while j >= 0 and arr[j] > key:',
    '    arr[j+1] = arr[j]',
    '    j = j-1',
    '  arr[j+1] = key'
  ];

  let array = [...arr];
  let n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      currentIndex: i,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 1,
      action: 'set-key',
      explanation: `Setting key = ${key} at index ${i}`
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: -1,
        comparingIndices: [j, i],
        swappingIndices: null,
        currentLine: 3,
        action: 'compare',
        explanation: `Comparing ${array[j]} (index ${j}) with key ${key}`
      });

      array[j + 1] = array[j];
      
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: -1,
        comparingIndices: null,
        swappingIndices: [j, j + 1],
        currentLine: 4,
        action: 'shift',
        explanation: `Shifting ${array[j]} from index ${j} to index ${j + 1}`
      });

      j = j - 1;
    }

    array[j + 1] = key;
    
    steps.push({
      array: [...array],
      currentIndex: j + 1,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 6,
      action: 'insert',
      explanation: `Inserting key ${key} at position ${j + 1}`
    });
  }

  steps.push({
    array: [...array],
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 7,
    action: 'complete',
    explanation: 'Array is now sorted!'
  });

  return { steps, pseudocode };
};

module.exports = insertionSort;