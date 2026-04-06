// frontend/src/components/BSTResultPanel.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/BSTResultPanel.css';

const BSTResultPanel = ({ result, operation, tree, steps, value }) => {
  const [activeTab, setActiveTab] = useState('summary');

  const calculateStats = () => {
    if (!steps || steps.length === 0) {
      return { comparisons: 0, traversals: 0, totalSteps: 0, rotations: 0 };
    }
    
    const comparisons = steps.filter(s => s.action === 'compare' || s.action === 'traverse').length;
    const rotations = steps.filter(s => s.action === 'rotate-right' || s.action === 'rotate-left').length;
    const insertions = steps.filter(s => s.action === 'insert' || s.action === 'insert-root').length;
    
    return {
      comparisons,
      rotations,
      insertions,
      totalSteps: steps.length
    };
  };

  const stats = calculateStats();

  const getTimeComplexity = () => {
    const complexities = {
      insert: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      search: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      delete: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' },
      'bulk-insert': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      traverse: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' }
    };
    return complexities[operation] || { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' };
  };

  const getSpaceComplexity = () => {
    const complexities = {
      insert: 'O(1)',
      search: 'O(1)',
      delete: 'O(1)',
      'bulk-insert': 'O(n)',
      traverse: 'O(h) where h is tree height'
    };
    return complexities[operation] || 'O(1)';
  };

  const getOperationExplanation = () => {
    const explanations = {
      insert: {
        summary: `Inserted value ${value} into the Binary Search Tree while maintaining BST property.`,
        detailed: `The insertion operation traverses the tree starting from the root, comparing the value with each node. If the value is less than the current node, it moves left; if greater, it moves right. When it reaches a null position, it creates a new node there. This ensures all left descendants are smaller and right descendants are larger.`,
        strengths: 'Efficient O(log n) average case, maintains sorted order, easy to implement.',
        weaknesses: 'Can become unbalanced, worst-case O(n) if values inserted in sorted order.'
      },
      'bulk-insert': {
        summary: `Successfully inserted ${Array.isArray(value) ? value.length : 0} values into the BST.`,
        detailed: `Bulk insertion inserts multiple values sequentially. For better performance with large datasets, consider balancing the tree first or using a self-balancing tree like AVL or Red-Black.`,
        strengths: 'Convenient for multiple insertions, each insertion maintains BST property.',
        weaknesses: 'Can cause significant unbalancing if values are inserted in sorted order.'
      },
      search: {
        summary: `${value} ${result?.found ? 'found' : 'not found'} in the Binary Search Tree.`,
        detailed: `The search operation compares the target value with the current node. If equal, it returns found. If less, it goes left; if greater, it goes right. This continues until the value is found or a null position is reached.`,
        strengths: 'Very efficient for searching, O(log n) average time.',
        weaknesses: 'Depends on tree balance, worst-case O(n).'
      },
      delete: {
        summary: `Successfully deleted value ${value} from the BST.`,
        detailed: `Deletion handles three cases: leaf node (remove directly), node with one child (replace with child), and node with two children (find inorder successor, replace value, delete successor). The tree maintains BST property after deletion.`,
        strengths: 'Maintains BST property, handles all cases properly.',
        weaknesses: 'Can be complex to implement correctly, may affect tree balance.'
      },
      traverse: {
        summary: `Traversal completed successfully.`,
        detailed: `The traversal visits every node in the tree exactly once. Different traversal orders (inorder, preorder, postorder) serve different purposes: inorder gives sorted order, preorder is useful for copying trees, postorder is used for deletion.`,
        strengths: 'Visits all nodes systematically, each order has specific use cases.',
        weaknesses: 'Always O(n) time, cannot be optimized further.'
      }
    };
    return explanations[operation] || explanations.insert;
  };

  const complexity = getTimeComplexity();
  const spaceComplexity = getSpaceComplexity();
  const explanation = getOperationExplanation();

  const getTreeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  };

  const getNodeCount = (node) => {
    if (!node) return 0;
    return 1 + getNodeCount(node.left) + getNodeCount(node.right);
  };

  const treeHeight = getTreeHeight(tree);
  const nodeCount = getNodeCount(tree);

  const getOperationDisplayName = () => {
    const names = {
      insert: 'Insert',
      'bulk-insert': 'Bulk Insert',
      search: 'Search',
      delete: 'Delete',
      traverse: 'Traversal'
    };
    return names[operation] || operation;
  };

  return (
    <motion.div 
      className="bst-result-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h3>🌳 BST {getOperationDisplayName()} Results</h3>
        <div className="result-badge">{result?.found !== undefined ? (result.found ? 'Found ✓' : 'Not Found ✗') : 'Complete'}</div>
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
                <span className="stat-value">{stats.totalSteps}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Comparisons</span>
                <span className="stat-value">{stats.comparisons}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Rotations</span>
                <span className="stat-value">{stats.rotations}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Node Count</span>
                <span className="stat-value">{nodeCount}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Tree Height</span>
                <span className="stat-value">{treeHeight}</span>
              </div>
            </div>
            
            <div className="explanation-box">
              <h4>📖 What happened?</h4>
              <p>{explanation.summary}</p>
              <details>
                <summary>Read detailed explanation</summary>
                <p>{explanation.detailed}</p>
              </details>
            </div>

            {operation === 'search' && result && (
              <div className="search-result">
                <h4>🎯 Search Result</h4>
                <div className={`result-indicator ${result.found ? 'found' : 'not-found'}`}>
                  {result.found ? '✓ Value Found in Tree' : '✗ Value Not Found'}
                </div>
              </div>
            )}

            {operation === 'delete' && value && (
              <div className="delete-result">
                <h4>🗑️ Deletion Result</h4>
                <div className="result-indicator success">
                  Successfully deleted value {value} from the tree
                </div>
              </div>
            )}

            {operation === 'bulk-insert' && Array.isArray(value) && (
              <div className="bulk-result">
                <h4>📦 Bulk Insert Summary</h4>
                <div className="bulk-values">
                  Inserted values: [{value.join(', ')}]
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
                <span className="complexity-value">{spaceComplexity}</span>
              </div>
            </div>

            <div className="complexity-note">
              <h4>💡 Complexity Insights</h4>
              <p>
                BST operations are efficient with O(log n) average time complexity when the tree is balanced.
                However, in the worst case (when values are inserted in sorted order), the tree becomes a linked list
                with O(n) time complexity. This is why self-balancing trees like AVL or Red-Black trees are preferred
                for production applications.
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
            <h3>🔬 BST Analysis</h3>
            
            <div className="analysis-section">
              <h4>✅ Strengths</h4>
              <ul>
                <li>{explanation.strengths}</li>
                <li>Dynamic size - grows and shrinks as needed</li>
                <li>Inorder traversal gives sorted order</li>
                <li>Efficient for both search and insertion</li>
                <li>Can be used to implement sets and maps</li>
              </ul>
            </div>

            <div className="analysis-section">
              <h4>⚠️ Weaknesses</h4>
              <ul>
                <li>{explanation.weaknesses}</li>
                <li>No guaranteed balance without additional logic</li>
                <li>Cache performance is poor compared to arrays</li>
                <li>Extra memory overhead for pointers</li>
              </ul>
            </div>

            <div className="analysis-section">
              <h4>🎯 Best Use Cases</h4>
              <ul>
                <li>Dictionary/Map implementations</li>
                <li>Database indexing (with balancing)</li>
                <li>Ordered set operations</li>
                <li>Range queries (find all values between x and y)</li>
                <li>Symbol tables in compilers</li>
              </ul>
            </div>

            <div className="analysis-section">
              <h4>📊 Performance Metrics</h4>
              <div className="performance-metrics">
                <div className="metric">
                  <span>Search Speed (Balanced)</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '90%' }}></div>
                  </div>
                  <span className="metric-value">Excellent</span>
                </div>
                <div className="metric">
                  <span>Insertion Speed</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '85%' }}></div>
                  </div>
                  <span className="metric-value">Very Good</span>
                </div>
                <div className="metric">
                  <span>Memory Usage</span>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: '60%' }}></div>
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
                  <strong>Use self-balancing trees:</strong> For production applications, use AVL or Red-Black trees
                  to guarantee O(log n) operations.
                </li>
                <li>
                  <strong>Randomize insertion order:</strong> If possible, insert values in random order to maintain
                  better balance naturally.
                </li>
                <li>
                  <strong>Bulk loading:</strong> For creating a tree from sorted data, build the tree recursively
                  from the middle element to maintain balance.
                </li>
                <li>
                  <strong>Iterative implementation:</strong> Use iterative algorithms instead of recursive ones
                  to avoid stack overflow for very deep trees.
                </li>
              </ul>
            </div>

            <div className="optimization-section">
              <h4>💡 Code Improvements</h4>
              <ul>
                <li>
                  <strong>Parent pointers:</strong> Add parent references to simplify deletion and traversal.
                </li>
                <li>
                  <strong>Threaded BST:</strong> Add inorder predecessor/successor pointers for faster traversal.
                </li>
                <li>
                  <strong>Cache results:</strong> For repeated searches, cache frequently accessed nodes.
                </li>
                <li>
                  <strong>Use typed values:</strong> For numeric keys, use primitive comparisons for better performance.
                </li>
              </ul>
            </div>

            <div className="optimization-section">
              <h4>📊 Balance Comparison</h4>
              <table className="comparison-table">
                <thead>
                  <tr><th>Tree Type</th><th>Search</th><th>Insert</th><th>Delete</th><th>Balance Guarantee</th></tr>
                </thead>
                <tbody>
                  <tr><td>BST (Unbalanced)</td><td>O(n)</td><td>O(n)</td><td>O(n)</td><td>No</td></tr>
                  <tr><td>AVL Tree</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>Strict</td></tr>
                  <tr><td>Red-Black Tree</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>Relaxed</td></tr>
                  <tr><td>B-Tree</td><td>O(log n)</td><td>O(log n)</td><td>O(log n)</td><td>Perfect</td></tr>
                </tbody>
              </table>
              <p className="note">Self-balancing trees guarantee O(log n) performance for all operations!</p>
            </div>

            <div className="optimization-note">
              <h4>🎯 Best Practices</h4>
              <ul>
                <li>Use AVL trees when frequent lookups are needed (more balanced)</li>
                <li>Use Red-Black trees when frequent insertions/deletions are needed (faster rotations)</li>
                <li>Consider B-trees for disk-based storage (larger node size)</li>
                <li>Monitor tree height and rebalance periodically if using simple BST</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BSTResultPanel;