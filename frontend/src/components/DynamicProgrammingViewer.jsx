// components/DynamicProgrammingViewer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/DynamicProgrammingViewer.css';

const DynamicProgrammingViewer = ({ step, algorithm, currentStepIndex, totalSteps }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step?.final === true || step?.action === 'complete') {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
    
    if (totalSteps > 0) {
      setProgress(((currentStepIndex + 1) / totalSteps) * 100);
    }
  }, [step, currentStepIndex, totalSteps]);

  if (!step) {
    return (
      <div className="dp-viewer">
        <div className="dp-empty-state">
          <div className="empty-icon">📊</div>
          <h3>No Data to Display</h3>
          <p>Select a DP algorithm and click "Run" to visualize</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (algorithm) {
      case 'fibonacci':
        return renderFibonacci(step);
      case 'knapsack-dp':
        return renderKnapsackDP(step);
      case 'longest-common-subsequence':
        return renderLCS(step);
      case 'matrix-chain-multiplication':
        return renderMatrixChain(step);
      case 'coin-change-dp':
        return renderCoinChangeDP(step);
      case 'edit-distance':
        return renderEditDistance(step);
      default:
        return <div className="dp-unsupported">Unsupported DP algorithm</div>;
    }
  };

  const renderFibonacci = (stepData) => {
    const { dpTable = {}, currentCell, action, explanation, result } = stepData;
    
    const memoArray = [];
    if (dpTable && typeof dpTable === 'object') {
      const keys = Object.keys(dpTable).filter(k => !isNaN(k)).map(Number);
      const maxKey = Math.max(...keys, 0);
      for (let i = 0; i <= maxKey; i++) {
        memoArray.push(dpTable[i] !== undefined ? dpTable[i] : '?');
      }
    }

    return (
      <div className="dp-algorithm-view">
        <div className="dp-visualization-header">
          <h4>📈 Fibonacci with Memoization</h4>
          {totalSteps > 0 && (
            <div className="step-progress">
              <span>Step {currentStepIndex + 1}/{totalSteps}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="memoization-view">
          <div className="memo-table">
            <div className="memo-header">
              <span>n</span>
              <span>fib(n)</span>
            </div>
            <div className="memo-body">
              {memoArray.map((value, idx) => (
                <motion.div
                  key={idx}
                  className={`memo-row ${currentCell?.n === idx ? 'current' : ''} ${value !== '?' ? 'computed' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="memo-key">fib({idx})</span>
                  <span className="memo-value">{value === '?' ? '❓' : value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="dp-action-panel">
          <div className="current-action">
            <span className="action-badge">{action || 'Processing'}</span>
            <p className="action-explanation">{explanation || 'Click Run to start'}</p>
          </div>
          {result !== undefined && (
            <div className="interim-result">
              Current Result: <strong>{result}</strong>
            </div>
          )}
        </div>

        {isComplete && (
          <div className="completion-badge">
            ✨ Animation Complete! Check results below ✨
          </div>
        )}
      </div>
    );
  };

  const renderKnapsackDP = (stepData) => {
    const { dpTable = [], items = [], capacity = 0, currentCell, action, explanation, selectedItems, finalValue } = stepData;
    
    if (!dpTable || dpTable.length === 0) {
      return <div className="dp-loading">Loading knapsack visualization...</div>;
    }

    const n = items.length;

    return (
      <div className="dp-algorithm-view">
        <div className="dp-visualization-header">
          <h4>🎒 0/1 Knapsack Problem</h4>
          {totalSteps > 0 && (
            <div className="step-progress">
              <span>Step {currentStepIndex + 1}/{totalSteps}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          <div className="items-summary">
            {items.map((item, idx) => (
              <div key={idx} className="item-badge">
                {item.name}: {item.value}/{item.weight}
              </div>
            ))}
            <div className="capacity-badge">Capacity: {capacity}</div>
          </div>
        </div>

        <div className="dp-table-wrapper">
          <div className="dp-table-scroll">
            <table className="dp-table">
              <thead>
                <tr>
                  <th>Item\Capacity</th>
                  {Array.from({ length: capacity + 1 }, (_, i) => (
                    <th key={i}>{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="dp-row-label">0</td>
                  {Array.from({ length: capacity + 1 }, (_, j) => (
                    <td key={j} className="dp-cell dp-cell-base">
                      {dpTable[0]?.[j] !== undefined ? dpTable[0][j] : 0}
                    </td>
                  ))}
                </tr>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td className="dp-row-label">{item.name}</td>
                    {Array.from({ length: capacity + 1 }, (_, j) => {
                      const value = dpTable[i + 1]?.[j];
                      const isCurrent = currentCell?.i === i + 1 && currentCell?.w === j;
                      const isDependency = stepData.dependencies?.some(
                        dep => dep.i === i + 1 && dep.w === j
                      );
                      return (
                        <td 
                          key={j} 
                          className={`dp-cell ${isCurrent ? 'current' : ''} ${isDependency ? 'dependency' : ''}`}
                        >
                          {value !== undefined ? value : '?'}
                          {isCurrent && <div className="cell-pulse" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dp-action-panel">
          <div className="current-action">
            <span className="action-badge">{action || 'Idle'}</span>
            <p className="action-explanation">{explanation || 'Ready'}</p>
          </div>
          {finalValue !== undefined && (
            <div className="final-result-preview">
              🎯 Maximum Value: <strong>{finalValue}</strong>
            </div>
          )}
          {selectedItems && selectedItems.length > 0 && (
            <div className="selected-items-preview">
              ✅ Selected: {selectedItems.map(i => i.name).join(', ')}
            </div>
          )}
        </div>

        {isComplete && (
          <div className="completion-badge">
            ✨ Animation Complete! Check results below ✨
          </div>
        )}
      </div>
    );
  };

  const renderLCS = (stepData) => {
    const { dpTable = [], str1 = '', str2 = '', currentCell, action, explanation, lcsString, finalLength } = stepData;
    
    if (!dpTable || dpTable.length === 0) {
      return <div className="dp-loading">Loading LCS visualization...</div>;
    }

    const m = str1.length;
    const n = str2.length;
    const hasValidTable = dpTable.length >= m + 1 && dpTable[0]?.length >= n + 1;

    return (
      <div className="dp-algorithm-view">
        <div className="dp-visualization-header">
          <h4>📝 Longest Common Subsequence</h4>
          {totalSteps > 0 && (
            <div className="step-progress">
              <span>Step {currentStepIndex + 1}/{totalSteps}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          <div className="strings-display">
            <div className="string1">String 1: <strong>{str1 || '""'}</strong></div>
            <div className="string2">String 2: <strong>{str2 || '""'}</strong></div>
          </div>
        </div>

        <div className="dp-table-wrapper">
          <div className="dp-table-scroll">
            <table className="dp-table lcs-table">
              <thead>
                <tr>
                  <th className="corner-cell"></th>
                  <th className="corner-cell"></th>
                  {str2.split('').map((char, j) => (
                    <th key={j} className="col-char">{char}</th>
                  ))}
                </tr>
                <tr>
                  <th></th>
                  <th>0</th>
                  {Array.from({ length: n }, (_, j) => (
                    <th key={j}>{j + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="row-label">0</th>
                  <td className="dp-cell dp-cell-base">
                    {hasValidTable ? dpTable[0]?.[0] : '0'}
                  </td>
                  {Array.from({ length: n }, (_, j) => (
                    <td key={j} className="dp-cell dp-cell-base">
                      {hasValidTable ? dpTable[0]?.[j + 1] : '0'}
                    </td>
                  ))}
                </tr>
                {str1.split('').map((char, i) => (
                  <tr key={i}>
                    <th className="row-label">{char}</th>
                    <td className="dp-cell dp-cell-base">
                      {hasValidTable ? dpTable[i + 1]?.[0] : '0'}
                    </td>
                    {Array.from({ length: n }, (_, j) => {
                      const value = hasValidTable ? dpTable[i + 1]?.[j + 1] : '?';
                      const isCurrent = currentCell?.i === i + 1 && currentCell?.j === j + 1;
                      const isDependency = stepData.dependencies?.some(
                        dep => dep.i === i + 1 && dep.j === j + 1
                      );
                      return (
                        <td 
                          key={j} 
                          className={`dp-cell ${isCurrent ? 'current' : ''} ${isDependency ? 'dependency' : ''}`}
                        >
                          {value !== undefined ? value : '?'}
                          {isCurrent && <div className="cell-pulse" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dp-action-panel">
          <div className="current-action">
            <span className="action-badge">{action || 'Idle'}</span>
            <p className="action-explanation">{explanation || 'Ready'}</p>
          </div>
          {currentCell && stepData.currentChar && (
            <div className="char-comparison">
              Comparing: '{stepData.currentChar}' vs '{str2[currentCell?.j - 2] || '?'}'
            </div>
          )}
          {finalLength !== undefined && (
            <div className="final-result-preview">
              📏 LCS Length: <strong>{finalLength}</strong>
              {lcsString && <span> | Sequence: <strong>"{lcsString}"</strong></span>}
            </div>
          )}
        </div>

        {isComplete && (
          <div className="completion-badge">
            ✨ Animation Complete! Check results below ✨
          </div>
        )}
      </div>
    );
  };

  const renderCoinChangeDP = (stepData) => {
    const { dpTable = [], coins = [], amount = 0, currentAmount, currentCoin, action, explanation, coinCombination, finalResult } = stepData;
    
    return (
      <div className="dp-algorithm-view">
        <div className="dp-visualization-header">
          <h4>💰 Coin Change (Minimum Coins)</h4>
          {totalSteps > 0 && (
            <div className="step-progress">
              <span>Step {currentStepIndex + 1}/{totalSteps}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          <div className="coin-info">
            <div className="coins-list">Coins: {coins.join(', ')}</div>
            <div className="target-amount">Target: {amount}</div>
          </div>
        </div>

        <div className="dp-array-view">
          <div className="array-header">
            <span>Amount →</span>
            {dpTable.map((_, idx) => (
              <span key={idx} className="array-index">{idx}</span>
            ))}
          </div>
          <div className="array-values">
            <span>Min Coins ↓</span>
            {dpTable.map((value, idx) => (
              <motion.div
                key={idx}
                className={`array-cell ${currentAmount === idx ? 'current' : ''} ${currentCoin && idx >= currentCoin ? 'affected' : ''}`}
                animate={{
                  scale: currentAmount === idx ? [1, 1.1, 1] : 1,
                  backgroundColor: currentAmount === idx ? '#3498db' : 
                                   value === Infinity ? '#2c3e50' : '#1a1a2e'
                }}
                transition={{ duration: 0.3 }}
              >
                {value === Infinity ? '∞' : value}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="dp-action-panel">
          <div className="current-action">
            <span className="action-badge">{action || 'Idle'}</span>
            <p className="action-explanation">{explanation || 'Ready'}</p>
          </div>
          {currentCoin && (
            <div className="current-coin">
              Currently processing coin: <strong>{currentCoin}</strong>
            </div>
          )}
          {finalResult !== undefined && (
            <div className="final-result-preview">
              {finalResult !== -1 ? (
                <>✅ Minimum coins: <strong>{finalResult}</strong>
                  {coinCombination && coinCombination.length > 0 && (
                    <span> | Coins: {coinCombination.join(', ')}</span>
                  )}
                </>
              ) : (
                <>❌ Cannot make amount {amount} with given coins</>
              )}
            </div>
          )}
        </div>

        {isComplete && (
          <div className="completion-badge">
            ✨ Animation Complete! Check results below ✨
          </div>
        )}
      </div>
    );
  };

  const renderEditDistance = (stepData) => {
    const { dpTable = [], str1 = '', str2 = '', currentCell, action, explanation, finalDistance } = stepData;
    
    if (!dpTable || dpTable.length === 0) {
      return <div className="dp-loading">Loading Edit Distance visualization...</div>;
    }

    const m = str1.length;
    const n = str2.length;
    const hasValidTable = dpTable.length >= m + 1 && dpTable[0]?.length >= n + 1;

    return (
      <div className="dp-algorithm-view">
        <div className="dp-visualization-header">
          <h4>✏️ Edit Distance (Levenshtein)</h4>
          {totalSteps > 0 && (
            <div className="step-progress">
              <span>Step {currentStepIndex + 1}/{totalSteps}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          <div className="strings-display">
            <div className="string1">From: <strong>{str1 || '""'}</strong></div>
            <div className="string2">To: <strong>{str2 || '""'}</strong></div>
          </div>
        </div>

        <div className="dp-table-wrapper">
          <div className="dp-table-scroll">
            <table className="dp-table edit-table">
              <thead>
                <tr>
                  <th className="corner-cell"></th>
                  <th className="corner-cell"></th>
                  {str2.split('').map((char, j) => (
                    <th key={j} className="col-char">{char}</th>
                  ))}
                </tr>
                <tr>
                  <th></th>
                  <th>0</th>
                  {Array.from({ length: n }, (_, j) => (
                    <th key={j}>{j + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="row-label">0</th>
                  <td className="dp-cell dp-cell-base">
                    {hasValidTable ? dpTable[0]?.[0] : '0'}
                  </td>
                  {Array.from({ length: n }, (_, j) => (
                    <td key={j} className="dp-cell dp-cell-base">
                      {hasValidTable ? dpTable[0]?.[j + 1] : j + 1}
                    </td>
                  ))}
                </tr>
                {str1.split('').map((char, i) => (
                  <tr key={i}>
                    <th className="row-label">{char}</th>
                    <td className="dp-cell dp-cell-base">
                      {hasValidTable ? dpTable[i + 1]?.[0] : i + 1}
                    </td>
                    {Array.from({ length: n }, (_, j) => {
                      const value = hasValidTable ? dpTable[i + 1]?.[j + 1] : '?';
                      const isCurrent = currentCell?.i === i + 1 && currentCell?.j === j + 1;
                      const isDependency = stepData.dependencies?.some(
                        dep => dep.i === i + 1 && dep.j === j + 1
                      );
                      return (
                        <td 
                          key={j} 
                          className={`dp-cell ${isCurrent ? 'current' : ''} ${isDependency ? 'dependency' : ''}`}
                        >
                          {value !== undefined ? value : '?'}
                          {isCurrent && <div className="cell-pulse" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dp-action-panel">
          <div className="current-action">
            <span className="action-badge">{action || 'Idle'}</span>
            <p className="action-explanation">{explanation || 'Ready'}</p>
          </div>
          {stepData.currentChar && stepData.targetChar && (
            <div className="operation-detail">
              Operation: Replace '{stepData.currentChar}' with '{stepData.targetChar}'
            </div>
          )}
          {finalDistance !== undefined && (
            <div className="final-result-preview">
              📏 Edit Distance: <strong>{finalDistance}</strong>
            </div>
          )}
        </div>

        {isComplete && (
          <div className="completion-badge">
            ✨ Animation Complete! Check results below ✨
          </div>
        )}
      </div>
    );
  };

  const renderMatrixChain = (stepData) => {
    const { dpTable = [], dimensions = [], currentCell, action, explanation, optimalOrder, minOperations } = stepData;
    const n = dimensions.length - 1;
    
    if (!dpTable || dpTable.length === 0) {
      return <div className="dp-loading">Loading Matrix Chain visualization...</div>;
    }

    return (
      <div className="dp-algorithm-view">
        <div className="dp-visualization-header">
          <h4>🔢 Matrix Chain Multiplication</h4>
          {totalSteps > 0 && (
            <div className="step-progress">
              <span>Step {currentStepIndex + 1}/{totalSteps}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          <div className="dimensions-display">
            {dimensions.map((dim, idx) => (
              idx < dimensions.length - 1 && (
                <span key={idx} className="matrix-dim">
                  M{idx + 1}: {dim}×{dimensions[idx + 1]}
                </span>
              )
            ))}
          </div>
        </div>

        <div className="dp-table-wrapper">
          <div className="dp-table-scroll">
            <table className="dp-table matrix-table">
              <thead>
                <tr>
                  <th>i\j</th>
                  {Array.from({ length: n }, (_, j) => <th key={j}>{j + 1}</th>)}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: n }, (_, i) => (
                  <tr key={i}>
                    <th className="row-label">{i + 1}</th>
                    {Array.from({ length: n }, (_, j) => {
                      const value = dpTable[i]?.[j];
                      const isCurrent = currentCell?.i === i && currentCell?.j === j;
                      const isValid = j >= i;
                      
                      return (
                        <td 
                          key={j} 
                          className={`dp-cell ${isCurrent ? 'current' : ''} ${!isValid ? 'invalid' : ''}`}
                        >
                          {isValid ? (value !== undefined && value !== Infinity ? value : '-') : '-'}
                          {isCurrent && <div className="cell-pulse" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dp-action-panel">
          <div className="current-action">
            <span className="action-badge">{action || 'Idle'}</span>
            <p className="action-explanation">{explanation || 'Ready'}</p>
          </div>
          {stepData.splitPoint !== undefined && (
            <div className="split-info">
              Trying split at position: <strong>{stepData.splitPoint + 1}</strong>
            </div>
          )}
          {minOperations !== undefined && (
            <div className="final-result-preview">
              🔢 Minimum Operations: <strong>{minOperations}</strong>
              {optimalOrder && <span> | Order: {optimalOrder}</span>}
            </div>
          )}
        </div>

        {isComplete && (
          <div className="completion-badge">
            ✨ Animation Complete! Check results below ✨
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dp-viewer">
      <div className="dp-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default DynamicProgrammingViewer;