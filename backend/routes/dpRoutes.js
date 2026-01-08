const express = require("express");
const router = express.Router();
const dpController = require("../controllers/dpController");

router.post("/:algorithm", dpController.handleDPAlgorithm);

module.exports = router;