// components/InputPanel.jsx
import { motion } from "framer-motion";

const InputPanel = ({
  category,
  inputData,
  onInputChange,
  onRunComparison,
  comparisonRunning,
  canRun,
}) => {
  const getInputPlaceholder = (cat) => {
    switch (cat) {
      case "sorting":
        return "Enter numbers separated by commas: 64,34,25,12,22,11,90";
      case "searching":
        return "Enter target number to search: 25";
      case "graphs":
        return "Enter graph edges: A,B,4|A,C,2|B,D,5";
      case "backtracking":
        return "Enter board size (for n-queens): 4";
      case "greedy":
        return "Enter activities: 1,3|2,5|4,6";
      default:
        return "Enter input data...";
    }
  };

  const generateRandomInput = () => {
  switch (category) {
    case "sorting": {
      const randomArray = Array.from(
        { length: 8 }, () => Math.floor(Math.random() * 100) + 1
      );
      onInputChange(randomArray.join(","));
      break;
    }
    case "searching": {
      onInputChange(Math.floor(Math.random() * 100) + 1);
      break;
    }
    default: {
      onInputChange("5"); // Default random input
    }
  }
};


  return (
    <div className="input-panel">
      <h3>2. Provide Input Data</h3>

      <div className="input-group">
        <label>Input Data:</label>
        <textarea
          value={inputData}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={getInputPlaceholder(category)}
          rows={4}
        />
      </div>

      <div className="input-actions">
        <motion.button
          className="generate-random"
          onClick={generateRandomInput}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Random Input
        </motion.button>

        <motion.button
          className={`run-comparison ${!canRun ? "disabled" : ""}`}
          onClick={onRunComparison}
          disabled={!canRun || comparisonRunning}
          whileHover={canRun ? { scale: 1.05 } : {}}
          whileTap={canRun ? { scale: 0.95 } : {}}
        >
          {comparisonRunning ? "Running Comparison..." : "Run Comparison"}
        </motion.button>
      </div>

      {comparisonRunning && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Executing algorithms with same input data...</span>
        </div>
      )}
    </div>
  );
};

export default InputPanel;
