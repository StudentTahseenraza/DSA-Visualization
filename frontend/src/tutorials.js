// tutorials.js
const tutorials = {
  bubbleSort: [
    {
      index: 0,
      type: 'explanation',
      content: 'Bubble Sort compares adjacent elements and swaps them if they are in the wrong order.',
    },
    {
      index: 1,
      type: 'quiz',
      content: {
        question: 'What is the time complexity of Bubble Sort?',
        options: [
          { text: 'O(n)', correct: false },
          { text: 'O(n^2)', correct: true },
          { text: 'O(n log n)', correct: false },
        ],
      },
    },
  ],
  trie: [
    {
      index: 0,
      type: 'explanation',
      content: 'A Trie stores strings by sharing common prefixes, with each node representing a character.',
    },
    {
      index: 1,
      type: 'quiz',
      content: {
        question: 'What operation is NOT supported by a Trie?',
        options: [
          { text: 'Insert', correct: false },
          { text: 'Search', correct: false },
          { text: 'Sorting', correct: true },
        ],
      },
    },
  ],
  // Add more tutorials for other algorithms
};

export default tutorials;