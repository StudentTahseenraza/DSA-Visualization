// binarySearchTree.js - Updated version
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.frequency = 1;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.steps = [];
  }

  // Bulk insert multiple values
  bulkInsert(values) {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'start-bulk-insert',
      explanation: `Starting bulk insertion of ${values.length} values.`
    });

    values.forEach((value, index) => {
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: null,
        action: 'bulk-insert-next',
        explanation: `Inserting value ${value} (${index + 1}/${values.length}).`
      });
      
      this.insertValue(value);
    });

    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'bulk-insert-complete',
      explanation: `Bulk insertion completed. Total ${values.length} values inserted.`
    });

    return this.steps;
  }

  insertValue(value) {
    if (!this.root) {
      this.root = new Node(value);
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: value,
        action: 'insert-root',
        explanation: `Inserted ${value} as root node.`
      });
      return;
    }

    let current = this.root;
    let path = [current.value];

    while (current) {
      if (value === current.value) {
        current.frequency++;
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: current.value,
          path: [...path],
          action: 'increment-frequency',
          explanation: `Value ${value} already exists. Frequency increased to ${current.frequency}.`
        });
        return;
      }

      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: current.value,
        path: [...path],
        action: 'traverse',
        explanation: `At node ${current.value}. Moving to ${value < current.value ? 'left' : 'right'} child.`
      });

      if (value < current.value) {
        if (!current.left) {
          current.left = new Node(value);
          this.steps.push({
            tree: this.cloneTree(this.root),
            currentNode: value,
            path: [...path],
            action: 'insert',
            explanation: `Inserted ${value} as left child of ${current.value}.`
          });
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new Node(value);
          this.steps.push({
            tree: this.cloneTree(this.root),
            currentNode: value,
            path: [...path],
            action: 'insert',
            explanation: `Inserted ${value} as right child of ${current.value}.`
          });
          return;
        }
        current = current.right;
      }
      path.push(current.value);
    }
  }

  search(value) {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'start-search',
      explanation: `Starting search for value ${value}.`
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
        explanation: `Visiting node ${current.value}.`
      });

      if (value === current.value) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: current.value,
          path: [...path],
          action: 'found',
          explanation: `Found value ${value} at node ${current.value}.`
        });
        return this.steps;
      }

      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: current.value,
        path: [...path],
        action: 'compare',
        explanation: `Value ${value} is ${value < current.value ? 'less' : 'greater'} than ${current.value}. Moving to ${value < current.value ? 'left' : 'right'} child.`
      });

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
      explanation: `Value ${value} not found in the tree.`
    });

    return this.steps;
  }

  delete(value) {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'start-delete',
      explanation: `Starting deletion of value ${value}.`
    });

    this.root = this.deleteNode(this.root, value, []);
    return this.steps;
  }

  deleteNode(node, value, path) {
    if (!node) {
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: null,
        path: [...path],
        action: 'not-found',
        explanation: `Value ${value} not found for deletion.`
      });
      return null;
    }

    path.push(node.value);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      path: [...path],
      action: 'traverse',
      explanation: `Visiting node ${node.value} for deletion.`
    });

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value, path);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value, path);
    } else {
      // Node found
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: node.value,
        path: [...path],
        action: 'delete-found',
        explanation: `Found node ${value} to delete.`
      });

      // Case 1: No child or one child
      if (!node.left) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          path: [...path],
          action: 'delete-no-left',
          explanation: `Node ${value} has no left child. Replacing with right child.`
        });
        return node.right;
      } else if (!node.right) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          path: [...path],
          action: 'delete-no-right',
          explanation: `Node ${value} has no right child. Replacing with left child.`
        });
        return node.left;
      }

      // Case 2: Two children
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: node.value,
        path: [...path],
        action: 'delete-two-children',
        explanation: `Node ${value} has two children. Finding inorder successor.`
      });

      // Find inorder successor (min value in right subtree)
      let temp = node.right;
      let successorPath = [...path, temp.value];
      while (temp.left) {
        temp = temp.left;
        successorPath.push(temp.value);
      }

      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: temp.value,
        path: successorPath,
        action: 'found-successor',
        explanation: `Found inorder successor: ${temp.value}`
      });

      // Copy successor value and delete successor
      node.value = temp.value;
      node.right = this.deleteNode(node.right, temp.value, path);

      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: node.value,
        path: [...path],
        action: 'replace-value',
        explanation: `Replaced node value with successor ${temp.value}.`
      });
    }
    return node;
  }

  traverse(order = 'inorder') {
    this.steps = [];
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: `start-${order}-traversal`,
      explanation: `Starting ${order} traversal.`
    });

    const path = [];
    this[`${order}Traversal`](this.root, path);
    
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      path: [...path],
      action: 'traversal-complete',
      explanation: `${order} traversal completed: ${path.join(' → ')}`
    });

    return this.steps;
  }

  inorderTraversal(node, path) {
    if (!node) return;
    
    this.inorderTraversal(node.left, path);
    
    path.push(node.value);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      path: [...path],
      action: 'visit',
      explanation: `Visited node ${node.value}. Current path: ${path.join(' → ')}`
    });
    
    this.inorderTraversal(node.right, path);
  }

  preorderTraversal(node, path) {
    if (!node) return;
    
    path.push(node.value);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      path: [...path],
      action: 'visit',
      explanation: `Visited node ${node.value}. Current path: ${path.join(' → ')}`
    });
    
    this.preorderTraversal(node.left, path);
    this.preorderTraversal(node.right, path);
  }

  postorderTraversal(node, path) {
    if (!node) return;
    
    this.postorderTraversal(node.left, path);
    this.postorderTraversal(node.right, path);
    
    path.push(node.value);
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      path: [...path],
      action: 'visit',
      explanation: `Visited node ${node.value}. Current path: ${path.join(' → ')}`
    });
  }

  cloneTree(node) {
    if (!node) return null;
    const newNode = { 
      value: node.value, 
      frequency: node.frequency,
      left: this.cloneTree(node.left),
      right: this.cloneTree(node.right)
    };
    return newNode;
  }
}

