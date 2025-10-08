// algorithms/linkedList.js
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.steps = [];
  }

  // Single value insertion
  insert(value) {
    this.steps = [];
    this.steps.push({
      nodes: this.cloneList(),
      currentNode: null,
      action: 'start',
      currentLine: 0,
      explanation: 'Starting linked list insertion.',
    });

    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: value,
        action: 'insert-head',
        currentLine: 1,
        explanation: `Inserted ${value} as the head node.`,
      });
      return this.steps;
    }

    let current = this.head;
    while (current.next) {
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: current.value,
        action: 'traverse',
        currentLine: 2,
        explanation: `Traversing to node ${current.value}.`,
      });
      current = current.next;
    }

    current.next = newNode;
    this.steps.push({
      nodes: this.cloneList(),
      currentNode: value,
      action: 'insert',
      currentLine: 3,
      explanation: `Appended ${value} at the end of the list.`,
    });

    return this.steps;
  }

  // Bulk insertion
  bulkInsert(values) {
    this.steps = [];
    this.steps.push({
      nodes: this.cloneList(),
      currentNode: null,
      action: 'start',
      currentLine: 0,
      explanation: 'Starting bulk insertion of multiple values.',
    });

    if (!Array.isArray(values) || values.length === 0) {
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: null,
        action: 'error',
        currentLine: 1,
        explanation: 'No values provided for bulk insertion.',
      });
      return this.steps;
    }

    values.forEach((value, index) => {
      const newNode = new ListNode(value);
      
      if (!this.head) {
        this.head = newNode;
        this.steps.push({
          nodes: this.cloneList(),
          currentNode: value,
          action: 'insert-head',
          currentLine: 1,
          explanation: `Inserted ${value} as the head node. (${index + 1}/${values.length})`,
        });
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
        this.steps.push({
          nodes: this.cloneList(),
          currentNode: value,
          action: 'insert',
          currentLine: 2,
          explanation: `Appended ${value} at the end. (${index + 1}/${values.length})`,
        });
      }
    });

    this.steps.push({
      nodes: this.cloneList(),
      currentNode: null,
      action: 'complete',
      currentLine: 3,
      explanation: `Bulk insertion completed. Added ${values.length} nodes.`,
    });

    return this.steps;
  }

  delete(value) {
    // ... keep existing delete method unchanged ...
  }

  traverse() {
    // ... keep existing traverse method unchanged ...
  }

  cloneList() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push({ value: current.value, next: current.next ? current.next.value : null });
      current = current.next;
    }
    return nodes;
  }
}

const linkedListOperations = (operation, value, listState) => {
  const list = new LinkedList();
  if (listState) {
    list.head = listState;
  }

  const pseudocode = {
    insert: [
      'if list is empty: set head to new node',
      'traverse to end of list',
      'append new node',
    ],
    'bulk-insert': [
      'for each value in input array:',
      '  if list is empty: set head to new node',
      '  else: traverse to end and append',
      'bulk insertion complete',
    ],
    delete: [
      'if list is empty: return',
      'if head has value: remove head',
      'traverse to find value',
      'remove node if found',
      'if not found: do nothing',
    ],
    traverse: [
      'start at head',
      'visit each node until end',
    ],
  };
  
  const explanations = {
    insert: [
      'Start inserting a new node.',
      'Insert as head if list is empty.',
      'Traverse to the end of the list.',
      'Append the new node.',
    ],
    'bulk-insert': [
      'Starting bulk insertion of multiple values.',
      'Processing each value in sequence.',
      'Inserting values one by one.',
      'Bulk insertion completed.',
    ],
    delete: [
      'Start deleting a node.',
      'List is empty, nothing to delete.',
      'Remove head if it matches the value.',
      'Traverse to find the value.',
      'Remove the node if found.',
      'Value not found in the list.',
    ],
    traverse: [
      'Start traversing the list.',
      'Visit each node in sequence.',
    ],
  };

  let steps;
  if (operation === 'insert') {
    steps = list.insert(value);
  } else if (operation === 'bulk-insert') {
    steps = list.bulkInsert(value);
  } else if (operation === 'delete') {
    steps = list.delete(value);
  } else if (operation === 'traverse') {
    steps = list.traverse();
  } else {
    return { steps: [], pseudocode: [], explanations: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], explanations: explanations[operation], list: list.head };
};

module.exports = linkedListOperations;