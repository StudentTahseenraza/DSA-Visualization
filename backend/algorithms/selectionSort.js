
const selectionSort = (arr) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'for i = 0 to n-1',
    '  min_index = i',
    '  for j = i+1 to n-1',
    '    if A[j] < A[min_index]',
    '      min_index = j',
    '  swap A[i] and A[min_index]'
  ];

  const array = [...arr];
  const n = array.length;

  // Initial step
  steps.push({
    array: [...array],
    currentLine: 0,
    highlighted: { current: -1, min: -1 }
  });
  explanations.push('Starting the Selection Sort algorithm.');

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    steps.push({
      array: [...array],
      currentLine: 1,
      highlighted: { current: i, min: minIndex }
    });
    explanations.push(`Set min_index to ${i}.`);

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        currentLine: 4,
        highlighted: { current: j, min: minIndex }
      });
      explanations.push(`Compare the current (${array[j]}) with the minimum (${array[minIndex]}) and update if smaller.`);

      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...array],
          currentLine: 5,
          highlighted: { current: j, min: minIndex }
        });
        explanations.push(`Update min_index to ${j} because ${array[j]} is smaller than ${array[minIndex]}.`);
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      steps.push({
        array: [...array],
        currentLine: 6,
        highlighted: { current: i, min: minIndex }
      });
      explanations.push(`Swap ${array[i]} and ${array[minIndex]}.`);
    }
  }

  // Final step
  steps.push({
    array: [...array],
    currentLine: 0,
    highlighted: { current: -1, min: -1 }
  });
  explanations.push('Selection Sort completed.');

  return { steps, pseudocode, explanations };
};

module.exports = selectionSort;