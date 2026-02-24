// backend/routes/aiVisualizationRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiVisualizationController');

// POST /api/ai/visualize - Generate visualization from user code
router.post('/visualize', aiController.visualizeCode);

// GET /api/ai/languages - Get supported languages
router.get('/languages', aiController.getSupportedLanguages);

// POST /api/ai/validate - Validate code before visualization
router.post('/validate', aiController.validateCode);

module.exports = router;