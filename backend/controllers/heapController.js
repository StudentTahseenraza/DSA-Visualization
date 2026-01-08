const { heapOperations } = require("../index");

exports.handleHeapOperation = (req, res) => {
  const { operation } = req.params;
  const { value, heapState } = req.body;

  if (typeof value !== "number" && operation !== "heapify") {
    return res.status(400).json({ error: "Value must be a number" });
  }

  try {
    const result = heapOperations(operation, value, heapState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/heap/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};