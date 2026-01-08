const express = require("express");
const router = express.Router();
const backtrackingController = require("../controllers/backtrackingController");

router.post("/:algorithm", backtrackingController.handleBacktrackingAlgorithm);

module.exports = router;