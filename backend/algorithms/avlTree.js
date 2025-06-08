// algorithms/avlTree.js
class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
    this.steps = [];
  }

  height(node) {
    return node ? node.height : 0;
  }

  balanceFactor(node) {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  updateHeight(node) {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: y.value,
      action: 'rotate-right',
      currentLine: 6,
      explanation: `Performing right rotation on node ${y.value}.`,
    });
    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: x.value,
      action: 'rotate-left',
      currentLine: 7,
      explanation: `Performing left rotation on node ${x.value}.`,
    });
    return y;
  }

  insert(value) {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'start',
      currentLine: 0,
      explanation: 'Starting AVL tree insertion.',
    });

    this.root = this.insertNode(this.root, value);
    return this.steps;
  }

  insertNode(node, value) {
    if (!node) {
      const newNode = new AVLNode(value);
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: value,
        action: 'insert',
        currentLine: 1,
        explanation: `Inserting new node with value ${value}.`,
      });
      return newNode;
    }

    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      path: [node.value],
      action: 'traverse',
      currentLine: 2,
      explanation: `Traversing to node ${node.value} to find insertion point.`,
    });

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    this.updateHeight(node);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      action: 'update-height',
      currentLine: 3,
      explanation: `Updated height of node ${node.value}.`,
    });

    const balance = this.balanceFactor(node);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      action: 'check-balance',
      currentLine: 4,
      explanation: `Checking balance factor at node ${node.value}: ${balance}.`,
    });

    // Left Left
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }
    // Right Right
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }
    // Left Right
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    // Right Left
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  cloneTree(node) {
    if (!node) return null;
    const newNode = { value: node.value, height: node.height };
    newNode.left = this.cloneTree(node.left);
    newNode.right = this.cloneTree(node.right);
    return newNode;
  }
}

const avlOperations = (operation, value, treeState) => {
  const avl = new AVLTree();
  if (treeState) {
    avl.root = treeState;
  }

  const pseudocode = {
    avlInsert: [
      'if tree is empty: insert new node',
      'traverse to find position',
      'insert node',
      'update heights',
      'check balance factor',
      'if unbalanced: perform rotations',
      'right rotate if left heavy',
      'left rotate if right heavy',
    ],
  };
  const explanations = [
    'Start AVL tree insertion.',
    'Traverse to find the correct position.',
    'Insert the new node.',
    'Update node heights after insertion.',
    'Check the balance factor to ensure AVL property.',
    'Perform rotations if the tree is unbalanced.',
    'Right rotate to balance left-heavy subtree.',
    'Left rotate to balance right-heavy subtree.',
  ];

  let steps;
  if (operation === 'avlInsert') {
    steps = avl.insert(value);
  } else {
    return { steps: [], pseudocode: [], explanations: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], explanations, tree: avl.root };
};

module.exports = avlOperations;