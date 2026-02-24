// backend/queueOperations.js
class Queue {
  constructor(initialItems = []) {
    this.items = [...initialItems];
    this.steps = [];
  }

  enqueue(value) {
    this.steps = [];
    
    // Step 1: Show current queue before enqueue
    this.steps.push({
      queue: [...this.items],
      action: "start",
      message: `Preparing to enqueue ${value} to the queue`,
      highlightIndex: -1,
    });

    // Step 2: Show the value being enqueued
    this.steps.push({
      queue: [...this.items],
      action: "enqueue-start",
      value: value,
      message: `Enqueuing ${value} to the queue...`,
      highlightIndex: -1,
    });

    // Step 3: Add to queue
    this.items.push(value);
    
    this.steps.push({
      queue: [...this.items],
      action: "enqueue",
      value,
      message: `${value} has been enqueued. Queue size: ${this.items.length}`,
      highlightIndex: this.items.length - 1,
    });

    return this.steps;
  }

  dequeue() {
    this.steps = [];
    
    // Step 1: Show current queue before dequeue
    this.steps.push({
      queue: [...this.items],
      action: "start",
      message: "Preparing to dequeue from the queue",
      highlightIndex: 0,
    });

    if (this.isEmpty()) {
      this.steps.push({
        queue: [...this.items],
        action: "error",
        message: "Queue underflow: Cannot dequeue from empty queue",
        highlightIndex: -1,
      });
      return this.steps;
    }

    // Step 2: Highlight the element being dequeued
    const value = this.items[0];
    this.steps.push({
      queue: [...this.items],
      action: "dequeue-start",
      value,
      message: `Dequeuing ${value} from the front of the queue...`,
      highlightIndex: 0,
    });

    // Step 3: Remove from queue
    this.items.shift();
    
    this.steps.push({
      queue: [...this.items],
      action: "dequeue",
      value,
      message: `${value} has been dequeued. Queue size: ${this.items.length}`,
      highlightIndex: -1,
    });

    return this.steps;
  }

  front() {
    this.steps = [];
    this.steps.push({
      queue: [...this.items],
      action: "start",
      message: "Checking front of the queue",
      highlightIndex: 0,
    });

    if (this.isEmpty()) {
      this.steps.push({
        queue: [...this.items],
        action: "error",
        message: "Queue is empty",
        highlightIndex: -1,
      });
      return this.steps;
    }

    const value = this.items[0];
    
    this.steps.push({
      queue: [...this.items],
      action: "front",
      value,
      message: `Front element is ${value}`,
      highlightIndex: 0,
    });

    return this.steps;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  bfs(graph, start) {
    this.steps = [];
    this.steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      start,
      queue: [],
      visited: {},
      action: 'start',
      message: `Starting BFS from node ${start}`
    });

    const visited = {};
    const result = [];
    const queue = [start];
    visited[start] = true;

