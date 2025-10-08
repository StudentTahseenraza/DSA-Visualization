// algorithms/fractionalKnapsack.js
const fractionalKnapsack = (items, capacity) => {
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
    items: items.map(item => ({...item})),
    capacity: capacity,
    currentWeight: 0,
    totalValue: 0,
    selected: [],
    currentIndex: -1,
    currentLine: 1,
    action: 'calculate-ratios'
  });
  explanations.push(explanation1);

  const itemsWithRatios = items.map(item => ({
    ...item,
    ratio: item.value / item.weight
  }));

  // Sort by ratio (descending)
  const explanation2 = 'Sorting items by value/weight ratio in descending order';
  steps.push({
    items: itemsWithRatios.map(item => ({...item})),
    capacity: capacity,
    currentWeight: 0,
    totalValue: 0,
    selected: [],
    currentIndex: -1,
    currentLine: 2,
    action: 'sort'
  });
  explanations.push(explanation2);

  itemsWithRatios.sort((a, b) => b.ratio - a.ratio);

  let currentWeight = 0;
  let totalValue = 0;
  const selected = [];

  const explanation3 = 'Initializing: totalValue = 0, currentWeight = 0';
  steps.push({
    items: itemsWithRatios.map(item => ({...item})),
    capacity: capacity,
    currentWeight: currentWeight,
    totalValue: totalValue,
    selected: [...selected],
    currentIndex: -1,
    currentLine: 3,
    action: 'initialize'
  });
  explanations.push(explanation3);

  // Process each item
  for (let i = 0; i < itemsWithRatios.length; i++) {
    const item = itemsWithRatios[i];
    
    const explanation4 = `Processing item: ${item.name} (value: ${item.value}, weight: ${item.weight}, ratio: ${item.ratio.toFixed(2)})`;
    steps.push({
      items: itemsWithRatios.map(item => ({...item})),
      capacity: capacity,
      currentWeight: currentWeight,
      totalValue: totalValue,
      selected: [...selected],
      currentIndex: i,
      currentLine: 4,
      action: 'process-item'
    });
    explanations.push(explanation4);

    if (currentWeight + item.weight <= capacity) {
      // Take whole item
      currentWeight += item.weight;
      totalValue += item.value;
      selected.push({...item, fraction: 1});

      const explanation5 = `Taking whole ${item.name} (weight: ${item.weight}, value: ${item.value})`;
      steps.push({
        items: itemsWithRatios.map(item => ({...item})),
        capacity: capacity,
        currentWeight: currentWeight,
        totalValue: totalValue,
        selected: [...selected],
        currentIndex: i,
        currentLine: 6,
        action: 'take-whole'
      });
      explanations.push(explanation5);
    } else {
      // Take fraction of item
      const remainingCapacity = capacity - currentWeight;
      const fraction = remainingCapacity / item.weight;
      const fractionValue = fraction * item.value;
      currentWeight = capacity;
      totalValue += fractionValue;
      selected.push({...item, fraction: fraction});

      const explanation6 = `Taking ${(fraction * 100).toFixed(0)}% of ${item.name} (value: ${fractionValue.toFixed(2)})`;
      steps.push({
        items: itemsWithRatios.map(item => ({...item})),
        capacity: capacity,
        currentWeight: currentWeight,
        totalValue: totalValue,
        selected: [...selected],
        currentIndex: i,
        currentLine: 10,
        action: 'take-fraction'
      });
      explanations.push(explanation6);
      
      break;
    }
  }

  // Final result
  const finalExplanation = `Knapsack filled! Total value: ${totalValue.toFixed(2)}, Total weight: ${currentWeight}/${capacity}`;
  steps.push({
    items: itemsWithRatios.map(item => ({...item})),
    capacity: capacity,
    currentWeight: currentWeight,
    totalValue: totalValue,
    selected: [...selected],
    currentIndex: -1,
    currentLine: 11,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = fractionalKnapsack;