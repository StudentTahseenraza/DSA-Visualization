// components/DynamicProgrammingViewer.jsx
import { motion } from 'framer-motion';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/DynamicProgrammingViewer.css';

const DynamicProgrammingViewer = ({ step, algorithm }) => {
  if (!step) {
    return <div className="dp-viewer">No data to display</div>;
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
        return <div>Unsupported dynamic programming algorithm</div>;
    }
  };

  const renderFibonacci = (step) => {
    const { memo = {}, currentN, result } = step;

    return (
      <div className="fibonacci-dp">
        <h4>Fibonacci Sequence</h4>
        <div className="memo-table">
          <h5>Memoization Table:</h5>
          <div className="memo-grid">
            {Object.entries(memo || {}).map(([n, value]) => (
              <motion.div
                key={n}
                className={`memo-cell ${parseInt(n) === currentN ? 'current' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="memo-n">fib({n})</div>
                <div className="memo-value">{value}</div>
              </motion.div>
            ))}
          </div>
        </div>
        {result !== undefined && (
          <div className="result">Result: fib({currentN}) = {result}</div>
        )}
      </div>
    );
  };

  const renderKnapsackDP = (step) => {
    const { dpTable = [], items = [], capacity = 0, currentI, currentW, result } = step;

    return (
      <div className="knapsack-dp">
        <h4>0/1 Knapsack Problem</h4>
        <div className="dp-table">
          <h5>DP Table:</h5>
          <table>
            <thead>
              <tr>
                <th>i\w</th>
                {Array.from({ length: capacity + 1 }, (_, w) => (
                  <th key={w}>{w}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dpTable.map((row, i) => (
                <tr key={i}>
                  <th>{i}</th>
                  {row.map((cell, w) => (
                    <td
                      key={w}
                      className={`dp-cell ${i === currentI && w === currentW ? 'current' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="items-info">
          <h5>Items:</h5>
          {items.map((item, index) => (
            <div key={index} className="item">
              {item.name}: Value {item.value}, Weight {item.weight}
            </div>
          ))}
        </div>
        {result && <div className="result">Maximum Value: {result}</div>}
      </div>
    );
  };

  const renderLCS = (step) => {
    const { dpTable = [[]], str1 = '', str2 = '', currentI, currentJ, result } = step;

    return (
      <div className="lcs-dp">
        <h4>Longest Common Subsequence</h4>
        <div className="dp-table">
          <h5>DP Table:</h5>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>0</th>
                {str2.split('').map((char, j) => (
                  <th key={j}>{char}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>0</th>
                {Array.from({ length: str2.length + 1 }, (_, j) => (
                  <td key={j}>{dpTable?.[0]?.[j]}</td>
                ))}
              </tr>
              {str1.split('').map((char, i) => (
                <tr key={i}>
                  <th>{char}</th>
                  {dpTable?.[i + 1]?.map((cell, j) => (
                    <td
                      key={j}
                      className={`dp-cell ${i + 1 === currentI && j === currentJ ? 'current' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result && (
          <div className="result">LCS: "{result}" (Length: {result.length})</div>
        )}
      </div>
    );
  };

  const renderMatrixChain = (step) => {
    const { dpTable = [[]], dimensions = [], currentI, currentJ, result } = step;
    const n = dimensions.length - 1;

    return (
      <div className="matrix-chain">
        <h4>Matrix Chain Multiplication</h4>
        <div className="dp-table">
          <h5>DP Table:</h5>
          <table>
            <thead>
              <tr>
                <th>i\j</th>
                {Array.from({ length: n + 1 }, (_, j) => (
                  <th key={j}>{j}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dpTable.map((row, i) => (
                <tr key={i}>
                  <th>{i}</th>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`dp-cell ${i === currentI && j === currentJ ? 'current' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dimensions">
          <h5>Matrix Dimensions:</h5>
          {dimensions.map((_, i) =>
            i < dimensions.length - 1 ? (
              <div key={i}>
                M{i + 1}: {dimensions[i]}×{dimensions[i + 1]}
              </div>
            ) : null
          )}
        </div>
        {result && <div className="result">Minimum Operations: {result}</div>}
      </div>
    );
  };

  const renderCoinChangeDP = (step) => {
    const { dpTable = [], coins = [], amount = 0, currentAmount, result } = step;

    return (
      <div className="coin-change-dp">
        <h4>Coin Change (DP)</h4>
        <div className="dp-table">
          <h5>DP Table:</h5>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Min Coins</th>
              </tr>
            </thead>
            <tbody>
              {dpTable.map((minCoins, amt) => (
                <tr key={amt}>
                  <td>{amt}</td>
                  <td className={`dp-cell ${amt === currentAmount ? 'current' : ''}`}>
                    {minCoins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="coins-list">
          <h5>Coins:</h5>
          {coins.join(', ')}
        </div>
        {result !== undefined && (
          <div className="result">Minimum coins for {amount}: {result}</div>
        )}
      </div>
    );
  };

  const renderEditDistance = (step) => {
    const { dpTable = [[]], str1 = '', str2 = '', currentI, currentJ, result } = step;

    return (
      <div className="edit-distance">
        <h4>Edit Distance</h4>
        <div className="dp-table">
          <h5>DP Table:</h5>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>0</th>
                {str2.split('').map((char, j) => (
                  <th key={j}>{char}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>0</th>
                {Array.from({ length: str2.length + 1 }, (_, j) => (
                  <td key={j}>{dpTable?.[0]?.[j]}</td>
                ))}
              </tr>
              {str1.split('').map((char, i) => (
                <tr key={i}>
                  <th>{char}</th>
                  {dpTable?.[i + 1]?.map((cell, j) => (
                    <td
                      key={j}
                      className={`dp-cell ${i + 1 === currentI && j === currentJ ? 'current' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result !== undefined && (
          <div className="result">Edit Distance: {result}</div>
        )}
      </div>
    );
  };

  return (
    <div className="dp-viewer">
      <ZoomPanWrapper>
        {renderContent()}
      </ZoomPanWrapper>
    </div>
  );
};

export default DynamicProgrammingViewer;
