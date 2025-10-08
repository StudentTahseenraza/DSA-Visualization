// backend/stackOperations.js
class Stack {
  constructor() {
    this.items = [];
    this.steps = [];
  }

  push(value) {
    this.steps = [];

    // Step 1: Show current stack before push
    this.steps.push({
      stack: [...this.items],
      action: "start",
      message: `Preparing to push ${value} onto the stack`,
      highlightIndex: -1,
    });

    // Step 2: Show the value being pushed
    this.steps.push({
      stack: [...this.items],
      action: "push-start",
      value: value,
      message: `Pushing ${value} onto the stack...`,
      highlightIndex: -1,
    });

    // Step 3: Add to stack with animation
    this.items.push(value);

    this.steps.push({
      stack: [...this.items],
      action: "push",
      value: value,
      message: `${value} has been pushed onto the stack. New size: ${this.items.length}`,
      highlightIndex: this.items.length - 1,
    });

    return this.steps;
  }

  // Update pop method:
  pop() {
    this.steps = [];

    // Step 1: Show current stack before pop
    this.steps.push({
      stack: [...this.items],
      action: "start",
      message: "Preparing to pop from the stack",
      highlightIndex: this.items.length - 1,
    });

    if (this.isEmpty()) {
      this.steps.push({
        stack: [...this.items],
        action: "error",
        message: "Stack underflow: Cannot pop from empty stack",
        highlightIndex: -1,
      });
      return this.steps;
    }

    // Step 2: Highlight the element being popped
    const value = this.items[this.items.length - 1];
    this.steps.push({
      stack: [...this.items],
      action: "pop-start",
      value: value,
      message: `Popping ${value} from the top of the stack...`,
      highlightIndex: this.items.length - 1,
    });

    // Step 3: Remove from stack
    this.items.pop();

    this.steps.push({
      stack: [...this.items],
      action: "pop",
      value: value,
      message: `${value} has been popped from the stack. New size: ${this.items.length}`,
      highlightIndex: -1,
    });

    return this.steps;
  }

