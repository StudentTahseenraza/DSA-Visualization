const express = require("express");
const router = express.Router();
const sortController = require("../controllers/sortController");

router.post("/:algorithm", sortController.handleSort);

module.exports = router;