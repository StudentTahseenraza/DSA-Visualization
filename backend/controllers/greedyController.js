// controllers/greedyController.js - Updated
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
        // Add result summary
        result.result = {
          selected: result.steps[result.steps.length - 1]?.selected || [],
          activities: activities
        };
        break;
      case "fractional-knapsack":
        const { items, capacity } = req.body;
        result = fractionalKnapsack(items, capacity);
        result.result = {
          totalValue: result.steps[result.steps.length - 1]?.totalValue || 0,
          currentWeight: result.steps[result.steps.length - 1]?.currentWeight || 0,
          capacity: capacity
        };
        break;
      case "job-scheduling":
        const { jobs } = req.body;
        result = jobScheduling(jobs);
        result.result = {
          totalProfit: result.steps[result.steps.length - 1]?.totalProfit || 0,
          schedule: result.steps[result.steps.length - 1]?.schedule || []
        };
        break;
      case "huffman-encoding":
        const { text } = req.body;
        result = huffmanEncoding(text);
        const lastStep = result.steps[result.steps.length - 1];
        result.result = {
          compressionRatio: lastStep?.encoded ? (text.length * 8 / lastStep.encoded.length) : 0,
          originalBits: text.length * 8,
          compressedBits: lastStep?.encoded?.length || 0
        };
        break;
      case "coin-change-greedy":
        const { coins, amount } = req.body;
        result = coinChange(coins, amount);
        const finalStep = result.steps[result.steps.length - 1];
        result.result = {
          remaining: finalStep?.remaining || amount,
          result: finalStep?.result || []
        };
        break;
      default:
        result = { steps: [], pseudocode: [], explanations: [] };
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/greedy/${algorithm}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};