const { stringOperations } = require("../index");

exports.handleStringOperation = (req, res) => {
  const { operation } = req.params;
  const { value, pattern, stringState, str2 } = req.body;

  try {
    let result;
    switch (operation) {
      case "reverse":
        result = stringOperations("reverse", stringState);
        break;
      case "checkPalindrome":
        result = stringOperations("checkPalindrome", stringState);
        break;
      case "kmpSearch":
        result = stringOperations("kmpSearch", pattern, stringState);
        break;
      case "rabinKarpSearch":
        result = stringOperations("rabinKarpSearch", pattern, stringState);
        break;
      case "longestCommonSubstring":
        result = stringOperations("longestCommonSubstring", stringState, str2);
        break;
      case "checkAnagram":
        result = stringOperations("checkAnagram", stringState, str2);
        break;
      default:
        return res.status(400).json({ error: "Invalid string operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/string/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};