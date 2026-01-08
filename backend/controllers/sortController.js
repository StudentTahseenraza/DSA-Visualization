const {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort
} = require("../index");

const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

exports.handleSort = (req, res) => {
  let { algorithm } = req.params;
  const { array } = req.body;

  algorithm = kebabToCamel(algorithm);

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: "Array is required" });
  }

  try {
    let result;
    switch (algorithm) {
      case "bubbleSort":
        result = bubbleSort(array);
        break;
      case "selectionSort":
        result = selectionSort(array);
        break;
      case "insertionSort":
        result = insertionSort(array);
        break;
      case "mergeSort":
        result = mergeSort(array);
        break;
      case "quickSort":
        result = quickSort(array);
        break;
      case "heapSort":
        result = heapSort(array);
        break;
      default:
        return res.status(400).json({ error: "Invalid algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/sort/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};