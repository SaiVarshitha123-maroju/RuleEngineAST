import React from "react";
import RuleEngineUI from "../src/RuleEngineUI.js"; // Import your RuleEngineUI component
import "./App.css"; // Optional: You can style your app using a CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Rule Engine Application</h1>
      </header>
      <main>
        {/* Render the RuleEngineUI component */}
        <RuleEngineUI />
      </main>
    </div>
  );
}

export default App;
