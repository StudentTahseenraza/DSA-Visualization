class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.frequency = 1; // For multiset property
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.steps = [];
  }

  insert(value) {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'start',
    });

    if (!this.root) {
      this.root = new Node(value);
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: this.root.value,
        action: 'insert-root',
      });
      return this.steps;
    }

    let current = this.root;
    let parent = null;
    let path = [];

    while (current) {
      path.push(current.value);
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: current.value,
        path: [...path],
        action: 'traverse',
      });

      if (value === current.value) {
        current.frequency++;
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: current.value,
          action: 'increment-frequency',
        });
        return this.steps;
      }

      parent = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    const newNode = new Node(value);
    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: newNode.value,
      path: [...path],
      action: 'insert',
    });

    return this.steps;
  }

  search(value) {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'start',
    });

    let current = this.root;
    let path = [];

    while (current) {
      path.push(current.value);
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: current.value,
        path: [...path],
        action: 'traverse',
      });

      if (value === current.value) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: current.value,
          path: [...path],
          action: 'found',
        });
        return this.steps;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      path: [...path],
      action: 'not-found',
    });

    return this.steps;
  }

  cloneTree(node) {
    if (!node) return null;
    const newNode = { value: node.value, frequency: node.frequency };
    newNode.left = this.cloneTree(node.left);
    newNode.right = this.cloneTree(node.right);
    return newNode;
  }
}

const bstOperations = (operation, value, treeState) => {
  const bst = new BinarySearchTree();
  if (treeState) {
    bst.root = treeState; // Restore tree state if provided
  }

  const pseudocode = {
    insert: [
      'if tree is empty:',
      '  root = new Node(value)',
      'else:',
      '  traverse to find position',
      '  if value exists:',
      '    increment frequency',
      '  else:',
      '    insert as new node',
    ],
    search: [
      'start at root',
      'while current node exists:',
      '  if value equals current:',
      '    return found',
      '  if value < current:',
      '    go left',
      '  else:',
      '    go right',
      'return not found',
    ],
  };

  let steps;
  if (operation === 'insert') {
    steps = bst.insert(value);
  } else if (operation === 'search') {
    steps = bst.search(value);
  } else {
    return { steps: [], pseudocode: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], tree: bst.root };
};

module.exports = bstOperations;