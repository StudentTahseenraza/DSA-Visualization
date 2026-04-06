// components/ArrayResultPanel.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/ArrayResultPanel.css';

const ArrayResultPanel = ({ result, operation, array, steps, stats }) => {
  const [activeTab, setActiveTab] = useState('summary');

  // Calculate stats from steps
  const displayStats = stats || (() => {
    const comparisons = steps?.filter(s => s.action === 'compare' || s.action === 'search-compare').length || 0;
    const shifts = steps?.filter(s => s.action === 'shift' || s.action === 'insert' || s.action === 'delete').length || 0;
    const swaps = steps?.filter(s => s.action === 'swap').length || 0;
    const totalOperations = steps?.length || 0;
    return { comparisons, shifts, swaps, totalOperations };
  })();

  const getTimeComplexity = () => {
    switch(operation) {
      case 'insert':
        return { best: 'O(1)', average: 'O(n)', worst: 'O(n)' };
      case 'delete':
        return { best: 'O(1)', average: 'O(n)', worst: 'O(n)' };
      case 'push':
        return { best: 'O(1)', average: 'O(1)', worst: 'O(n)' };
      case 'pop':
        return { best: 'O(1)', average: 'O(1)', worst: 'O(1)' };
      case 'search':
        return { best: 'O(1)', average: 'O(n)', worst: 'O(n)' };
      case 'traverse':
        return { best: 'O(n)', average: 'O(n)', worst: 'O(n)' };
      case 'update':
        return { best: 'O(1)', average: 'O(1)', worst: 'O(1)' };
      case 'rotate':
        return { best: 'O(n)', average: 'O(n)', worst: 'O(n)' };
      case 'reverse':
        return { best: 'O(n)', average: 'O(n)', worst: 'O(n)' };
      default:
        return { best: 'O(1)', average: 'O(n)', worst: 'O(n)' };
    }
  };

  const getSpaceComplexity = () => {
    switch(operation) {
      case 'insert':
      case 'delete':
      case 'push':
      case 'pop':
      case 'update':
      case 'reverse':
      case 'rotate':
        return { auxiliary: 'O(1)', total: `O(${array?.length || 0})` };
      case 'traverse':
      case 'search':
        return { auxiliary: 'O(1)', total: `O(${array?.length || 0})` };
      default:
        return { auxiliary: 'O(1)', total: `O(${array?.length || 0})` };
    }
  };

  const complexity = getTimeComplexity();
  const spaceComplexity = getSpaceComplexity();

  const getOperationExplanation = () => {
    const explanations = {
      insert: {
        summary: `Inserted ${result?.value || 'value'} at position ${result?.position || 'specified position'} into the array.`,
        detailed: `The insertion operation adds a new element at the specified index. All elements from that index to the end are shifted right by one position to make space. This operation is O(n) in the worst case because it requires shifting elements.`,
        optimization: `For frequent insertions at arbitrary positions, consider using a linked list instead. Inserting at the end (push) is much faster at O(1) amortized.`
      },
      delete: {
        summary: `Deleted element at position ${result?.position || 'specified position'} from the array.`,
        detailed: `The delete operation removes an element at the specified index. All elements after that index are shifted left by one position to fill the gap. This operation is O(n) because it requires shifting elements.`,
        optimization: `Deleting from the end (pop) is O(1) and much faster than deleting from the middle. For frequent deletions, consider using a linked list or a different data structure.`
      },
      push: {
        summary: `Added value ${result?.value} to the end of the array.`,
        detailed: `The push operation adds a new element at the end of the array. If the array has capacity, this is O(1). If resizing is needed, it becomes O(n) amortized.`,
        optimization: `Push is highly efficient for building arrays dynamically. Pre-allocate array length if you know the final size to avoid multiple resizes.`
      },
      pop: {
        summary: `Removed the last element from the array.`,
        detailed: `The pop operation removes and returns the last element of the array. This is O(1) and very efficient for LIFO (Last-In-First-Out) operations.`,
        optimization: `Pop is ideal for implementing stack data structures. Always check if the array is empty before popping to avoid errors.`
      },
      search: {
        summary: `${result?.found ? 'Found' : 'Searched for'} value ${result?.value} in the array.`,
        detailed: `The search operation (linear search) checks each element sequentially until the target is found or the end is reached. This is O(n) in the worst case.`,
        optimization: `For sorted arrays, use binary search (O(log n)). For frequent lookups, consider using a Set or Map (O(1)).`
      },
      traverse: {
        summary: `Visited all ${array?.length || 0} elements in the array sequentially.`,
        detailed: `Traversal visits each element in the array from index 0 to n-1. This is O(n) and allows you to process each element.`,
        optimization: `Use appropriate iteration methods (for...of, forEach, map) based on your needs. Break early when possible to improve performance.`
      },
      update: {
        summary: `Updated element at position ${result?.position} from ${result?.oldValue} to ${result?.value}.`,
        detailed: `The update operation modifies an element at a specific index using direct array access. This is O(1) and very efficient.`,
        optimization: `Direct index access is the fastest way to modify array elements. Use it whenever you know the exact position.`
      },
      rotate: {
        summary: `Rotated the array ${result?.direction || 'left'} by ${result?.positions || 0} position(s).`,
        detailed: `Rotation moves elements in a circular manner. Left rotation moves elements from the front to the back, while right rotation does the opposite. This is O(n) time complexity.`,
        optimization: `For large arrays, use the reversal algorithm (reverse parts then whole) which is O(n) with O(1) extra space.`
      },
      reverse: {
        summary: `Reversed the order of all ${array?.length || 0} elements in the array.`,
        detailed: `The reverse operation swaps elements from both ends moving toward the center. This is O(n/2) ≈ O(n) and works in-place.`,
        optimization: `Built-in reverse() is highly optimized. For manual reversal, swapping in-place saves memory compared to creating a new array.`
      }
    };
    return explanations[operation] || explanations.traverse;
  };

  const explanation = getOperationExplanation();

  const getOperationDisplayName = () => {
    const names = {
      insert: "Insert",
      delete: "Delete",
      push: "Push",
      pop: "Pop",
      search: "Search",
      traverse: "Traverse",
      update: "Update",
      rotate: "Rotate",
      reverse: "Reverse"
    };
    return names[operation] || operation;
  };

  return (
    <motion.div 
      className="array-result-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h3>📊 Array Operation Results</h3>
        <div className="result-badge">{getOperationDisplayName()}</div>
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
                <span className="stat-value">{getOperationDisplayName()}</span>
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
                <span className="stat-label">Shifts/Swaps</span>
                <span className="stat-value">{displayStats.shifts + displayStats.swaps}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Array Size</span>
                <span className="stat-value">{array?.length || 0}</span>
              </div>
            </div>
            
            <div className="operation-result">
              <h4>🎯 Operation Result</h4>
              <p>{explanation.summary}</p>
              {result?.found !== undefined && (
                <p className={`result-status ${result.found ? 'success' : 'error'}`}>
                  {result.found ? '✅ Value found successfully!' : '❌ Value not found in array'}
                </p>
              )}
            </div>
            
            <div className="explanation-box">
              <h4>📖 What happened?</h4>
              <p>{explanation.summary}</p>
              <details>
                <summary>Read detailed explanation</summary>
                <p>{explanation.detailed}</p>
              </details>
            </div>

            {array && array.length > 0 && (
              <div className="current-array-state">
                <h4>📦 Final Array State</h4>
                <div className="array-values">
                  {array.map((value, idx) => (
                    <span key={idx} className="array-value-badge">
                      {value}
                    </span>
                  ))}
                </div>
                <div className="array-visual-hint">
                  💡 Array has {array.length} element(s) | 
                  {array.length > 0 && ` Min: ${Math.min(...array)} | Max: ${Math.max(...array)} | Sum: ${array.reduce((a,b) => a+b, 0)}`}
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
                Array operations have varying complexities. Direct access (by index) is O(1) and very efficient.
                Insertions and deletions from the middle require shifting elements, making them O(n).
                For {operation}, the complexity is {complexity.average} on average.
                {operation === 'push' && ' Push is amortized O(1), making it great for dynamic arrays!'}
                {operation === 'pop' && ' Pop is O(1) - constant time!'}
                {operation === 'search' && ' Linear search is O(n); consider binary search for sorted arrays.'}
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
                <li>Constant-time random access (O(1) by index)</li>
                <li>Memory efficient - contiguous memory allocation</li>
                <li>Cache-friendly due to spatial locality</li>
                <li>Simple and intuitive to use</li>
                <li>Excellent for sequential access patterns</li>
                {operation === 'push' && <li>Push is amortized O(1) - very efficient</li>}
                {operation === 'pop' && <li>Pop is O(1) - constant time operation</li>}
                {operation === 'reverse' && <li>Reverse works in-place with O(1) extra space</li>}
              </ul>
            </div>

            <div className="analysis-section">
              <h4>⚠️ Weaknesses</h4>
              <ul>
                <li>Insertions/deletions in the middle are O(n)</li>
                <li>Fixed size in static arrays (dynamic arrays may need resizing)</li>
                <li>Resizing operation is expensive (O(n) for copy)</li>
                <li>Not suitable for frequent insertions/deletions at arbitrary positions</li>
                {operation === 'search' && <li>Linear search is O(n) - slow for large arrays</li>}
                {operation === 'insert' && <li>Insert requires shifting O(n) elements</li>}
              </ul>
            </div>

            <div className="analysis-section">
              <h4>🎯 Best Use Cases</h4>
              <ul>
                <li>Storing and accessing collections of data by index</li>
                <li>Implementing dynamic lists (ArrayList, Vector)</li>
                <li>Buffer implementations (circular buffers)</li>
                <li>Matrix and grid representations</li>
                <li>Lookup tables and caches</li>
                <li>Stack and Queue implementations</li>
              </ul>
            </div>

            <div className="analysis-section">
              <h4>📈 Performance Metrics</h4>
              <div className="performance-metrics">
                <div className="metric">
                  <span>Access Speed (by index)</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '100%' }}></div>
                  </div>
                  <span className="metric-value">Excellent (O(1))</span>
                </div>
                <div className="metric">
                  <span>Insertion Speed (end)</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '95%' }}></div>
                  </div>
                  <span className="metric-value">Excellent (O(1) amortized)</span>
                </div>
                <div className="metric">
                  <span>Insertion Speed (middle)</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '30%' }}></div>
                  </div>
                  <span className="metric-value">Poor (O(n))</span>
                </div>
                <div className="metric">
                  <span>Memory Overhead</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '15%' }}></div>
                  </div>
                  <span className="metric-value">Very Low</span>
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
                  <strong>Pre-allocate array size:</strong> If you know the maximum size in advance,
                  pre-allocate to avoid expensive resize operations.
                </li>
                <li>
                  <strong>Use appropriate methods:</strong> Use push/pop for stack operations,
                  shift/unshift for queue operations (though these are O(n)).
                </li>
                <li>
                  <strong>Batch operations:</strong> When possible, batch multiple updates or use
                  methods like splice() for multiple insertions/deletions.
                </li>
                <li>
                  <strong>Choose the right data structure:</strong> For frequent insertions/deletions
                  in the middle, consider linked lists or balanced trees.
                </li>
              </ul>
            </div>

            <div className="optimization-section">
              <h4>💡 Code Improvements</h4>
              <ul>
                <li>
                  <strong>Use for...of for readability:</strong> When you don't need the index,
                  for...of loops are cleaner and optimized.
                </li>
                <li>
                  <strong>Leverage built-in methods:</strong> Methods like map(), filter(), reduce()
                  are highly optimized in JavaScript engines.
                </li>
                <li>
                  <strong>Avoid unnecessary copies:</strong> Use slice() carefully as it creates
                  shallow copies of arrays.
                </li>
                <li>
                  <strong>Use spread operator wisely:</strong> While convenient, spreading large
                  arrays creates copies and can be memory-intensive.
                </li>
              </ul>
            </div>

            <div className="optimization-section">
              <h4>🎯 Best Practices</h4>
              <ul>
                <li>Use const for arrays that shouldn't be reassigned</li>
                <li>Prefer push/pop over unshift/shift for stack operations</li>
                <li>Use index access (arr[i]) instead of methods when performance matters</li>
                <li>For searching, sort first then use binary search for O(log n)</li>
                <li>Consider using TypedArrays for numerical data for better performance</li>
              </ul>
            </div>

            <div className="optimization-note">
              <h4>📊 Performance Comparison</h4>
              <table className="comparison-table">
                <thead>
                  <tr><th>Operation</th><th>Array</th><th>Linked List</th><th>Set/Map</th></tr>
                </thead>
                <tbody>
                  <tr><td>Access by index</td><td className="good">O(1) ✓</td><td className="poor">O(n) ✗</td><td className="good">O(1) ✓</td></tr>
                  <tr><td>Insert at end</td><td className="good">O(1) ✓</td><td className="good">O(1) ✓</td><td className="good">O(1) ✓</td></tr>
                  <tr><td>Insert at middle</td><td className="poor">O(n) ✗</td><td className="good">O(1)* ✓</td><td className="good">O(1) ✓</td></tr>
                  <tr><td>Search by value</td><td className="poor">O(n) ✗</td><td className="poor">O(n) ✗</td><td className="good">O(1) ✓</td></tr>
                </tbody>
              </table>
              <p className="note">* Requires reference to node. Without reference, O(n) to find position.</p>
              <p className="tip">💡 Choose arrays for indexed access, lists for frequent insertions, and sets for unique values with fast lookup!</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ArrayResultPanel;