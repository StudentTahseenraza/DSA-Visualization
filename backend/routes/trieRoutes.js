const express = require("express");
const router = express.Router();
const trieController = require("../controllers/trieController");

router.post("/:operation", trieController.handleTrieOperation);

module.exports = router;