  peek() {
    this.steps = [];
    this.steps.push({
      stack: [...this.items],
      action: "start",
      message: "Peeking at the top of the stack",
    });

    if (this.isEmpty()) {
      this.steps.push({
        stack: [...this.items],
        action: "error",
        message: "Stack is empty",
      });
      return this.steps;
    }

    const value = this.items[this.items.length - 1];

    this.steps.push({
      stack: [...this.items],
      action: "peek",
      value,
      message: `Top element is ${value}`,
    });

    return this.steps;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  infixToPostfix(expression) {
    this.steps = [];
    this.steps.push({
      expression,
      stack: [],
      output: [],
      action: "start",
      message: `Converting infix expression '${expression}' to postfix notation`,
    });

    let output = [];
    const stack = [];
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "^": 3,
    };

    const tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\)|\^)/g) || [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      this.steps.push({
        expression,
        token,
        stack: [...stack],
        output: [...output],
        action: "process-token",
        message: `Processing token: ${token}`,
      });

      if (/^\d+$/.test(token)) {
        // Operand
        output.push(token);

        this.steps.push({
          expression,
          token,
          stack: [...stack],
          output: [...output],
          action: "operand",
          message: `Token is operand, adding to output: ${token}`,
        });
      } else if (token === "(") {
        // Left parenthesis
        stack.push(token);

        this.steps.push({
          expression,
          token,
          stack: [...stack],
          output: [...output],
          action: "left-paren",
          message: `Token is '(', pushing to stack`,
        });
      } else if (token === ")") {
        // Right parenthesis
        this.steps.push({
          expression,
          token,
          stack: [...stack],
          output: [...output],
          action: "right-paren-start",
          message: `Token is ')', popping from stack until '(' is found`,
        });

        while (stack.length > 0 && stack[stack.length - 1] !== "(") {
          const op = stack.pop();
          output.push(op);

          this.steps.push({
            expression,
            token,
            stack: [...stack],
            output: [...output],
            action: "right-paren-pop",
            message: `Popped operator ${op} from stack and added to output`,
          });
        }

        if (stack.length > 0 && stack[stack.length - 1] === "(") {
          stack.pop();

          this.steps.push({
            expression,
            token,
            stack: [...stack],
            output: [...output],
            action: "right-paren-remove",
            message: `Removed '(' from stack`,
          });
        }
      } else {
        // Operator
        this.steps.push({
          expression,
          token,
          stack: [...stack],
          output: [...output],
          action: "operator-check",
          message: `Token is operator ${token}, checking precedence`,
        });

        while (
          stack.length > 0 &&
          stack[stack.length - 1] !== "(" &&
          precedence[token] <= precedence[stack[stack.length - 1]]
        ) {
          const op = stack.pop();
          output.push(op);

          this.steps.push({
            expression,
            token,
            stack: [...stack],
            output: [...output],
            action: "operator-pop",
            message: `Popped higher precedence operator ${op} from stack`,
          });
        }

        stack.push(token);

        this.steps.push({
          expression,
          token,
          stack: [...stack],
          output: [...output],
          action: "operator-push",
          message: `Pushed operator ${token} to stack`,
        });
      }
    }

    // Pop all remaining operators from stack
    this.steps.push({
      expression,
      stack: [...stack],
      output: [...output],
      action: "final-pop-start",
      message: "Popping all remaining operators from stack",
    });

    while (stack.length > 0) {
      const op = stack.pop();
      if (op !== "(") {
        output.push(op);

        this.steps.push({
          expression,
          stack: [...stack],
          output: [...output],
          action: "final-pop",
          message: `Popped operator ${op} from stack and added to output`,
        });
      }
    }

    const result = output.join(" ");

    this.steps.push({
      expression,
      result,
      action: "complete",
      message: `Conversion complete. Postfix expression: ${result}`,
    });

    return this.steps;
  }

  checkParentheses(expression) {
    this.steps = [];
    this.steps.push({
      expression,
      stack: [],
      action: "start",
      message: `Checking parentheses in expression: ${expression}`,
    });

    const stack = [];
    const pairs = {
      ")": "(",
      "]": "[",
      "}": "{",
    };

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      this.steps.push({
        expression,
        char,
        position: i,
        stack: [...stack],
        action: "process-char",
        message: `Processing character '${char}' at position ${i}`,
      });

      if (["(", "[", "{"].includes(char)) {
        stack.push({ char, position: i });

        this.steps.push({
          expression,
          char,
          position: i,
          stack: [...stack],
          action: "push-paren",
          message: `Pushed opening parenthesis '${char}' to stack`,
        });
      } else if ([")", "]", "}"].includes(char)) {
        if (stack.length === 0) {
          this.steps.push({
            expression,
            char,
            position: i,
            stack: [...stack],
            action: "error",
            message: `Unmatched closing parenthesis '${char}' at position ${i}`,
          });
          return this.steps;
        }

        const top = stack.pop();

        this.steps.push({
          expression,
          char,
          position: i,
          topChar: top.char,
          topPosition: top.position,
          stack: [...stack],
          action: "pop-paren",
          message: `Popped '${top.char}' from stack to match with '${char}'`,
        });

        if (pairs[char] !== top.char) {
          this.steps.push({
            expression,
            char,
            position: i,
            expected: pairs[char],
            actual: top.char,
            action: "mismatch",
            message: `Mismatched parentheses: Expected '${pairs[char]}' but found '${top.char}'`,
          });
          return this.steps;
        }
      }
    }

    if (stack.length > 0) {
      const unmatched = stack.pop();

      this.steps.push({
        expression,
        char: unmatched.char,
        position: unmatched.position,
        stack: [...stack],
        action: "error",
        message: `Unmatched opening parenthesis '${unmatched.char}' at position ${unmatched.position}`,
      });
    } else {
      this.steps.push({
        expression,
        action: "success",
        message: "All parentheses are properly matched",
      });
    }

    return this.steps;
  }

  evaluatePostfix(expression) {
    this.steps = [];
    this.steps.push({
      expression,
      stack: [],
      action: "start",
      message: `Evaluating postfix expression: ${expression}`,
    });

    const stack = [];
    const tokens = expression.split(/\s+/);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      this.steps.push({
        expression,
        token,
        position: i,
        stack: [...stack],
        action: "process-token",
        message: `Processing token: ${token}`,
      });

      if (/^\d+$/.test(token)) {
        // Operand
        stack.push(parseInt(token));

        this.steps.push({
          expression,
          token,
          stack: [...stack],
          action: "push-operand",
          message: `Pushed operand ${token} to stack`,
        });
      } else {
        // Operator
        if (stack.length < 2) {
          this.steps.push({
            expression,
            token,
            stack: [...stack],
            action: "error",
            message: `Insufficient operands for operator ${token}`,
          });
          return this.steps;
        }

        const b = stack.pop();
        const a = stack.pop();

        this.steps.push({
          expression,
          token,
          a,
          b,
          stack: [...stack],
          action: "pop-operands",
          message: `Popped operands: ${a} and ${b}`,
        });

        let result;
        switch (token) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = a / b;
            break;
          case "^":
            result = Math.pow(a, b);
            break;
          default:
            this.steps.push({
              expression,
              token,
              action: "error",
              message: `Invalid operator: ${token}`,
            });
            return this.steps;
        }

        stack.push(result);

        this.steps.push({
          expression,
          token,
          a,
          b,
          result,
          stack: [...stack],
          action: "push-result",
          message: `Calculated ${a} ${token} ${b} = ${result}, pushed to stack`,
        });
      }
    }

    if (stack.length !== 1) {
      this.steps.push({
        expression,
        stack: [...stack],
        action: "error",
        message: `Invalid expression: ${stack.length} values left in stack`,
      });
    } else {
      this.steps.push({
        expression,
        result: stack[0],
        action: "complete",
        message: `Evaluation complete. Result: ${stack[0]}`,
      });
    }

    return this.steps;
  }
}

