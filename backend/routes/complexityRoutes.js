const express = require("express");
const router = express.Router();
const complexityController = require("../controllers/complexityController");

router.post("/analyze", complexityController.analyzeComplexity);
router.get("/algorithms", complexityController.getAlgorithms);

module.exports = router;