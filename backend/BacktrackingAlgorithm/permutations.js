// algorithms/permutations.js
const permutations = (arr) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function generatePermutations(arr, start):',
    '  if start == arr length:',
    '    add current permutation to result',
    '    return',
    '  for i from start to arr length-1:',
    '    swap arr[start] and arr[i]',
    '    generatePermutations(arr, start+1)',
    '    swap arr[start] and arr[i] (backtrack)'
  ];

  const result = [];
  
  const explanation1 = `Generating permutations for: [${arr.join(', ')}]`;
  steps.push({
    arr: [...arr],
    current: [...arr],
    start: 0,
    result: [...result],
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Generate all permutations
  generatePermutations(arr, 0, result, steps, explanations);
  
  // Final result
  const finalExplanation = `Generated ${result.length} permutations`;
  steps.push({
    arr: [...arr],
    current: [...arr],
    start: arr.length,
    result: [...result],
    currentLine: 3,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Recursive function to generate permutations
const generatePermutations = (arr, start, result, steps, explanations) => {
  // Base case: completed a permutation
  if (start === arr.length) {
    result.push([...arr]);
    
    const explanation = `Added permutation: [${arr.join(', ')}]`;
    steps.push({
      arr: [...arr],
      current: [...arr],
      start: start,
      result: [...result],
      currentLine: 3,
      action: 'add-permutation'
    });
    explanations.push(explanation);
    return;
  }

  const explanation1 = `Generating permutations starting from index ${start}`;
  steps.push({
    arr: [...arr],
    current: [...arr],
    start: start,
    result: [...result],
    currentLine: 1,
    action: 'generate'
  });
  explanations.push(explanation1);

  for (let i = start; i < arr.length; i++) {
    const explanation2 = `Swapping elements at positions ${start} and ${i}`;
    steps.push({
      arr: [...arr],
      current: [...arr],
      start: start,
      i: i,
      result: [...result],
      currentLine: 5,
      action: 'swap'
    });
    explanations.push(explanation2);

    // Swap elements
    [arr[start], arr[i]] = [arr[i], arr[start]];
    
    const explanation3 = `After swap: [${arr.join(', ')}]`;
    steps.push({
      arr: [...arr],
      current: [...arr],
      start: start,
      i: i,
      result: [...result],
      currentLine: 5,
      action: 'after-swap'
    });
    explanations.push(explanation3);

    // Recursively generate permutations
    generatePermutations(arr, start + 1, result, steps, explanations);

    // Backtrack: swap back
    [arr[start], arr[i]] = [arr[i], arr[start]];
    
    const explanation4 = `Backtracking: swapping back elements at ${start} and ${i}`;
    steps.push({
      arr: [...arr],
      current: [...arr],
      start: start,
      i: i,
      result: [...result],
      currentLine: 7,
      action: 'backtrack'
    });
    explanations.push(explanation4);
  }
};

module.exports = permutations;