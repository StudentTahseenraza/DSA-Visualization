// algorithms/Searching/linearSearch.js
const linearSearch = (arr, target) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'for i from 0 to n-1:',
    '  if arr[i] == target:',
    '    return i',
    'return -1'
  ];

  let array = [...arr];
  let foundIndex = -1;

  steps.push({
    array: [...array],
    currentIndex: -1,
    target: target,
    comparingIndices: null,
    foundIndex: -1,
    currentLine: 0,
    action: 'start',
    explanation: `Starting linear search for target ${target}`
  });
  explanations.push(`Starting linear search for target ${target}`);

  for (let i = 0; i < array.length; i++) {
    // Show current position
    steps.push({
      array: [...array],
      currentIndex: i,
      target: target,
      comparingIndices: [i],
      foundIndex: -1,
      currentLine: 1,
      action: 'check',
      explanation: `Checking element at index ${i}: ${array[i]}`
    });
    explanations.push(`Checking element at index ${i}: ${array[i]}`);

    if (array[i] === target) {
      foundIndex = i;
      
      steps.push({
        array: [...array],
        currentIndex: i,
        target: target,
        comparingIndices: [i],
        foundIndex: i,
        currentLine: 2,
        action: 'found',
        explanation: `Target ${target} found at index ${i}!`
      });
      explanations.push(`Target ${target} found at index ${i}!`);
      
      break;
    } else {
      steps.push({
        array: [...array],
        currentIndex: i,
        target: target,
        comparingIndices: [i],
        foundIndex: -1,
        currentLine: 1,
        action: 'not-found',
        explanation: `${array[i]} ≠ ${target}, continuing search...`
      });
      explanations.push(`${array[i]} ≠ ${target}, continuing search...`);
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...array],
      currentIndex: -1,
      target: target,
      comparingIndices: null,
      foundIndex: -1,
      currentLine: 3,
      action: 'not-found',
      explanation: `Target ${target} not found in the array`
    });
    explanations.push(`Target ${target} not found in the array`);
  }

  return { steps, pseudocode, explanations, result: foundIndex };
};

module.exports = linearSearch;