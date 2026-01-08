const { linkedListOperations } = require("../index");

exports.handleLinkedListOperation = (req, res) => {
  const { operation } = req.params;
  const { value, listState } = req.body;

  if (operation === "bulk-insert") {
    if (!Array.isArray(value)) {
      return res
        .status(400)
        .json({ error: "For bulk-insert, value must be an array" });
    }
  } else if (typeof value !== "number" && operation !== "traverse") {
    return res.status(400).json({ error: "Value must be a number" });
  }

  try {
    const result = linkedListOperations(operation, value, listState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/linkedList/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};