    this.steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      start,
      queue: [...queue],
      visited: {...visited},
      result: [...result],
      action: 'init',
      message: `Initialized with start node ${start}`
    });

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node);
      
      this.steps.push({
        graph: JSON.parse(JSON.stringify(graph)),
        currentNode: node,
        queue: [...queue],
        visited: {...visited},
        result: [...result],
        action: 'process',
        message: `Processing node ${node}, adding to result`
      });

      for (const neighbor of graph[node] || []) {
        this.steps.push({
          graph: JSON.parse(JSON.stringify(graph)),
          currentNode: node,
          neighbor,
          queue: [...queue],
          visited: {...visited},
          result: [...result],
          action: 'check-neighbor',
          message: `Checking neighbor ${neighbor} of node ${node}`
        });

        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
          
          this.steps.push({
            graph: JSON.parse(JSON.stringify(graph)),
            currentNode: node,
            neighbor,
            queue: [...queue],
            visited: {...visited},
            result: [...result],
            action: 'enqueue-neighbor',
            message: `Neighbor ${neighbor} not visited, adding to queue`
          });
        } else {
          this.steps.push({
            graph: JSON.parse(JSON.stringify(graph)),
            currentNode: node,
            neighbor,
            queue: [...queue],
            visited: {...visited},
            result: [...result],
            action: 'skip-neighbor',
            message: `Neighbor ${neighbor} already visited, skipping`
          });
        }
      }
    }

    this.steps.push({
      graph: JSON.parse(JSON.stringify(graph)),
      result: [...result],
      action: 'complete',
      message: `BFS complete. Traversal order: ${result.join(' -> ')}`
    });

    return this.steps;
  }

  generateBinaryNumbers(n) {
    this.steps = [];
    this.steps.push({
      n,
      queue: [],
      result: [],
      action: 'start',
      message: `Generating first ${n} binary numbers`
    });

    const result = [];
    const queue = ['1'];
    
    this.steps.push({
      n,
      queue: [...queue],
      result: [...result],
      action: 'init',
      message: 'Initialized queue with "1"'
    });

    for (let i = 0; i < n; i++) {
      const binary = queue.shift();
      result.push(binary);
      
      this.steps.push({
        n,
        i,
        binary,
        queue: [...queue],
        result: [...result],
        action: 'dequeue',
        message: `Dequeued ${binary}, added to result`
      });

      queue.push(binary + '0');
      queue.push(binary + '1');
      
      this.steps.push({
        n,
        i,
        binary,
        queue: [...queue],
        result: [...result],
        action: 'enqueue-children',
        message: `Enqueued ${binary + '0'} and ${binary + '1'}`
      });
    }

    this.steps.push({
      n,
      result: [...result],
      action: 'complete',
      message: `Generated ${n} binary numbers: ${result.join(', ')}`
    });

    return this.steps;
  }

  circularTour(petrol, distance) {
    this.steps = [];
    this.steps.push({
      petrol,
      distance,
      queue: [],
      action: 'start',
      message: 'Finding starting petrol pump for circular tour'
    });

    const n = petrol.length;
    let start = 0;
    let end = 1;
    let currPetrol = petrol[start] - distance[start];
    
    this.steps.push({
      petrol,
      distance,
      start,
      end,
      currPetrol,
      action: 'init',
      message: `Starting at pump ${start}, current petrol: ${currPetrol}`
    });

    while (start !== end || currPetrol < 0) {
      this.steps.push({
        petrol,
        distance,
        start,
        end,
        currPetrol,
        action: 'check',
        message: `Current petrol ${currPetrol} at pump ${start}, moving to ${end}`
      });

      while (currPetrol < 0 && start !== end) {
        this.steps.push({
          petrol,
          distance,
          start,
          end,
          currPetrol,
          action: 'negative-petrol',
          message: `Negative petrol, moving start from ${start} to ${end}`
        });

        currPetrol -= petrol[start] - distance[start];
        start = (start + 1) % n;
        
        this.steps.push({
          petrol,
          distance,
          start,
          end,
          currPetrol,
          action: 'update-start',
          message: `New start: ${start}, petrol: ${currPetrol}`
        });

        if (start === 0) {
          this.steps.push({
            petrol,
            distance,
            start,
            action: 'no-solution',
            message: 'No solution found'
          });
          return this.steps;
        }
      }

      currPetrol += petrol[end] - distance[end];
      end = (end + 1) % n;
      
      this.steps.push({
        petrol,
        distance,
        start,
        end,
        currPetrol,
        action: 'move-end',
        message: `Moved end to ${end}, petrol: ${currPetrol}`
      });
    }

    this.steps.push({
      petrol,
      distance,
      start,
      currPetrol,
      action: 'solution',
      message: `Starting from pump ${start} with ${currPetrol} petrol remaining`
    });

    return this.steps;
  }
}

const queueOperations = (operation, ...args) => {
  const queueState = args[args.length - 1] || [];
  const value = args[0];
  
  console.log(`Queue operation: ${operation}`, { value, queueState });

  const queue = new Queue(queueState);

  const pseudocode = {
    enqueue: [
      'add element to rear of queue',
      'increment queue size'
    ],
    dequeue: [
      'if queue is not empty:',
      '  remove element from front of queue',
      '  decrement queue size',
      '  return removed element',
      'else:',
      '  return error (queue underflow)'
    ],
    front: [
      'if queue is not empty:',
      '  return front element without removing it',
      'else:',
      '  return error'
    ],
    bfs: [
      'mark start node as visited and enqueue it',
      'while queue is not empty:',
      '  dequeue a node',
      '  process the node',
      '  enqueue all unvisited neighbors',
      '  mark neighbors as visited'
    ],
    generateBinaryNumbers: [
      'enqueue "1"',
      'for i from 1 to n:',
      '  dequeue a number',
      '  append it to result',
      '  enqueue number + "0"',
      '  enqueue number + "1"'
    ],
    circularTour: [
      'initialize start=0, end=1, current petrol',
      'while start != end or petrol < 0:',
      '  if petrol < 0:',
      '    move start forward',
      '    adjust petrol',
      '  move end forward',
      '  update petrol',
      'return start if solution found'
    ]
  };

  let steps;
  try {
    switch (operation) {
      case 'enqueue':
        steps = queue.enqueue(value);
        break;
      case 'dequeue':
        steps = queue.dequeue();
        break;
      case 'front':
        steps = queue.front();
        break;
      case 'bfs':
        steps = queue.bfs(args[0], args[1]);
        break;
      case 'generateBinaryNumbers':
        steps = queue.generateBinaryNumbers(parseInt(value) || 5);
        break;
      case 'circularTour':
        steps = queue.circularTour(args[0], args[1]);
        break;
      default:
        return { steps: [], pseudocode: [], error: 'Invalid operation', queue: [] };
    }

    return { 
      steps, 
      pseudocode: pseudocode[operation] || [], 
      queue: queue.items 
    };
  } catch (error) {
    console.error(`Error in queue operation ${operation}:`, error);
    return { 
      steps: [], 
      pseudocode: [], 
      error: error.message,
      queue: queue.items 
    };
  }
};

module.exports = queueOperations;