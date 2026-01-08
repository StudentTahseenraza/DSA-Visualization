const express = require("express");
const router = express.Router();
const arrayController = require("../controllers/arrayController");

router.post("/:operation", arrayController.handleArrayOperation);

module.exports = router;