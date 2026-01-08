const express = require("express");
const router = express.Router();
const recursionController = require("../controllers/recursionController");

router.post("/:operation", recursionController.handleRecursionOperation);

module.exports = router;