const stackOperations = (operation, ...args) => {
  const stack = new Stack();

  const pseudocode = {
    push: ["add element to top of stack", "increment stack pointer"],
    pop: [
      "if stack is not empty:",
      "  remove element from top of stack",
      "  decrement stack pointer",
      "  return removed element",
      "else:",
      "  return error (stack underflow)",
    ],
    peek: [
      "if stack is not empty:",
      "  return top element without removing it",
      "else:",
      "  return error",
    ],
    infixToPostfix: [
      "initialize empty stack and output",
      "for each token in expression:",
      "  if token is operand: add to output",
      "  if token is (: push to stack",
      "  if token is ): pop from stack to output until ( is found",
      "  if token is operator:",
      "    while stack not empty and top has higher precedence:",
      "      pop from stack to output",
      "    push token to stack",
      "pop all remaining operators to output",
    ],
    checkParentheses: [
      "initialize empty stack",
      "for each character in expression:",
      "  if character is opening parenthesis: push to stack",
      "  if character is closing parenthesis:",
      "    if stack is empty: return error",
      "    pop from stack and check if it matches",
      "    if not matching: return error",
      "if stack is not empty: return error",
      "else: return success",
    ],
    evaluatePostfix: [
      "initialize empty stack",
      "for each token in expression:",
      "  if token is operand: push to stack",
      "  if token is operator:",
      "    pop two operands from stack",
      "    apply operator to operands",
      "    push result to stack",
      "result is the only element left in stack",
    ],
  };

  let steps;
  switch (operation) {
    case "push":
      steps = stack.push(args[0]);
      break;
    case "pop":
      steps = stack.pop();
      break;
    case "peek":
      steps = stack.peek();
      break;
    case "infixToPostfix":
      steps = stack.infixToPostfix(args[0]);
      break;
    case "checkParentheses":
      steps = stack.checkParentheses(args[0]);
      break;
    case "evaluatePostfix":
      steps = stack.evaluatePostfix(args[0]);
      break;
    default:
      return { steps: [], pseudocode: [], error: "Invalid operation" };
  }

  return { steps, pseudocode: pseudocode[operation], stack: stack.items };
};

module.exports = stackOperations;
