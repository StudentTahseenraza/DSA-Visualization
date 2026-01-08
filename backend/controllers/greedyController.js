const {
  activitySelection,
  fractionalKnapsack,
  jobScheduling,
  huffmanEncoding,
  primsAlgorithm,
  kruskalsAlgorithm,
  coinChange,
  graphAlgorithms
} = require("../index");

exports.handleGreedyAlgorithm = (req, res) => {
  const { algorithm } = req.params;

  try {
    let result;
    switch (algorithm) {
      case "activity-selection":
        const { activities } = req.body;
        result = activitySelection(activities);
        break;
      case "fractional-knapsack":
        const { items, capacity } = req.body;
        result = fractionalKnapsack(items, capacity);
        break;
      case "job-scheduling":
        const { jobs } = req.body;
        result = jobScheduling(jobs);
        break;
      case "huffman-encoding":
        const { text } = req.body;
        result = huffmanEncoding(text);
        break;
      case "prims-algorithm":
        const { graph: primsGraph } = req.body;
        result = primsAlgorithm(primsGraph);
        break;
      case "kruskals-algorithm":
        const { graph: kruskalsGraph } = req.body;
        result = kruskalsAlgorithm(kruskalsGraph);
        break;
      case "dijkstras-algorithm":
        const { graph: dijkstraGraph, source } = req.body;
        result = graphAlgorithms.dijkstra(dijkstraGraph, source);
        break;
      case "coin-change-greedy":
        const { coins, amount } = req.body;
        result = coinChange(coins, amount);
        break;
      default:
        return res.status(400).json({ error: "Invalid greedy algorithm" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/greedy/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};