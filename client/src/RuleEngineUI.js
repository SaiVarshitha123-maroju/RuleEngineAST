import React, { useState } from "react";
import axios from "axios";
import "./rule.css";

const RuleEngineUI = () => {
  const [rule, setRule] = useState("");
  const [rules, setRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null); // To store the combined rule
  const [evaluationData, setEvaluationData] = useState({ age: "", salary: "" });
  const [result, setResult] = useState(null);

  const handleCreateRule = async () => {
    try {
      // eslint-disable-next-line
      const response = await axios.post(
        "http://localhost:9000/rules/create_rule",
        {
          rule: rule,
        }
      );
      alert("Rule created successfully!");
      setRules([...rules, rule]); // Add created rule to the list
      setRule(""); // Clear input after creation
    } catch (error) {
      alert("Error creating rule");
      console.error(error);
    }
  };

  const handleCombineRules = () => {
    if (rules.length < 2) {
      alert("You need at least two rules to combine!");
      return;
    }
    const combined = rules.join(" AND "); // Combine rules with "AND" or you can add an option for "OR"
    setCombinedRule(combined);
  };
  const handleCombineRulesOR = () => {
    if (rules.length < 2) {
      alert("You need at least two rules to combine!");
      return;
    }
    const combined = rules.join(" OR "); // Combine rules with "AND" or you can add an option for "OR"
    setCombinedRule(combined);
  };

  function parseRule(rule) {
    if (rule.includes("AND")) {
      const [leftRule, rightRule] = rule.split("AND", 2);
      return {
        type: "operator",
        operator: "AND",
        left: parseRule(leftRule.trim()),
        right: parseRule(rightRule.trim()),
      };
    } else if (rule.includes("OR")) {
      const [leftRule, rightRule] = rule.split("OR", 2);
      return {
        type: "operator",
        operator: "OR",
        left: parseRule(leftRule.trim()),
        right: parseRule(rightRule.trim()),
      };
    } else {
      return {
        type: "operand",
        value: rule.trim(),
      };
    }
  }

  const handleEvaluateRule = async () => {
    try {
      let ast;
      if (combinedRule) {
        ast = parseRule(combinedRule); // Parse combined rule
      } else if (rules.length > 0) {
        ast = parseRule(rules[rules.length - 1]); // Use the last created rule if no combined rule
      } else {
        // Default AST if no rule is available
        ast = {
          type: "operator",
          operator: "AND",
          left: { type: "operand", value: "age > 25" },
          right: { type: "operand", value: "salary < 50000" },
        };
      }

      const response = await axios.post(
        "http://localhost:9000/rules/check-eligibility",
        {
          ast, // This might not be necessary if you only want to evaluate based on the last saved rule
          data: {
            age: Number(evaluationData.age),
            salary: Number(evaluationData.salary),
          },
        }
      );

      setResult(response.data.eligibility === "Eligible"); // Set result based on response
    } catch (error) {
      alert("Error evaluating rule");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Rule Engine</h1>

      {/* Rule Creation */}
      <h2>Create a Rule</h2>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="Enter rule (e.g., age > 25 AND salary < 50000)"
        style={{ width: "100%", padding: "10px" }}
      />
      <button onClick={handleCreateRule} style={{ marginTop: "10px" }}>
        Create Rule
      </button>

      {/* Display Created Rules */}
      {rules.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Created Rules:</h3>
          <ul>
            {rules.map((r, index) => (
              <li key={index}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Rule Combination */}
      {rules.length > 1 && (
        <>
          <button onClick={handleCombineRules} style={{ marginTop: "20px" }}>
            Combine Rules with AND
          </button>
          <button onClick={handleCombineRulesOR} style={{ marginTop: "20px" }}>
            Combine Rules with OR
          </button>

          {combinedRule && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <h3>Combined Rule:</h3>
              <p>{combinedRule}</p>
            </div>
          )}
        </>
      )}

      {/* Evaluation */}
      <h2>Evaluate a Rule</h2>
      <input
        type="number"
        placeholder="Age"
        value={evaluationData.age}
        onChange={(e) =>
          setEvaluationData({ ...evaluationData, age: e.target.value })
        }
        style={{ width: "100%", padding: "10px", marginBottom: "1px" }}
      />
      <input
        type="number"
        placeholder="Salary"
        value={evaluationData.salary}
        onChange={(e) =>
          setEvaluationData({ ...evaluationData, salary: e.target.value })
        }
        style={{ width: "100%", padding: "10px" }}
      />
      <button onClick={handleEvaluateRule} style={{ marginTop: "10px" }}>
        Evaluate Rule
      </button>

      {/* Display Result */}
      {result !== null && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Evaluation Result: {result ? "Eligible" : "Not Eligible"}</h3>
        </div>
      )}
    </div>
  );
};

export default RuleEngineUI;
