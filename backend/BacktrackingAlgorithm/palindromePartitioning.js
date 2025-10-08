// algorithms/palindromePartitioning.js
const palindromePartitioning = (s) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function partitionString(s, start, current):',
    '  if start == s length:',
    '    add current to result',
    '    return',
    '  for i from start to s length-1:',
    '    if substring s[start..i] is palindrome:',
    '      add substring to current',
    '      partitionString(s, i+1, current)',
    '      remove substring from current (backtrack)'
  ];

  const result = [];
  
  const explanation1 = `Partitioning string "${s}" into palindromic substrings`;
  steps.push({
    s: s,
    start: 0,
    current: [],
    result: [...result],
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Generate partitions
  partitionString(s, 0, [], result, steps, explanations);
  
  // Final result
  const finalExplanation = `Found ${result.length} palindromic partitions`;
  steps.push({
    s: s,
    start: s.length,
    current: [],
    result: [...result],
    currentLine: 3,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Check if string is palindrome
const isPalindrome = (s, start, end) => {
  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};

// Recursive function to partition string
const partitionString = (s, start, current, result, steps, explanations) => {
  // Base case: processed entire string
  if (start === s.length) {
    result.push([...current]);
    
    const explanation = `Found partition: [${current.join(', ')}]`;
    steps.push({
      s: s,
      start: start,
      current: [...current],
      result: [...result],
      currentLine: 3,
      action: 'found-partition'
    });
    explanations.push(explanation);
    return;
  }

  const explanation1 = `Partitioning from index ${start}`;
  steps.push({
    s: s,
    start: start,
    current: [...current],
    result: [...result],
    currentLine: 1,
    action: 'partition'
  });
  explanations.push(explanation1);

  for (let i = start; i < s.length; i++) {
    const explanation2 = `Checking substring "${s.substring(start, i + 1)}"`;
    steps.push({
      s: s,
      start: start,
      end: i,
      current: [...current],
      result: [...result],
      currentLine: 5,
      action: 'check-substring'
    });
    explanations.push(explanation2);

    if (isPalindrome(s, start, i)) {
      const substring = s.substring(start, i + 1);
      current.push(substring);
      
      const explanation3 = `"${substring}" is palindrome, adding to current partition`;
      steps.push({
        s: s,
        start: start,
        end: i,
        current: [...current],
        result: [...result],
        currentLine: 6,
        action: 'add-palindrome'
      });
      explanations.push(explanation3);

      partitionString(s, i + 1, current, result, steps, explanations);

      // Backtrack
      current.pop();
      const explanation4 = `Backtracking: removing "${substring}" from partition`;
      steps.push({
        s: s,
        start: start,
        end: i,
        current: [...current],
        result: [...result],
        currentLine: 8,
        action: 'backtrack'
      });
      explanations.push(explanation4);
    }
  }
};

module.exports = palindromePartitioning;