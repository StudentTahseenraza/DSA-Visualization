const { linearSearch, binarySearch } = require("../index");

exports.handleSearch = (req, res) => {
  const { algorithm } = req.params;
  const { array, target } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }

  if (typeof target !== "number") {
    return res.status(400).json({ error: "Target number is required" });
  }

  try {
    let result;
    switch (algorithm) {
      case "linear-search":
        result = linearSearch(array, target);
        break;
      case "binary-search":
        result = binarySearch(array, target);
        break;
      default:
        return res.status(400).json({ error: "Invalid search algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/search/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};