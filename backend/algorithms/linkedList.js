// algorithms/algorithms/linkedList.js

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Doubly Linked List Node
class DoublyNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
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

// Helper function to convert array to doubly linked list
const arrayToDoublyLinkedList = (arr) => {
  if (!arr || arr.length === 0) return null;
  
  const head = new DoublyNode(arr[0]);
  let current = head;
  
  for (let i = 1; i < arr.length; i++) {
    const newNode = new DoublyNode(arr[i]);
    current.next = newNode;
    newNode.prev = current;
    current = newNode;
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

// Helper function to convert doubly linked list to array
const doublyLinkedListToArray = (head) => {
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

// Get pseudocode for operations
const getPseudocode = (operation, isDoubly = false) => {
  const pseudocode = {
    insert: isDoubly ? [
      '1. Create new node with given value',
      '2. If list is empty, make new node as head',
      '3. Otherwise, traverse to the end of the list',
      '4. Set last node\'s next pointer to new node',
      '5. Set new node\'s prev pointer to last node',
      '6. Update list size'
    ] : [
      '1. Create new node with given value',
      '2. If list is empty, make new node as head',
      '3. Otherwise, traverse to the end of the list',
      '4. Set last node\'s next pointer to new node',
      '5. Update list size'
    ],
    'insert-at-beginning': [
      '1. Create new node with given value',
      '2. Set new node\'s next to current head',
      '3. If head exists, set head\'s prev to new node',
      '4. Set head to new node',
      '5. Update list size'
    ],
    'insert-at-position': [
      '1. Create new node with given value',
      '2. If position is 0, insert at beginning',
      '3. Traverse to position-1 node',
      '4. Set new node\'s next to current node\'s next',
      '5. Set new node\'s prev to current node',
      '6. If next node exists, set its prev to new node',
      '7. Set current node\'s next to new node'
    ],
    delete: isDoubly ? [
      '1. If list is empty, return',
      '2. If head node matches value:',
      '3.   Update head to head.next',
      '4.   If new head exists, set new head.prev to null',
      '5. Otherwise, traverse list to find node with matching value',
      '6. Keep track of current node while traversing',
      '7. If node found:',
      '8.   Update prev node\'s next to skip current',
      '9.   Update next node\'s prev to skip current',
      '10. Return updated list'
    ] : [
      '1. If list is empty, return',
      '2. If head node matches value, update head to next node',
      '3. Otherwise, traverse list to find node with matching value',
      '4. Keep track of previous node while traversing',
      '5. If node found, update previous node\'s next to skip the node',
      '6. Return updated list'
    ],
    'delete-at-beginning': [
      '1. If list is empty, return null',
      '2. Store current head',
      '3. Set head to head.next',
      '4. If head exists, set head.prev to null',
      '5. Return new head'
    ],
    'delete-at-end': [
      '1. If list is empty, return null',
      '2. If only one node, return null',
      '3. Traverse to last node',
      '4. Set second last node\'s next to null',
      '5. Return head'
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
    ],
    'traverse-backward': [
      '1. If list is empty, return',
      '2. Traverse to the last node',
      '3. While current node is not null:',
      '4.   Visit current node (process value)',
      '5.   Move to previous node',
      '6. Repeat until head is reached',
      '7. Traversal complete'
    ]
  };
  
  return pseudocode[operation] || pseudocode.insert;
};

// Insert operation for doubly linked list
const insertDoublyOperation = (head, value, steps, explanations, pseudocode) => {
  const newNode = { value, prev: null, next: null };
  const nodes = head ? doublyLinkedListToArray(head).map(v => ({ value: v })) : [];
  
  steps.push({
    nodes: [...nodes],
    currentNode: null,
    action: 'insert-prepare',
    message: `Step 1: Create new node with value ${value}`
  });
  explanations.push(`Creating a new node with value ${value}`);
  
  if (!head) {
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
      list: { value, prev: null, next: null }
    };
  }
  
  let current = head;
  let currentArray = doublyLinkedListToArray(head).map(v => ({ value: v }));
  let position = 0;
  
  while (current.next) {
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
    currentArray = doublyLinkedListToArray(head).map(v => ({ value: v }));
  }
  
  current.next = newNode;
  newNode.prev = current;
  
  const finalArray = doublyLinkedListToArray(head).map(v => ({ value: v }));
  
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

// Insert at beginning for doubly linked list
const insertAtBeginningDoublyOperation = (head, value, steps, explanations, pseudocode) => {
  const newNode = { value, prev: null, next: null };
  const nodes = head ? doublyLinkedListToArray(head).map(v => ({ value: v })) : [];
  
  steps.push({
    nodes: [...nodes],
    currentNode: null,
    action: 'insert-prepare',
    message: `Step 1: Create new node with value ${value}`
  });
  explanations.push(`Creating a new node with value ${value}`);
  
  if (!head) {
    steps.push({
      nodes: [{ value }],
      currentNode: value,
      action: 'insert-beginning',
      message: `Step 2: List is empty, making new node as head`
    });
    explanations.push(`List is empty. Setting new node as the head of the list.`);
    
    return {
      steps,
      explanations,
      pseudocode,
      list: { value, prev: null, next: null }
    };
  }
  
  newNode.next = head;
  head.prev = newNode;
  
  const finalArray = [{ value }, ...doublyLinkedListToArray(head).map(v => ({ value: v }))];
  
  steps.push({
    nodes: finalArray.map((node, idx) => ({
      ...node,
      isCurrent: idx === 0
    })),
    currentNode: value,
    action: 'insert-beginning',
    message: `Step 2: Inserted ${value} at the beginning`
  });
  explanations.push(`Inserted node with value ${value} at the beginning of the list. New head is ${value}.`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: newNode
  };
};

// Delete operation for doubly linked list
const deleteDoublyOperation = (head, value, steps, explanations, pseudocode) => {
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
  
  const nodes = doublyLinkedListToArray(head).map(v => ({ value: v }));
  
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
    if (newHead) {
      newHead.prev = null;
    }
    const newNodes = newHead ? doublyLinkedListToArray(newHead).map(v => ({ value: v })) : [];
    
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
  
  let current = head;
  let position = 0;
  let found = false;
  
  while (current) {
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
  
  // Delete the node (update both prev and next pointers)
  if (current.prev) {
    current.prev.next = current.next;
  }
  if (current.next) {
    current.next.prev = current.prev;
  }
  
  const finalNodes = doublyLinkedListToArray(head).map(v => ({ value: v }));
  
  steps.push({
    nodes: finalNodes,
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

// Search operation for doubly linked list
const searchDoublyOperation = (head, value, steps, explanations, pseudocode) => {
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
  
  const nodes = doublyLinkedListToArray(head).map(v => ({ value: v }));
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

// Traverse forward for doubly linked list
const traverseForwardDoublyOperation = (head, steps, explanations, pseudocode) => {
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
  
  steps = [];
  
  steps.push({
    nodes: nodes.map((node, idx) => ({
      ...node,
      isCurrent: idx === 0,
      visited: false
    })),
    currentNode: current.value,
    path: [...traversalPath],
    action: 'traverse-start',
    message: `Step 1: Starting forward traversal from head node with value ${current.value}`
  });
  explanations.push(`Starting forward traversal from the head node with value ${current.value}`);
  
  traversalPath.push(current.value);
  nodes[0].visited = true;
  
  while (current.next) {
    current = current.next;
    position++;
    traversalPath.push(current.value);
    
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
    explanations.push(`Traversing forward: visiting node ${position} with value ${current.value}`);
  }
  
  steps.push({
    nodes: nodes.map((node, idx) => ({
      ...node,
      isCurrent: false,
      visited: true
    })),
    currentNode: null,
    path: traversalPath,
    action: 'traverse-complete',
    message: `Forward traversal complete. Path: ${traversalPath.join(' → ')}`
  });
  explanations.push(`✅ Forward traversal complete. Visited ${traversalPath.length} nodes in order: ${traversalPath.join(' → ')}`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: head
  };
};

// Traverse backward for doubly linked list
const traverseBackwardDoublyOperation = (head, steps, explanations, pseudocode) => {
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
  
  // First go to the end
  let tail = head;
  let nodeCount = 0;
  while (tail.next) {
    tail = tail.next;
    nodeCount++;
  }
  
  const convertToListReverse = (head) => {
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

  const nodes = convertToListReverse(head);
  let current = tail;
  let position = nodeCount;
  const traversalPath = [];
  
  steps = [];
  
  steps.push({
    nodes: nodes.map((node, idx) => ({
      ...node,
      isCurrent: idx === position,
      visited: false
    })),
    currentNode: current.value,
    path: [...traversalPath],
    action: 'traverse-start',
    message: `Step 1: Starting backward traversal from tail node with value ${current.value}`
  });
  explanations.push(`Starting backward traversal from the tail node with value ${current.value}`);
  
  traversalPath.push(current.value);
  nodes[position].visited = true;
  
  while (current.prev) {
    current = current.prev;
    position--;
    traversalPath.push(current.value);
    
    if (nodes[position]) {
      nodes[position].visited = true;
    }
    
    steps.push({
      nodes: nodes.map((node, idx) => ({
        ...node,
        isCurrent: idx === position,
        visited: node.visited || idx >= position
      })),
      currentNode: current.value,
      path: [...traversalPath],
      action: 'traverse',
      message: `Step ${steps.length + 1}: Visiting node ${position} with value ${current.value}`
    });
    explanations.push(`Traversing backward: visiting node ${position} with value ${current.value}`);
  }
  
  steps.push({
    nodes: nodes.map((node, idx) => ({
      ...node,
      isCurrent: false,
      visited: true
    })),
    currentNode: null,
    path: traversalPath,
    action: 'traverse-complete',
    message: `Backward traversal complete. Path: ${traversalPath.join(' ← ')}`
  });
  explanations.push(`✅ Backward traversal complete. Visited ${traversalPath.length} nodes in reverse order: ${traversalPath.join(' ← ')}`);
  
  return {
    steps,
    explanations,
    pseudocode,
    list: head
  };
};

// Bulk insert operation for doubly linked list
const bulkInsertDoublyOperation = (head, values, steps, explanations, pseudocode) => {
  if (!values || !Array.isArray(values) || values.length === 0) {
    throw new Error('Values array is required for bulk insert');
  }
  
  let currentHead = head;
  const insertedValues = [];
  
  steps.push({
    nodes: currentHead ? doublyLinkedListToArray(currentHead).map(v => ({ value: v })) : [],
    currentNode: null,
    action: 'bulk-prepare',
    message: `Starting bulk insert of ${values.length} values`
  });
  explanations.push(`Beginning bulk insert operation for values: ${values.join(', ')}`);
  
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const result = insertDoublyOperation(currentHead, value, [], [], []);
    currentHead = result.list;
    insertedValues.push(value);
    
    steps.push({
      nodes: doublyLinkedListToArray(currentHead).map(v => ({ value: v })),
      currentNode: value,
      action: 'bulk-insert',
      message: `Inserted value ${value} (${i + 1}/${values.length})`
    });
    explanations.push(`Inserted value ${value}. ${i + 1} of ${values.length} values processed.`);
  }
  
  steps.push({
    nodes: doublyLinkedListToArray(currentHead).map(v => ({ value: v })),
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

// Main linked list operations (updated to support doubly linked list)
const linkedListOperations = (operation, value, listState, options = {}) => {
  let head = listState ? { ...listState } : null;
  const steps = [];
  const explanations = [];
  const isDoubly = options.isDoubly || false;
  const pseudocode = getPseudocode(operation, isDoubly);
  
  // Handle doubly linked list specific operations
  if (isDoubly) {
    switch (operation) {
      case 'insert':
        return insertDoublyOperation(head, value, steps, explanations, pseudocode);
      
      case 'insert-at-beginning':
        return insertAtBeginningDoublyOperation(head, value, steps, explanations, pseudocode);
      
      case 'delete':
        return deleteDoublyOperation(head, value, steps, explanations, pseudocode);
      
      case 'search':
        return searchDoublyOperation(head, value, steps, explanations, pseudocode);
      
      case 'traverse':
        return traverseForwardDoublyOperation(head, steps, explanations, pseudocode);
      
      case 'traverse-backward':
        return traverseBackwardDoublyOperation(head, steps, explanations, pseudocode);
      
      case 'bulk-insert':
        return bulkInsertDoublyOperation(head, value, steps, explanations, pseudocode);
      
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }
  
  // Original singly linked list operations
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

// Original singly linked list operations (keeping existing code)
const insertOperation = (head, value, steps, explanations, pseudocode) => {
  const newNode = { value, next: null };
  const nodes = head ? linkedListToArray(head).map(v => ({ value: v })) : [];
  
  steps.push({
    nodes: [...nodes],
    currentNode: null,
    action: 'insert-prepare',
    message: `Step 1: Create new node with value ${value}`
  });
  explanations.push(`Creating a new node with value ${value}`);
  
  if (!head) {
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
  
  let current = head;
  let currentArray = linkedListToArray(head).map(v => ({ value: v }));
  let position = 0;
  
  while (current.next) {
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
  
  let current = head;
  let prev = null;
  let position = 0;
  let found = false;
  
  while (current) {
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
  
  steps = [];
  
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
  nodes[0].visited = true;
  
  while (current.next) {
    current = current.next;
    position++;
    traversalPath.push(current.value);
    
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

module.exports = linkedListOperations;