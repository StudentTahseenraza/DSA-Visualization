// backend/controllers/heapController.js
const { heapOperations } = require("../algorithms/binaryHeap");

exports.handleHeapOperation = (req, res) => {
  const { operation } = req.params;
  const { value, heapState, isMinHeap = true } = req.body;

  console.log(`Heap operation: ${operation}, isMinHeap: ${isMinHeap}`);

  // Validation based on operation type
  if (operation === 'insert' && typeof value !== 'number') {
    return res.status(400).json({ error: "Value must be a number for insert operation" });
  }

  if (operation === 'bulk-insert') {
    if (!value) {
      return res.status(400).json({ error: "Bulk insert requires an array of values" });
    }
    
    if (!Array.isArray(value)) {
      return res.status(400).json({ 
        error: "Bulk insert requires an array of values. Received: " + typeof value
      });
    }
    
    if (value.length === 0) {
      return res.status(400).json({ error: "Please provide at least one value for bulk insertion" });
    }
    
    // Validate all values are numbers
    for (let i = 0; i < value.length; i++) {
      if (typeof value[i] !== 'number' || isNaN(value[i])) {
        return res.status(400).json({ 
          error: `All values must be valid numbers. Invalid value at index ${i}: ${value[i]}` 
        });
      }
    }
  }

  if (operation === 'delete' && typeof value !== 'number') {
    return res.status(400).json({ error: "Value must be a number for delete operation" });
  }

  if (operation === 'extract' && heapState && heapState.length === 0) {
    return res.status(400).json({ error: "Heap is empty. Nothing to extract." });
  }

  if (operation === 'heapify' && value && !Array.isArray(value)) {
    return res.status(400).json({ error: "Heapify requires an array parameter" });
  }

  try {
    const result = heapOperations(operation, value, heapState, isMinHeap);
    
    // Check if there was an error in the result
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    
    // Ensure steps array exists
    if (!result.steps || !Array.isArray(result.steps)) {
      result.steps = [];
    }
    
    // Add success message
    result.message = result.result || `${operation} operation completed successfully`;
    
    console.log(`Operation successful: ${operation}, steps: ${result.steps.length}`);
    
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/heap/${operation}:`, error.message);
    console.error(error.stack);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};

exports.getHeapStats = (req, res) => {
  const { heapState, isMinHeap } = req.body;
  
  if (!heapState || !Array.isArray(heapState)) {
    return res.status(400).json({ error: "Valid heap state required" });
  }
  
  const stats = {
    size: heapState.length,
    isEmpty: heapState.length === 0,
    root: heapState.length > 0 ? heapState[0] : null,
    lastElement: heapState.length > 0 ? heapState[heapState.length - 1] : null,
    isMinHeap: isMinHeap || true,
    heapType: isMinHeap ? 'Min Heap' : 'Max Heap'
  };
  
  res.json(stats);
};