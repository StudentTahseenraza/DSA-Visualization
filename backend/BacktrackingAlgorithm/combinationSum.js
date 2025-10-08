// algorithms/combinationSum.js
const combinationSum = (candidates, target) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function findCombinations(candidates, target, start, current):',
    '  if target == 0:',
    '    add current to result',
    '    return',
    '  if target < 0: return',
    '  for i from start to candidates length-1:',
    '    add candidates[i] to current',
    '    findCombinations(candidates, target-candidates[i], i, current)',
    '    remove candidates[i] from current (backtrack)'
  ];

  const result = [];
  
  const explanation1 = `Finding combinations that sum to ${target} from: [${candidates.join(', ')}]`;
  steps.push({
    candidates: [...candidates],
    target: target,
    current: [],
    start: 0,
    result: [...result],
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Sort candidates to handle duplicates and optimize
  candidates.sort((a, b) => a - b);
  
  const explanation2 = `Sorted candidates: [${candidates.join(', ')}]`;
  steps.push({
    candidates: [...candidates],
    target: target,
    current: [],
    start: 0,
    result: [...result],
    currentLine: 0,
    action: 'sort'
  });
  explanations.push(explanation2);

  // Find combinations
  findCombinations(candidates, target, 0, [], result, steps, explanations);
  
  // Final result
  const finalExplanation = `Found ${result.length} combinations that sum to ${target}`;
  steps.push({
    candidates: [...candidates],
    target: target,
    current: [],
    start: candidates.length,
    result: [...result],
    currentLine: 3,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Recursive function to find combinations
const findCombinations = (candidates, target, start, current, result, steps, explanations) => {
  // Base case: found a valid combination
  if (target === 0) {
    result.push([...current]);
    
    const explanation = `Found combination: [${current.join(', ')}]`;
    steps.push({
      candidates: [...candidates],
      target: target,
      current: [...current],
      start: start,
      result: [...result],
      currentLine: 3,
      action: 'found-combination'
    });
    explanations.push(explanation);
    return;
  }

  // Base case: target exceeded
  if (target < 0) {
    const explanation = `Target ${target} exceeded, backtracking`;
    steps.push({
      candidates: [...candidates],
      target: target,
      current: [...current],
      start: start,
      result: [...result],
      currentLine: 4,
      action: 'target-exceeded'
    });
    explanations.push(explanation);
    return;
  }

  const explanation1 = `Finding combinations for target ${target} starting from index ${start}`;
  steps.push({
    candidates: [...candidates],
    target: target,
    current: [...current],
    start: start,
    result: [...result],
    currentLine: 1,
    action: 'find-combinations'
  });
  explanations.push(explanation1);

  for (let i = start; i < candidates.length; i++) {
    // Skip duplicates
    if (i > start && candidates[i] === candidates[i - 1]) {
      const explanation2 = `Skipping duplicate candidate ${candidates[i]} at index ${i}`;
      steps.push({
        candidates: [...candidates],
        target: target,
        current: [...current],
        start: i,
        result: [...result],
        currentLine: 6,
        action: 'skip-duplicate'
      });
      explanations.push(explanation2);
      continue;
    }

    const explanation3 = `Trying candidate ${candidates[i]} at index ${i}`;
    steps.push({
      candidates: [...candidates],
      target: target,
      current: [...current],
      start: i,
      result: [...result],
      currentLine: 6,
      action: 'try-candidate'
    });
    explanations.push(explanation3);

    current.push(candidates[i]);
    
    const explanation4 = `Added ${candidates[i]} to current combination: [${current.join(', ')}]`;
    steps.push({
      candidates: [...candidates],
      target: target,
      current: [...current],
      start: i,
      result: [...result],
      currentLine: 7,
      action: 'add-candidate'
    });
    explanations.push(explanation4);

    findCombinations(candidates, target - candidates[i], i, current, result, steps, explanations);

    // Backtrack
    current.pop();
    const explanation5 = `Backtracking: removed ${candidates[i]} from combination`;
    steps.push({
      candidates: [...candidates],
      target: target,
      current: [...current],
      start: i,
      result: [...result],
      currentLine: 8,
      action: 'backtrack'
    });
    explanations.push(explanation5);
  }
};

module.exports = combinationSum;