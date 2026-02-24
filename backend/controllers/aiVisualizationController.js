// backend/controllers/aiVisualizationController.js
const aiVisualizationService = require('../services/aiVisualizationService');

exports.visualizeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Validate input
    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Code is required'
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        error: 'Language is required'
      });
    }

    // Validate language
    const supportedLanguages = ['python', 'javascript', 'java', 'cpp', 'c++', 'js', 'py'];
    const normalizedLanguage = language.toLowerCase();
    
    if (!supportedLanguages.includes(normalizedLanguage) && 
        !supportedLanguages.includes(normalizedLanguage.replace('++', ''))) {
      return res.status(400).json({
        success: false,
        error: `Language must be one of: Python, JavaScript, Java, C++`
      });
    }

    // Generate visualization steps
    const visualizationData = await aiVisualizationService.generateStepsFromCode(code, language);

    // Add success response
    res.json({
      success: true,
      ...visualizationData,
      metadata: {
        source: 'ai',
        language: language,
        timestamp: new Date().toISOString(),
        codeLength: code.length
      }
    });

  } catch (error) {
    console.error('Visualization controller error:', error);
    
    // Send appropriate error response
    res.status(500).json({
      success: false,
      error: 'Failed to generate visualization',
      details: error.message,
      suggestion: 'Please check your code and try again. Make sure it contains a valid algorithm.'
    });
  }
};

exports.getSupportedLanguages = (req, res) => {
  res.json({
    success: true,
    languages: [
      { id: 'python', name: 'Python', extension: '.py' },
      { id: 'javascript', name: 'JavaScript', extension: '.js' },
      { id: 'java', name: 'Java', extension: '.java' },
      { id: 'cpp', name: 'C++', extension: '.cpp' }
    ]
  });
};

exports.validateCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    // Basic validation
    if (!code || !code.trim()) {
      return res.json({
        success: false,
        valid: false,
        message: 'Code is empty'
      });
    }

    // Check code length
    if (code.length > 10000) {
      return res.json({
        success: false,
        valid: false,
        message: 'Code is too long (max 10000 characters)'
      });
    }

    // Quick heuristic checks
    const hasAlgorithm = /for|while|if|function|def|class|=>|->/.test(code);
    const hasDataStructure = /\[.*\]|array|list|stack|queue|tree|graph/.test(code.toLowerCase());

    res.json({
      success: true,
      valid: true,
      analysis: {
        hasAlgorithm,
        hasDataStructure,
        lineCount: code.split('\n').length,
        characterCount: code.length,
        likelyAlgorithm: aiVisualizationService.detectAlgorithmType(code)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};