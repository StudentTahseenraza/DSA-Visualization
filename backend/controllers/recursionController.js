const { recursionOperations } = require("../index");

exports.handleRecursionOperation = (req, res) => {
  const { operation } = req.params;
  const { n, str, arr, matrix, x, y, newColor, prefix } = req.body;

  try {
    let result;
    switch (operation) {
      case "factorial":
        result = recursionOperations("factorial", n);
        break;
      case "fibonacci":
        result = recursionOperations("fibonacci", n);
        break;
      case "towerOfHanoi":
        result = recursionOperations("towerOfHanoi", n);
        break;
      case "permutations":
        result = recursionOperations("permutations", str, prefix);
        break;
      case "subsets":
        result = recursionOperations("subsets", arr);
        break;
      case "floodFill":
        result = recursionOperations("floodFill", matrix, x, y, newColor);
        break;
      default:
        return res.status(400).json({ error: "Invalid recursion operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/recursion/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};