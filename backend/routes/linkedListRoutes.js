const express = require("express");
const router = express.Router();
const linkedListController = require("../controllers/linkedListController");

// Support all operations: insert, delete, search, traverse, bulk-insert, insert-at-beginning, traverse-backward
router.post("/:operation", linkedListController.handleLinkedListOperation);

module.exports = router;