// algorithms/knapsackGreedy.js
const knapsackGreedy = (items, capacity) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Calculate value/weight ratio for each item',
    'Sort items by ratio in descending order',
    'Initialize totalValue = 0, currentWeight = 0',
    'For each item in sorted list:',
    '  if currentWeight + item.weight <= capacity:',
    '    take whole item',
    '    currentWeight += item.weight',
    '    totalValue += item.value',
    '  else:',
    '    take fraction of item',
    '    totalValue += fraction * item.value',
    '    break'
  ];

  // Calculate value/weight ratio
  const explanation1 = 'Calculating value/weight ratio for each item';
  steps.push({
    array: items.map(item => ({...item})),
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 1,
    action: 'calculate-ratios',
    capacity: capacity,
    currentWeight: 0,
    totalValue: 0
  });
  explanations.push(explanation1);

  const itemsWithRatios = items.map(item => ({
    ...item,
    ratio: item.value / item.weight
  }));

  // Sort by ratio (descending)
  const explanation2 = 'Sorting items by value/weight ratio in descending order';
  steps.push({
    array: itemsWithRatios.map(item => ({...item})),
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 2,
    action: 'sort',
    capacity: capacity,
    currentWeight: 0,
    totalValue: 0
  });
  explanations.push(explanation2);

  itemsWithRatios.sort((a, b) => b.ratio - a.ratio);

  let currentWeight = 0;
  let totalValue = 0;
  const selectedItems = [];

  const explanation3 = 'Initializing: totalValue = 0, currentWeight = 0';
  steps.push({
    array: itemsWithRatios.map(item => ({...item})),
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 3,
    action: 'initialize',
    capacity: capacity,
    currentWeight: currentWeight,
    totalValue: totalValue,
    selectedItems: [...selectedItems]
  });
  explanations.push(explanation3);

  // Process each item
  for (let i = 0; i < itemsWithRatios.length; i++) {
    const item = itemsWithRatios[i];
    
    const explanation4 = `Processing item: ${item.name} (value: ${item.value}, weight: ${item.weight}, ratio: ${item.ratio.toFixed(2)})`;
    steps.push({
      array: itemsWithRatios.map(item => ({...item})),
      currentIndex: i,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 4,
      action: 'process-item',
      capacity: capacity,
      currentWeight: currentWeight,
      totalValue: totalValue,
      selectedItems: [...selectedItems]
    });
    explanations.push(explanation4);

    if (currentWeight + item.weight <= capacity) {
      // Take whole item
      currentWeight += item.weight;
      totalValue += item.value;
      selectedItems.push({...item, fraction: 1});

      const explanation5 = `Taking whole ${item.name} (weight: ${item.weight}, value: ${item.value})`;
      steps.push({
        array: itemsWithRatios.map(item => ({...item})),
        currentIndex: i,
        minIndex: -1,
        comparingIndices: null,
        swappingIndices: null,
        currentLine: 6,
        action: 'take-whole',
        capacity: capacity,
        currentWeight: currentWeight,
        totalValue: totalValue,
        selectedItems: [...selectedItems]
      });
      explanations.push(explanation5);
    } else {
      // Take fraction of item
      const remainingCapacity = capacity - currentWeight;
      const fraction = remainingCapacity / item.weight;
      const fractionValue = fraction * item.value;
      currentWeight = capacity;
      totalValue += fractionValue;
      selectedItems.push({...item, fraction: fraction});

      const explanation6 = `Taking ${(fraction * 100).toFixed(0)}% of ${item.name} (value: ${fractionValue.toFixed(2)})`;
      steps.push({
        array: itemsWithRatios.map(item => ({...item})),
        currentIndex: i,
        minIndex: -1,
        comparingIndices: null,
        swappingIndices: null,
        currentLine: 10,
        action: 'take-fraction',
        capacity: capacity,
        currentWeight: currentWeight,
        totalValue: totalValue,
        selectedItems: [...selectedItems]
      });
      explanations.push(explanation6);
      
      break;
    }
  }

  // Final result
  const finalExplanation = `Knapsack filled! Total value: ${totalValue.toFixed(2)}, Total weight: ${currentWeight}/${capacity}`;
  steps.push({
    array: itemsWithRatios.map(item => ({...item})),
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 12,
    action: 'complete',
    capacity: capacity,
    currentWeight: currentWeight,
    totalValue: totalValue,
    selectedItems: [...selectedItems]
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = knapsackGreedy;