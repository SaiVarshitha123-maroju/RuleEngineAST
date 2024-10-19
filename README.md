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
API Design
  The application exposes the following API endpoints:

  create_rule(rule_string): Takes a string representing a rule and returns a Node object representing the corresponding AST.
  
  combine_rules(rules): Accepts a list of rule strings and combines them into a single AST, minimizing redundant checks.
  
  check_eligibility(data): Takes a JSON representation of the combined rule's AST and a dictionary of user attributes, evaluates the rule, and returns True or False.

Installation:

  To set up the project locally, follow these steps:
  Clone the repository:
    git clone https://github.com/SaiVarshitha123-maroju/Zeotap.git

Navigate to the project directory:

  cd rule-engine-ast
Install dependencies (if applicable):

  npm install
Set up the database:

  Ensure your database server is running and set up the schema as described.
Start the application:

  npm start
Acknowledgments:

  OpenWeatherMap API for providing the weather data.
  Node.js, Express, and MongoDB for the backend architecture.




# Real-Time Data Processing System for Weather Monitoring

## Description

The **Real-Time Data Processing System for Weather Monitoring** is a Node.js application that continuously retrieves and processes weather data from the OpenWeatherMap API. Designed for major metropolitan areas in India, this system provides daily weather summaries, user-configurable alerts for specific conditions, and visualizations to enhance the understanding and accessibility of weather information.

## Features

- **Real-Time Weather Data Fetching**: Continuously fetches weather data every 5 minutes.
- **Daily Weather Summary Generation**: Aggregates data to provide average, maximum, and minimum temperatures, along with the dominant weather condition.
- **User-Configurable Alerts**: Allows users to set temperature thresholds and receive alerts for breaches.
- **Data Visualization**: Displays daily weather summaries and historical trends.
- **Scalable Architecture**: Easily extendable for additional weather parameters and features.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   git clone https://github.com/SaiVarshitha123-maroju/Zeotap.git
2. Navigate to the project directory:

  cd weather-monitoring-system
3.Install dependencies:

  npm install
4.Set up MongoDB:

Ensure that MongoDB is installed and running on your machine. You can use the default connection string provided in the code (mongodb://localhost:27017/weatherDB).
5.Obtain OpenWeatherMap API Key:

Sign up at OpenWeatherMap to obtain a free API key and configure it in your application.
6.Start the server:

  npm start
7.Usage:

The application will start fetching weather data every 5 minutes. You can modify the user configuration for temperature thresholds directly in the code
8.Acknowledgments:

  OpenWeatherMap API for providing the weather data.
  Node.js, Express, and MongoDB for the backend architecture.

