const { trieOperations } = require("../index");

exports.handleTrieOperation = (req, res) => {
  const { operation } = req.params;
  const { word, trieState } = req.body;

  if (typeof word !== "string") {
    return res.status(400).json({ error: "Word must be a string" });
  }

  try {
    const result = trieOperations(operation, word, trieState);
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/trie/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};