// components/DPResultSummary.jsx
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import '../styles/DPResultSummary.css';

const DPResultSummary = ({ 
  result, 
  algorithm, 
  complexity, 
  complexityBreakdown, 
  complexityGraph, 
  memoizationInsight, 
  operationExplanation, 
  patternInsight,
  optimizationTips 
}) => {
  const [activeTab, setActiveTab] = useState('result');
  const [showRecursionTree, setShowRecursionTree] = useState(false);

  // Prepare chart data
  const chartData = complexityGraph?.inputSizes?.map((size, idx) => ({
    inputSize: size,
    best: complexityGraph.best?.[idx],
    average: complexityGraph.avg?.[idx],
    worst: complexityGraph.worst?.[idx]
  })) || [];

  const renderResultContent = () => {
    switch (algorithm) {
      case 'fibonacci':
        return (
          <div className="result-content">
            <div className="result-card">
              <div className="result-icon">🔢</div>
              <div className="result-details">
                <div className="result-label">Fibonacci Number</div>
                <div className="result-value-large">fib({result?.n}) = {result?.value}</div>
              </div>
            </div>
            {result?.memoTable && (
              <div className="memo-table-result">
                <h5>📋 Memoization Table</h5>
                <div className="memo-result-grid">
                  {result.memoTable.map((val, idx) => (
                    <div key={idx} className="memo-result-item">
                      <span className="memo-key">fib({idx})</span>
                      <span className="memo-val">{val === '?' ? '❓' : val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'knapsack-dp':
        return (
          <div className="result-content">
            <div className="result-card">
              <div className="result-icon">🎒</div>
              <div className="result-details">
                <div className="result-label">Maximum Value</div>
                <div className="result-value-large">{result?.value}</div>
              </div>
            </div>
            {result?.selectedItems && result.selectedItems.length > 0 && (
              <div className="selected-items">
                <h5>✅ Selected Items</h5>
                <div className="items-grid">
                  {result.selectedItems.map((item, idx) => (
                    <div key={idx} className="selected-item-card">
                      <span className="item-name">{item.name}</span>
                      <span className="item-value">Value: {item.value}</span>
                      <span className="item-weight">Weight: {item.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'longest-common-subsequence':
        return (
          <div className="result-content">
            <div className="result-card">
              <div className="result-icon">📝</div>
              <div className="result-details">
                <div className="result-label">LCS Length</div>
                <div className="result-value-large">{result?.length}</div>
              </div>
            </div>
            {result?.sequence && (
              <div className="lcs-sequence">
                <h5>🔤 Longest Common Subsequence</h5>
                <div className="sequence-display">{result.sequence}</div>
              </div>
            )}
          </div>
        );
        
      default:
        return <div>Result: {JSON.stringify(result)}</div>;
    }
  };

  const renderComplexityBreakdown = () => {
    if (!complexityBreakdown) return null;
    
    return (
      <div className="complexity-breakdown">
        <h4>📊 Step-by-Step Complexity Derivation</h4>
        <div className="breakdown-steps">
          <div className="breakdown-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <strong>Number of States</strong>
              <p>{complexityBreakdown.states}</p>
            </div>
          </div>
          <div className="breakdown-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <strong>Work per State</strong>
              <p>{complexityBreakdown.transitions}</p>
            </div>
          </div>
          <div className="breakdown-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <strong>Total Work</strong>
              <p>{complexityBreakdown.totalWork}</p>
            </div>
          </div>
        </div>
        {complexityBreakdown.formula && (
          <div className="complexity-formula">
            <strong>📐 Complexity Formula:</strong>
            <code>{complexityBreakdown.formula}</code>
          </div>
        )}
        <div className="breakdown-explanation">
          <strong>💡 Why this matters:</strong>
          <p>{complexityBreakdown.explanation}</p>
        </div>
      </div>
    );
  };

  const renderComplexityGraph = () => {
    if (!chartData.length) return null;
    
    return (
      <div className="complexity-graph">
        <h4>📈 Complexity Growth Visualization</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="inputSize" label={{ value: 'Input Size (n)', position: 'bottom', fill: '#888' }} />
            <YAxis label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: '#888' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #4299e1' }} />
            <Legend />
            <Line type="monotone" dataKey="best" stroke="#48bb78" name="Best Case" strokeWidth={2} />
            <Line type="monotone" dataKey="average" stroke="#4299e1" name="Average Case" strokeWidth={2} />
            <Line type="monotone" dataKey="worst" stroke="#e74c3c" name="Worst Case" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <p className="graph-note">
          * As input size grows, operations increase polynomially (not exponentially) due to DP optimization.
        </p>
      </div>
    );
  };

  const renderComplexityTable = () => {
    if (!complexity) return null;
    
    return (
      <div className="complexity-table">
        <h4>📋 Complexity Summary</h4>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Best Case</th>
              <th>Average Case</th>
              <th>Worst Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Time Complexity</td>
              <td><code>{complexity.time?.best || 'O(1)'}</code></td>
              <td><code>{complexity.time?.average || 'O(n)'}</code></td>
              <td><code>{complexity.time?.worst || 'O(n)'}</code></td>
            </tr>
            <tr>
              <td>Space Complexity</td>
              <td colSpan="3"><code>{complexity.space || 'O(n)'}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderMemoizationInsight = () => {
    if (!memoizationInsight) return null;
    
    return (
      <div className="memoization-insight">
        <h4>⚡ Memoization vs Recursion: The Power of DP</h4>
        
        <div className="comparison-stats">
          <div className="stat-card recursive">
            <div className="stat-icon">❌</div>
            <div className="stat-label">Without DP (Recursion)</div>
            <div className="stat-value">{memoizationInsight.recursionCalls?.toLocaleString() || 'N/A'}</div>
            <div className="stat-sub">function calls</div>
          </div>
          <div className="stat-arrow">→</div>
          <div className="stat-card dp">
            <div className="stat-icon">✅</div>
            <div className="stat-label">With DP (Memoization)</div>
            <div className="stat-value">{memoizationInsight.dpCalls?.toLocaleString() || 'N/A'}</div>
            <div className="stat-sub">unique states</div>
          </div>
        </div>
        
        {memoizationInsight.visualComparison && (
          <div className="visual-comparison">
            <div className="comparison-item">
              <span className="comparison-label">Brute Force:</span>
              <span className="comparison-value">{memoizationInsight.visualComparison.withoutDP}</span>
            </div>
            <div className="comparison-item">
              <span className="comparison-label">DP Approach:</span>
              <span className="comparison-value">{memoizationInsight.visualComparison.withDP}</span>
            </div>
            <div className="comparison-item highlight">
              <span className="comparison-label">Improvement:</span>
              <span className="comparison-value">{memoizationInsight.visualComparison.improvement}</span>
            </div>
          </div>
        )}
        
        <div className="savings-badge">
          🎉 Saved {memoizationInsight.savedCalls?.toLocaleString()} calculations 
          ({memoizationInsight.savedPercentage}% reduction!)
        </div>
        
        <div className="optimization-explanation">
          <p>{memoizationInsight.explanation}</p>
        </div>
        
        {memoizationInsight.dpOptimization && (
          <div className="optimization-steps">
            <strong>🚀 How DP Optimizes:</strong>
            <ul>
              {memoizationInsight.dpOptimization.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        
        {memoizationInsight.recursionTree && typeof memoizationInsight.recursionTree === 'object' && !memoizationInsight.recursionTree.message && showRecursionTree && (
          <div className="recursion-tree-visual">
            <div className="tree-header">
              <button onClick={() => setShowRecursionTree(false)}>Hide Recursion Tree</button>
            </div>
            <div className="recursion-tree-content">
              {renderRecursionTree(memoizationInsight.recursionTree)}
            </div>
          </div>
        )}
        
        {memoizationInsight.recursionTree?.message && (
          <div className="recursion-warning">
            ⚠️ {memoizationInsight.recursionTree.message}
          </div>
        )}
        
        {memoizationInsight.recursionTree && typeof memoizationInsight.recursionTree === 'object' && !showRecursionTree && (
          <button className="show-tree-btn" onClick={() => setShowRecursionTree(true)}>
            🌳 Show Recursion Tree (Exponential Growth)
          </button>
        )}
      </div>
    );
  };

  const renderRecursionTree = (node, level = 0) => {
    if (!node) return null;
    
    return (
      <div className="tree-node-container" style={{ marginLeft: level * 20 }}>
        <div className={`tree-node ${node.repeated ? 'repeated' : ''}`}>
          <span className="node-value">fib({node.value})</span>
          {node.repeated && <span className="repeated-badge">⚡ Repeated!</span>}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="tree-children">
            {node.children.map((child, idx) => (
              <div key={idx} className="tree-child">
                {renderRecursionTree(child, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderOperationExplanation = () => {
    if (!operationExplanation || !operationExplanation.length) {
      return (
        <div className="operation-explanation">
          <h4>🔍 Operation Explanation</h4>
          <div className="no-data-message">
            <p>No operation data available. Please run the algorithm to see detailed explanations.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="operation-explanation">
        <h4>🔍 Step-by-Step Operation Explanation</h4>
        <div className="explanation-timeline">
          {operationExplanation.map((exp, idx) => (
            <motion.div 
              key={idx}
              className="explanation-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="explanation-step">Step {exp.step}</div>
              <div className="explanation-title">{exp.title}</div>
              <div className="explanation-description">{exp.description}</div>
              {exp.visual && (
                <div className="explanation-visual">
                  <code>{exp.visual}</code>
                </div>
              )}
              {exp.formula && (
                <div className="explanation-formula">
                  📐 {exp.formula}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderPatternInsight = () => {
    if (!patternInsight) return null;
    
    return (
      <div className="pattern-insight">
        <h4>🧠 DP Pattern Recognition</h4>
        
        <div className="insight-grid">
          <div className="insight-card">
            <div className="insight-icon">🔄</div>
            <div className="insight-content">
              <strong>Overlapping Subproblems</strong>
              <p>{patternInsight.overlappingSubproblems}</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">🏗️</div>
            <div className="insight-content">
              <strong>Optimal Substructure</strong>
              <p>{patternInsight.optimalSubstructure}</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">📦</div>
            <div className="insight-content">
              <strong>State Definition</strong>
              <p><code>{patternInsight.stateDefinition}</code></p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">⚡</div>
            <div className="insight-content">
              <strong>Transition Relation</strong>
              <p><code>{patternInsight.transition}</code></p>
            </div>
          </div>
        </div>
        
        {patternInsight.realWorldAnalogy && (
          <div className="real-world-analogy">
            <strong>🌍 Real World Analogy:</strong>
            <p>{patternInsight.realWorldAnalogy}</p>
          </div>
        )}
        
        {patternInsight.whenToUse && (
          <div className="when-to-use">
            <strong>🎯 When to Use This Pattern:</strong>
            <p>{patternInsight.whenToUse}</p>
          </div>
        )}
        
        {patternInsight.commonMistakes && patternInsight.commonMistakes.length > 0 && (
          <div className="common-mistakes">
            <strong>⚠️ Common Mistakes to Avoid:</strong>
            <ul>
              {patternInsight.commonMistakes.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderOptimizationTips = () => {
    if (!optimizationTips || !optimizationTips.length) {
      return (
        <div className="optimization-tips">
          <h4>⚡ Optimization Tips</h4>
          <div className="no-data-message">
            <p>No optimization tips available. Please run the algorithm to see optimization suggestions.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="optimization-tips">
        <h4>⚡ Space & Time Optimization Tips</h4>
        <div className="tips-grid">
          {optimizationTips.map((tip, idx) => (
            <motion.div 
              key={idx}
              className="tip-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="tip-title">{tip.title}</div>
              <div className="tip-description">{tip.description}</div>
              {tip.code && (
                <div className="tip-code">
                  <pre><code>{tip.code}</code></pre>
                </div>
              )}
              <div className="tip-benefit">
                <strong>Benefit:</strong> {tip.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="dp-result-summary-enhanced"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tab Navigation */}
      <div className="result-tabs">
        <button className={activeTab === 'result' ? 'active' : ''} onClick={() => setActiveTab('result')}>
          📊 Result
        </button>
        <button className={activeTab === 'complexity' ? 'active' : ''} onClick={() => setActiveTab('complexity')}>
          📈 Complexity
        </button>
        <button className={activeTab === 'optimization' ? 'active' : ''} onClick={() => setActiveTab('optimization')}>
          ⚡ Optimization
        </button>
        <button className={activeTab === 'operations' ? 'active' : ''} onClick={() => setActiveTab('operations')}>
          🔍 Operations
        </button>
        <button className={activeTab === 'patterns' ? 'active' : ''} onClick={() => setActiveTab('patterns')}>
          🧠 Patterns
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'result' && renderResultContent()}
        
        {activeTab === 'complexity' && (
          <>
            {renderComplexityTable()}
            {renderComplexityBreakdown()}
            {renderComplexityGraph()}
          </>
        )}
        
        {activeTab === 'optimization' && (
          <>
            {renderMemoizationInsight()}
            {renderOptimizationTips()}
          </>
        )}
        
        {activeTab === 'operations' && (
          <>
            {renderOperationExplanation()}
          </>
        )}
        
        {activeTab === 'patterns' && (
          <>
            {renderPatternInsight()}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default DPResultSummary;