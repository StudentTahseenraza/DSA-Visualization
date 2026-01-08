const { graphAlgorithms } = require("../index");

exports.handleGraphAlgorithm = (req, res) => {
  try {
    let { algorithm } = req.params;

    if (!req.body) {
      return res.status(400).json({
        error: "Request body is required for graph algorithms",
      });
    }

    const { graph, start } = req.body;

    console.log(`Graph Algorithm Request:`, { algorithm, graph, start });

    if (algorithm === "kruskals-algorithm") {
      if (!graph || Object.keys(graph).length === 0) {
        return res.status(400).json({
          error: "Graph is required for Kruskal's algorithm",
        });
      }
    } else if (algorithm === "prims-algorithm") {
      if (!graph || !start) {
        return res.status(400).json({
          error: "Graph and start node are required for Prim's algorithm",
        });
      }
    } else {
      if (!graph || !start) {
        return res.status(400).json({
          error: "Graph and start node are required",
        });
      }
    }

    let result;
    switch (algorithm) {
      case "breadth-first-search":
        result = graphAlgorithms.bfs(graph, start);
        break;
      case "depth-first-search":
        result = graphAlgorithms.dfs(graph, start);
        break;
      case "dijkstra":
        result = graphAlgorithms.dijkstra(graph, start);
        break;
      case "prims-algorithm":
        result = graphAlgorithms.prim(graph, start);
        break;
      case "kruskals-algorithm":
        result = graphAlgorithms.kruskal(graph);
        break;
      default:
        return res.status(400).json({
          error: "Invalid algorithm",
          algorithm: algorithm,
          supportedAlgorithms: [
            "breadth-first-search",
            "depth-first-search",
            "dijkstra",
            "prims-algorithm",
            "kruskals-algorithm",
          ],
        });
    }

    res.json(result);
  } catch (error) {
    console.error(`Error in /api/graph/${req.params.algorithm}:`, error);
    res.status(500).json({
      error: "Internal server error in graph algorithm",
      message: error.message,
      algorithm: req.params.algorithm,
    });
  }
};