// algorithms/huffmanEncoding.js
const huffmanEncoding = (text) => {
  const steps = [];
  const explanations = [];
  const pseudocode = [
    'Calculate frequency of each character',
    'Create leaf node for each character',
    'While more than one node in queue:',
    '  Remove two nodes with smallest frequency',
    '  Create new node with sum of frequencies',
    '  Add new node to queue',
    'Assign codes by traversing the tree'
  ];

  // Calculate character frequencies
  const explanation1 = 'Calculating frequency of each character';
  steps.push({
    text: text,
    frequencies: {},
    nodes: [],
    tree: null,
    codes: {},
    currentLine: 1,
    action: 'calculate-frequencies'
  });
  explanations.push(explanation1);

  const freq = {};
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }

  const explanation2 = 'Creating leaf nodes for each character';
  steps.push({
    text: text,
    frequencies: {...freq},
    nodes: Object.entries(freq).map(([char, frequency]) => ({ char, frequency })),
    tree: null,
    codes: {},
    currentLine: 2,
    action: 'create-nodes'
  });
  explanations.push(explanation2);

  let nodes = Object.entries(freq).map(([char, frequency]) => ({ 
    char, frequency, left: null, right: null 
  }));

  // Build Huffman tree
  while (nodes.length > 1) {
    const explanation3 = `Nodes in queue: ${nodes.length}`;
    steps.push({
      text: text,
      frequencies: {...freq},
      nodes: [...nodes],
      tree: null,
      codes: {},
      currentLine: 3,
      action: 'queue-status'
    });
    explanations.push(explanation3);

    // Sort by frequency
    nodes.sort((a, b) => a.frequency - b.frequency);
    
    const left = nodes.shift();
    const right = nodes.shift();

    const explanation4 = `Combining nodes: '${left.char}' (${left.frequency}) and '${right.char}' (${right.frequency})`;
    steps.push({
      text: text,
      frequencies: {...freq},
      nodes: [...nodes],
      combining: [left, right],
      tree: null,
      codes: {},
      currentLine: 4,
      action: 'combine-nodes'
    });
    explanations.push(explanation4);

    const newNode = {
      char: left.char + right.char,
      frequency: left.frequency + right.frequency,
      left: left,
      right: right
    };

    nodes.push(newNode);

    const explanation5 = `Created new node: '${newNode.char}' (frequency: ${newNode.frequency})`;
    steps.push({
      text: text,
      frequencies: {...freq},
      nodes: [...nodes],
      tree: null,
      codes: {},
      currentLine: 5,
      action: 'new-node'
    });
    explanations.push(explanation5);
  }

  const tree = nodes[0];

  // Generate codes
  const explanation6 = 'Generating Huffman codes by traversing the tree';
  steps.push({
    text: text,
    frequencies: {...freq},
    nodes: [],
    tree: tree,
    codes: {},
    currentLine: 7,
    action: 'generate-codes'
  });
  explanations.push(explanation6);

  const codes = {};
  function generateCodes(node, code) {
    if (!node.left && !node.right) {
      codes[node.char] = code;
      return;
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  }
  generateCodes(tree, '');

  // Encode text
  let encoded = '';
  for (let char of text) {
    encoded += codes[char];
  }

  // Final result
  const finalExplanation = `Huffman encoding complete! Compression ratio: ${(text.length * 8 / encoded.length).toFixed(2)}:1`;
  steps.push({
    text: text,
    frequencies: {...freq},
    nodes: [],
    tree: tree,
    codes: {...codes},
    encoded: encoded,
    currentLine: 7,
    action: 'complete'
  });
  explanations.push(finalExplanation);

  return { steps, pseudocode, explanations };
};

module.exports = huffmanEncoding;