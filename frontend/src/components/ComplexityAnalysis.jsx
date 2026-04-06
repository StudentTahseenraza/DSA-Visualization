// components/ComplexityAnalysis.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import '../styles/ComplexityAnalysis.css';

const ComplexityAnalysis = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [inputSizes, setInputSizes] = useState([10, 50, 100, 500, 1000, 2000]);
  const [inputSizesText, setInputSizesText] = useState('10, 50, 100, 500, 1000, 2000'); // Local text state for input
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [complexityGraphs, setComplexityGraphs] = useState(null);
  const [availableAlgorithms, setAvailableAlgorithms] = useState([]);

  const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";
  // const BASE_URL = "http://localhost:5000/api";

  // Fetch available algorithms on component mount
  useEffect(() => {
    fetchAvailableAlgorithms();
  }, []);

  const fetchAvailableAlgorithms = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/complexity/algorithms`);
      setAvailableAlgorithms(response.data.algorithms || []);
    } catch (error) {
      console.error('Error fetching algorithms:', error);
      // Fallback algorithms if API fails
      setAvailableAlgorithms([
        { id: 'bubble-sort', name: 'Bubble Sort', category: 'sorting' },
        { id: 'selection-sort', name: 'Selection Sort', category: 'sorting' },
        { id: 'insertion-sort', name: 'Insertion Sort', category: 'sorting' },
        { id: 'merge-sort', name: 'Merge Sort', category: 'sorting' },
        { id: 'quick-sort', name: 'Quick Sort', category: 'sorting' },
        { id: 'heap-sort', name: 'Heap Sort', category: 'sorting' },
        { id: 'binary-search', name: 'Binary Search', category: 'searching' },
        { id: 'linear-search', name: 'Linear Search', category: 'searching' },
        { id: 'fibonacci-dp', name: 'Fibonacci (DP)', category: 'dp' },
        { id: 'fibonacci-recursive', name: 'Fibonacci (Recursive)', category: 'recursion' },
        { id: 'bfs', name: 'Breadth-First Search', category: 'graphs' },
        { id: 'dfs', name: 'Depth-First Search', category: 'graphs' },
        { id: 'array-traverse', name: 'Array Traversal', category: 'arrays' },
        { id: 'string-reverse', name: 'String Reverse', category: 'strings' }
      ]);
    }
  };

  // Fixed: Properly parse input sizes from comma-separated string while allowing typing
  const handleInputSizesChange = (e) => {
    const rawValue = e.target.value;
    setInputSizesText(rawValue); // Update text state as user types
    
    // If empty, don't update the actual sizes array
    if (!rawValue.trim()) {
      setInputSizes([]);
      return;
    }
    
    // Parse comma-separated values
    const parsedSizes = rawValue
      .split(',')                    // Split by comma
      .map(item => item.trim())      // Trim whitespace
      .filter(item => item !== '')   // Remove empty strings
      .map(item => Number(item))     // Convert to number
      .filter(num => !isNaN(num) && num > 0 && Number.isInteger(num)); // Keep only positive integers
    
    // Update the actual sizes array (even if empty)
    setInputSizes(parsedSizes);
  };

  // Reset to default values
  const resetToDefaultSizes = () => {
    const defaultSizes = [10, 50, 100, 500, 1000, 2000];
    setInputSizes(defaultSizes);
    setInputSizesText(defaultSizes.join(', '));
  };

  // Validate input sizes before API call
  const runComplexityAnalysis = async () => {
    if (!selectedAlgorithm) {
      alert('Please select an algorithm first');
      return;
    }
    
    // Validate input sizes before API call
    if (!inputSizes || inputSizes.length === 0) {
      alert('Please enter valid input sizes (e.g., 10, 50, 100, 500)');
      return;
    }
    
    // Check for reasonable size limits
    const maxSize = Math.max(...inputSizes);
    if (maxSize > 10000) {
      const confirmRun = window.confirm(
        `Warning: Maximum input size is ${maxSize}. This may take a long time to compute. Continue?`
      );
      if (!confirmRun) return;
    }

    setIsAnalyzing(true);
    setAnalysisResults(null);
    setComplexityGraphs(null);

    try {
      const response = await axios.post(`${BASE_URL}/complexity/analyze`, {
        algorithmId: selectedAlgorithm,
        inputSizes: inputSizes  // Pass the validated sizes directly
      });

      if (response.data.success) {
        setAnalysisResults(response.data);
        setComplexityGraphs(response.data.graphs);
      } else {
        throw new Error(response.data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error running complexity analysis:', error);
      alert(`Failed to run complexity analysis: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="complexity-analysis">
      {/* Header with navigation */}
      <div className="algorithm-header">
        <div className="header-left">
          <h2>Complexity Analysis</h2>
        </div>
        <div className="header-right">
          <Link to="/home" className="nav-button">
            ← Back to Home
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="complexity-content">
        {/* Hero Section - Fixed at Top */}
        <div className="complexity-hero">
          <motion.h1 
            className="complexity-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Algorithm Complexity Analysis
          </motion.h1>
          <motion.p 
            className="complexity-subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Measure real-time performance and analyze time complexity
          </motion.p>
        </div>

        {/* Controls Card - Centered Middle Section */}
        <motion.div 
          className="controls-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="controls-row">
            {/* Algorithm Selection */}
            <div className="control-group algorithm-group">
              <label className="control-label">
                <span className="label-icon">📋</span>
                Select Algorithm
              </label>
              <div className="algorithm-list">
                {availableAlgorithms.map(algo => (
                  <motion.div
                    key={algo.id}
                    className={`algorithm-item ${selectedAlgorithm === algo.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAlgorithm(algo.id)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="algo-name">{algo.name}</span>
                    <span className="algo-category">{algo.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Input Sizes - Fixed with proper comma input */}
            <div className="control-group input-group">
              <label className="control-label">
                <span className="label-icon">📊</span>
                Input Sizes
              </label>
              <input
                type="text"
                className="sizes-input"
                value={inputSizesText}
                onChange={handleInputSizesChange}
                placeholder="10, 50, 100, 500, 1000, 2000"
              />
              <p className="input-hint">
                ⚡ Enter positive integers separated by commas (e.g., 10, 50, 100)
              </p>
              {inputSizes.length === 0 && inputSizesText.trim() !== '' && (
                <p className="input-error" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  ⚠️ Please enter valid positive integers separated by commas
                </p>
              )}
              <button 
                type="button"
                className="reset-btn"
                onClick={resetToDefaultSizes}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'white';
                  e.target.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.borderColor = 'var(--border-color)';
                }}
              >
                Reset to Default
              </button>
            </div>

            {/* Run Button */}
            <div className="control-group button-group">
              <button 
                className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
                onClick={runComplexityAnalysis}
                disabled={isAnalyzing || !selectedAlgorithm || inputSizes.length === 0}
              >
                {isAnalyzing ? (
                  <>
                    <div className="spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Run Complexity Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Section - Appears BELOW the controls card */}
        <AnimatePresence>
          {analysisResults && (
            <motion.div 
              className="results-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="results-header">
                <h2 className="results-title">📈 Analysis Results</h2>
                <div className="complexity-badges">
                  <span className="badge badge-actual">
                    Actual: {analysisResults.complexityAnalysis.complexity}
                  </span>
                  <span className="badge badge-theoretical">
                    Theoretical: {analysisResults.complexityAnalysis.theoreticalComplexity}
                  </span>
                </div>
              </div>

              {/* Performance Table */}
              <div className="results-card">
                <h3 className="card-title">⏱️ Performance Measurements</h3>
                <div className="table-wrapper">
                  <table className="performance-table">
                    <thead>
                      <tr>
                        <th>Input Size (n)</th>
                        <th>Time (ms)</th>
                        <th>Memory (KB)</th>
                        <th>Growth Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisResults.results.map((result, index) => (
                        <motion.tr 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="size-cell">{result.inputSize}</td>
                          <td className="time-cell">{result.executionTime.toFixed(2)} ms</td>
                          <td className="memory-cell">{(result.memoryUsage / 1024).toFixed(2)} KB</td>
                          <td className="growth-cell">
                            {index > 0 ? 
                              <span className="growth-badge">
                                {(result.executionTime / analysisResults.results[index-1].executionTime).toFixed(2)}x
                              </span>
                              : '-'
                            }
                           </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Complexity Analysis Card */}
              <div className="results-card complexity-card">
                <h3 className="card-title">🔬 Complexity Analysis</h3>
                <div className="complexity-details">
                  <div className="complexity-detail-item">
                    <span className="detail-label">Detected Complexity:</span>
                    <span className="detail-value detected">{analysisResults.complexityAnalysis.complexity}</span>
                  </div>
                  <div className="complexity-detail-item">
                    <span className="detail-label">Theoretical Complexity:</span>
                    <span className="detail-value theoretical">{analysisResults.complexityAnalysis.theoreticalComplexity}</span>
                  </div>
                  <div className="complexity-detail-item full-width">
                    <span className="detail-label">Explanation:</span>
                    <span className="detail-value explanation">{analysisResults.complexityAnalysis.explanation}</span>
                  </div>
                  <div className="complexity-detail-item">
                    <span className="detail-label">Average Growth Rate:</span>
                    <span className="detail-value growth">{analysisResults.complexityAnalysis.averageGrowth.toFixed(2)}x</span>
                  </div>
                </div>
              </div>

              {/* Graphs Section */}
              {complexityGraphs && (
                <div className="results-card graphs-card">
                  <h3 className="card-title">📊 Time Complexity Visualization</h3>
                  <div className="graphs-container">
                    <div className="graph-main">
                      <h4>Actual vs Theoretical Performance</h4>
                      <ComplexityGraph 
                        data={complexityGraphs}
                        title="Runtime Analysis"
                        showActual={true}
                        showTheoretical={true}
                      />
                    </div>

                    <div className="graph-notation-grid">
                      <div className="notation-card">
                        <h5>🎯 Big O (Upper Bound)</h5>
                        <ComplexityGraph 
                          data={complexityGraphs}
                          title="Worst Case"
                          curveType="bigO"
                          color="#ff6b6b"
                        />
                      </div>
                      <div className="notation-card">
                        <h5>📈 Big Ω (Lower Bound)</h5>
                        <ComplexityGraph 
                          data={complexityGraphs}
                          title="Best Case"
                          curveType="bigOmega"
                          color="#4ecdc4"
                        />
                      </div>
                      <div className="notation-card">
                        <h5>⚖️ Big Θ (Tight Bound)</h5>
                        <ComplexityGraph 
                          data={complexityGraphs}
                          title="Average Case"
                          curveType="bigTheta"
                          color="#45b7d1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Graph Component for rendering complexity curves
const ComplexityGraph = ({ data, title, showActual = false, showTheoretical = false, curveType, color = '#3498db' }) => {
  if (!data) return null;

  const { sizes, actualTimes, theoreticalCurves, bigO, bigOmega, bigTheta } = data;
  const maxSize = Math.max(...sizes);
  const maxTime = Math.max(...actualTimes, ...(theoreticalCurves?.bigO || []));

  const scaleX = (value) => (value / maxSize) * 280 + 10;
  const scaleY = (value) => 190 - (value / maxTime) * 180;

  const renderCurve = (values, curveColor, isDashed = false) => {
    if (!values || values.length === 0) return null;
    const points = sizes.map((size, i) => 
      `${scaleX(size)},${scaleY(values[i])}`
    ).join(' ');

    return (
      <polyline
        points={points}
        fill="none"
        stroke={curveColor}
        strokeWidth="2.5"
        strokeDasharray={isDashed ? "6,4" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  const renderDataPoints = (values, pointColor) => {
    if (!values || values.length === 0) return null;
    return sizes.map((size, i) => (
      <circle
        key={i}
        cx={scaleX(size)}
        cy={scaleY(values[i])}
        r="4"
        fill={pointColor}
        stroke="#fff"
        strokeWidth="2"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
      />
    ));
  };

  return (
    <div className="complexity-graph-wrapper">
      <svg width="320" height="220" className="graph-svg" viewBox="0 0 320 220">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
          <line
            key={`grid-${ratio}`}
            x1="10"
            y1={10 + ratio * 180}
            x2="290"
            y2={10 + ratio * 180}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
        ))}

        {/* Axes */}
        <line x1="10" y1="10" x2="10" y2="190" stroke="#475569" strokeWidth="2" />
        <line x1="10" y1="190" x2="290" y2="190" stroke="#475569" strokeWidth="2" />

        {/* Axis labels */}
        <text x="150" y="210" textAnchor="middle" fontSize="11" fill="#64748b">
          Input Size (n)
        </text>
        <text x="5" y="100" textAnchor="middle" fontSize="11" fill="#64748b" transform="rotate(-90 5,100)">
          Time (ms)
        </text>

        {/* Curves */}
        {showActual && renderCurve(actualTimes, '#3498db')}
        {showActual && renderDataPoints(actualTimes, '#3498db')}
        
        {showTheoretical && theoreticalCurves && (
          <>
            {renderCurve(theoreticalCurves.bigO, '#ff6b6b', true)}
            {renderCurve(theoreticalCurves.bigTheta, '#45b7d1', true)}
            {renderCurve(theoreticalCurves.bigOmega, '#4ecdc4', true)}
          </>
        )}

        {curveType && data[curveType] && renderCurve(data[curveType], color)}
        {curveType && data[curveType] && renderDataPoints(data[curveType], color)}
      </svg>

      <div className="graph-legend">
        {showActual && <span className="legend-item"><span className="legend-color actual-color"></span>Actual Runtime</span>}
        {showTheoretical && theoreticalCurves && (
          <>
            <span className="legend-item"><span className="legend-color bigo-color"></span>Big O</span>
            <span className="legend-item"><span className="legend-color theta-color"></span>Big Θ</span>
            <span className="legend-item"><span className="legend-color omega-color"></span>Big Ω</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ComplexityAnalysis;