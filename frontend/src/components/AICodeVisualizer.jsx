// frontend/src/components/AICodeVisualizer.jsx
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AnimationArea from './AnimationArea';
import SortingViewer from './SortingViewer';
import '../styles/AICodeVisualizer.css';

const AICodeVisualizer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isLoading, setIsLoading] = useState(false);
  const [visualizationData, setVisualizationData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";

    const BASE_URL = "http://localhost:5000/api";

  const handleVisualize = async () => {
    if (!code.trim()) {
      toast.warning("📝 Please paste your code first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/ai/visualize`, {
        code,
        language
      });

      setVisualizationData(response.data);
      setCurrentStep(0);
      toast.success("✨ Visualization generated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to generate visualization");
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepData = visualizationData?.steps[currentStep] || { array: [] };

  return (
    <div className="ai-visualizer-page">
      <div className="ai-header">
        <div className="header-left">
          <Link to="/home" className="back-btn">← Back to Home</Link>
          <h1>🤖 AI Code Visualizer</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="unique-badge">
        ⭐ Unique Feature: Visualize ANY code you write!
      </div>

      <div className="code-input-section">
        <div className="input-header">
          <h3>Paste Your Code</h3>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`# Example: Write any algorithm (Bubble Sort, Binary Search, etc.)\n# The AI will visualize your exact logic!\n\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr`}
          rows={10}
          className="code-textarea"
        />

        <button 
          onClick={handleVisualize}
          disabled={isLoading}
          className="visualize-btn"
        >
          {isLoading ? '🎨 AI is Analyzing...' : '🎨 Generate Visualization'}
        </button>
      </div>

      {visualizationData && (
        <div className="visualization-section">
          <div className="viz-header">
            <h3>Visualization of Your Code</h3>
            <div className="step-controls">
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
                ← Previous
              </button>
              <span>Step {currentStep + 1}/{visualizationData.steps.length}</span>
              <button onClick={() => setCurrentStep(Math.min(visualizationData.steps.length - 1, currentStep + 1))}>
                Next →
              </button>
            </div>
          </div>

          <div className="viz-content">
            <div className="animation-container">
              <AnimationArea 
                step={currentStepData}
                algorithm="ai-generated"
              />
            </div>

            <div className="info-panel">
              <div className="explanation-box">
                <h4>📖 Step Explanation</h4>
                <p>{visualizationData.explanations[currentStep]}</p>
              </div>

              <div className="variables-box">
                <h4>🔢 Variables State</h4>
                <pre>
                  {JSON.stringify(currentStepData.variables || {}, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="pseudocode-section">
            <SortingViewer 
              code={visualizationData.pseudocode}
              currentLine={currentStepData.currentLine}
              algorithm="Your Code"
            />
          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-right" />
    </div>
  );
};

export default AICodeVisualizer;