// backend/controllers/aiDebuggerController.js
const aiDebuggerService = require('../services/aiDebuggerService');

exports.debugAlgorithm = async (req, res) => {
  try {
    const { code, algorithmType, testCases } = req.body;

    // Validate input
    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Code is required'
      });
    }

    if (!algorithmType) {
      return res.status(400).json({
        success: false,
        error: 'Algorithm type is required'
      });
    }

    // Generate default test cases if not provided
    const finalTestCases = testCases || generateDefaultTestCases(algorithmType);

    // Debug the code
    const debugResult = await aiDebuggerService.debugAlgorithm(code, algorithmType, finalTestCases);

    res.json({
      success: true,
      ...debugResult,
      metadata: {
        algorithmType,
        testCasesUsed: finalTestCases,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Debug controller error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to debug algorithm',
      details: error.message
    });
  }
};

exports.traceStep = async (req, res) => {
  try {
    const { code, testCase, stepNumber } = req.body;

    if (!code || !testCase) {
      return res.status(400).json({
        success: false,
        error: 'Code and test case are required'
      });
    }

    const trace = await aiDebuggerService.traceExecution(code, testCase);

    const response = {
      success: true,
      step: trace.steps && stepNumber < trace.steps.length ? trace.steps[stepNumber] : null,
      totalSteps: trace.steps?.length || 0,
      firstErrorAt: trace.errorAt,
      isError: stepNumber >= trace.errorAt
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.suggestFix = async (req, res) => {
  try {
    const { error, code } = req.body;

    if (!error || !code) {
      return res.status(400).json({
        success: false,
        error: 'Error details and code are required'
      });
    }

    const fix = await aiDebuggerService.suggestFix(error, code);

    res.json({
      success: true,
      ...fix
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAlgorithmTemplates = (req, res) => {
  const templates = {
    'bubble-sort': `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    
    'binary-search': `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    
    'fibonacci': `def fibonacci(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]`
  };

  res.json({
    success: true,
    templates
  });
};

// Helper function to generate default test cases
function generateDefaultTestCases(algorithmType) {
  const testCases = {
    'bubble-sort': [
      { input: [5, 2, 8, 1, 4] },
      { input: [3, 0, -1, 7, 2] },
      { input: [1, 2, 3, 4, 5] }
    ],
    'selection-sort': [
      { input: [5, 2, 8, 1, 4] },
      { input: [3, 0, -1, 7, 2] }
    ],
    'insertion-sort': [
      { input: [5, 2, 8, 1, 4] },
      { input: [3, 0, -1, 7, 2] }
    ],
    'merge-sort': [
      { input: [5, 2, 8, 1, 4] },
      { input: [3, 0, -1, 7, 2] }
    ],
    'quick-sort': [
      { input: [5, 2, 8, 1, 4] },
      { input: [3, 0, -1, 7, 2] }
    ],
    'binary-search': [
      { input: { arr: [1, 3, 5, 7, 9], target: 5 } },
      { input: { arr: [2, 4, 6, 8, 10], target: 7 } }
    ],
    'fibonacci': [
      { input: 5 },
      { input: 8 },
      { input: 10 }
    ]
  };

  return testCases[algorithmType] || [{ input: [5, 2, 8, 1, 4] }];
}