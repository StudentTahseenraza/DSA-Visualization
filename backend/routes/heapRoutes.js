// routes/heapRoutes.js
const express = require("express");
const router = express.Router();
const heapController = require("../controllers/heapController");

// Main heap operations
router.post("/:operation", heapController.handleHeapOperation);

// Get heap statistics
router.post("/stats", heapController.getHeapStats);

module.exports = router;