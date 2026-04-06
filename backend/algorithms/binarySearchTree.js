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
      explanation: `Starting deletion of value ${value}.`,
      path: []
    });

    const result = this.deleteNode(this.root, value, [], null);
    this.root = result.newRoot;

    // Add final completion step
    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: null,
      action: 'delete-complete',
      explanation: `Successfully deleted value ${value} from the tree.`,
      path: result.path || []
    });

    return this.steps;
  }

  deleteNode(node, value, path, parent = null, isLeft = null) {
    if (!node) {
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: null,
        action: 'not-found',
        explanation: `Value ${value} not found in the tree.`,
        path: [...path]
      });
      return { newRoot: null, path: [...path] };
    }

    // Record current node visit
    path.push(node.value);

    this.steps.push({
      tree: this.cloneTree(this.root),
      currentNode: node.value,
      action: 'traverse',
      explanation: `Visiting node ${node.value} to find value ${value}.`,
      path: [...path]
    });

    if (value < node.value) {
      const result = this.deleteNode(node.left, value, path, node, true);
      node.left = result.newRoot;
      return { newRoot: node, path: result.path };
    }
    else if (value > node.value) {
      const result = this.deleteNode(node.right, value, path, node, false);
      node.right = result.newRoot;
      return { newRoot: node, path: result.path };
    }
    else {
      // Node found - show found step
      this.steps.push({
        tree: this.cloneTree(this.root),
        currentNode: node.value,
        action: 'delete-found',
        explanation: `Found node ${value} to delete. Analyzing children...`,
        path: [...path]
      });

      // Case 1: Leaf node (no children)
      if (!node.left && !node.right) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          action: 'delete-leaf',
          explanation: `Node ${value} has no children. Removing it directly.`,
          path: [...path]
        });

        // Show removal animation
        this.steps.push({
          tree: this.cloneTree(this.removeNodeFromTree(node.value)),
          currentNode: null,
          action: 'delete-removing',
          explanation: `Removing node ${value} from the tree.`,
          path: [...path],
          removedNode: node.value
        });

        return { newRoot: null, path: [...path] };
      }

      // Case 2: Node with only right child
      else if (!node.left) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          action: 'delete-one-child',
          explanation: `Node ${value} has only a right child. Replacing with its right child ${node.right.value}.`,
          path: [...path]
        });

        // Show the replacement
        this.steps.push({
          tree: this.cloneTree(this.replaceNode(node.value, node.right)),
          currentNode: node.right.value,
          action: 'delete-replacing',
          explanation: `Replacing node ${value} with its right child ${node.right.value}.`,
          path: [...path]
        });

        return { newRoot: node.right, path: [...path] };
      }

      // Case 3: Node with only left child
      else if (!node.right) {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          action: 'delete-one-child',
          explanation: `Node ${value} has only a left child. Replacing with its left child ${node.left.value}.`,
          path: [...path]
        });

        // Show the replacement
        this.steps.push({
          tree: this.cloneTree(this.replaceNode(node.value, node.left)),
          currentNode: node.left.value,
          action: 'delete-replacing',
          explanation: `Replacing node ${value} with its left child ${node.left.value}.`,
          path: [...path]
        });

        return { newRoot: node.left, path: [...path] };
      }

      // Case 4: Node with two children
      else {
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          action: 'delete-two-children',
          explanation: `Node ${value} has two children. Finding inorder successor...`,
          path: [...path]
        });

        // Find inorder successor (minimum value in right subtree)
        let successor = node.right;
        let successorParent = node;
        let successorPath = [...path];

        while (successor.left) {
          successorParent = successor;
          successor = successor.left;
          successorPath.push(successor.value);
        }

        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: successor.value,
          action: 'found-successor',
          explanation: `Found inorder successor: ${successor.value}.`,
          path: [...successorPath]
        });

        // Show the value replacement
        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          action: 'replace-value',
          explanation: `Replacing node ${node.value} with successor value ${successor.value}.`,
          path: [...path]
        });

        // Store the old value for animation
        const oldValue = node.value;
        node.value = successor.value;

        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: node.value,
          action: 'value-replaced',
          explanation: `Node value changed from ${oldValue} to ${node.value}. Now deleting the successor.`,
          path: [...path]
        });

        // Delete the successor
        if (successorParent === node) {
          node.right = successor.right;
        } else {
          successorParent.left = successor.right;
        }

        this.steps.push({
          tree: this.cloneTree(this.root),
          currentNode: null,
          action: 'successor-deleted',
          explanation: `Successor ${successor.value} has been removed. Deletion complete.`,
          path: [...path]
        });

        return { newRoot: node, path: [...path] };
      }
    }
  }

  // Helper method to remove a node from the tree for animation
  removeNodeFromTree(value) {
    const treeCopy = this.cloneTree(this.root);
    return this.removeNodeRecursive(treeCopy, value);
  }

  removeNodeRecursive(node, value) {
    if (!node) return null;
    if (value < node.value) {
      node.left = this.removeNodeRecursive(node.left, value);
    } else if (value > node.value) {
      node.right = this.removeNodeRecursive(node.right, value);
    } else {
      return null; // Remove the node
    }
    return node;
  }

  // Helper method to replace a node for animation
  replaceNode(oldValue, newNode) {
    const treeCopy = this.cloneTree(this.root);
    return this.replaceNodeRecursive(treeCopy, oldValue, newNode);
  }

  replaceNodeRecursive(node, oldValue, newNode) {
    if (!node) return null;
    if (oldValue < node.value) {
      node.left = this.replaceNodeRecursive(node.left, oldValue, newNode);
    } else if (oldValue > node.value) {
      node.right = this.replaceNodeRecursive(node.right, oldValue, newNode);
    } else {
      return newNode;
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