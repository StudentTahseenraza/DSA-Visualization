const express = require("express");
const router = express.Router();

// Import all route files
const arrayRoutes = require("./arrayRoutes");
const stringRoutes = require("./stringRoutes");
const stackRoutes = require("./stackRoutes");
const queueRoutes = require("./queueRoutes");
const recursionRoutes = require("./recursionRoutes");
const sortRoutes = require("./sortRoutes");
const graphRoutes = require("./graphRoutes");
const bstRoutes = require("./bstRoutes");
const linkedListRoutes = require("./linkedListRoutes");
const heapRoutes = require("./heapRoutes");
const trieRoutes = require("./trieRoutes");
const backtrackingRoutes = require("./backtrackingRoutes");
const greedyRoutes = require("./greedyRoutes");
const dpRoutes = require("./dpRoutes");
const searchRoutes = require("./searchRoutes");
const complexityRoutes = require("./complexityRoutes");

// Register all routes
router.use("/array", arrayRoutes);
router.use("/string", stringRoutes);
router.use("/stack", stackRoutes);
router.use("/queue", queueRoutes);
router.use("/recursion", recursionRoutes);
router.use("/sort", sortRoutes);
router.use("/graph", graphRoutes);
router.use("/bst", bstRoutes);
router.use("/linkedList", linkedListRoutes);
router.use("/heap", heapRoutes);
router.use("/trie", trieRoutes);
router.use("/backtracking", backtrackingRoutes);
router.use("/greedy", greedyRoutes);
router.use("/dp", dpRoutes);
router.use("/search", searchRoutes);
router.use("/complexity", complexityRoutes);

module.exports = router;