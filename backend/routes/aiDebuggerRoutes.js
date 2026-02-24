// backend/routes/aiDebuggerRoutes.js
const express = require('express');
const router = express.Router();
const debuggerController = require('../controllers/aiDebuggerController');

// POST /api/debug/algorithm - Debug user's algorithm
router.post('/algorithm', debuggerController.debugAlgorithm);

// POST /api/debug/trace - Trace a specific step
router.post('/trace', debuggerController.traceStep);

// POST /api/debug/fix - Suggest fix for error
router.post('/fix', debuggerController.suggestFix);

// GET /api/debug/templates - Get algorithm templates
router.get('/templates', debuggerController.getAlgorithmTemplates);

module.exports = router;