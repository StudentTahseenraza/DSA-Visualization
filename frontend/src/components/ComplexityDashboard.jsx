import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ComplexityDashboard.css';

const ComplexityDashboard = ({ analysisData, algorithm }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [selectedComplexity, setSelectedComplexity] = useState('worst');

  if (!analysisData) return null;

  const {
    performance = [],
    complexity = {},
    graphData = {},
    operations = {},
    algorithmDetails = {},
    theoreticalPerformance = {}
  } = analysisData;

  // Prepare chart data
  const chartData = graphData.sizes?.map((size, idx) => ({
    size,
    actual: graphData.actualTimes?.[idx] || 0,
    bigO: graphData.bigOTimes?.[idx] || 0,
    bigTheta: graphData.bigThetaTimes?.[idx] || 0,
    bigOmega: graphData.bigOmegaTimes?.[idx] || 0
  })) || [];

  const getComplexityColor = (complexity) => {
    if (complexity.includes('n²')) return '#ff6b6b';
    if (complexity.includes('n log n')) return '#4ecdc4';
    if (complexity.includes('n')) return '#45b7d1';
    return '#96ceb4';
  };

  const getEfficiencyBadge = (efficiency) => {
    const colors = {
      'Excellent': '#4caf50',
      'Good': '#8bc34a',
      'Average': '#ffc107',
      'Poor': '#ff5722'
    };
    return (
      <span className="efficiency-badge" style={{ backgroundColor: colors[efficiency] }}>
        {efficiency}
      </span>
    );
  };

  return (
    <motion.div 
      className="complexity-dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <h2>📊 Complexity Analysis Dashboard</h2>
        <p>Detailed performance analysis for {algorithmDetails.name || algorithm}</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          ⚡ Performance Metrics
        </button>
        <button 
          className={`tab ${activeTab === 'complexity' ? 'active' : ''}`}
          onClick={() => setActiveTab('complexity')}
        >
          📈 Complexity Analysis
        </button>
        <button 
          className={`tab ${activeTab === 'graphs' ? 'active' : ''}`}
          onClick={() => setActiveTab('graphs')}
        >
          📉 Time Complexity Graphs
        </button>
        <button 
          className={`tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          ℹ️ Algorithm Details
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="tab-content"
          >
            <div className="performance-summary">
              <div className="metric-card">
                <div className="metric-icon">⏱️</div>
                <div className="metric-info">
                  <h4>Execution Time</h4>
                  <p className="metric-value">{operations.executionTime?.toFixed(3) || 0} ms</p>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🔄</div>
                <div className="metric-info">
                  <h4>Comparisons</h4>
                  <p className="metric-value">{operations.comparisons?.toLocaleString() || 0}</p>
                  {complexity.operationsAnalysis?.comparisons && (
                    <span className="metric-sub">{complexity.operationsAnalysis.comparisons.efficiency}</span>
                  )}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🔄</div>
                <div className="metric-info">
                  <h4>Swaps</h4>
                  <p className="metric-value">{operations.swaps?.toLocaleString() || 0}</p>
                  {complexity.operationsAnalysis?.swaps && (
                    <span className="metric-sub">{complexity.operationsAnalysis.swaps.efficiency}</span>
                  )}
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">💾</div>
                <div className="metric-info">
                  <h4>Memory Usage</h4>
                  <p className="metric-value">{operations.memoryUsage?.toFixed(2) || 0} KB</p>
                </div>
              </div>
            </div>

            <div className="performance-table-container">
              <h3>Detailed Performance Measurements</h3>
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>Input Size</th>
                    <th>Time (ms)</th>
                    <th>Memory (KB)</th>
                    <th>Comparisons</th>
                    <th>Swaps</th>
                    <th>Passes</th>
                  </tr>
                </thead>
                <tbody>
                  {performance.map((perf, idx) => (
                    <tr key={idx}>
                      <td>{perf.inputSize}</td>
                      <td>{perf.time?.toFixed(3)}</td>
                      <td>{perf.memory?.toFixed(2)}</td>
                      <td>{perf.comparisons?.toLocaleString()}</td>
                      <td>{perf.swaps?.toLocaleString()}</td>
                      <td>{perf.passes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {complexity.operationsAnalysis && (
              <div className="operations-insights">
                <h3>🔍 Operations Insights</h3>
                <div className="insights-grid">
                  <div className="insight-card">
                    <h4>Comparisons Analysis</h4>
                    <p>Actual: <strong>{complexity.operationsAnalysis.comparisons.value.toLocaleString()}</strong></p>
                    <p>Expected: <strong>{complexity.operationsAnalysis.comparisons.expected.toLocaleString()}</strong></p>
                    <p>Efficiency: {getEfficiencyBadge(complexity.operationsAnalysis.comparisons.efficiency)}</p>
                  </div>
                  <div className="insight-card">
                    <h4>Swaps Analysis</h4>
                    <p>Actual: <strong>{complexity.operationsAnalysis.swaps.value.toLocaleString()}</strong></p>
                    <p>Expected: <strong>{complexity.operationsAnalysis.swaps.expected.toLocaleString()}</strong></p>
                    <p>Efficiency: {getEfficiencyBadge(complexity.operationsAnalysis.swaps.efficiency)}</p>
                  </div>
                  <div className="insight-card">
                    <h4>Passes Analysis</h4>
                    <p>Actual: <strong>{complexity.operationsAnalysis.passes.value}</strong></p>
                    <p>Expected: <strong>{complexity.operationsAnalysis.passes.expected}</strong></p>
                    <p>Efficiency: {getEfficiencyBadge(complexity.operationsAnalysis.passes.efficiency)}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'complexity' && (
          <motion.div
            key="complexity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="tab-content"
          >
            <div className="complexity-cards">
              <div className="complexity-card best-case">
                <h4>Best Case</h4>
                <div className="complexity-value">{complexity.theoretical?.best || 'O(n)'}</div>
                <p>Array is already sorted</p>
              </div>
              <div className="complexity-card average-case">
                <h4>Average Case</h4>
                <div className="complexity-value">{complexity.theoretical?.average || 'O(n²)'}</div>
                <p>Random array ordering</p>
              </div>
              <div className="complexity-card worst-case">
                <h4>Worst Case</h4>
                <div className="complexity-value">{complexity.theoretical?.worst || 'O(n²)'}</div>
                <p>Array is reverse sorted</p>
              </div>
              <div className="complexity-card space">
                <h4>Space Complexity</h4>
                <div className="complexity-value">{complexity.theoretical?.space || 'O(1)'}</div>
                <p>Additional memory required</p>
              </div>
            </div>

            <div className="complexity-explanation">
              <h3>📖 Complexity Explanation</h3>
              <p>{complexity.explanation}</p>
            </div>

            <div className="actual-vs-theoretical">
              <h3>⚖️ Actual vs Theoretical Performance</h3>
              <div className="comparison-box">
                <div className="comparison-item">
                  <span className="label">Detected Complexity:</span>
                  <span className={`value ${complexity.actual?.includes('n²') ? 'high' : complexity.actual?.includes('n log n') ? 'medium' : 'low'}`}>
                    {complexity.actual || 'O(n²)'}
                  </span>
                </div>
                <div className="comparison-item">
                  <span className="label">Theoretical Complexity:</span>
                  <span className="value">{complexity.theoretical?.average || 'O(n²)'}</span>
                </div>
                <div className="comparison-item">
                  <span className="label">Stability:</span>
                  <span className="value">{complexity.performanceMetrics?.stability ? '✓ Stable' : '✗ Not Stable'}</span>
                </div>
                <div className="comparison-item">
                  <span className="label">In-Place:</span>
                  <span className="value">{complexity.performanceMetrics?.inPlace ? '✓ Yes' : '✗ No (requires extra space)'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'graphs' && (
          <motion.div
            key="graphs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="tab-content"
          >
            <div className="graph-controls">
              <button 
                className={`complexity-btn ${selectedComplexity === 'worst' ? 'active' : ''}`}
                onClick={() => setSelectedComplexity('worst')}
              >
                Big O (Upper Bound)
              </button>
              <button 
                className={`complexity-btn ${selectedComplexity === 'average' ? 'active' : ''}`}
                onClick={() => setSelectedComplexity('average')}
              >
                Big Θ (Tight Bound)
              </button>
              <button 
                className={`complexity-btn ${selectedComplexity === 'best' ? 'active' : ''}`}
                onClick={() => setSelectedComplexity('best')}
              >
                Big Ω (Lower Bound)
              </button>
            </div>

            <div className="graph-container">
              <h3>Time Complexity Visualization</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="size" 
                    label={{ value: 'Input Size (n)', position: 'bottom', fill: '#E5E5E5' }}
                    stroke="#E5E5E5"
                  />
                  <YAxis 
                    label={{ value: 'Time (ms)', angle: -90, position: 'left', fill: '#E5E5E5' }}
                    stroke="#E5E5E5"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#2A2A3A', border: '1px solid #6B5B95' }}
                    labelStyle={{ color: '#E5E5E5' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8884d8" 
                    name="Actual Runtime"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  {selectedComplexity === 'worst' && (
                    <Line 
                      type="monotone" 
                      dataKey="bigO" 
                      stroke="#ff6b6b" 
                      name="Big O (Upper Bound)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  )}
                  {selectedComplexity === 'average' && (
                    <Line 
                      type="monotone" 
                      dataKey="bigTheta" 
                      stroke="#4ecdc4" 
                      name="Big Θ (Tight Bound)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  )}
                  {selectedComplexity === 'best' && (
                    <Line 
                      type="monotone" 
                      dataKey="bigOmega" 
                      stroke="#45b7d1" 
                      name="Big Ω (Lower Bound)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="graph-insights">
              <h4>📈 Growth Rate Analysis</h4>
              <p>
                The actual runtime follows a {complexity.actual || 'quadratic'} growth pattern,
                which {complexity.actual === complexity.theoretical?.average ? 'matches' : 'differs from'} 
                the theoretical {complexity.theoretical?.average} complexity.
              </p>
              {performance[0]?.growthRate && (
                <p>Average growth rate: <strong>{performance[0].growthRate.toFixed(2)}x</strong> per input size increase</p>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="tab-content"
          >
            <div className="algorithm-header">
              <h2>{algorithmDetails.name}</h2>
              <p className="algorithm-idea">{algorithmDetails.idea}</p>
            </div>

            <div className="algorithm-steps">
              <h3>📝 Step-by-Step Process</h3>
              <ol>
                {algorithmDetails.steps?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="algorithm-pros-cons">
              <div className="pros">
                <h3>✅ Advantages</h3>
                <ul>
                  {algorithmDetails.advantages?.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <h3>❌ Disadvantages</h3>
                <ul>
                  {algorithmDetails.disadvantages?.map((dis, idx) => (
                    <li key={idx}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="algorithm-use-cases">
              <h3>💡 Use Cases</h3>
              <div className="use-cases-grid">
                {algorithmDetails.useCases?.map((useCase, idx) => (
                  <div key={idx} className="use-case-card">
                    {useCase}
                  </div>
                ))}
              </div>
            </div>

            {algorithmDetails.visualization && (
              <div className="algorithm-visualization">
                <h3>🎨 Visualization</h3>
                <p>{algorithmDetails.visualization}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ComplexityDashboard;