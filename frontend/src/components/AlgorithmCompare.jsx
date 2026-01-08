// components/AlgorithmCompare.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import AnimationArea from "./AnimationArea";
import BSTViewer from "./BSTViewer";
import GraphViewer from "./GraphViewer";
import CodeViewer from "./SortingViewer";
import ControlButtons from "./ControlButtons";
import SearchViewer from "./SearchViewer";
import "../styles/AlgorithmCompare.css";

const AlgorithmCompare = () => {
  const [domain, setDomain] = useState("sorting");
  const [algorithm1, setAlgorithm1] = useState("");
  const [algorithm2, setAlgorithm2] = useState("");
  const [inputData, setInputData] = useState("[5,2,8,1,3]");
  const [targetValue, setTargetValue] = useState("5");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500);

  const [algo1Data, setAlgo1Data] = useState({
    steps: [],
    pseudocode: [],
    explanations: [],
  });
  const [algo2Data, setAlgo2Data] = useState({
    steps: [],
    pseudocode: [],
    explanations: [],
  });

  const [comparisonResults, setComparisonResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const animationInterval = useRef(null);

  const algorithmsByDomain = {
    sorting: [
      "bubble-sort",
      "selection-sort",
      "insertion-sort",
      "merge-sort",
      "quick-sort",
      "heap-sort",
    ],
    searching: ["linear-search", "binary-search"],
    trees: ["binary-search-tree", "avl-tree"],
    graphs: ["breadth-first-search", "depth-first-search", "dijkstra"],
  };

  const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";
    // const BASE_URL = "http://localhost:5000/api";


  // Get the appropriate visualization component based on domain
  const getVisualizationComponent = (algorithm, data, stepIndex) => {
    const step =
      data.steps[stepIndex] || data.steps[data.steps.length - 1] || {};

    switch (domain) {
      case "trees":
        return <BSTViewer step={step} algorithm={algorithm} />;

      case "graphs":
        return <GraphViewer step={step} algorithm={algorithm} />;

      case "searching":
        return <SearchViewer step={step} algorithm={algorithm} />;

      case "sorting":
      default:
        return <AnimationArea step={step} algorithm={algorithm} />;
    }
  };

  // Get appropriate input placeholder and default data
  const getInputConfig = () => {
    switch (domain) {
      case "trees":
        return {
          placeholder: "Tree values (e.g., [5,2,8,1,3])",
          default: "[5,2,8,1,3]",
        };
      case "graphs":
        return {
          placeholder: "Graph data will be auto-generated",
          default: "graph",
        };
      case "searching":
        return {
          placeholder: "Array values (e.g., 1,3,5,7,9)",
          default: "1,3,5,7,9",
        };
      default: // sorting
        return {
          placeholder: "Array (e.g., [5,2,8,1,3])",
          default: "[5,2,8,1,3]",
        };
    }
  };

  // Animation control
  useEffect(() => {
    if (isPlaying && dataLoaded) {
      const maxSteps = Math.max(algo1Data.steps.length, algo2Data.steps.length);

      animationInterval.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            setAnimationComplete(true);
            calculateAndShowMetrics();
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }

    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, [
    isPlaying,
    dataLoaded,
    speed,
    algo1Data.steps.length,
    algo2Data.steps.length,
  ]);

  const runComparison = async () => {
    if (!algorithm1 || !algorithm2) {
      alert("Please select two algorithms to compare");
      return;
    }

    setIsLoading(true);
    setComparisonResults(null);
    setDataLoaded(false);
    setAnimationComplete(false);
    setCurrentStep(0);
    setIsPlaying(false);

    try {
      let requestBody1, requestBody2;

      // Prepare request bodies based on domain
      switch (domain) {
        case "sorting": {
          const array = parseArrayInput(inputData);
          requestBody1 = { array };
          requestBody2 = { array };
          break;
        }

        case "searching": {
          const array = parseArrayInput(inputData);
          const target = parseInt(targetValue);

          if (isNaN(target)) {
            alert("Please enter a valid target number");
            setIsLoading(false);
            return;
          }

          requestBody1 = { array, target };
          requestBody2 = { array, target };
          break;
        }

        case "trees": {
          const treeValues = parseArrayInput(inputData);
          await buildTreeComparison(treeValues, algorithm1, algorithm2);
          setIsLoading(false);
          return;
        }

        case "graphs": {
          const graph = getDefaultGraph();
          const startNode = "A";

          try {
            const requestBody = {
              graph: graph,
              start: startNode,
            };

            const [graphResult1, graphResult2] = await Promise.all([
              axios.post(`${BASE_URL}/graph/${algorithm1}`, requestBody, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                timeout: 10000,
              }),
              axios.post(`${BASE_URL}/graph/${algorithm2}`, requestBody, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                timeout: 10000,
              }),
            ]);

            setAlgo1Data(graphResult1.data);
            setAlgo2Data(graphResult2.data);
            setDataLoaded(true);
          } catch (error) {
            console.error("Graph algorithm error:", error);
            alert(
              `Graph algorithm failed: ${
                error.response?.data?.error || error.message
              }`
            );
          }
          break;
        }

        default: {
          requestBody1 = {};
          requestBody2 = {};
        }
      }

      // Run both algorithms
      if (domain === "searching") {
        const [result1, result2] = await Promise.all([
          axios.post(`${BASE_URL}/search/${algorithm1}`, requestBody1),
          axios.post(`${BASE_URL}/search/${algorithm2}`, requestBody2),
        ]);

        setAlgo1Data(result1.data);
        setAlgo2Data(result2.data);
      } else if (domain === "sorting") {
        const [result1, result2] = await Promise.all([
          axios.post(`${BASE_URL}/sort/${algorithm1}`, requestBody1),
          axios.post(`${BASE_URL}/sort/${algorithm2}`, requestBody2),
        ]);

        setAlgo1Data(result1.data);
        setAlgo2Data(result2.data);
      }

      setDataLoaded(true);
    } catch (error) {
      console.error("Error running comparison:", error);
      alert(
        "Error running algorithms comparison. Please check the console for details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for input parsing
  const parseArrayInput = (input) => {
    try {
      // Try to parse as JSON array first
      if (input.startsWith("[") && input.endsWith("]")) {
        return JSON.parse(input);
      }
      // Otherwise parse as comma-separated values
      return input
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n));
    } catch {
      // Fallback to comma-separated parsing
      return input
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n));
    }
  };

  const getDefaultGraph = () => ({
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 },
  });

  const calculateAndShowMetrics = () => {
    const metrics = calculateMetrics(
      algo1Data,
      algo2Data,
      algorithm1,
      algorithm2
    );
    setComparisonResults(metrics);
  };

  const calculateMetrics = (data1, data2, algo1, algo2) => {
    const steps1 = data1.steps?.length || 0;
    const steps2 = data2.steps?.length || 0;

    // Get complexity data
    const complexities = {
      // Sorting
      "bubble-sort": { time: "O(n²)", space: "O(1)" },
      "selection-sort": { time: "O(n²)", space: "O(1)" },
      "insertion-sort": { time: "O(n²)", space: "O(1)" },
      "merge-sort": { time: "O(n log n)", space: "O(n)" },
      "quick-sort": { time: "O(n log n)", space: "O(log n)" },
      "heap-sort": { time: "O(n log n)", space: "O(1)" },

      // Searching
      "linear-search": { time: "O(n)", space: "O(1)" },
      "binary-search": { time: "O(log n)", space: "O(1)" },

      // Trees
      "binary-search-tree": { time: "O(h)", space: "O(h)" },
      "avl-tree": { time: "O(log n)", space: "O(n)" },

      // Graphs
      "breadth-first-search": { time: "O(V+E)", space: "O(V)" },
      "depth-first-search": { time: "O(V+E)", space: "O(V)" },
      dijkstra: { time: "O(E log V)", space: "O(V)" },
    };

    const comp1 = complexities[algo1] || { time: "N/A", space: "N/A" };
    const comp2 = complexities[algo2] || { time: "N/A", space: "N/A" };

    // Determine which is more efficient
    let efficiencyExplanation = "";
    if (steps1 < steps2) {
      efficiencyExplanation = `${algo1.replace(
        "-",
        " "
      )} is more efficient with fewer steps (${steps1} vs ${steps2})`;
    } else if (steps2 < steps1) {
      efficiencyExplanation = `${algo2.replace(
        "-",
        " "
      )} is more efficient with fewer steps (${steps2} vs ${steps1})`;
    } else {
      efficiencyExplanation =
        "Both algorithms have similar performance for this input";
    }

    return {
      algorithm1: { name: algo1, steps: steps1, ...comp1 },
      algorithm2: { name: algo2, steps: steps2, ...comp2 },
      efficiencyExplanation,
    };
  };

  const handlePlayPause = () => {
    if (!dataLoaded) return;
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    if (!dataLoaded) return;
    const maxSteps = Math.max(algo1Data.steps.length, algo2Data.steps.length);
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAnimationComplete(true);
      calculateAndShowMetrics();
    }
  };

  const handleStepBackward = () => {
    if (!dataLoaded || currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setAnimationComplete(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setAnimationComplete(false);
    setComparisonResults(null);
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseInt(e.target.value));
  };

  const getCurrentExplanation = () => {
    if (!dataLoaded)
      return 'Click "Run Both Algorithms" to initialize comparison';

    // Check if we're at the final step
    const maxSteps = Math.max(algo1Data.steps.length, algo2Data.steps.length);
    const isFinalStep = currentStep >= maxSteps - 1 || animationComplete;

    if (isFinalStep) {
      return (
        <div className="step-explanations">
          <div className="explanation-item completion">
            <strong>{algorithm1.replace("-", " ")}:</strong> Algorithm
            completed!
          </div>
          <div className="explanation-item completion">
            <strong>{algorithm2.replace("-", " ")}:</strong> Algorithm
            completed!
          </div>
          <div className="completion-message">
            ✅ Both algorithms have finished execution. Check comparison results
            below.
          </div>
        </div>
      );
    }

    // Get explanations for current step (handle different step counts)
    const algo1Step = Math.min(currentStep, algo1Data.steps.length - 1);
    const algo2Step = Math.min(currentStep, algo2Data.steps.length - 1);

    const explanation1 =
      algo1Data.explanations?.[algo1Step] ||
      algo1Data.steps[algo1Step]?.explanation ||
      `Step ${algo1Step + 1} of ${algo1Data.steps.length}`;

    const explanation2 =
      algo2Data.explanations?.[algo2Step] ||
      algo2Data.steps[algo2Step]?.explanation ||
      `Step ${algo2Step + 1} of ${algo2Data.steps.length}`;

    return (
      <div className="step-explanations">
        <div className="explanation-item">
          <strong>{algorithm1.replace("-", " ")}:</strong> {explanation1}
        </div>
        <div className="explanation-item">
          <strong>{algorithm2.replace("-", " ")}:</strong> {explanation2}
        </div>
        <div className="step-progress">
          Progress: {currentStep + 1} / {maxSteps} steps
        </div>
      </div>
    );
  };

  const inputConfig = getInputConfig();

  return (
    <div className="algorithm-compare">
      {/* ADDED HEADER */}
      <div className="algorithm-header">
        <div className="header-left">
          <h2>Algorithm Comparison</h2>
        </div>
        <div className="header-right">
          <Link to="/home" className="nav-button">
            ← Back to Home
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="compare-controls">
        <h3>Algorithm Comparison - {domain.toUpperCase()}</h3>
        <div className="control-group">
          <select value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="sorting">Sorting</option>
            <option value="searching">Searching</option>
            <option value="trees">Tree</option>
            <option value="graphs">Graph</option>
          </select>

          <select
            value={algorithm1}
            onChange={(e) => setAlgorithm1(e.target.value)}
          >
            <option value="">Select Algorithm 1</option>
            {algorithmsByDomain[domain].map((algo) => (
              <option key={algo} value={algo}>
                {algo.replace("-", " ")}
              </option>
            ))}
          </select>

          <select
            value={algorithm2}
            onChange={(e) => setAlgorithm2(e.target.value)}
          >
            <option value="">Select Algorithm 2</option>
            {algorithmsByDomain[domain].map((algo) => (
              <option key={algo} value={algo}>
                {algo.replace("-", " ")}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder={inputConfig.placeholder}
          />

          {/* Show target input only for searching */}
          {domain === "searching" && (
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="Target value"
            />
          )}

          <button onClick={runComparison} disabled={isLoading}>
            {isLoading ? "Loading..." : "Run Both Algorithms"}
          </button>
        </div>

        {/* Animation Controls */}
        {dataLoaded && (
          <div className="animation-controls">
            <button
              onClick={handlePlayPause}
              disabled={!dataLoaded || animationComplete}
              className="play-pause-btn"
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Play Animation"}
            </button>

            <button onClick={handleReset} className="reset-btn">
              🔄 Reset
            </button>

            <div className="speed-control">
              <label>Speed: </label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={handleSpeedChange}
              />
              <span>{speed}ms</span>
            </div>

            <div className="step-info">
              Step: {currentStep + 1} /{" "}
              {Math.max(algo1Data.steps.length, algo2Data.steps.length)}
            </div>
          </div>
        )}
      </div>

      {/* Step Explanation */}
      <div className="step-explanation-box">
        <h4>Step Explanation</h4>
        <div className="explanation-content">{getCurrentExplanation()}</div>
      </div>

      <div className="comparison-container">
        {/* Algorithm 1 Panel */}
        <div className="algorithm-panel">
          <h3>{algorithm1 ? algorithm1.replace("-", " ") : "Algorithm 1"}</h3>
          {dataLoaded && (
            <>
              <div className="visualization-area">
                {getVisualizationComponent(algorithm1, algo1Data, currentStep)}
              </div>
              <CodeViewer
                code={algo1Data.pseudocode}
                currentLine={algo1Data.steps[currentStep]?.currentLine || -1}
                algorithm={algorithm1}
              />
            </>
          )}
        </div>

        {/* Algorithm 2 Panel */}
        <div className="algorithm-panel">
          <h3>{algorithm2 ? algorithm2.replace("-", " ") : "Algorithm 2"}</h3>
          {dataLoaded && (
            <>
              <div className="visualization-area">
                {getVisualizationComponent(algorithm2, algo2Data, currentStep)}
              </div>
              <CodeViewer
                code={algo2Data.pseudocode}
                currentLine={algo2Data.steps[currentStep]?.currentLine || -1}
                algorithm={algorithm2}
              />
            </>
          )}
        </div>
      </div>

      {/* Manual Step Controls */}
      {dataLoaded && (
        <ControlButtons
          onStepBackward={handleStepBackward}
          onStepForward={handleStepForward}
          currentStep={currentStep}
          totalSteps={Math.max(algo1Data.steps.length, algo2Data.steps.length)}
          setCurrentStep={setCurrentStep}
        />
      )}

      {/* Comparison Results - Show only after animation completes or manually */}
      {comparisonResults && animationComplete && (
        <div className="comparison-results">
          <h3>📊 Comparison Results</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <h4>⏱️ Time Complexity</h4>
              <p>
                <strong>{comparisonResults.algorithm1.name}:</strong>{" "}
                {comparisonResults.algorithm1.time}
              </p>
              <p>
                <strong>{comparisonResults.algorithm2.name}:</strong>{" "}
                {comparisonResults.algorithm2.time}
              </p>
            </div>

            <div className="metric-card">
              <h4>💾 Space Complexity</h4>
              <p>
                <strong>{comparisonResults.algorithm1.name}:</strong>{" "}
                {comparisonResults.algorithm1.space}
              </p>
              <p>
                <strong>{comparisonResults.algorithm2.name}:</strong>{" "}
                {comparisonResults.algorithm2.space}
              </p>
            </div>

            <div className="metric-card">
              <h4>🔢 Steps Count</h4>
              <p>
                <strong>{comparisonResults.algorithm1.name}:</strong>{" "}
                {comparisonResults.algorithm1.steps}
              </p>
              <p>
                <strong>{comparisonResults.algorithm2.name}:</strong>{" "}
                {comparisonResults.algorithm2.steps}
              </p>
            </div>
          </div>

          <div className="efficiency-explanation">
            <h4>📈 Efficiency Analysis</h4>
            <p>{comparisonResults.efficiencyExplanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmCompare;