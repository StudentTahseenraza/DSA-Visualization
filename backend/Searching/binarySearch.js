// algorithms/Searching/binarySearch.js
const binarySearch = (arr, target) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'left = 0, right = n-1',
    'while left <= right:',
    '  mid = floor((left + right) / 2)',
    '  if arr[mid] == target:',
    '    return mid',
    '  else if arr[mid] < target:',
    '    left = mid + 1',
    '  else:',
    '    right = mid - 1',
    'return -1'
  ];

  let array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array
  let left = 0;
  let right = array.length - 1;
  let foundIndex = -1;

  steps.push({
    array: [...array],
    currentIndex: -1,
    target: target,
    left: left,
    right: right,
    mid: -1,
    comparingIndices: null,
    foundIndex: -1,
    currentLine: 0,
    action: 'start',
    explanation: `Starting binary search for target ${target} in sorted array`
  });
  explanations.push(`Starting binary search for target ${target} in sorted array`);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Show current bounds and mid
    steps.push({
      array: [...array],
      currentIndex: mid,
      target: target,
      left: left,
      right: right,
      mid: mid,
      comparingIndices: [mid],
      foundIndex: -1,
      currentLine: 2,
      action: 'calculate-mid',
      explanation: `Calculating mid: (${left} + ${right}) / 2 = ${mid}`
    });
    explanations.push(`Calculating mid: (${left} + ${right}) / 2 = ${mid}`);

    steps.push({
      array: [...array],
      currentIndex: mid,
      target: target,
      left: left,
      right: right,
      mid: mid,
      comparingIndices: [mid],
      foundIndex: -1,
      currentLine: 3,
      action: 'compare',
      explanation: `Comparing arr[${mid}] = ${array[mid]} with target ${target}`
    });
    explanations.push(`Comparing arr[${mid}] = ${array[mid]} with target ${target}`);

    if (array[mid] === target) {
      foundIndex = mid;
      
      steps.push({
        array: [...array],
        currentIndex: mid,
        target: target,
        left: left,
        right: right,
        mid: mid,
        comparingIndices: [mid],
        foundIndex: mid,
        currentLine: 4,
        action: 'found',
        explanation: `Target ${target} found at index ${mid}!`
      });
      explanations.push(`Target ${target} found at index ${mid}!`);
      
      break;
    } else if (array[mid] < target) {
      left = mid + 1;
      
      steps.push({
        array: [...array],
        currentIndex: mid,
        target: target,
        left: left,
        right: right,
        mid: mid,
        comparingIndices: [mid],
        foundIndex: -1,
        currentLine: 6,
        action: 'move-right',
        explanation: `${array[mid]} < ${target}, searching right half [${left}, ${right}]`
      });
      explanations.push(`${array[mid]} < ${target}, searching right half [${left}, ${right}]`);
    } else {
      right = mid - 1;
      
      steps.push({
        array: [...array],
        currentIndex: mid,
        target: target,
        left: left,
        right: right,
        mid: mid,
        comparingIndices: [mid],
        foundIndex: -1,
        currentLine: 8,
        action: 'move-left',
        explanation: `${array[mid]} > ${target}, searching left half [${left}, ${right}]`
      });
      explanations.push(`${array[mid]} > ${target}, searching left half [${left}, ${right}]`);
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...array],
      currentIndex: -1,
      target: target,
      left: left,
      right: right,
      mid: -1,
      comparingIndices: null,
      foundIndex: -1,
      currentLine: 9,
      action: 'not-found',
      explanation: `Target ${target} not found in the array`
    });
    explanations.push(`Target ${target} not found in the array`);
  }

  return { steps, pseudocode, explanations, result: foundIndex };
};

module.exports = binarySearch;