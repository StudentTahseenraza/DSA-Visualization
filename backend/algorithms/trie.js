// algorithms/trie.js
class TrieNode {
  constructor(char = '') {
    this.char = char;
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.steps = [];
  }

  insert(word) {
    this.steps = [];
    this.steps.push({
      trie: this.cloneTrie(this.root),
      currentNode: null,
      path: [],
      action: 'start',
      currentLine: 0,
      explanation: 'Starting trie insertion.',
    });

    let node = this.root;
    for (const char of word) {
      this.steps.push({
        trie: this.cloneTrie(this.root),
        currentNode: { char, isEnd: false },
        path: this.getPath(node, char),
        action: 'traverse',
        currentLine: 1,
        explanation: `Traversing for character ${char}.`,
      });

      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
        this.steps.push({
          trie: this.cloneTrie(this.root),
          currentNode: { char, isEnd: false },
          path: this.getPath(node, char),
          action: 'insert',
          currentLine: 2,
          explanation: `Inserted node for character ${char}.`,
        });
      }
      node = node.children[char];
    }

    node.isEnd = true;
    this.steps.push({
      trie: this.cloneTrie(this.root),
      currentNode: { char: node.char, isEnd: true },
      path: this.getPath(node, ''),
      action: 'mark-end',
      currentLine: 3,
      explanation: `Marked end of word ${word}.`,
    });

    return this.steps;
  }

  search(word) {
    this.steps = [];
    this.steps.push({
      trie: this.cloneTrie(this.root),
      currentNode: null,
      path: [],
      action: 'start',
      currentLine: 0,
      explanation: 'Starting trie search.',
    });

    let node = this.root;
    for (const char of word) {
      this.steps.push({
        trie: this.cloneTrie(this.root),
        currentNode: { char, isEnd: false },
        path: this.getPath(node, char),
        action: 'traverse',
        currentLine: 1,
        explanation: `Searching for character ${char}.`,
      });

      if (!node.children[char]) {
        this.steps.push({
          trie: this.cloneTrie(this.root),
          currentNode: null,
          path: this.getPath(node, char),
          action: 'not-found',
          currentLine: 2,
          explanation: `Character ${char} not found. Word does not exist.`,
        });
        return this.steps;
      }
      node = node.children[char];
    }

    this.steps.push({
      trie: this.cloneTrie(this.root),
      currentNode: { char: node.char, isEnd: node.isEnd },
      path: this.getPath(node, ''),
      action: node.isEnd ? 'found' : 'not-found',
      currentLine: 3,
      explanation: node.isEnd ? `Word ${word} found.` : `Word ${word} not found.`,
    });

    return this.steps;
  }

  prefixSearch(prefix) {
    this.steps = [];
    this.steps.push({
      trie: this.cloneTrie(this.root),
      currentNode: null,
      path: [],
      action: 'start',
      currentLine: 0,
      explanation: 'Starting prefix search.',
    });

    let node = this.root;
    for (const char of prefix) {
      this.steps.push({
        trie: this.cloneTrie(this.root),
        currentNode: { char, isEnd: false },
        path: this.getPath(node, char),
        action: 'traverse',
        currentLine: 1,
        explanation: `Searching for prefix character ${char}.`,
      });

      if (!node.children[char]) {
        this.steps.push({
          trie: this.cloneTrie(this.root),
          currentNode: null,
          path: this.getPath(node, char),
          action: 'not-found',
          currentLine: 2,
          explanation: `Prefix ${prefix} not found.`,
        });
        return this.steps;
      }
      node = node.children[char];
    }

    this.steps.push({
      trie: this.cloneTrie(this.root),
      currentNode: { char: node.char, isEnd: node.isEnd },
      path: this.getPath(node, ''),
      action: 'found',
      currentLine: 3,
      explanation: `Prefix ${prefix} found.`,
    });

    return this.steps;
  }

  getPath(node, char) {
    const path = [];
    let current = this.root;
    while (current !== node) {
      for (const [c, child] of Object.entries(current.children)) {
        if (child === node) {
          path.push({ char: c, isEnd: child.isEnd });
          return path;
        }
      }
      for (const child of Object.values(current.children)) {
        path.push({ char: child.char, isEnd: child.isEnd });
        current = child;
      }
    }
    return path;
  }

  cloneTrie(node) {
    if (!node) return null;
    const newNode = { char: node.char, isEnd: node.isEnd, children: {} };
    for (const [char, child] of Object.entries(node.children)) {
      newNode.children[char] = this.cloneTrie(child);
    }
    return newNode;
  }
}

const trieOperations = (operation, word, trieState) => {
  const trie = new Trie();
  if (trieState) trie.root = trieState;

  const pseudocode = {
    insert: [
      'for each character in word:',
      '  if node exists: traverse',
      '  else: create new node',
      'mark end of word',
    ],
    search: [
      'for each character in word:',
      '  if node exists: traverse',
      '  else: return false',
      'return isEnd',
    ],
    prefixSearch: [
      'for each character in prefix:',
      '  if node exists: traverse',
      '  else: return false',
      'return true',
    ],
  };
  const explanations = {
    insert: [
      'Start inserting a word.',
      'Traverse or create node for each character.',
      'Create new node if character does not exist.',
      'Mark the end of the word.',
    ],
    search: [
      'Start searching for a word.',
      'Traverse for each character.',
      'Return false if character not found.',
      'Check if node marks end of word.',
    ],
    prefixSearch: [
      'Start searching for a prefix.',
      'Traverse for each character.',
      'Return false if character not found.',
      'Return true if prefix exists.',
    ],
  };

  let steps;
  if (operation === 'insert') {
    steps = trie.insert(word);
  } else if (operation === 'search') {
    steps = trie.search(word);
  } else if (operation === 'prefixSearch') {
    steps = trie.prefixSearch(word);
  } else {
    return { steps: [], pseudocode: [], explanations: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], explanations: explanations[operation], trie: trie.root };
};

module.exports = trieOperations;