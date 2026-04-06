// components/HeapResultPanel.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/HeapResultPanel.css';

const HeapResultPanel = ({ result, operation, heap, steps, stats }) => {
  const [activeTab, setActiveTab] = useState('summary');

  // Use provided stats or calculate
  const displayStats = stats || (() => {
    const comparisons = steps?.filter(s => s.action === 'compare').length || 0;
    const swaps = steps?.filter(s => s.action === 'swap').length || 0;
    const totalOperations = steps?.length || 0;
    return { comparisons, swaps, totalOperations };
  })();

  const getTimeComplexity = () => {
    switch(operation) {
      case 'insert':
        return { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' };
      case 'bulk-insert':
        return { best: 'O(n)', average: 'O(n)', worst: 'O(n)' };
      case 'extract':
        return { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' };
      case 'delete':
        return { best: 'O(1)', average: 'O(n + log n)', worst: 'O(n + log n)' };
      case 'heapify':
        return { best: 'O(n)', average: 'O(n)', worst: 'O(n)' };
      default:
        return { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' };
    }
  };

  const getSpaceComplexity = () => {
    return { auxiliary: 'O(1)', total: `O(${heap?.length || 0})` };
  };

  const complexity = getTimeComplexity();
  const spaceComplexity = getSpaceComplexity();

  const getOperationExplanation = () => {
    const explanations = {
      insert: {
        summary: `Inserted value into the heap while maintaining heap property.`,
        detailed: `The insertion operation adds the new element at the end of the heap array, then "bubbles up" by comparing with parent nodes and swapping when necessary to maintain the heap property. This ensures the largest/smallest element remains at the root.`,
        optimization: `For better performance with multiple insertions, consider using bulk insert which builds a heap in O(n) time instead of O(n log n) for n individual insertions.`
      },
      'bulk-insert': {
        summary: `Successfully inserted ${heap?.length} values into the heap using bulk insertion.`,
        detailed: `Bulk insertion adds all values to the end of the heap array, then heapifies from the bottom up. This is much more efficient than inserting elements one by one, with O(n) time complexity instead of O(n log n).`,
        optimization: `Bulk insertion is the preferred method when you need to insert multiple values at once. It maintains heap property efficiently and reduces the number of operations.`
      },
      extract: {
        summary: `Extracted the root element and restructured the heap.`,
        detailed: `The extract operation removes the root element (max/min), replaces it with the last element, and then "sinks down" by comparing with children and swapping to restore heap property. This is O(log n) operation.`,
        optimization: `When extracting multiple elements, the heap remains efficient for priority queue operations like Dijkstra's algorithm or job scheduling.`
      },
      delete: {
        summary: `Deleted the specified value from the heap.`,
        detailed: `The delete operation finds the value in the heap, replaces it with the last element, removes the last element, and then restores heap property by either bubbling up or sinking down as needed.`,
        optimization: `Deleting arbitrary values from a heap requires O(n) time to find the element. Consider using a hash map with the heap for O(log n) deletions if needed frequently.`
      },
      heapify: {
        summary: `Converted array into a valid heap structure.`,
        detailed: `Heapify builds a heap from an unsorted array by working from the last non-leaf node up to the root, ensuring each subtree satisfies heap property. This runs in O(n) time, which is optimal for heap construction.`,
        optimization: `Always use heapify when building a heap from scratch rather than inserting elements one by one for better performance.`
      }
    };
    return explanations[operation] || explanations.insert;
  };

  const explanation = getOperationExplanation();

  return (
    <motion.div 
      className="heap-result-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h3>📊 Operation Results</h3>
        {result && <div className="result-badge">{result}</div>}
      </div>
      
      <div className="result-tabs">
        <button 
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          📋 Summary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'complexity' ? 'active' : ''}`}
          onClick={() => setActiveTab('complexity')}
        >
          ⚡ Complexity
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          🔍 Analysis
        </button>
        <button 
          className={`tab-btn ${activeTab === 'optimization' ? 'active' : ''}`}
          onClick={() => setActiveTab('optimization')}
        >
          🚀 Optimization
        </button>
      </div>

      <div className="result-content">
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="summary-tab"
          >
            <div className="summary-stats">
              <div className="stat-card">
                <span className="stat-label">Operation</span>
                <span className="stat-value">{operation.replace('-', ' ').toUpperCase()}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Steps</span>
                <span className="stat-value">{displayStats.totalOperations}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Comparisons</span>
                <span className="stat-value">{displayStats.comparisons}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Swaps</span>
                <span className="stat-value">{displayStats.swaps}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Heap Size</span>
                <span className="stat-value">{heap?.length || 0}</span>
              </div>
              {heap && heap.length > 0 && (
                <div className="stat-card">
                  <span className="stat-label">Root Value</span>
                  <span className="stat-value">{heap[0]}</span>
                </div>
              )}
            </div>
            
            {result && (
              <div className="operation-result">
                <h4>🎯 Operation Result</h4>
                <p>{result}</p>
              </div>
            )}
            
            <div className="explanation-box">
              <h4>📖 What happened?</h4>
              <p>{explanation.summary}</p>
              <details>
                <summary>Read detailed explanation</summary>
                <p>{explanation.detailed}</p>
              </details>
            </div>

            {heap && heap.length > 0 && (
              <div className="current-heap-state">
                <h4>📦 Current Heap State</h4>
                <div className="heap-array">
                  Array: [{heap.join(', ')}]
                </div>
                <div className="heap-visual-hint">
                  💡 Root: {heap[0]} | {operation === 'extract' ? 'Removed element' : 'Heap property maintained'}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'complexity' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="complexity-tab"
          >
            <h3>⏱️ Time Complexity</h3>
            <div className="complexity-table">
              <div className="complexity-row">
                <span className="complexity-label">Best Case</span>
                <span className="complexity-value">{complexity.best}</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-label">Average Case</span>
                <span className="complexity-value">{complexity.average}</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-label">Worst Case</span>
                <span className="complexity-value">{complexity.worst}</span>
              </div>
            </div>

            <h3>💾 Space Complexity</h3>
            <div className="complexity-table">
              <div className="complexity-row">
                <span className="complexity-label">Auxiliary Space</span>
                <span className="complexity-value">{spaceComplexity.auxiliary}</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-label">Total Space</span>
                <span className="complexity-value">{spaceComplexity.total}</span>
              </div>
            </div>

            <div className="complexity-note">
              <h4>💡 Complexity Insights</h4>
              <p>
                Heap operations are efficient with O(log n) time complexity for insert and extract operations.
                The heap property ensures that the maximum or minimum element is always at the root,
                making priority queue operations very fast.
                {operation === 'bulk-insert' && ' Bulk insertion is particularly efficient with O(n) complexity!'}
                {operation === 'heapify' && ' Heapify is the most efficient way to build a heap from an array!'}
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'analysis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="analysis-tab"
          >
            <h3>🔬 Algorithm Analysis</h3>
            
            <div className="analysis-section">
              <h4>✅ Strengths</h4>
              <ul>
                <li>Efficient priority queue implementation</li>
                <li>Guaranteed O(log n) insert and extract operations</li>
                <li>In-place sorting with Heap Sort (O(n log n))</li>
                <li>Memory efficient - uses array representation</li>
                {operation === 'bulk-insert' && <li>Bulk insertion is optimal for multiple inserts</li>}
              </ul>
            </div>

            <div className="analysis-section">
              <h4>⚠️ Weaknesses</h4>
              <ul>
                <li>Not stable (order of equal elements not preserved)</li>
                <li>Poor cache locality compared to arrays</li>
                <li>Search operations are O(n) - not efficient</li>
                <li>Not suitable for searching arbitrary elements</li>
                {operation === 'delete' && <li>Deleting arbitrary values requires O(n) search time</li>}
              </ul>
            </div>

            <div className="analysis-section">
              <h4>🎯 Best Use Cases</h4>
              <ul>
                <li>Priority Queues</li>
                <li>Job Scheduling</li>
                <li>Dijkstra's Shortest Path Algorithm</li>
                <li>Heap Sort</li>
                <li>Median/Order Statistics</li>
                <li>Event-driven simulations</li>
              </ul>
            </div>

            <div className="analysis-section">
              <h4>📈 Performance Metrics</h4>
              <div className="performance-metrics">
                <div className="metric">
                  <span>Operations per second</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '95%' }}></div>
                  </div>
                  <span className="metric-value">Excellent</span>
                </div>
                <div className="metric">
                  <span>Memory Usage</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '30%' }}></div>
                  </div>
                  <span className="metric-value">Low</span>
                </div>
                <div className="metric">
                  <span>Implementation Complexity</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '40%' }}></div>
                  </div>
                  <span className="metric-value">Moderate</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'optimization' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="optimization-tab"
          >
            <h3>🚀 Optimization Tips</h3>
            
            <div className="optimization-section">
              <h4>Performance Optimizations</h4>
              <ul>
                <li>
                  <strong>Use bulk insert instead of multiple inserts:</strong> When inserting multiple elements,
                  use bulk insert which runs in O(n) rather than O(n log n).
                </li>
                <li>
                  <strong>Use heapify from scratch:</strong> Building a heap from an array using heapify
                  is O(n) instead of O(n log n) for n insertions.
                </li>
                <li>
                  <strong>Pre-allocate array capacity:</strong> If you know the maximum size,
                  pre-allocate to avoid dynamic resizing overhead.
                </li>
                <li>
                  <strong>Use integer indices:</strong> Avoid objects in the heap array for
                  better performance with primitive values.
                </li>
              </ul>
            </div>

            <div className="optimization-section">
              <h4>💡 Code Improvements</h4>
              <ul>
                <li>
                  <strong>Iterative vs Recursive:</strong> Use iterative implementations for
                  bubble-up and sink-down to avoid recursion overhead.
                </li>
                <li>
                  <strong>Early termination:</strong> Break early when no swap is needed during
                  bubble-up or sink-down.
                </li>
                <li>
                  <strong>Cache child indices:</strong> Pre-calculate child indices to avoid
                  repeated calculations.
                </li>
                {operation === 'delete' && (
                  <li>
                    <strong>Use a hash map for deletions:</strong> For frequent arbitrary deletions,
                    maintain a hash map from values to indices for O(log n) deletions.
                  </li>
                )}
              </ul>
            </div>

            <div className="optimization-section">
              <h4>🎯 Best Practices</h4>
              <ul>
                <li>Use a max-heap for priority queues where highest priority is needed first</li>
                <li>Use a min-heap for Dijkstra's algorithm and Prim's MST</li>
                <li>Consider binary heaps for most use cases</li>
                <li>Monitor heap size to prevent memory issues in long-running applications</li>
                <li>Use bulk operations when possible for better performance</li>
              </ul>
            </div>

            <div className="optimization-note">
              <h4>📊 Performance Comparison</h4>
              <table className="comparison-table">
                <thead>
                  <tr><th>Operation</th><th>Binary Heap</th><th>Single Inserts</th><th>Bulk Insert</th></tr>
                </thead>
                <tbody>
                  <tr><td>n=10</td><td>O(n log n)</td><td>~30 ops</td><td>~10 ops</td></tr>
                  <tr><td>n=100</td><td>O(n log n)</td><td>~660 ops</td><td>~100 ops</td></tr>
                  <tr><td>n=1000</td><td>O(n log n)</td><td>~9,900 ops</td><td>~1,000 ops</td></tr>
                </tbody>
              </table>
              <p className="note">Bulk insert is significantly faster for multiple insertions!</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HeapResultPanel;