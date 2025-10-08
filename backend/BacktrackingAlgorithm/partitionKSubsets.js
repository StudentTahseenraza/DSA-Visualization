// algorithms/partitionKSubsets.js
const partitionKSubsets = (nums, k) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Calculate total sum, if not divisible by k: return false',
    'Sort nums in descending order',
    'Initialize k subsets with target sum',
    'function canPartition(nums, index, subsets, target):',
    '  if index == nums length: return true',
    '  For each subset:',
    '    if adding nums[index] doesn\'t exceed target:',
    '      add nums[index] to subset',
    '      if canPartition(nums, index+1, subsets, target): return true',
    '      remove nums[index] from subset (backtrack)',
    '  return false'
  ];

  const total = nums.reduce((sum, num) => sum + num, 0);
  
  const explanation1 = `Total sum: ${total}, k: ${k}`;
  steps.push({
    nums: [...nums],
    k: k,
    total: total,
    target: total / k,
    subsets: Array(k).fill().map(() => []),
    currentIndex: 0,
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Check if partition is possible
  if (total % k !== 0) {
    const explanation2 = `Total ${total} not divisible by ${k}, partition not possible`;
    steps.push({
      nums: [...nums],
      k: k,
      total: total,
      target: total / k,
      subsets: Array(k).fill().map(() => []),
      currentIndex: 0,
      currentLine: 1,
      action: 'not-divisible'
    });
    explanations.push(explanation2);
    return { steps, pseudocode, explanations, result: false };
  }

  const target = total / k;
  
  const explanation3 = `Target sum for each subset: ${target}`;
  steps.push({
    nums: [...nums],
    k: k,
    total: total,
    target: target,
    subsets: Array(k).fill().map(() => []),
    currentIndex: 0,
    currentLine: 1,
    action: 'set-target'
  });
  explanations.push(explanation3);

  // Sort in descending order
  nums.sort((a, b) => b - a);
  
  const explanation4 = `Sorted numbers: [${nums.join(', ')}]`;
  steps.push({
    nums: [...nums],
    k: k,
    total: total,
    target: target,
    subsets: Array(k).fill().map(() => []),
    currentIndex: 0,
    currentLine: 2,
    action: 'sort'
  });
  explanations.push(explanation4);

  // Check if any number exceeds target
  if (nums[0] > target) {
    const explanation5 = `Number ${nums[0]} exceeds target ${target}, partition not possible`;
    steps.push({
      nums: [...nums],
      k: k,
      total: total,
      target: target,
      subsets: Array(k).fill().map(() => []),
      currentIndex: 0,
      currentLine: 2,
      action: 'number-too-large'
    });
    explanations.push(explanation5);
    return { steps, pseudocode, explanations, result: false };
  }

  const subsets = Array(k).fill().map(() => []);
  const subsetSums = Array(k).fill(0);
  
  const explanation6 = `Initialized ${k} empty subsets`;
  steps.push({
    nums: [...nums],
    k: k,
    total: total,
    target: target,
    subsets: JSON.parse(JSON.stringify(subsets)),
    subsetSums: [...subsetSums],
    currentIndex: 0,
    currentLine: 3,
    action: 'init-subsets'
  });
  explanations.push(explanation6);

  // Try to partition
  const result = canPartition(nums, 0, subsets, subsetSums, target, k, steps, explanations);
  
  // Final result
  const finalExplanation = result ? 
    `Partitioned into ${k} subsets with equal sum ${target}` : 
    `Cannot partition into ${k} subsets with equal sum`;
  steps.push({
    nums: [...nums],
    k: k,
    total: total,
    target: target,
    subsets: JSON.parse(JSON.stringify(subsets)),
    subsetSums: [...subsetSums],
    currentIndex: nums.length,
    currentLine: result ? 4 : 11,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Recursive backtracking function
const canPartition = (nums, index, subsets, subsetSums, target, k, steps, explanations) => {
  // All numbers placed
  if (index === nums.length) {
    const explanation = `All numbers placed successfully!`;
    steps.push({
      nums: [...nums],
      k: k,
      target: target,
      subsets: JSON.parse(JSON.stringify(subsets)),
      subsetSums: [...subsetSums],
      currentIndex: index,
      currentLine: 4,
      action: 'all-placed'
    });
    explanations.push(explanation);
    return true;
  }

  const num = nums[index];
  const explanation1 = `Processing number ${num} at index ${index}`;
  steps.push({
    nums: [...nums],
    k: k,
    target: target,
    subsets: JSON.parse(JSON.stringify(subsets)),
    subsetSums: [...subsetSums],
    currentIndex: index,
    currentLine: 4,
    action: 'process-number'
  });
  explanations.push(explanation1);

  // Try to place number in each subset
  for (let i = 0; i < k; i++) {
    const explanation2 = `Trying to place ${num} in subset ${i} (current sum: ${subsetSums[i]})`;
    steps.push({
      nums: [...nums],
      k: k,
      target: target,
      subsets: JSON.parse(JSON.stringify(subsets)),
      subsetSums: [...subsetSums],
      currentIndex: index,
      currentSubset: i,
      currentLine: 6,
      action: 'try-subset'
    });
    explanations.push(explanation2);

    if (subsetSums[i] + num <= target) {
      subsets[i].push(num);
      subsetSums[i] += num;
      
      const explanation3 = `Placed ${num} in subset ${i}, new sum: ${subsetSums[i]}`;
      steps.push({
        nums: [...nums],
        k: k,
        target: target,
        subsets: JSON.parse(JSON.stringify(subsets)),
        subsetSums: [...subsetSums],
        currentIndex: index,
        currentSubset: i,
        currentLine: 7,
        action: 'place-number'
      });
      explanations.push(explanation3);

      if (canPartition(nums, index + 1, subsets, subsetSums, target, k, steps, explanations)) {
        return true;
      }

      // Backtrack
      subsets[i].pop();
      subsetSums[i] -= num;
      
      const explanation4 = `Backtracking: removing ${num} from subset ${i}`;
      steps.push({
        nums: [...nums],
        k: k,
        target: target,
        subsets: JSON.parse(JSON.stringify(subsets)),
        subsetSums: [...subsetSums],
        currentIndex: index,
        currentSubset: i,
        currentLine: 9,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }

  return false;
};

module.exports = partitionKSubsets;