const express = require('express');
const router = express.Router();
const { handleDPAnalysis } = require('../controllers/dpAnalysisController');

router.post('/:algorithm', handleDPAnalysis);

module.exports = router;