// components/ComplexityAnalysis.jsx - Fix the API endpoint
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/ComplexityAnalysis.css';

const ComplexityAnalysis = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [inputSizes, setInputSizes] = useState([10, 50, 100, 500, 1000, 2000]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [complexityGraphs, setComplexityGraphs] = useState(null);
  const [availableAlgorithms, setAvailableAlgorithms] = useState([]);

  const BASE_URL = "http://localhost:5000/api";

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

  const runComplexityAnalysis = async () => {
    if (!selectedAlgorithm) {
      alert('Please select an algorithm first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResults(null);
    setComplexityGraphs(null);

    try {
      // CORRECTED ENDPOINT: /api/complexity/analyze
      const response = await axios.post(`${BASE_URL}/complexity/analyze`, {
        algorithmId: selectedAlgorithm,
        inputSizes: inputSizes
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

  const handleInputSizesChange = (e) => {
    const value = e.target.value;
    const sizes = value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    setInputSizes(sizes);
  };

  return (
    <div className="complexity-analysis">
      <div className="complexity-header">
        <h1>Algorithm Complexity Analysis</h1>
        <p>Measure real-time performance and analyze time complexity</p>
      </div>

      <div className="analysis-controls">
        <div className="control-section">
          <h3>1. Select Algorithm</h3>
          <div className="algorithm-sidebar">
            {availableAlgorithms.map(algo => (
              <motion.div
                key={algo.id}
                className={`algorithm-item ${selectedAlgorithm === algo.id ? 'selected' : ''}`}
                onClick={() => setSelectedAlgorithm(algo.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="algo-name">{algo.name}</span>
                <span className="algo-category">{algo.category}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>2. Set Input Sizes</h3>
          <div className="input-sizes-control">
            <input
              type="text"
              value={inputSizes.join(', ')}
              onChange={handleInputSizesChange}
              placeholder="Enter sizes separated by commas (e.g., 10, 50, 100, 500)"
            />
            <strong>
              <small style={{ opacity: 1,color: 'black' }}>Larger sizes may take longer to compute</small>
            </strong>
          </div>
        </div>

        <div className="control-section">
          <h3>3. Run Analysis</h3>
          <button 
            className="analyze-btn"
            onClick={runComplexityAnalysis}
            disabled={isAnalyzing || !selectedAlgorithm}
          >
            {isAnalyzing ? (
              <>
                <div className="spinner"></div>
                Analyzing...
              </>
            ) : (
              'Run Complexity Analysis'
            )}
          </button>
        </div>
      </div>

      {analysisResults && (
        <motion.div 
          className="analysis-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="results-header">
            <h2>Complexity Analysis Results</h2>
            <div className="complexity-badge">
              <span className="actual-complexity">
                Actual: {analysisResults.complexityAnalysis.complexity}
              </span>
              <span className="theoretical-complexity">
                Theoretical: {analysisResults.complexityAnalysis.theoreticalComplexity}
              </span>
            </div>
          </div>

          <div className="results-grid">
            <div className="performance-data">
              <h3>Performance Measurements</h3>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      <th>Input Size</th>
                      <th>Time (ms)</th>
                      <th>Memory</th>
                      <th>Growth Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResults.results.map((result, index) => (
                      <tr key={index}>
                        <td>{result.inputSize}</td>
                        <td>{result.executionTime.toFixed(2)}</td>
                        <td>{(result.memoryUsage / 1024).toFixed(2)} KB</td>
                        <td>
                          {index > 0 ? 
                            (result.executionTime / analysisResults.results[index-1].executionTime).toFixed(2) + 'x' 
                            : '-'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="complexity-explanation">
              <h3>Complexity Analysis</h3>
              <div className="explanation-content">
                <p><strong>Detected Complexity:</strong> {analysisResults.complexityAnalysis.complexity}</p>
                <p><strong>Theoretical Complexity:</strong> {analysisResults.complexityAnalysis.theoreticalComplexity}</p>
                <p><strong>Explanation:</strong> {analysisResults.complexityAnalysis.explanation}</p>
                <p><strong>Average Growth Rate:</strong> {analysisResults.complexityAnalysis.averageGrowth.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {complexityGraphs && (
            <div className="complexity-graphs">
              <h3>Time Complexity Graphs</h3>
              <div className="graphs-container">
                <div className="graph-section">
                  <h4>Actual vs Theoretical Performance</h4>
                  <div className="graph-comparison">
                    <ComplexityGraph 
                      data={complexityGraphs}
                      title="Runtime Analysis"
                      showActual={true}
                      showTheoretical={true}
                    />
                  </div>
                </div>

                <div className="notation-graphs">
                  <div className="notation-graph">
                    <h5>Big O Notation (Upper Bound)</h5>
                    <ComplexityGraph 
                      data={complexityGraphs}
                      title="Big O - Worst Case"
                      curveType="bigO"
                      color="#ff6b6b"
                    />
                  </div>
                  
                  <div className="notation-graph">
                    <h5>Big Ω Notation (Lower Bound)</h5>
                    <ComplexityGraph 
                      data={complexityGraphs}
                      title="Big Ω - Best Case"
                      curveType="bigOmega"
                      color="#4ecdc4"
                    />
                  </div>
                  
                  <div className="notation-graph">
                    <h5>Big Θ Notation (Tight Bound)</h5>
                    <ComplexityGraph 
                      data={complexityGraphs}
                      title="Big Θ - Average Case"
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
    const points = sizes.map((size, i) => 
      `${scaleX(size)},${scaleY(values[i])}`
    ).join(' ');

    return (
      <polyline
        points={points}
        fill="none"
        stroke={curveColor}
        strokeWidth="2"
        strokeDasharray={isDashed ? "5,5" : "none"}
      />
    );
  };

  const renderDataPoints = (values, pointColor) => {
    return sizes.map((size, i) => (
      <circle
        key={i}
        cx={scaleX(size)}
        cy={scaleY(values[i])}
        r="4"
        fill={pointColor}
        stroke="#fff"
        strokeWidth="1"
      />
    ));
  };

  return (
    <div className="complexity-graph">
      <svg width="320" height="220" className="graph-svg">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
          <line
            key={`grid-${ratio}`}
            x1="10"
            y1={10 + ratio * 180}
            x2="290"
            y2={10 + ratio * 180}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1="10" y1="10" x2="10" y2="190" stroke="#333" strokeWidth="2" />
        <line x1="10" y1="190" x2="290" y2="190" stroke="#333" strokeWidth="2" />

        {/* Axis labels */}
        <text x="150" y="210" textAnchor="middle" fontSize="12" fill="#666">
          Input Size (n)
        </text>
        <text x="5" y="100" textAnchor="middle" fontSize="12" fill="#666" transform="rotate(-90 5,100)">
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

        {curveType && renderCurve(data[curveType], color)}
        {curveType && renderDataPoints(data[curveType], color)}
      </svg>

      <div className="graph-legend">
        {showActual && <span className="legend-item actual">Actual Runtime</span>}
        {showTheoretical && theoreticalCurves && (
          <>
            <span className="legend-item big-o">Big O (Upper Bound)</span>
            <span className="legend-item big-theta">Big Θ (Tight Bound)</span>
            <span className="legend-item big-omega">Big Ω (Lower Bound)</span>
          </>
        )}
        {curveType && <span className="legend-item">{title}</span>}
      </div>
    </div>
  );
};

export default ComplexityAnalysis;