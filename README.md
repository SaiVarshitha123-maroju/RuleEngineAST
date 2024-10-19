# Rule Engine with Abstract Syntax Tree (AST)

## Description

The **Rule Engine with AST** is a 3-tier application designed to determine user eligibility based on various attributes such as age, department, income, and spending. This application utilizes an Abstract Syntax Tree (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of rules. The system consists of a simple UI, an API, and a backend data storage solution.

## Objectives

- Develop a rule engine to evaluate user eligibility based on defined conditions.
- Use AST to represent conditional rules for dynamic manipulation.
- Provide a user-friendly interface for rule creation and evaluation.

## Data Structure

The application defines a data structure for the AST, represented as nodes. Each node can have the following fields:

- `type`: A string indicating the node type (e.g., "operator" for AND/OR, "operand" for conditions).
- `left`: A reference to another Node (left child).
- `right`: A reference to another Node (right child for operators).
- `value`: An optional value for operand nodes (e.g., a number for comparisons).

### Sample AST Node Structure

```json
{
  "type": "operator",
  "left": {
    "type": "operand",
    "value": "age"
  },
  "right": {
    "type": "operand",
    "value": 30
  }
}
```
1.API Design
  The application exposes the following API endpoints:

  create_rule(rule_string): Takes a string representing a rule and returns a Node object representing the corresponding AST.
  
  combine_rules(rules): Accepts a list of rule strings and combines them into a single AST, minimizing redundant checks.
  
  check_eligibility(data): Takes a JSON representation of the combined rule's AST and a dictionary of user attributes, evaluates the rule, and returns True or False.

2.Installation:

  To set up the project locally, follow these steps:
  
  Clone the repository:
  
    git clone https://github.com/SaiVarshitha123-maroju/Zeotap.git

3.Navigate to the project directory:

  cd rule-engine-ast
  
4.Install dependencies (if applicable):

  npm install
  
5.Set up the database:

  Ensure your database server is running and set up the schema as described.
  
6.Start the application:

  npm start
  
7.Acknowledgments:

  Node.js, Express, and MongoDB for the backend architecture.

