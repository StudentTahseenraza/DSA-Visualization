// algorithms/powerSet.js
const powerSet = (set) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function generateSubsets(set, index, current):',
    '  if index == set length:',
    '    add current to result',
    '    return',
    '  generateSubsets(set, index+1, current) // exclude element',
    '  generateSubsets(set, index+1, current + set[index]) // include element'
  ];

  const result = [];
  
  const explanation1 = `Generating power set for set: [${set.join(', ')}]`;
  steps.push({
    set: [...set],
    currentSubset: [],
    currentIndex: 0,
    result: [...result],
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Generate all subsets
  generateSubsets(set, 0, [], result, steps, explanations);
  
  // Final result
  const finalExplanation = `Generated ${result.length} subsets`;
  steps.push({
    set: [...set],
    currentSubset: [],
    currentIndex: set.length,
    result: [...result],
    currentLine: 3,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Recursive function to generate subsets
const generateSubsets = (set, index, current, result, steps, explanations) => {
  // Base case: processed all elements
  if (index === set.length) {
    result.push([...current]);
    
    const explanation = `Added subset: [${current.join(', ')}]`;
    steps.push({
      set: [...set],
      currentSubset: [...current],
      currentIndex: index,
      result: [...result],
      currentLine: 3,
      action: 'add-subset'
    });
    explanations.push(explanation);
    return;
  }

  const explanation1 = `Processing element ${set[index]} at index ${index}`;
  steps.push({
    set: [...set],
    currentSubset: [...current],
    currentIndex: index,
    result: [...result],
    currentLine: 1,
    action: 'process-element'
  });
  explanations.push(explanation1);

  // Exclude current element
  const explanation2 = `Excluding element ${set[index]}`;
  steps.push({
    set: [...set],
    currentSubset: [...current],
    currentIndex: index,
    result: [...result],
    currentLine: 5,
    action: 'exclude'
  });
  explanations.push(explanation2);

  generateSubsets(set, index + 1, current, result, steps, explanations);

  // Include current element
  current.push(set[index]);
  
  const explanation3 = `Including element ${set[index]}`;
  steps.push({
    set: [...set],
    currentSubset: [...current],
    currentIndex: index,
    result: [...result],
    currentLine: 6,
    action: 'include'
  });
  explanations.push(explanation3);

  generateSubsets(set, index + 1, current, result, steps, explanations);
  
  // Backtrack
  current.pop();
  const explanation4 = `Backtracking: removing element ${set[index]}`;
  steps.push({
    set: [...set],
    currentSubset: [...current],
    currentIndex: index,
    result: [...result],
    currentLine: 6,
    action: 'backtrack'
  });
  explanations.push(explanation4);
};

module.exports = powerSet;