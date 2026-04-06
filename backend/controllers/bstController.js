// controllers/bstController.js - Updated
const { bstOperations, avlOperations } = require("../index");

exports.handleBSTOperation = (req, res) => {
  try {
    const { operation } = req.params;

    if (!req.body) {
      return res.status(400).json({
        error: "Request body is required",
        receivedBody: req.body,
      });
    }

    const { value, treeState, options = {} } = req.body;

    // Handle bulk-insert specifically
    if (operation === "bulk-insert") {
      if (!value || !Array.isArray(value)) {
        return res.status(400).json({
          error: "Array of values is required for bulk insert",
          operation: operation,
          receivedValue: value,
        });
      }
      
      // Call bstOperations with insert operation and array of values
      const result = bstOperations("insert", value, treeState, options);
      return res.json(result);
    }
    
    // Handle traverse-* operations
    if (operation.startsWith("traverse-")) {
      const order = operation.replace("traverse-", "");
      const result = bstOperations("traverse", null, treeState, { order });
      return res.json(result);
    }

    // Handle regular operations
    if (operation !== "traverse" && value === undefined) {
      return res.status(400).json({
        error: "Value is required for this operation",
        operation: operation,
        receivedValue: value,
      });
    }

    if (
      ["insert", "search", "delete"].includes(operation) &&
      typeof value !== "number"
    ) {
      return res.status(400).json({
        error: "Value must be a number for this operation",
        receivedValue: value,
        type: typeof value,
      });
    }

    let result;

    if (operation === "avlInsert") {
      result = avlOperations(operation, value, treeState);
    } else {
      let bstOperation = operation;
      let bstValue = value;
      let bstOptions = options;

      if (operation === "bulk-insert") {
        bstOperation = "insert";
        bstValue = value;
      } else if (operation.startsWith("traverse-")) {
        bstOperation = "traverse";
        const order = operation.replace("traverse-", "");
        bstOptions = { order };
        bstValue = null;
      } else {
        bstOperation = operation;
        bstValue = value;
      }

      result = bstOperations(bstOperation, bstValue, treeState, bstOptions);
      
      // For delete operations, ensure we're returning the updated tree
      if (operation === "delete" && result && result.steps) {
        const lastStep = result.steps[result.steps.length - 1];
        if (lastStep && !lastStep.tree) {
          lastStep.tree = result.tree;
        }
      }
    }

    res.json(result);
  } catch (error) {
    console.error("Error in BST operation:", error);
    res.status(500).json({
      error: "Internal server error in BST operation",
      message: error.message,
      stack: error.stack,
    });
  }
};