// frontend/src/components/GreedyResultPanel.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/GreedyResultPanel.css';

const GreedyResultPanel = ({ result, algorithm, steps, data }) => {
  const [activeTab, setActiveTab] = useState('summary');

  const calculateStats = () => {
    if (!steps || steps.length === 0) {
      return { totalSteps: 0, comparisons: 0, selections: 0 };
    }
    
    const comparisons = steps.filter(s => s.action === 'compare' || s.action === 'check-slot' || s.action === 'check-activity').length;
    const selections = steps.filter(s => s.action === 'select-activity' || s.action === 'schedule-job' || s.action === 'take-whole' || s.action === 'take-fraction' || s.action === 'use-coin').length;
    
    return {
      totalSteps: steps.length,
      comparisons,
      selections
    };
  };

  const stats = calculateStats();

  const getAlgorithmInfo = () => {
    const info = {
      'activity-selection': {
        name: 'Activity Selection',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(n)',
        description: 'Selects maximum number of non-overlapping activities',
        strengths: 'Optimal for scheduling non-overlapping activities',
        weaknesses: 'Requires sorted activities by finish time'
      },
      'fractional-knapsack': {
        name: 'Fractional Knapsack',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(1)',
        description: 'Maximizes value by taking fractions of items',
        strengths: 'Optimal for divisible items, efficient O(n log n)',
        weaknesses: 'Cannot be used for 0/1 knapsack problem'
      },
      'job-scheduling': {
        name: 'Job Scheduling',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
        spaceComplexity: 'O(n)',
        description: 'Maximizes profit by scheduling jobs within deadlines',
        strengths: 'Optimal for job scheduling with deadlines',
        weaknesses: 'Can be O(n²) in worst case'
      },
      'huffman-encoding': {
        name: 'Huffman Encoding',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(n)',
        description: 'Creates optimal prefix codes for compression',
        strengths: 'Optimal prefix code generation',
        weaknesses: 'Requires frequency data'
      },
      'coin-change-greedy': {
        name: 'Coin Change (Greedy)',
        timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
        spaceComplexity: 'O(1)',
        description: 'Makes change using largest coins first',
        strengths: 'Very fast O(n) time',
        weaknesses: 'Not optimal for all coin systems'
      },
      'prims-algorithm': {
        name: "Prim's Algorithm",
        timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
        spaceComplexity: 'O(V)',
        description: 'Finds Minimum Spanning Tree',
        strengths: 'Efficient for dense graphs',
        weaknesses: 'Requires priority queue for best performance'
      },
      'kruskals-algorithm': {
        name: "Kruskal's Algorithm",
        timeComplexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
        spaceComplexity: 'O(V)',
        description: 'Finds Minimum Spanning Tree using union-find',
        strengths: 'Efficient for sparse graphs',
        weaknesses: 'Requires sorting all edges'
      },
      'dijkstras-algorithm': {
        name: "Dijkstra's Algorithm",
        timeComplexity: { best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
        spaceComplexity: 'O(V)',
        description: 'Finds shortest paths from source',
        strengths: 'Optimal for non-negative weights',
        weaknesses: 'Does not work with negative weights'
      }
    };
    return info[algorithm] || info['activity-selection'];
  };

  const algorithmInfo = getAlgorithmInfo();

  const getResultSummary = () => {
    switch (algorithm) {
      case 'activity-selection':
        const selectedCount = result?.selected?.length || 0;
        const selectedNames = result?.selected?.map(i => result.activities?.[i]?.name).filter(Boolean).join(', ');
        return `Selected ${selectedCount} activities: ${selectedNames || 'none'}`;
      case 'fractional-knapsack':
        return `Total Value: ${result?.totalValue?.toFixed(2) || 0}, Weight: ${result?.currentWeight || 0}/${result?.capacity || 0}`;
      case 'job-scheduling':
        return `Total Profit: ${result?.totalProfit || 0}, Scheduled: ${result?.schedule?.filter(j => j !== null).length || 0} jobs`;
      case 'huffman-encoding':
        return `Compression Ratio: ${result?.compressionRatio?.toFixed(2) || 0}:1, Original: ${result?.originalBits || 0} bits → Compressed: ${result?.compressedBits || 0} bits`;
      case 'coin-change-greedy':
        return result?.remaining === 0 ? `Used ${result?.result?.length || 0} coins: ${result?.result?.join(', ') || 'none'}` : `Cannot make exact change! Remaining: ${result?.remaining}`;
      default:
        return 'Operation completed successfully';
    }
  };

  return (
    <motion.div 
      className="greedy-result-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h3>🎯 {algorithmInfo.name} Results</h3>
        <div className="result-badge">Complete</div>
      </div>
      
      <div className="result-tabs">
        <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>📋 Summary</button>
        <button className={`tab-btn ${activeTab === 'complexity' ? 'active' : ''}`} onClick={() => setActiveTab('complexity')}>⚡ Complexity</button>
        <button className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>🔍 Analysis</button>
        <button className={`tab-btn ${activeTab === 'optimization' ? 'active' : ''}`} onClick={() => setActiveTab('optimization')}>🚀 Optimization</button>
      </div>

      <div className="result-content">
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="summary-tab">
            <div className="summary-stats">
              <div className="stat-card"><span className="stat-label">Total Steps</span><span className="stat-value">{stats.totalSteps}</span></div>
              <div className="stat-card"><span className="stat-label">Comparisons</span><span className="stat-value">{stats.comparisons}</span></div>
              <div className="stat-card"><span className="stat-label">Selections</span><span className="stat-value">{stats.selections}</span></div>
            </div>
            
            <div className="explanation-box">
              <h4>📖 Result</h4>
              <p>{getResultSummary()}</p>
              <details><summary>Algorithm Description</summary><p>{algorithmInfo.description}</p></details>
            </div>
          </motion.div>
        )}

        {activeTab === 'complexity' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="complexity-tab">
            <h3>⏱️ Time Complexity</h3>
            <div className="complexity-table">
              <div className="complexity-row"><span className="complexity-label">Best Case</span><span className="complexity-value">{algorithmInfo.timeComplexity.best}</span></div>
              <div className="complexity-row"><span className="complexity-label">Average Case</span><span className="complexity-value">{algorithmInfo.timeComplexity.average}</span></div>
              <div className="complexity-row"><span className="complexity-label">Worst Case</span><span className="complexity-value">{algorithmInfo.timeComplexity.worst}</span></div>
            </div>
            <h3>💾 Space Complexity</h3>
            <div className="complexity-table"><div className="complexity-row"><span className="complexity-label">Auxiliary Space</span><span className="complexity-value">{algorithmInfo.spaceComplexity}</span></div></div>
          </motion.div>
        )}

        {activeTab === 'analysis' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="analysis-tab">
            <div className="analysis-section"><h4>✅ Strengths</h4><ul><li>{algorithmInfo.strengths}</li><li>Simple to implement and understand</li><li>Often provides near-optimal solutions</li></ul></div>
            <div className="analysis-section"><h4>⚠️ Weaknesses</h4><ul><li>{algorithmInfo.weaknesses}</li><li>May not always give global optimum</li><li>Limited to problems with greedy choice property</li></ul></div>
            <div className="analysis-section"><h4>🎯 Best Use Cases</h4><ul><li>Scheduling and resource allocation</li><li>Optimization with divisible items</li><li>Data compression (Huffman)</li><li>Network routing (Dijkstra)</li><li>Minimum Spanning Trees</li></ul></div>
          </motion.div>
        )}

        {activeTab === 'optimization' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="optimization-tab">
            <div className="optimization-section"><h4>Performance Optimizations</h4><ul><li><strong>Use efficient data structures:</strong> Priority queues for Prim's/Dijkstra</li><li><strong>Pre-sort data:</strong> Sorting once reduces complexity</li><li><strong>Early termination:</strong> Stop when optimal solution found</li><li><strong>Space optimization:</strong> Use in-place algorithms when possible</li></ul></div>
            <div className="optimization-note"><h4>🎯 Best Practices</h4><ul><li>Verify greedy choice property before implementation</li><li>Consider dynamic programming for non-greedy problems</li><li>Test with edge cases (empty input, single element)</li><li>Use appropriate data structures for your use case</li></ul></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GreedyResultPanel;