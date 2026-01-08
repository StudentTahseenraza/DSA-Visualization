const express = require("express");
const router = express.Router();
const stackController = require("../controllers/stackController");

router.post("/:operation", stackController.handleStackOperation);

module.exports = router;