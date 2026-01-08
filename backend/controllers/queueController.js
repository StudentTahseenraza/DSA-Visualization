const { queueOperations } = require("../index");

exports.handleQueueOperation = (req, res) => {
  const { operation } = req.params;
  const { value, graph, start, petrol, distance, n, queueState } = req.body;

  try {
    let result;
    switch (operation) {
      case "enqueue":
        result = queueOperations("enqueue", value, queueState);
        break;
      case "dequeue":
        result = queueOperations("dequeue", queueState);
        break;
      case "front":
        result = queueOperations("front", queueState);
        break;
      case "bfs":
        result = queueOperations("bfs", graph, start, queueState);
        break;
      case "generateBinaryNumbers":
        result = queueOperations("generateBinaryNumbers", n, queueState);
        break;
      case "circularTour":
        result = queueOperations("circularTour", petrol, distance, queueState);
        break;
      default:
        return res.status(400).json({ error: "Invalid queue operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/queue/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};