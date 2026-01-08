const express = require("express");
const router = express.Router();
const bstController = require("../controllers/bstController");

router.post("/:operation", bstController.handleBSTOperation);

module.exports = router;