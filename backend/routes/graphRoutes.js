const express = require("express");
const router = express.Router();
const graphController = require("../controllers/graphController");

router.post("/:algorithm", graphController.handleGraphAlgorithm);

module.exports = router;