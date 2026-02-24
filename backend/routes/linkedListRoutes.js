const express = require("express");
const router = express.Router();
const linkedListController = require("../controllers/linkedListController");

// Support all operations: insert, delete, search, traverse, bulk-insert
router.post("/:operation", linkedListController.handleLinkedListOperation);

module.exports = router;