const bstOperations = (operation, value, treeState, options = {}) => {
  const bst = new BinarySearchTree();
  if (treeState) {
    bst.root = treeState;
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
    delete: [
      'find node to delete',
      'if no children: remove node',
      'if one child: replace with child',
      'if two children:',
      '  find inorder successor',
      '  replace value with successor',
      '  delete successor',
    ],
    traverse: [
      'inorder: left, root, right',
      'preorder: root, left, right',
      'postorder: left, right, root',
    ],
    bulkInsert: [
      'for each value in array:',
      '  perform insert operation',
      '  update visualization',
    ]
  };

  let steps;
  let currentPseudocode = pseudocode[operation] || pseudocode.insert;
  
  try {
    if (operation === "insert") {
      if (Array.isArray(value)) {
        steps = bst.bulkInsert(value);
        currentPseudocode = pseudocode.bulkInsert;
      } else {
        bst.insertValue(value);
        steps = bst.steps;
      }
    } else if (operation === "search") {
      steps = bst.search(value);
    } else if (operation === "delete") {
      steps = bst.delete(value);
    } else if (operation === "traverse") {
      steps = bst.traverse(options.order || 'inorder');
      currentPseudocode = pseudocode.traverse;
    } else {
      return { 
        steps: [], 
        pseudocode: [], 
        error: `Invalid operation: ${operation}` 
      };
    }

    return { 
      steps, 
      pseudocode: currentPseudocode, 
      tree: bst.root 
    };
  } catch (error) {
    console.error(`Error in BST operation ${operation}:`, error);
    return { 
      steps: [], 
      pseudocode: currentPseudocode, 
      error: error.message,
      tree: bst.root 
    };
  }
};

module.exports = bstOperations;