// backend/controllers/stringController.js
const { stringOperations } = require("../index");

exports.handleStringOperation = (req, res) => {
  const { operation } = req.params;
  const { value, pattern, stringState, str2 } = req.body;

  try {
    let result;
    let finalResult = {};
    let complexity = {};
    let optimizationTips = [];
    let realWorldUseCases = [];
    let codeSnippets = {};

    switch (operation) {
      case "reverse":
        result = stringOperations("reverse", stringState);
        finalResult = result.result;
        complexity = result.complexity;
        optimizationTips = result.optimizationTips;
        realWorldUseCases = result.realWorldUseCases;
        codeSnippets = result.codeSnippets;
        break;
      case "checkPalindrome":
        result = stringOperations("checkPalindrome", stringState);
        finalResult = result.result;
        complexity = result.complexity;
        optimizationTips = result.optimizationTips;
        realWorldUseCases = result.realWorldUseCases;
        codeSnippets = result.codeSnippets;
        break;
      case "kmpSearch":
        result = stringOperations("kmpSearch", pattern, stringState);
        finalResult = result.result;
        complexity = result.complexity;
        optimizationTips = result.optimizationTips;
        realWorldUseCases = result.realWorldUseCases;
        codeSnippets = result.codeSnippets;
        break;
      case "rabinKarpSearch":
        result = stringOperations("rabinKarpSearch", pattern, stringState);
        finalResult = result.result;
        complexity = result.complexity;
        optimizationTips = result.optimizationTips;
        realWorldUseCases = result.realWorldUseCases;
        codeSnippets = result.codeSnippets;
        break;
      case "longestCommonSubstring":
        result = stringOperations("longestCommonSubstring", stringState, str2);
        finalResult = result.result;
        complexity = result.complexity;
        optimizationTips = result.optimizationTips;
        realWorldUseCases = result.realWorldUseCases;
        codeSnippets = result.codeSnippets;
        break;
      case "checkAnagram":
        result = stringOperations("checkAnagram", stringState, str2);
        finalResult = result.result;
        complexity = result.complexity;
        optimizationTips = result.optimizationTips;
        realWorldUseCases = result.realWorldUseCases;
        codeSnippets = result.codeSnippets;
        break;
      default:
        return res.status(400).json({ error: "Invalid string operation" });
    }

    res.json({
      steps: result.steps || [],
      pseudocode: result.pseudocode || [],
      explanations: result.explanations || [],
      result: finalResult,
      complexity: complexity,
      optimizationTips: optimizationTips,
      realWorldUseCases: realWorldUseCases,
      codeSnippets: codeSnippets
    });
  } catch (error) {
    console.error(`Error in /api/string/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};