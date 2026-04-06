// frontend/src/components/SortingResultPanel.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/SortingResultPanel.css';

const SortingResultPanel = ({ result, algorithm, steps, sortedArray, array }) => {
  const [activeTab, setActiveTab] = useState('summary');

  // Calculate statistics from steps
  const calculateStats = () => {
    if (!steps || steps.length === 0) {
      return { comparisons: 0, swaps: 0, totalSteps: 0 };
    }
    
    const comparisons = steps.filter(s => s.action === 'compare' || s.comparingIndices).length;
    const swaps = steps.filter(s => s.action === 'swap' || s.action === 'swap-start' || s.action === 'swap-end' || s.swappingIndices).length;
    
    return {
      comparisons,
      swaps,
      totalSteps: steps.length
    };
  };

  const stats = calculateStats();

  const getTimeComplexity = () => {
    const complexities = {
      'bubble-sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      'selection-sort': { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      'insertion-sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      'merge-sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      'quick-sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      'heap-sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' }
    };
    return complexities[algorithm] || { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' };
  };

  const getSpaceComplexity = () => {
    const complexities = {
      'bubble-sort': 'O(1)',
      'selection-sort': 'O(1)',
      'insertion-sort': 'O(1)',
      'merge-sort': 'O(n)',
      'quick-sort': 'O(log n)',
      'heap-sort': 'O(1)'
    };
    return complexities[algorithm] || 'O(1)';
  };

  const getAlgorithmExplanation = () => {
    const explanations = {
      'bubble-sort': {
        summary: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.`,
        detailed: `The algorithm works by repeatedly swapping adjacent elements if they are in the wrong order. After each pass, the largest element "bubbles up" to its correct position at the end of the array. This process continues until no swaps are needed, indicating the array is sorted.`,
        strengths: 'Simple to understand and implement, efficient for small datasets, stable sort.',
        weaknesses: 'Very slow for large datasets with O(n²) complexity.'
      },
      'selection-sort': {
        summary: `Selection Sort divides the array into sorted and unsorted portions, repeatedly selecting the minimum element from the unsorted portion and placing it at the beginning.`,
        detailed: `The algorithm works by finding the minimum element in the unsorted portion of the array and swapping it with the first element of the unsorted portion. This process continues, growing the sorted portion one element at a time.`,
        strengths: 'Simple implementation, performs well on small arrays, minimal swaps.',
        weaknesses: 'Always O(n²) complexity regardless of input, not stable.'
      },
      'insertion-sort': {
        summary: `Insertion Sort builds the final sorted array one element at a time by inserting each element into its correct position.`,
        detailed: `The algorithm works by taking each element from the unsorted portion and inserting it into its correct position in the sorted portion. It shifts larger elements to the right to make room for the new element.`,
        strengths: 'Efficient for small datasets and nearly sorted arrays, stable sort, adaptive.',
        weaknesses: 'O(n²) complexity for reverse-sorted arrays.'
      },
      'merge-sort': {
        summary: `Merge Sort is a divide-and-conquer algorithm that recursively divides the array, sorts each half, and merges them back together.`,
        detailed: `The algorithm works by recursively splitting the array into halves until each subarray has one element, then merging them back together in sorted order.`,
        strengths: 'Guaranteed O(n log n) performance, stable sort, efficient for linked lists.',
        weaknesses: 'Requires O(n) extra space, not in-place.'
      },
      'quick-sort': {
        summary: `Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around it.`,
        detailed: `The algorithm works by selecting a pivot element, rearranging the array so elements smaller than the pivot come before it and larger elements come after, then recursively sorting the subarrays.`,
        strengths: 'Very efficient in practice, O(n log n) average case, in-place sorting.',
        weaknesses: 'O(n²) worst-case, not stable.'
      },
      'heap-sort': {
        summary: `Heap Sort uses a binary heap data structure to sort elements by repeatedly extracting the maximum/minimum element.`,
        detailed: `The algorithm works by building a max-heap from the array, then repeatedly swapping the root with the last element and heapifying the reduced heap.`,
        strengths: 'O(n log n) guarantee, in-place sorting, memory efficient.',
        weaknesses: 'Not stable, more complex implementation.'
      }
    };
    return explanations[algorithm] || explanations['bubble-sort'];
  };

  const complexity = getTimeComplexity();
  const spaceComplexity = getSpaceComplexity();
  const explanation = getAlgorithmExplanation();

  const getAlgorithmDisplayName = () => {
    const names = {
      'bubble-sort': 'Bubble Sort',
      'selection-sort': 'Selection Sort',
      'insertion-sort': 'Insertion Sort',
      'merge-sort': 'Merge Sort',
      'quick-sort': 'Quick Sort',
      'heap-sort': 'Heap Sort'
    };
    return names[algorithm] || algorithm.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <motion.div 
      className="sorting-result-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <h3>📊 {getAlgorithmDisplayName()} Results</h3>
        <div className="result-badge">Complete</div>
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
                <span className="stat-label">Algorithm</span>
                <span className="stat-value">{getAlgorithmDisplayName()}</span>
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
                <span className="stat-label">Swaps/Shifts</span>
                <span className="stat-value">{stats.swaps}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Array Size</span>
                <span className="stat-value">{array?.length || sortedArray?.length || 0}</span>
              </div>
              {sortedArray && (
                <div className="stat-card full-width">
                  <span className="stat-label">Sorted Array</span>
                  <span className="stat-value">[{sortedArray.join(', ')}]</span>
                </div>
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

            <div className="current-state">
              <h4>🎯 Final State</h4>
              <div className="state-info">
                <span>✅ Array is fully sorted in {stats.totalSteps} steps</span>
              </div>
            </div>
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
                {algorithm === 'merge-sort' && 'Merge Sort provides guaranteed O(n log n) performance, making it excellent for large datasets, but requires O(n) extra space.'}
                {algorithm === 'quick-sort' && 'Quick Sort is very efficient in practice with O(n log n) average case, but worst-case O(n²) can occur with poor pivot selection.'}
                {algorithm === 'heap-sort' && 'Heap Sort offers O(n log n) guarantee with O(1) space, making it memory efficient but not stable.'}
                {algorithm === 'bubble-sort' && 'Bubble Sort is simple but inefficient for large datasets due to O(n²) complexity.'}
                {algorithm === 'selection-sort' && 'Selection Sort always performs O(n²) comparisons, making it inefficient for large datasets.'}
                {algorithm === 'insertion-sort' && 'Insertion Sort is very efficient for nearly sorted arrays with O(n) best case.'}
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
                <li>{explanation.strengths}</li>
                {algorithm === 'merge-sort' && <li>Stable sorting algorithm</li>}
                {algorithm === 'quick-sort' && <li>Excellent cache performance</li>}
                {algorithm === 'insertion-sort' && <li>Adaptive - efficient for partially sorted data</li>}
                {algorithm === 'heap-sort' && <li>No recursion overhead</li>}
              </ul>
            </div>

            <div className="analysis-section">
              <h4>⚠️ Weaknesses</h4>
              <ul>
                <li>{explanation.weaknesses}</li>
                {algorithm === 'quick-sort' && <li>Not stable</li>}
                {algorithm === 'merge-sort' && <li>Requires additional memory</li>}
                {algorithm === 'heap-sort' && <li>Poor locality of reference</li>}
              </ul>
            </div>

            <div className="analysis-section">
              <h4>🎯 Best Use Cases</h4>
              <ul>
                {algorithm === 'bubble-sort' && <li>Educational purposes and small datasets</li>}
                {algorithm === 'selection-sort' && <li>When memory writes are expensive</li>}
                {algorithm === 'insertion-sort' && <li>Small datasets or nearly sorted data</li>}
                {algorithm === 'merge-sort' && <li>Large datasets requiring stable sort</li>}
                {algorithm === 'quick-sort' && <li>General-purpose sorting for large datasets</li>}
                {algorithm === 'heap-sort' && <li>When guaranteed O(n log n) with O(1) space needed</li>}
              </ul>
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
                {algorithm === 'bubble-sort' && (
                  <>
                    <li><strong>Early termination:</strong> Track if any swaps occurred to break early when sorted</li>
                    <li><strong>Skip sorted elements:</strong> Reduce the range of inner loop after each pass</li>
                  </>
                )}
                {algorithm === 'selection-sort' && (
                  <>
                    <li><strong>Minimize swaps:</strong> Selection sort already has minimal swaps (n-1 maximum)</li>
                    <li><strong>Double selection:</strong> Find both min and max in each pass to reduce passes by half</li>
                  </>
                )}
                {algorithm === 'insertion-sort' && (
                  <>
                    <li><strong>Binary search insertion:</strong> Use binary search to find insertion position</li>
                    <li><strong>Shell sort:</strong> Extend to Shell sort for better performance on larger arrays</li>
                  </>
                )}
                {algorithm === 'merge-sort' && (
                  <>
                    <li><strong>Use insertion sort for small subarrays:</strong> Switch to insertion sort for subarrays &lt; 15 elements</li>
                    <li><strong>Avoid copying arrays:</strong> Use indices instead of creating new arrays</li>
                  </>
                )}
                {algorithm === 'quick-sort' && (
                  <>
                    <li><strong>Choose good pivot:</strong> Use median-of-three for pivot selection</li>
                    <li><strong>Insertion sort for small subarrays:</strong> Switch to insertion sort for small partitions</li>
                    <li><strong>Three-way partitioning:</strong> Handle duplicates efficiently</li>
                  </>
                )}
                {algorithm === 'heap-sort' && (
                  <>
                    <li><strong>Iterative heapify:</strong> Use iterative implementation to avoid recursion</li>
                    <li><strong>Floyd's heap construction:</strong> Build heap more efficiently</li>
                  </>
                )}
              </ul>
            </div>

            <div className="optimization-section">
              <h4>💡 Code Improvements</h4>
              <ul>
                <li><strong>In-place operations:</strong> Avoid creating temporary arrays when possible</li>
                <li><strong>Use typed arrays:</strong> For numeric data, use TypedArrays for better performance</li>
                <li><strong>Minimize function calls:</strong> Inline helper functions in tight loops</li>
              </ul>
            </div>

            <div className="optimization-note">
              <h4>📊 Performance Comparison</h4>
              <table className="comparison-table">
                <thead>
                  <tr><th>Dataset Size</th><th>n=10</th><th>n=100</th><th>n=1,000</th><th>n=10,000</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>O(n²) Algorithms</td>
                    <td>~100 ops</td>
                    <td>~10,000 ops</td>
                    <td>~1,000,000 ops</td>
                    <td>~100,000,000 ops</td>
                  </tr>
                  <tr>
                    <td>O(n log n) Algorithms</td>
                    <td>~30 ops</td>
                    <td>~700 ops</td>
                    <td>~10,000 ops</td>
                    <td>~140,000 ops</td>
                  </tr>
                </tbody>
              </table>
              <p className="note">O(n log n) algorithms are significantly faster for large datasets!</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SortingResultPanel;