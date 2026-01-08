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

    if (operation === "bulk-insert") {
      if (!value || !Array.isArray(value)) {
        return res.status(400).json({
          error: "Array of values is required for bulk insert",
          operation: operation,
          receivedValue: value,
        });
      }
    } else if (operation.startsWith("traverse-")) {
      // No value validation needed for traverse operations
    } else if (operation !== "traverse" && value === undefined) {
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
      let bstOptions = {};

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