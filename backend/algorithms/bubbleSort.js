const bubbleSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'for i from 0 to n-1:',
    '  for j from 0 to n-i-2:',
    '    if arr[j] > arr[j+1]:',
    '      swap arr[j] and arr[j+1]',
  ];
  const explanations = [
    'Outer loop to control the number of passes.',
    'Inner loop to perform comparisons and swaps.',
    'Compare adjacent elements.',
    'Swap if the current element is greater than the next.',
  ];

  let array = [...arr];
  let n = array.length;

  if (n <= 1) {
    // Handle edge case: array with 0 or 1 element
    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      currentLine: -1,
    });
    return { steps, pseudocode, explanations };
  }

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: j + 1,
        currentLine: 2, // if arr[j] > arr[j+1]
      });

      if (array[j] > array[j + 1]) {
        steps.push({
          array: [...array],
          currentIndex: j,
          minIndex: j + 1,
          currentLine: 3, // swap arr[j] and arr[j+1]
        });

        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        steps.push({
          array: [...array],
          currentIndex: j,
          minIndex: j + 1,
          currentLine: 3,
        });
      }
    }
  }

  return { steps, pseudocode, explanations };
};

module.exports = bubbleSort;