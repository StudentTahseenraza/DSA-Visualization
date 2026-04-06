// controllers/arrayController.js - Updated to return result

const { arrayOperations } = require("../index");

exports.handleArrayOperation = (req, res) => {
  const { operation } = req.params;
  const { array, value, position, direction, positions } = req.body;

  console.log('Array operation request:', {
    operation,
    array,
    value,
    position,
    direction,
    positions
  });

  try {
    let result;
    const currentArray = array && Array.isArray(array) ? array : [5, 2, 8, 1, 4, 3, 6, 7];

    switch (operation) {
      case "insert":
        if (value === undefined || position === undefined) {
          return res.status(400).json({ error: "Value and position are required for insert operation" });
        }
        result = arrayOperations('insert', currentArray, parseInt(value), parseInt(position));
        break;
      case "delete":
        if (position === undefined) {
          return res.status(400).json({ error: "Position is required for delete operation" });
        }
        result = arrayOperations('delete', currentArray, parseInt(position));
        break;
      case "push":
        if (value === undefined) {
          return res.status(400).json({ error: "Value is required for push operation" });
        }
        result = arrayOperations('push', currentArray, parseInt(value));
        break;
      case "pop":
        result = arrayOperations('pop', currentArray);
        break;
      case "search":
        if (value === undefined) {
          return res.status(400).json({ error: "Value is required for search operation" });
        }
        result = arrayOperations('search', currentArray, parseInt(value));
        break;
      case "traverse":
        result = arrayOperations('traverse', currentArray);
        break;
      case "update":
        if (value === undefined || position === undefined) {
          return res.status(400).json({ error: "Value and position are required for update operation" });
        }
        result = arrayOperations('update', currentArray, parseInt(position), parseInt(value));
        break;
      case "rotate":
        if (direction === undefined || positions === undefined) {
          return res.status(400).json({ error: "Direction and positions are required for rotate operation" });
        }
        result = arrayOperations('rotate', currentArray, direction, parseInt(positions));
        break;
      case "reverse":
        result = arrayOperations('reverse', currentArray);
        break;
      default:
        return res.status(400).json({ error: `Invalid array operation: ${operation}` });
    }

    console.log('Operation result:', {
      stepsLength: result.steps ? result.steps.length : 0,
      hasPseudocode: !!result.pseudocode,
      arrayLength: result.array ? result.array.length : 0,
      hasResult: !!result.result
    });

    // Create a comprehensive response with result data
    const responseData = {
      steps: result.steps || [],
      pseudocode: result.pseudocode || [],
      array: result.array || currentArray,
      explanations: (result.steps || []).map((step) => step.message || 'Step completed'),
      result: result.result || {
        success: true,
        operation: operation,
        message: `${operation} operation completed successfully`
      }
    };

    // Add operation-specific result details
    if (operation === 'delete' && position !== undefined) {
      responseData.result.deletedValue = result.result?.deletedValue;
      responseData.result.position = parseInt(position);
    }
    if (operation === 'insert' && value !== undefined && position !== undefined) {
      responseData.result.insertedValue = parseInt(value);
      responseData.result.position = parseInt(position);
    }
    if (operation === 'push' && value !== undefined) {
      responseData.result.pushedValue = parseInt(value);
    }
    if (operation === 'pop') {
      responseData.result.poppedValue = result.result?.poppedValue;
    }
    if (operation === 'search' && value !== undefined) {
      responseData.result.searchedValue = parseInt(value);
    }

    res.json(responseData);

  } catch (error) {
    console.error(`Error in /api/array/${operation}:`, error);
    res.status(500).json({ 
      error: "Internal server error in array operation",
      details: error.message 
    });
  }
};