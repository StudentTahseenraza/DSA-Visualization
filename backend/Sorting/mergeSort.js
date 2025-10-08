// algorithms/mergeSort.js
const mergeSort = (arr) => {
  const steps = [];
  const pseudocode = [
    'if array length > 1:',
    '  mid = length / 2',
    '  left = array[0:mid]',
    '  right = array[mid:end]',
    '  mergeSort(left)',
    '  mergeSort(right)',
    '  merge(left, right, array)'
  ];

  let array = [...arr];

  // Recursive merge function
  const merge = (left, right, start) => {
    let i = 0, j = 0, k = start;
    const merged = [];

    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 6,
      action: 'merge-start',
      explanation: `Merging [${left}] and [${right}]`
    });

    while (i < left.length && j < right.length) {
      steps.push({
        array: [...array],
        currentIndex: -1,
        minIndex: -1,
        comparingIndices: [k], // show where next value goes
        swappingIndices: null,
        currentLine: 6,
        action: 'compare',
        explanation: `Compare ${left[i]} and ${right[j]}`
      });

      if (left[i] <= right[j]) {
        merged.push(left[i]);
        array[k] = left[i];
        steps.push({
          array: [...array],
          currentIndex: k,
          minIndex: -1,
          comparingIndices: null,
          swappingIndices: null,
          currentLine: 6,
          action: 'place',
          explanation: `Place ${left[i]} from left at index ${k}`
        });
        i++;
      } else {
        merged.push(right[j]);
        array[k] = right[j];
        steps.push({
          array: [...array],
          currentIndex: k,
          minIndex: -1,
          comparingIndices: null,
          swappingIndices: null,
          currentLine: 6,
          action: 'place',
          explanation: `Place ${right[j]} from right at index ${k}`
        });
        j++;
      }
      k++;
    }

    // Take remaining left elements
    while (i < left.length) {
      merged.push(left[i]);
      array[k] = left[i];
      steps.push({
        array: [...array],
        currentIndex: k,
        minIndex: -1,
        comparingIndices: null,
        swappingIndices: null,
        currentLine: 6,
        action: 'place',
        explanation: `Place ${left[i]} from left at index ${k}`
      });
      i++;
      k++;
    }

    // Take remaining right elements
    while (j < right.length) {
      merged.push(right[j]);
      array[k] = right[j];
      steps.push({
        array: [...array],
        currentIndex: k,
        minIndex: -1,
        comparingIndices: null,
        swappingIndices: null,
        currentLine: 6,
        action: 'place',
        explanation: `Place ${right[j]} from right at index ${k}`
      });
      j++;
      k++;
    }

    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 6,
      action: 'merge-end',
      explanation: `Merged into [${merged}]`
    });

    return merged;
  };

  const sort = (subArray, start) => {
    if (subArray.length <= 1) return subArray;

    const mid = Math.floor(subArray.length / 2);
    const left = subArray.slice(0, mid);
    const right = subArray.slice(mid);

    steps.push({
      array: [...array],
      currentIndex: -1,
      minIndex: -1,
      comparingIndices: null,
      swappingIndices: null,
      currentLine: 1,
      action: 'split',
      explanation: `Split into [${left}] and [${right}]`
    });

    const sortedLeft = sort(left, start);
    const sortedRight = sort(right, start + mid);

    return merge(sortedLeft, sortedRight, start);
  };

  sort(array, 0);

  // Final step
  steps.push({
    array: [...array],
    currentIndex: -1,
    minIndex: -1,
    comparingIndices: null,
    swappingIndices: null,
    currentLine: 7,
    action: 'complete',
    explanation: 'Array is fully sorted!'
  });

  return { steps, pseudocode };
};

module.exports = mergeSort;
