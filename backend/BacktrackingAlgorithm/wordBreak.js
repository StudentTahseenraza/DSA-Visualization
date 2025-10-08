// algorithms/wordBreak.js
const wordBreak = (s, wordDict) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'function wordBreakUtil(s, start, current):',
    '  if start == s length:',
    '    add current to result',
    '    return',
    '  for i from start to s length-1:',
    '    if substring s[start..i] is in dictionary:',
    '      add substring to current',
    '      wordBreakUtil(s, i+1, current)',
    '      remove substring from current (backtrack)'
  ];

  const result = [];
  const wordSet = new Set(wordDict);
  
  const explanation1 = `Breaking string "${s}" using dictionary: [${wordDict.join(', ')}]`;
  steps.push({
    s: s,
    wordDict: wordDict,
    start: 0,
    current: [],
    result: [...result],
    currentLine: 0,
    action: 'initialize'
  });
  explanations.push(explanation1);

  // Break the string
  wordBreakUtil(s, 0, [], wordSet, result, steps, explanations);
  
  // Final result
  const finalExplanation = result.length > 0 ? 
    `Found ${result.length} ways to break the string` : 
    `Cannot break the string using the given dictionary`;
  steps.push({
    s: s,
    wordDict: wordDict,
    start: s.length,
    current: [],
    result: [...result],
    currentLine: 3,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations, result };
};

// Recursive function to break the string
const wordBreakUtil = (s, start, current, wordSet, result, steps, explanations) => {
  // Base case: processed entire string
  if (start === s.length) {
    result.push([...current]);
    
    const explanation = `Found word break: [${current.join(', ')}]`;
    steps.push({
      s: s,
      start: start,
      current: [...current],
      result: [...result],
      currentLine: 3,
      action: 'found-break'
    });
    explanations.push(explanation);
    return;
  }

  const explanation1 = `Breaking string from index ${start}`;
  steps.push({
    s: s,
    start: start,
    current: [...current],
    result: [...result],
    currentLine: 1,
    action: 'break-string'
  });
  explanations.push(explanation1);

  for (let i = start; i < s.length; i++) {
    const substring = s.substring(start, i + 1);
    const explanation2 = `Checking substring "${substring}"`;
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

    if (wordSet.has(substring)) {
      current.push(substring);
      
      const explanation3 = `"${substring}" found in dictionary, adding to current break`;
      steps.push({
        s: s,
        start: start,
        end: i,
        current: [...current],
        result: [...result],
        currentLine: 6,
        action: 'add-word'
      });
      explanations.push(explanation3);

      wordBreakUtil(s, i + 1, current, wordSet, result, steps, explanations);

      // Backtrack
      current.pop();
      const explanation4 = `Backtracking: removing "${substring}" from break`;
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

module.exports = wordBreak;