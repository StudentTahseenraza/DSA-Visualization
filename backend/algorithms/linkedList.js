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

  delete(value) {
    this.steps = [];
    this.steps.push({
      nodes: this.cloneList(),
      currentNode: null,
      action: 'start',
      currentLine: 0,
      explanation: 'Starting linked list deletion.',
    });

    if (!this.head) {
      this.steps.push({
        nodes: [],
        currentNode: null,
        action: 'empty',
        currentLine: 1,
        explanation: 'List is empty, nothing to delete.',
      });
      return this.steps;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: value,
        action: 'delete-head',
        currentLine: 2,
        explanation: `Deleted head node with value ${value}.`,
      });
      return this.steps;
    }

    let current = this.head;
    let prev = null;
    while (current && current.value !== value) {
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: current.value,
        action: 'traverse',
        currentLine: 3,
        explanation: `Traversing to node ${current.value}.`,
      });
      prev = current;
      current = current.next;
    }

    if (current) {
      prev.next = current.next;
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: value,
        action: 'delete',
        currentLine: 4,
        explanation: `Deleted node with value ${value}.`,
      });
    } else {
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: null,
        action: 'not-found',
        currentLine: 5,
        explanation: `Value ${value} not found in the list.`,
      });
    }

    return this.steps;
  }

  traverse() {
    this.steps = [];
    this.steps.push({
      nodes: this.cloneList(),
      currentNode: null,
      action: 'start',
      currentLine: 0,
      explanation: 'Starting linked list traversal.',
    });

    let current = this.head;
    while (current) {
      this.steps.push({
        nodes: this.cloneList(),
        currentNode: current.value,
        action: 'traverse',
        currentLine: 1,
        explanation: `Visiting node ${current.value}.`,
      });
      current = current.next;
    }

    return this.steps;
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