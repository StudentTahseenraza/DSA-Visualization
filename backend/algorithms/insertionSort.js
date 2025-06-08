const insertionSort = (arr) => {
  const steps = [];
  let array = [...arr];
  let n = array.length;

  if (n <= 1) {
    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      currentLine: -1,
    });
    return steps;
  }

  const pseudocode = [
    'for i from 1 to n-1:',
    '  key = arr[i]',
    '  j = i - 1',
    '  while j >= 0 and arr[j] > key:',
    '    arr[j + 1] = arr[j]',
    '    j = j - 1',
    '  arr[j + 1] = key',
  ];

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      currentIndex: i,
      minIndex: j,
      currentLine: 1,
      action: 'set-key',
    });

    steps.push({
      array: [...array],
      currentIndex: i,
      minIndex: j,
      currentLine: 2,
      action: 'set-j',
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: j,
        currentLine: 3,
        action: 'compare',
      });

      array[j + 1] = array[j];
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: j + 1,
        currentLine: 4,
        action: 'shift',
      });

      j--;
      steps.push({
        array: [...array],
        currentIndex: j,
        minIndex: j + 1,
        currentLine: 5,
        action: 'decrement-j',
      });
    }

    array[j + 1] = key;
    steps.push({
      array: [...array],
      currentIndex: j + 1,
      minIndex: j + 1,
      currentLine: 6,
      action: 'insert-key',
    });
  }

  return { steps, pseudocode };
};

module.exports = insertionSort;