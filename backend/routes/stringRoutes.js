const express = require("express");
const router = express.Router();
const stringController = require("../controllers/stringController");

router.post("/:operation", stringController.handleStringOperation);

module.exports = router;