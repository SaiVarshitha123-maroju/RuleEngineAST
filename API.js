import express from "express";
const router = express.Router();

let lastSavedRule = null; // Temporary in-memory storage for the last rule

class Node {
  constructor({ type, operator, left, right, value }) {
    this.type = type;
    this.operator = operator || null;
    this.left = left || null;
    this.right = right || null;
    this.value = value || null;
  }

  save() {
    // Simulate saving to a database (currently just storing it in-memory)
    lastSavedRule = this;
    return Promise.resolve(this);
  }
}

// Function to parse rule strings and convert them into an AST
function parseRule(rule) {
  if (rule.includes("AND")) {
    const [leftRule, rightRule] = rule.split("AND", 2);
    return new Node({
      type: "operator",
      operator: "AND",
      left: parseRule(leftRule.trim()),
      right: parseRule(rightRule.trim()),
    });
  } else if (rule.includes("OR")) {
    const [leftRule, rightRule] = rule.split("OR", 2);
    return new Node({
      type: "operator",
      operator: "OR",
      left: parseRule(leftRule.trim()),
      right: parseRule(rightRule.trim()),
    });
  } else {
    return new Node({
      type: "operand",
      value: rule.trim(),
    });
  }
}

// Endpoint to create and save a new rule
router.post("/create_rule", (req, res) => {
  const ruleString = req.body.rule;
  const ast = parseRule(ruleString);
  ast
    .save()
    .then((savedNode) => res.status(201).json(savedNode))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Function to combine two ASTs with AND or OR operator
function combineASTs(ast1, ast2, operator = "AND") {
  return new Node({
    type: "operator",
    operator: operator,
    left: ast1,
    right: ast2,
  });
}

// Endpoint to combine multiple rules
router.post("/combine_rules", (req, res) => {
  const { rules, operator } = req.body;

  const combinedAST = rules.reduce((accum, rule) => {
    const ast = parseRule(rule);
    return combineASTs(accum, ast, operator);
  }, parseRule(rules[0]));

  combinedAST
    .save()
    .then((savedNode) => res.status(201).json(savedNode))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Function to evaluate the AST recursively
function evaluateCondition(ast, userData) {
  if (!ast.left && !ast.right) {
    return evaluateLeafCondition(ast.value, userData);
  }

  const leftResult = evaluateCondition(ast.left, userData);
  const rightResult = evaluateCondition(ast.right, userData);

  if (ast.operator === "AND") {
    return leftResult && rightResult;
  } else if (ast.operator === "OR") {
    return leftResult || rightResult;
  }

  throw new Error(`Unknown operator: ${ast.operator}`);
}

// Function to evaluate a leaf condition (like "age > 40")
// Function to evaluate a leaf condition (like "age >= 40")
function evaluateLeafCondition(condition, userData) {
  const regex = /([a-zA-Z]+)\s*(>=|<=|>|<|=)\s*(\d+)/;
  const match = condition.match(regex);

  if (!match) {
    throw new Error(`Invalid condition format: ${condition}`);
  }

  const [_, field, operator, value] = match;
  const fieldValue = userData[field];

  if (fieldValue === undefined) {
    throw new Error(`Field ${field} not found in user data`);
  }

  const numericFieldValue = Number(fieldValue);
  const numericValue = Number(value);

  switch (operator) {
    case ">":
      return numericFieldValue > numericValue;
    case "<":
      return numericFieldValue < numericValue;
    case "=":
      return numericFieldValue === numericValue;
    case ">=":
      return numericFieldValue >= numericValue;
    case "<=":
      return numericFieldValue <= numericValue;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

// Endpoint to check eligibility based on the most recent rule
// Endpoint to check eligibility based on the most recent rule
router.post("/check-eligibility", (req, res) => {
  const userData = req.body.data; // Get user data from the request body

  if (!lastSavedRule) {
    return res.status(400).json({ error: "No rule found to evaluate" });
  }

  try {
    const isEligible = evaluateCondition(lastSavedRule, userData);
    res.json({
      eligibility: isEligible ? "Eligible" : "Not Eligible",
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
