const express = require("express");
const router = express.Router();
const heapController = require("../controllers/heapController");

router.post("/:operation", heapController.handleHeapOperation);

module.exports = router;