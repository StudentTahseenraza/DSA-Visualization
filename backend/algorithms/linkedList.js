// algorithms/algorithms/linkedList.js

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Helper function to convert array to linked list
const arrayToLinkedList = (arr) => {
  if (!arr || arr.length === 0) return null;
  
  const head = new Node(arr[0]);
  let current = head;
  
  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }
  
  return head;
};

// Helper function to convert linked list to array
const linkedListToArray = (head) => {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  return result;
};

// Helper function to count nodes
const countNodes = (head) => {
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }
  return count;
};

// Main linked list operations
const linkedListOperations = (operation, value, listState, options = {}) => {
  let head = listState ? { ...listState } : null;
  const steps = [];
  const explanations = [];
  const pseudocode = getPseudocode(operation);
  
  // Convert listState to proper Node structure if it's a plain object
  if (head && !head.next && head.value !== undefined) {
    // Already in correct format
  } else if (Array.isArray(listState)) {
    head = arrayToLinkedList(listState);
  }

  switch (operation) {
    case 'insert':
      return insertOperation(head, value, steps, explanations, pseudocode);
    
    case 'delete':
      return deleteOperation(head, value, steps, explanations, pseudocode);
    
    case 'search':
      return searchOperation(head, value, steps, explanations, pseudocode);
    
    case 'traverse':
      return traverseOperation(head, steps, explanations, pseudocode);
    
    case 'bulk-insert':
      return bulkInsertOperation(head, value, steps, explanations, pseudocode);
    
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};

// Insert operation with step-by-step visualization
const insertOperation = (head, value, steps, explanations, pseudocode) => {
  const newNode = { value, next: null };
  const nodes = head ? linkedListToArray(head).map(v => ({ value: v })) : [];
  
  // Step 1: Create new node
  steps.push({
    nodes: [...nodes],
    currentNode: null,
    action: 'insert-prepare',
    message: `Step 1: Create new node with value ${value}`
  });
  explanations.push(`Creating a new node with value ${value}`);
  
  if (!head) {
    // Insert into empty list
    steps.push({
      nodes: [{ value }],
      currentNode: value,
      action: 'insert',
      message: `Step 2: List is empty, making new node as head`
    });
    explanations.push(`List is empty. Setting new node as the head of the list.`);
    
    return {
      steps,
      explanations,
      pseudocode,
      list: { value, next: null }
    };
  }
  
  // Insert at the end
  let current = head;
  let currentArray = linkedListToArray(head).map(v => ({ value: v }));
  let position = 0;
  
  while (current.next) {
    // Show traversal steps
    steps.push({
      nodes: currentArray.map((node, idx) => ({
        ...node,
        isCurrent: idx === position
      })),
      currentNode: current.value,
      action: 'traverse',
      message: `Step ${steps.length + 1}: Traversing to find insertion point`
    });
    explanations.push(`Moving to next node. Current node: ${current.value}`);
    
    current = current.next;
    position++;
    currentArray = linkedListToArray(head).map(v => ({ value: v }));
  }
  
  // Insert at the end
  current.next = newNode;
  const finalArray = linkedListToArray(head).map(v => ({ value: v }));
  
  steps.push({
    nodes: finalArray.map((node, idx) => ({
      ...node,
      isCurrent: idx === finalArray.length - 1
    })),
    currentNode: value,
    action: 'insert',
    message: `Step ${steps.length + 1}: Inserted ${value} at the end`
  });
  explanations.push(`Inserted node with value ${value} at the end of the list.`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: head
  };
};

// Delete operation with step-by-step visualization
const deleteOperation = (head, value, steps, explanations, pseudocode) => {
  if (!head) {
    steps.push({
      nodes: [],
      currentNode: null,
      action: 'delete-empty',
      message: 'List is empty, nothing to delete'
    });
    explanations.push('The list is empty. Cannot delete from an empty list.');
    
    return {
      steps,
      explanations,
      pseudocode,
      list: null
    };
  }
  
  const nodes = linkedListToArray(head).map(v => ({ value: v }));
  
  // Check if head node is to be deleted
  if (head.value === value) {
    steps.push({
      nodes: nodes.map((node, idx) => ({
        ...node,
        isCurrent: idx === 0
      })),
      currentNode: head.value,
      action: 'delete-head',
      message: `Step 1: Found value ${value} at head`
    });
    explanations.push(`Found the value ${value} at the head of the list.`);
    
    const newHead = head.next;
    const newNodes = newHead ? linkedListToArray(newHead).map(v => ({ value: v })) : [];
    
    steps.push({
      nodes: newNodes,
      currentNode: null,
      action: 'delete',
      message: `Step 2: Deleted head node with value ${value}`
    });
    explanations.push(`Deleted the head node. New head is ${newHead ? newHead.value : 'null'}.`);
    
    return {
      steps,
      explanations,
      pseudocode,
      list: newHead
    };
  }
  
  // Search for the node to delete
  let current = head;
  let prev = null;
  let position = 0;
  let found = false;
  
  while (current) {
    // Show traversal steps
    steps.push({
      nodes: nodes.map((node, idx) => ({
        ...node,
        isCurrent: idx === position
      })),
      currentNode: current.value,
      action: 'search',
      message: `Step ${steps.length + 1}: Searching for value ${value}`
    });
    explanations.push(`Checking node with value ${current.value}...`);
    
    if (current.value === value) {
      found = true;
      steps.push({
        nodes: nodes.map((node, idx) => ({
          ...node,
          isCurrent: idx === position,
          isTarget: true
        })),
        currentNode: current.value,
        action: 'delete-found',
        message: `Step ${steps.length + 1}: Found value ${value} at position ${position}`
      });
      explanations.push(`Found the value ${value} at position ${position}.`);
      break;
    }
    
    prev = current;
    current = current.next;
    position++;
  }
  
  if (!found) {
    steps.push({
      nodes: nodes,
      currentNode: null,
      action: 'delete-not-found',
      message: `Value ${value} not found in the list`
    });
    explanations.push(`Value ${value} was not found in the list. Nothing to delete.`);
    
    return {
      steps,
      explanations,
      pseudocode,
      list: head
    };
  }
  
  // Delete the node
  if (prev) {
    prev.next = current.next;
  }
  
  const finalNodes = linkedListToArray(head).map(v => ({ value: v }));
  
  steps.push({
    nodes: finalNodes.map((node, idx) => ({
      ...node,
      isCurrent: null
    })),
    currentNode: null,
    action: 'delete',
    message: `Step ${steps.length + 1}: Deleted node with value ${value}`
  });
  explanations.push(`Successfully deleted node with value ${value}. List has been updated.`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: head
  };
};

// Search operation with step-by-step visualization
const searchOperation = (head, value, steps, explanations, pseudocode) => {
  if (!head) {
    steps.push({
      nodes: [],
      currentNode: null,
      action: 'search-empty',
      message: 'List is empty'
    });
    explanations.push('The list is empty. Cannot search in an empty list.');
    
    return {
      steps,
      explanations,
      pseudocode,
      list: null
    };
  }
  
  const nodes = linkedListToArray(head).map(v => ({ value: v }));
  let current = head;
  let position = 0;
  let found = false;
  let foundPosition = -1;
  
  while (current) {
    steps.push({
      nodes: nodes.map((node, idx) => ({
        ...node,
        isCurrent: idx === position
      })),
      currentNode: current.value,
      action: 'search',
      message: `Step ${steps.length + 1}: Checking node ${position} with value ${current.value}`
    });
    explanations.push(`Searching at position ${position}: checking if ${current.value} equals ${value}...`);
    
    if (current.value === value) {
      found = true;
      foundPosition = position;
      steps.push({
        nodes: nodes.map((node, idx) => ({
          ...node,
          isCurrent: idx === position,
          isFound: true
        })),
        currentNode: current.value,
        action: 'search-found',
        message: `Step ${steps.length + 1}: Found ${value} at position ${position}`
      });
      explanations.push(`✅ Value ${value} found at position ${position}!`);
      break;
    }
    
    current = current.next;
    position++;
  }
  
  if (!found) {
    steps.push({
      nodes: nodes,
      currentNode: null,
      action: 'search-not-found',
      message: `Value ${value} not found in the list`
    });
    explanations.push(`❌ Value ${value} was not found in the list.`);
  }
  
  return {
    steps,
    explanations,
    pseudocode,
    list: head
  };
};

// Traverse operation with step-by-step visualization
const traverseOperation = (head, steps, explanations, pseudocode) => {
  if (!head) {
    steps.push({
      nodes: [],
      currentNode: null,
      action: 'traverse-empty',
      message: 'List is empty, nothing to traverse'
    });
    explanations.push('The list is empty. Nothing to traverse.');
    
    return {
      steps,
      explanations,
      pseudocode,
      list: null
    };
  }
  
  // Convert linked list to array of node objects for visualization
  const convertToList = (head) => {
    const result = [];
    let current = head;
    while (current) {
      result.push({ 
        value: current.value,
        visited: false 
      });
      current = current.next;
    }
    return result;
  };

  const nodes = convertToList(head);
  let current = head;
  let position = 0;
  const traversalPath = [];
  
  // Clear any existing steps
  steps = [];
  
  // Step 1: Start traversal
  steps.push({
    nodes: nodes.map((node, idx) => ({
      ...node,
      isCurrent: idx === 0,
      visited: false
    })),
    currentNode: current.value,
    path: [...traversalPath],
    action: 'traverse-start',
    message: `Step 1: Starting traversal from head node with value ${current.value}`
  });
  explanations.push(`Starting traversal from the head node with value ${current.value}`);
  
  traversalPath.push(current.value);
  
  // Update nodes with visited status
  nodes[0].visited = true;
  
  // Step 2: Traverse through the list
  while (current.next) {
    current = current.next;
    position++;
    traversalPath.push(current.value);
    
    // Mark current node as visited
    if (nodes[position]) {
      nodes[position].visited = true;
    }
    
    steps.push({
      nodes: nodes.map((node, idx) => ({
        ...node,
        isCurrent: idx === position,
        visited: node.visited || idx <= position
      })),
      currentNode: current.value,
      path: [...traversalPath],
      action: 'traverse',
      message: `Step ${steps.length + 1}: Visiting node ${position} with value ${current.value}`
    });
    explanations.push(`Traversing: visiting node ${position} with value ${current.value}`);
  }
  
  // Final step: Traversal complete
  steps.push({
    nodes: nodes.map((node, idx) => ({
      ...node,
      isCurrent: false,
      visited: true
    })),
    currentNode: null,
    path: traversalPath,
    action: 'traverse-complete',
    message: `Traversal complete. Path: ${traversalPath.join(' → ')}`
  });
  explanations.push(`✅ Traversal complete. Visited ${traversalPath.length} nodes in order: ${traversalPath.join(' → ')}`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: head
  };
};

// Bulk insert operation
const bulkInsertOperation = (head, values, steps, explanations, pseudocode) => {
  if (!values || !Array.isArray(values) || values.length === 0) {
    throw new Error('Values array is required for bulk insert');
  }
  
  let currentHead = head;
  const insertedValues = [];
  
  steps.push({
    nodes: currentHead ? linkedListToArray(currentHead).map(v => ({ value: v })) : [],
    currentNode: null,
    action: 'bulk-prepare',
    message: `Starting bulk insert of ${values.length} values`
  });
  explanations.push(`Beginning bulk insert operation for values: ${values.join(', ')}`);
  
  // Insert each value sequentially
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const result = insertOperation(currentHead, value, [], [], []);
    currentHead = result.list;
    insertedValues.push(value);
    
    steps.push({
      nodes: linkedListToArray(currentHead).map(v => ({ value: v })),
      currentNode: value,
      action: 'bulk-insert',
      message: `Inserted value ${value} (${i + 1}/${values.length})`
    });
    explanations.push(`Inserted value ${value}. ${i + 1} of ${values.length} values processed.`);
  }
  
  steps.push({
    nodes: linkedListToArray(currentHead).map(v => ({ value: v })),
    currentNode: null,
    action: 'bulk-complete',
    message: `Bulk insert complete. Inserted ${values.length} values`
  });
  explanations.push(`✅ Bulk insert complete. Successfully inserted ${values.length} values.`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: currentHead
  };
};

// Get pseudocode for operations
const getPseudocode = (operation) => {
  const pseudocode = {
    insert: [
      '1. Create new node with given value',
      '2. If list is empty, make new node as head',
      '3. Otherwise, traverse to the end of the list',
      '4. Set last node\'s next pointer to new node',
      '5. Update list size'
    ],
    delete: [
      '1. If list is empty, return',
      '2. If head node matches value, update head to next node',
      '3. Otherwise, traverse list to find node with matching value',
      '4. Keep track of previous node while traversing',
      '5. If node found, update previous node\'s next to skip the node',
      '6. Return updated list'
    ],
    search: [
      '1. If list is empty, return not found',
      '2. Start from head and traverse through list',
      '3. Compare each node\'s value with search value',
      '4. If match found, return position and node',
      '5. If end reached without match, return not found'
    ],
    traverse: [
      '1. Start from head node',
      '2. While current node is not null:',
      '3.   Visit current node (process value)',
      '4.   Move to next node',
      '5. Repeat until end of list',
      '6. Traversal complete'
    ]
  };
  
  return pseudocode[operation] || pseudocode.insert;
};

module.exports = linkedListOperations;