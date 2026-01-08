const express = require("express");
const router = express.Router();
const linkedListController = require("../controllers/linkedListController");

router.post("/:operation", linkedListController.handleLinkedListOperation);

module.exports = router;