const { linkedListOperations } = require("../index");

exports.handleLinkedListOperation = (req, res) => {
  const { operation } = req.params;
  const { value, listState, listType } = req.body;

  // Validate based on operation type
  if (operation === "bulk-insert") {
    if (!Array.isArray(value)) {
      return res.status(400).json({ 
        error: "For bulk-insert, value must be an array of numbers",
        receivedValue: value 
      });
    }
  } else if (operation === "delete" || operation === "search" || operation === "insert") {
    if (typeof value !== "number") {
      return res.status(400).json({ 
        error: `Value must be a number for ${operation} operation`,
        receivedValue: value,
        type: typeof value
      });
    }
  } else if (operation === "insert-at-beginning" || operation === "insert-at-position") {
    if (typeof value !== "number") {
      return res.status(400).json({ 
        error: `Value must be a number for ${operation} operation`,
        receivedValue: value,
        type: typeof value
      });
    }
  } else if (operation !== "traverse" && operation !== "traverse-backward") {
    return res.status(400).json({ 
      error: `Unknown operation: ${operation}` 
    });
  }

  try {
    console.log(`Processing ${operation} operation with value:`, value);
    const isDoubly = listType === "doubly";
    const result = linkedListOperations(operation, value, listState, { isDoubly });
    
    if (!result.steps || !Array.isArray(result.steps)) {
      result.steps = [];
    }
    if (!result.explanations || !Array.isArray(result.explanations)) {
      result.explanations = [];
    }
    
    let successMessage;
    switch(operation) {
      case 'delete':
        successMessage = `Successfully deleted node with value ${value}`;
        break;
      case 'search':
        successMessage = `Search for value ${value} completed`;
        break;
      case 'traverse':
        successMessage = `List ${isDoubly ? 'forward ' : ''}traversal completed`;
        break;
      case 'traverse-backward':
        successMessage = 'List backward traversal completed';
        break;
      case 'insert':
        successMessage = `Successfully inserted value ${value} at the end`;
        break;
      case 'insert-at-beginning':
        successMessage = `Successfully inserted value ${value} at the beginning`;
        break;
      case 'bulk-insert':
        successMessage = `Successfully inserted ${value.length} values`;
        break;
      default:
        successMessage = 'Operation completed successfully';
    }
    
    res.json({
      ...result,
      message: successMessage,
      listType: isDoubly ? 'doubly' : 'singly'
    });
  } catch (error) {
    console.error(`Error in /api/linkedList/${operation}:`, error.message);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message,
      steps: [],
      explanations: [],
      pseudocode: []
    });
  }
};