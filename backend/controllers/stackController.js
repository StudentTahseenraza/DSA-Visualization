const { stackOperations } = require("../index");

exports.handleStackOperation = (req, res) => {
  const { operation } = req.params;
  const { value, expression, stackState } = req.body;

  try {
    let result;
    switch (operation) {
      case "push":
        result = stackOperations("push", value, stackState);
        break;
      case "pop":
        result = stackOperations("pop", stackState);
        break;
      case "peek":
        result = stackOperations("peek", stackState);
        break;
      case "infixToPostfix":
        result = stackOperations("infixToPostfix", expression, stackState);
        break;
      case "checkParentheses":
        result = stackOperations("checkParentheses", expression, stackState);
        break;
      case "evaluatePostfix":
        result = stackOperations("evaluatePostfix", expression, stackState);
        break;
      default:
        return res.status(400).json({ error: "Invalid stack operation" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error in /api/stack/${operation}:`, error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};