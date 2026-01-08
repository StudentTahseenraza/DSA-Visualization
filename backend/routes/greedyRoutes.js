const express = require("express");
const router = express.Router();
const greedyController = require("../controllers/greedyController");

router.post("/:algorithm", greedyController.handleGreedyAlgorithm);

module.exports = router;