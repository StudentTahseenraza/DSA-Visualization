// algorithms/mergeSort.js
const mergeSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'if array length <= 1: return array',
    'split array into left and right halves',
    'recursively sort left half',
    'recursively sort right half',
    'merge sorted halves',
    'compare elements from both halves',
    'place smaller element in result',
  ];
  const explanations = [
    'Check if array has 1 or fewer elements.',
    'Divide the array into two halves.',
    'Recursively sort the left half.',
    'Recursively sort the right half.',
    'Merge the sorted halves.',
    'Compare elements from left and right halves.',
    'Place the smaller element in the result array.',
  ];

  const merge = (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...arr],
      currentIndices: [left, mid, right],
      mergeIndices: [i, j],
      action: 'merge-start',
      currentLine: 5,
      explanation: `Start merging subarrays from indices ${left} to ${mid} and ${mid + 1} to ${right}.`,
    });

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        currentIndices: [left + i, mid + 1 + j],
        mergeIndices: [i, j],
        action: 'compare',
        currentLine: 6,
        explanation: `Comparing ${leftArr[i]} (left) and ${rightArr[j]} (right).`,
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      steps.push({
        array: [...arr],
        currentIndices: [left + i, mid + 1 + j],
        mergeIndices: [i, j],
        action: 'place',
        currentLine: 7,
        explanation: `Placed ${arr[k]} at index ${k}.`,
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        currentIndices: [left + i],
        mergeIndices: [i, j],
        action: 'place',
        currentLine: 7,
        explanation: `Placed remaining ${arr[k]} from left at index ${k}.`,
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        currentIndices: [mid + 1 + j],
        mergeIndices: [i, j],
        action: 'place',
        currentLine: 7,
        explanation: `Placed remaining ${arr[k]} from right at index ${k}.`,
      });
      j++;
      k++;
    }
  };

  const sort = (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      steps.push({
        array: [...arr],
        currentIndices: [left, mid, right],
        action: 'split',
        currentLine: 2,
        explanation: `Splitting array from ${left} to ${right} at ${mid}.`,
      });

      sort(arr, left, mid);
      sort(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  };

  const array = [...arr];
  if (array.length <= 1) {
    steps.push({
      array: [...array],
      currentIndices: [],
      action: 'base-case',
      currentLine: 0,
      explanation: 'Array has 1 or fewer elements, no sorting needed.',
    });
    return { steps, pseudocode, explanations };
  }

  sort(array, 0, array.length - 1);
  return { steps, pseudocode, explanations };
};

module.exports = mergeSort;