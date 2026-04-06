// algorithms/huffmanEncoding.js - Updated with tree data

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
  const freq = {};
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  steps.push({
    text: text,
    frequencies: { ...freq },
    nodes: [],
    tree: null,
    codes: {},
    action: 'calculate-frequencies',
    message: 'Calculating character frequencies...'
  });
  explanations.push('Calculating frequency of each character');

  // Create leaf nodes
  let nodes = Object.entries(freq).map(([char, frequency]) => ({ 
    char, frequency, left: null, right: null 
  }));
  
  steps.push({
    text: text,
    frequencies: { ...freq },
    nodes: [...nodes],
    tree: null,
    codes: {},
    action: 'create-nodes',
    message: `Created ${nodes.length} leaf nodes for each character`
  });
  explanations.push('Creating leaf nodes for each character');

  // Build Huffman tree
  let stepCounter = 1;
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);
    
    const left = nodes.shift();
    const right = nodes.shift();
    
    steps.push({
      text: text,
      frequencies: { ...freq },
      nodes: [...nodes],
      combining: { left, right },
      tree: null,
      codes: {},
      action: 'combine-nodes',
      message: `Combining '${left.char || '●'}' (${left.frequency}) and '${right.char || '●'}' (${right.frequency})`
    });
    explanations.push(`Combining nodes: '${left.char}' (${left.frequency}) and '${right.char}' (${right.frequency})`);

    const newNode = {
      char: (left.char || '') + (right.char || ''),
      frequency: left.frequency + right.frequency,
      left: left,
      right: right
    };
    
    nodes.push(newNode);
    
    steps.push({
      text: text,
      frequencies: { ...freq },
      nodes: [...nodes],
      tree: null,
      codes: {},
      action: 'new-node',
      message: `Created new node with frequency ${newNode.frequency}`
    });
    explanations.push(`Created new node: '${newNode.char}' (frequency: ${newNode.frequency})`);
    
    stepCounter++;
  }

  const tree = nodes[0];

  // Generate codes
  const codes = {};
  function generateCodes(node, code) {
    if (!node) return;
    if (!node.left && !node.right) {
      codes[node.char] = code;
      steps.push({
        text: text,
        frequencies: { ...freq },
        nodes: [],
        tree: { ...tree },
        codes: { ...codes },
        currentNode: node.char,
        action: 'assign-code',
        message: `Assigned code '${code}' to character '${node.char}'`
      });
      return;
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  }
  
  steps.push({
    text: text,
    frequencies: { ...freq },
    nodes: [],
    tree: { ...tree },
    codes: {},
    action: 'generate-codes-start',
    message: 'Generating Huffman codes by traversing the tree...'
  });
  
  generateCodes(tree, '');

  // Encode text
  let encoded = '';
  for (let char of text) {
    encoded += codes[char];
  }

  // Final result
  const compressionRatio = (text.length * 8) / encoded.length;
  steps.push({
    text: text,
    frequencies: { ...freq },
    nodes: [],
    tree: { ...tree },
    codes: { ...codes },
    encoded: encoded,
    action: 'complete',
    message: `✅ Huffman encoding complete! Compression ratio: ${compressionRatio.toFixed(2)}:1`,
    result: {
      compressionRatio,
      originalBits: text.length * 8,
      compressedBits: encoded.length,
      spaceSaved: ((1 - encoded.length / (text.length * 8)) * 100).toFixed(1)
    }
  });
  explanations.push(`Huffman encoding complete! Compression ratio: ${compressionRatio.toFixed(2)}:1`);

  return { steps, pseudocode, explanations };
};

module.exports = huffmanEncoding;