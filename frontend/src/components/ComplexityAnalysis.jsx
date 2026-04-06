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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [complexityGraphs, setComplexityGraphs] = useState(null);
  const [availableAlgorithms, setAvailableAlgorithms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const BASE_URL = "https://dsa-visualization-j0uo.onrender.com/api";

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Algorithms', icon: '📊' },
    { id: 'sorting', name: 'Sorting', icon: '🔄' },
    { id: 'searching', name: 'Searching', icon: '🔍' },
    { id: 'dp', name: 'Dynamic Programming', icon: '🧠' },
    { id: 'graphs', name: 'Graphs', icon: '🕸️' },
    { id: 'arrays', name: 'Arrays', icon: '📊' },
    { id: 'strings', name: 'Strings', icon: '📝' },
    { id: 'recursion', name: 'Recursion', icon: '🔄' }
  ];

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
      // Enhanced fallback algorithms with more categories
      setAvailableAlgorithms([
        // Sorting Algorithms
        { id: 'bubble-sort', name: 'Bubble Sort', category: 'sorting', complexity: 'O(n²)', description: 'Simple comparison-based sorting' },
        { id: 'selection-sort', name: 'Selection Sort', category: 'sorting', complexity: 'O(n²)', description: 'Selects minimum element repeatedly' },
        { id: 'insertion-sort', name: 'Insertion Sort', category: 'sorting', complexity: 'O(n²)', description: 'Builds sorted array one item at a time' },
        { id: 'merge-sort', name: 'Merge Sort', category: 'sorting', complexity: 'O(n log n)', description: 'Divide and conquer sorting' },
        { id: 'quick-sort', name: 'Quick Sort', category: 'sorting', complexity: 'O(n log n)', description: 'Partition-based sorting' },
        { id: 'heap-sort', name: 'Heap Sort', category: 'sorting', complexity: 'O(n log n)', description: 'Uses heap data structure' },
        { id: 'counting-sort', name: 'Counting Sort', category: 'sorting', complexity: 'O(n + k)', description: 'Non-comparison integer sorting' },
        { id: 'radix-sort', name: 'Radix Sort', category: 'sorting', complexity: 'O(d * (n + b))', description: 'Digit-by-digit sorting' },
        
        // Searching Algorithms
        { id: 'binary-search', name: 'Binary Search', category: 'searching', complexity: 'O(log n)', description: 'Divide and conquer search' },
        { id: 'linear-search', name: 'Linear Search', category: 'searching', complexity: 'O(n)', description: 'Sequential element search' },
        { id: 'ternary-search', name: 'Ternary Search', category: 'searching', complexity: 'O(log₃ n)', description: 'Divide into three parts' },
        { id: 'jump-search', name: 'Jump Search', category: 'searching', complexity: 'O(√n)', description: 'Jump ahead and linear search' },
        { id: 'exponential-search', name: 'Exponential Search', category: 'searching', complexity: 'O(log n)', description: 'Exponential range finding' },
        
        // Dynamic Programming
        { id: 'fibonacci-dp', name: 'Fibonacci (DP)', category: 'dp', complexity: 'O(n)', description: 'Memoization approach' },
        { id: 'fibonacci-recursive', name: 'Fibonacci (Recursive)', category: 'recursion', complexity: 'O(2ⁿ)', description: 'Naive recursion' },
        { id: 'knapsack-dp', name: '0/1 Knapsack', category: 'dp', complexity: 'O(n × W)', description: 'Optimization problem' },
        { id: 'lcs', name: 'LCS (Longest Common Subsequence)', category: 'dp', complexity: 'O(m × n)', description: 'Sequence alignment' },
        { id: 'coin-change', name: 'Coin Change', category: 'dp', complexity: 'O(n × amount)', description: 'Minimum coins problem' },
        { id: 'edit-distance', name: 'Edit Distance', category: 'dp', complexity: 'O(m × n)', description: 'String transformation' },
        
        // Graph Algorithms
        { id: 'bfs', name: 'Breadth-First Search', category: 'graphs', complexity: 'O(V + E)', description: 'Level-order graph traversal' },
        { id: 'dfs', name: 'Depth-First Search', category: 'graphs', complexity: 'O(V + E)', description: 'Depth-first graph traversal' },
        { id: 'dijkstra', name: "Dijkstra's Algorithm", category: 'graphs', complexity: 'O((V + E) log V)', description: 'Shortest path' },
        { id: 'bellman-ford', name: 'Bellman-Ford', category: 'graphs', complexity: 'O(V × E)', description: 'Negative weight shortest path' },
        { id: 'floyd-warshall', name: 'Floyd-Warshall', category: 'graphs', complexity: 'O(V³)', description: 'All-pairs shortest path' },
        { id: 'prims', name: "Prim's Algorithm", category: 'graphs', complexity: 'O(E log V)', description: 'Minimum spanning tree' },
        { id: 'kruskals', name: "Kruskal's Algorithm", category: 'graphs', complexity: 'O(E log E)', description: 'Minimum spanning tree' },
        
        // Array Algorithms
        { id: 'array-traverse', name: 'Array Traversal', category: 'arrays', complexity: 'O(n)', description: 'Linear array iteration' },
        { id: 'array-reverse', name: 'Array Reverse', category: 'arrays', complexity: 'O(n)', description: 'In-place reversal' },
        { id: 'rotate-array', name: 'Array Rotation', category: 'arrays', complexity: 'O(n)', description: 'Rotate by k positions' },
        { id: 'kadane', name: "Kadane's Algorithm", category: 'arrays', complexity: 'O(n)', description: 'Maximum subarray sum' },
        { id: 'two-pointers', name: 'Two Pointers', category: 'arrays', complexity: 'O(n)', description: 'Pair sum problem' },
        
        // String Algorithms
        { id: 'string-reverse', name: 'String Reverse', category: 'strings', complexity: 'O(n)', description: 'Reverse string' },
        { id: 'palindrome-check', name: 'Palindrome Check', category: 'strings', complexity: 'O(n)', description: 'Check palindrome' },
        { id: 'kmp', name: 'KMP Pattern Matching', category: 'strings', complexity: 'O(m + n)', description: 'Efficient pattern search' },
        { id: 'rabin-karp', name: 'Rabin-Karp', category: 'strings', complexity: 'O(m + n)', description: 'Rolling hash search' },
        { id: 'longest-palindrome', name: 'Longest Palindromic Substring', category: 'strings', complexity: 'O(n²)', description: 'Expand around center' }
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
    if (sizes.length > 0) {
      setInputSizes(sizes);
    }
  };

  // Filter algorithms based on search and category
  const filteredAlgorithms = availableAlgorithms.filter(algo => {
    const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || algo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group algorithms by category for display
  const groupedAlgorithms = filteredAlgorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = [];
    }
    acc[algo.category].push(algo);
    return acc;
  }, {});

  const getAlgorithmInfo = (algorithmId) => {
    const algo = availableAlgorithms.find(a => a.id === algorithmId);
    return algo || { name: algorithmId, complexity: 'Unknown', description: '' };
  };

  return (
    <div className="complexity-analysis">
      {/* Header */}
      <div className="algorithm-header">
        <div className="header-left">
          <h2>📈 Complexity Analysis</h2>
          <p>Real-time performance measurement & complexity visualization</p>
        </div>
        <div className="header-right">
          <Link to="/home" className="nav-button">
            ← Back to Home
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="complexity-content">
        {/* Hero Section */}
        <div className="complexity-hero">
          <h1>Algorithm Complexity Analysis</h1>
          <p>Measure real-time performance, analyze time complexity, and compare theoretical vs actual growth rates</p>
        </div>

        {/* Main Controls Grid */}
        <div className="analysis-controls-grid">
          {/* Algorithm Selection Panel */}
          <div className="control-panel algorithm-panel">
            <div className="panel-header">
              <span className="panel-icon">🎯</span>
              <h3>Select Algorithm</h3>
            </div>
            
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Algorithm List */}
            <div className="algorithm-list">
              {Object.entries(groupedAlgorithms).map(([category, algorithms]) => (
                <div key={category} className="algorithm-category-group">
                  <div className="category-header">
                    <span className="category-icon">
                      {categories.find(c => c.id === category)?.icon || '📁'}
                    </span>
                    <span className="category-name">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    <span className="category-count">{algorithms.length}</span>
                  </div>
                  <div className="algorithm-items">
                    {algorithms.map(algo => (
                      <motion.div
                        key={algo.id}
                        className={`algorithm-card ${selectedAlgorithm === algo.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAlgorithm(algo.id)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="algorithm-card-header">
                          <span className="algorithm-name">{algo.name}</span>
                          <span className="algorithm-badge">{algo.complexity}</span>
                        </div>
                        <div className="algorithm-description">{algo.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
              {filteredAlgorithms.length === 0 && (
                <div className="no-results">
                  <span>🔍</span>
                  <p>No algorithms found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Input Sizes Panel */}
          <div className="control-panel sizes-panel">
            <div className="panel-header">
              <span className="panel-icon">📏</span>
              <h3>Input Sizes</h3>
            </div>
            <div className="input-sizes-container">
              <div className="sizes-input-wrapper">
                <input
                  type="text"
                  value={inputSizes.join(', ')}
                  onChange={handleInputSizesChange}
                  placeholder="Enter sizes separated by commas (e.g., 10, 50, 100, 500, 1000)"
                  className="sizes-input"
                />
                <div className="sizes-presets">
                  <button className="preset-btn" onClick={() => setInputSizes([10, 50, 100, 500, 1000])}>Small</button>
                  <button className="preset-btn" onClick={() => setInputSizes([100, 500, 1000, 2000, 5000])}>Medium</button>
                  <button className="preset-btn" onClick={() => setInputSizes([1000, 2000, 5000, 8000, 10000])}>Large</button>
                </div>
              </div>
              <div className="sizes-info">
                <span className="info-icon">ℹ️</span>
                <span>Larger sizes provide more accurate complexity analysis but may take longer</span>
              </div>
            </div>
          </div>

          {/* Run Analysis Panel */}
          <div className="control-panel run-panel">
            <div className="panel-header">
              <span className="panel-icon">⚡</span>
              <h3>Run Analysis</h3>
            </div>
            <button 
              className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
              onClick={runComplexityAnalysis}
              disabled={isAnalyzing || !selectedAlgorithm}
            >
              {isAnalyzing ? (
                <>
                  <div className="spinner"></div>
                  <span>Analyzing Performance...</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Run Complexity Analysis</span>
                </>
              )}
            </button>
            {selectedAlgorithm && (
              <div className="selected-info">
                <span className="selected-label">Selected:</span>
                <span className="selected-value">{getAlgorithmInfo(selectedAlgorithm).name}</span>
                <span className="selected-complexity">{getAlgorithmInfo(selectedAlgorithm).complexity}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {analysisResults && (
            <motion.div 
              className="analysis-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="results-header">
                <div>
                  <h2>📊 Analysis Results</h2>
                  <p className="algorithm-name-display">{getAlgorithmInfo(selectedAlgorithm).name}</p>
                </div>
                <div className="complexity-badges">
                  <div className="badge actual">
                    <span className="badge-label">Actual</span>
                    <span className="badge-value">{analysisResults.complexityAnalysis.complexity}</span>
                  </div>
                  <div className="badge theoretical">
                    <span className="badge-label">Theoretical</span>
                    <span className="badge-value">{analysisResults.complexityAnalysis.theoreticalComplexity}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics Cards */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon">⏱️</div>
                  <div className="metric-info">
                    <div className="metric-label">Average Time</div>
                    <div className="metric-value">
                      {(analysisResults.results.reduce((sum, r) => sum + r.executionTime, 0) / analysisResults.results.length).toFixed(2)} ms
                    </div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">📈</div>
                  <div className="metric-info">
                    <div className="metric-label">Growth Rate</div>
                    <div className="metric-value">{analysisResults.complexityAnalysis.averageGrowth.toFixed(2)}x</div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">🎯</div>
                  <div className="metric-info">
                    <div className="metric-label">Accuracy Score</div>
                    <div className="metric-value">
                      {Math.max(0, Math.min(100, Math.floor(100 - Math.abs(
                        (analysisResults.results[analysisResults.results.length - 1]?.executionTime || 0) / 
                        (analysisResults.results[0]?.executionTime || 1) - 
                        (analysisResults.results[analysisResults.results.length - 1]?.inputSize || 1) /
                        (analysisResults.results[0]?.inputSize || 1)
                      ) * 50)))}%
                    </div>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">💾</div>
                  <div className="metric-info">
                    <div className="metric-label">Peak Memory</div>
                    <div className="metric-value">
                      {(Math.max(...analysisResults.results.map(r => r.memoryUsage)) / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Table */}
              <div className="performance-table-container">
                <h3>📋 Detailed Performance Measurements</h3>
                <div className="table-wrapper">
                  <table className="performance-table">
                    <thead>
                      <tr>
                        <th>Input Size (n)</th>
                        <th>Execution Time (ms)</th>
                        <th>Memory Usage</th>
                        <th>Growth Rate</th>
                        <th>Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisResults.results.map((result, index) => {
                        const growthRate = index > 0 ? (result.executionTime / analysisResults.results[index-1].executionTime).toFixed(2) : '-';
                        let efficiencyClass = '';
                        if (growthRate !== '-') {
                          const growth = parseFloat(growthRate);
                          if (growth < 1.5) efficiencyClass = 'efficient';
                          else if (growth < 3) efficiencyClass = 'moderate';
                          else efficiencyClass = 'inefficient';
                        }
                        return (
                          <tr key={index}>
                            <td className="size-cell">{result.inputSize.toLocaleString()}</td>
                            <td className="time-cell">{result.executionTime.toFixed(2)}</td>
                            <td className="memory-cell">{(result.memoryUsage / 1024).toFixed(2)} KB</td>
                            <td className={`growth-cell ${efficiencyClass}`}>
                              {growthRate !== '-' ? `${growthRate}x` : '-'}
                            </td>
                            <td>
                              <div className="efficiency-bar">
                                <div 
                                  className={`efficiency-fill ${efficiencyClass}`}
                                  style={{ 
                                    width: growthRate !== '-' ? `${Math.max(5, Math.min(100, 100 / parseFloat(growthRate)))}%` : '0%' 
                                  }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Complexity Explanation */}
              <div className="complexity-explanation-card">
                <div className="explanation-header">
                  <span className="explanation-icon">💡</span>
                  <h3>Complexity Analysis</h3>
                </div>
                <div className="explanation-content">
                  <div className="explanation-row">
                    <span className="explanation-label">Detected Complexity:</span>
                    <span className="complexity-highlight">{analysisResults.complexityAnalysis.complexity}</span>
                  </div>
                  <div className="explanation-row">
                    <span className="explanation-label">Theoretical Complexity:</span>
                    <span>{analysisResults.complexityAnalysis.theoreticalComplexity}</span>
                  </div>
                  <div className="explanation-row">
                    <span className="explanation-label">Explanation:</span>
                    <p>{analysisResults.complexityAnalysis.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Graphs Section */}
              {complexityGraphs && (
                <div className="graphs-section">
                  <h3>📈 Complexity Visualization</h3>
                  <div className="graphs-container">
                    <div className="graph-card main-graph">
                      <h4>Actual vs Theoretical Performance</h4>
                      <ComplexityGraph 
                        data={complexityGraphs}
                        title="Runtime Analysis"
                        showActual={true}
                        showTheoretical={true}
                      />
                    </div>
                    <div className="notation-graphs-grid">
                      <div className="graph-card">
                        <h5>Big O Notation (Upper Bound)</h5>
                        <ComplexityGraph 
                          data={complexityGraphs}
                          title="Worst Case"
                          curveType="bigO"
                          color="#ff6b6b"
                        />
                      </div>
                      <div className="graph-card">
                        <h5>Big Ω Notation (Lower Bound)</h5>
                        <ComplexityGraph 
                          data={complexityGraphs}
                          title="Best Case"
                          curveType="bigOmega"
                          color="#4ecdc4"
                        />
                      </div>
                      <div className="graph-card">
                        <h5>Big Θ Notation (Tight Bound)</h5>
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

        {/* Empty State */}
        {!analysisResults && !isAnalyzing && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-icon">📊</div>
            <h3>Ready to Analyze</h3>
            <p>Select an algorithm from the list, configure input sizes, and click "Run Complexity Analysis" to see real-time performance metrics.</p>
            <div className="empty-features">
              <div className="feature">✓ Real-time performance measurement</div>
              <div className="feature">✓ Theoretical vs actual comparison</div>
              <div className="feature">✓ Big O, Ω, and Θ notation graphs</div>
              <div className="feature">✓ Memory usage tracking</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Enhanced Graph Component
const ComplexityGraph = ({ data, title, showActual = false, showTheoretical = false, curveType, color = '#6B5B95' }) => {
  if (!data) return null;

  const { sizes, actualTimes, theoreticalCurves, bigO, bigOmega, bigTheta } = data;
  const maxSize = Math.max(...sizes);
  const maxTime = Math.max(...actualTimes, ...(theoreticalCurves?.bigO || []), 1);

  const scaleX = (value) => (value / maxSize) * 280 + 10;
  const scaleY = (value) => 190 - (value / maxTime) * 180;

  const renderCurve = (values, curveColor, isDashed = false) => {
    if (!values || values.length === 0) return null;
    const points = sizes.map((size, i) => {
      const val = values[i] !== undefined ? values[i] : values[Math.min(i, values.length - 1)];
      return `${scaleX(size)},${scaleY(val)}`;
    }).join(' ');
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
    return sizes.map((size, i) => {
      const val = values[i] !== undefined ? values[i] : values[Math.min(i, values.length - 1)];
      return (
        <circle
          key={i}
          cx={scaleX(size)}
          cy={scaleY(val)}
          r="4"
          fill={pointColor}
          stroke="#fff"
          strokeWidth="2"
          className="data-point"
        />
      );
    });
  };

  return (
    <div className="complexity-graph">
      <svg width="320" height="220" viewBox="0 0 320 220" className="graph-svg">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
          <g key={`grid-${ratio}`}>
            <line
              x1="10"
              y1={10 + ratio * 180}
              x2="300"
              y2={10 + ratio * 180}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <text x="5" y={14 + ratio * 180} fontSize="9" fill="rgba(255,255,255,0.4)">
              {(maxTime * (1 - ratio)).toFixed(0)}
            </text>
          </g>
        ))}

        {/* X-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
          <line
            key={`x-grid-${ratio}`}
            x1={10 + ratio * 290}
            y1="10"
            x2={10 + ratio * 290}
            y2="190"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1="10" y1="10" x2="10" y2="190" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <line x1="10" y1="190" x2="300" y2="190" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

        {/* Arrow heads */}
        <polygon points="10,10 6,18 14,18" fill="rgba(255,255,255,0.5)" />
        <polygon points="300,190 292,186 292,194" fill="rgba(255,255,255,0.5)" />

        {/* Axis labels */}
        <text x="155" y="212" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)">
          Input Size (n) →
        </text>
        <text x="6" y="100" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" transform="rotate(-90 6,100)">
          Time (ms) ↑
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
        {showActual && <span className="legend-item"><span className="legend-dot actual-dot"></span>Actual Runtime</span>}
        {showTheoretical && theoreticalCurves && (
          <>
            <span className="legend-item"><span className="legend-dot big-o-dot"></span>Big O</span>
            <span className="legend-item"><span className="legend-dot big-theta-dot"></span>Big Θ</span>
            <span className="legend-item"><span className="legend-dot big-omega-dot"></span>Big Ω</span>
          </>
        )}
        {curveType && <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: color }}></span>{title}</span>}
      </div>
    </div>
  );
};

export default ComplexityAnalysis;