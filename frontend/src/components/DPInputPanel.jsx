// components/DPInputPanel.jsx
import { useState } from 'react';
import '../styles/DPInputPanel.css';

const DPInputPanel = ({ algorithm, onRun, isLoading }) => {
  const [fibonacciN, setFibonacciN] = useState(10);
  const [knapsackItems, setKnapsackItems] = useState([
    { name: 'Item1', value: 60, weight: 10 },
    { name: 'Item2', value: 100, weight: 20 },
    { name: 'Item3', value: 120, weight: 30 }
  ]);
  const [knapsackCapacity, setKnapsackCapacity] = useState(50);
  const [lcsStr1, setLcsStr1] = useState('ABCDGH');
  const [lcsStr2, setLcsStr2] = useState('AEDFHR');
  const [coinChangeCoins, setCoinChangeCoins] = useState('1,2,5');
  const [coinChangeAmount, setCoinChangeAmount] = useState(11);
  const [editStr1, setEditStr1] = useState('sunday');
  const [editStr2, setEditStr2] = useState('saturday');
  const [matrixDims, setMatrixDims] = useState('10,30,5,60');
  const [newItemName, setNewItemName] = useState('');
  const [newItemValue, setNewItemValue] = useState('');
  const [newItemWeight, setNewItemWeight] = useState('');

  const handleAddKnapsackItem = () => {
    if (newItemName && newItemValue && newItemWeight) {
      setKnapsackItems([...knapsackItems, {
        name: newItemName,
        value: parseInt(newItemValue),
        weight: parseInt(newItemWeight)
      }]);
      setNewItemName('');
      setNewItemValue('');
      setNewItemWeight('');
    }
  };

  const handleRemoveKnapsackItem = (index) => {
    setKnapsackItems(knapsackItems.filter((_, i) => i !== index));
  };

  const handleRun = () => {
    let inputData = {};
    
    switch (algorithm) {
      case 'fibonacci':
        inputData = { n: fibonacciN };
        break;
      case 'knapsack-dp':
        inputData = { items: knapsackItems, capacity: knapsackCapacity };
        break;
      case 'longest-common-subsequence':
        inputData = { str1: lcsStr1, str2: lcsStr2 };
        break;
      case 'coin-change-dp':
        inputData = { 
          coins: coinChangeCoins.split(',').map(c => parseInt(c.trim())), 
          amount: coinChangeAmount 
        };
        break;
      case 'edit-distance':
        inputData = { str1: editStr1, str2: editStr2 };
        break;
      case 'matrix-chain-multiplication':
        inputData = { dimensions: matrixDims.split(',').map(d => parseInt(d.trim())) };
        break;
      default:
        return;
    }
    
    onRun(inputData);
  };

  const renderFibonacciInput = () => (
    <div className="dp-input-group">
      <label>Fibonacci Number (n):</label>
      <input
        type="number"
        value={fibonacciN}
        onChange={(e) => setFibonacciN(Math.max(0, parseInt(e.target.value) || 0))}
        min="0"
        max="30"
      />
      <small>Enter n to calculate fib(n) (0-30 for performance)</small>
    </div>
  );

  const renderKnapsackInput = () => (
    <div className="dp-input-group knapsack-inputs">
      <div className="items-list">
        <label>Items:</label>
        {knapsackItems.map((item, idx) => (
          <div key={idx} className="item-row">
            <span>{item.name}</span>
            <span>Value: {item.value}</span>
            <span>Weight: {item.weight}</span>
            <button onClick={() => handleRemoveKnapsackItem(idx)}>×</button>
          </div>
        ))}
      </div>
      <div className="add-item">
        <input
          type="text"
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={newItemValue}
          onChange={(e) => setNewItemValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight"
          value={newItemWeight}
          onChange={(e) => setNewItemWeight(e.target.value)}
        />
        <button onClick={handleAddKnapsackItem}>Add Item</button>
      </div>
      <div className="capacity-input">
        <label>Knapsack Capacity:</label>
        <input
          type="number"
          value={knapsackCapacity}
          onChange={(e) => setKnapsackCapacity(parseInt(e.target.value) || 0)}
          min="1"
        />
      </div>
    </div>
  );

  const renderLCSInput = () => (
    <div className="dp-input-group">
      <div className="string-input">
        <label>String 1:</label>
        <input
          type="text"
          value={lcsStr1}
          onChange={(e) => setLcsStr1(e.target.value.toUpperCase())}
          placeholder="Enter first string"
        />
      </div>
      <div className="string-input">
        <label>String 2:</label>
        <input
          type="text"
          value={lcsStr2}
          onChange={(e) => setLcsStr2(e.target.value.toUpperCase())}
          placeholder="Enter second string"
        />
      </div>
    </div>
  );

  const renderCoinChangeInput = () => (
    <div className="dp-input-group">
      <div className="coins-input">
        <label>Coin Denominations:</label>
        <input
          type="text"
          value={coinChangeCoins}
          onChange={(e) => setCoinChangeCoins(e.target.value)}
          placeholder="e.g., 1,2,5"
        />
        <small>Comma-separated values</small>
      </div>
      <div className="amount-input">
        <label>Target Amount:</label>
        <input
          type="number"
          value={coinChangeAmount}
          onChange={(e) => setCoinChangeAmount(parseInt(e.target.value) || 0)}
          min="0"
        />
      </div>
    </div>
  );

  const renderEditDistanceInput = () => (
    <div className="dp-input-group">
      <div className="string-input">
        <label>Source String:</label>
        <input
          type="text"
          value={editStr1}
          onChange={(e) => setEditStr1(e.target.value.toLowerCase())}
          placeholder="Enter source string"
        />
      </div>
      <div className="string-input">
        <label>Target String:</label>
        <input
          type="text"
          value={editStr2}
          onChange={(e) => setEditStr2(e.target.value.toLowerCase())}
          placeholder="Enter target string"
        />
      </div>
    </div>
  );

  const renderMatrixChainInput = () => (
    <div className="dp-input-group">
      <div className="dimensions-input">
        <label>Matrix Dimensions:</label>
        <input
          type="text"
          value={matrixDims}
          onChange={(e) => setMatrixDims(e.target.value)}
          placeholder="e.g., 10,30,5,60"
        />
        <small>Dimensions for matrices: M1: d0×d1, M2: d1×d2, ...</small>
      </div>
    </div>
  );

  const renderAlgorithmInput = () => {
    switch (algorithm) {
      case 'fibonacci': return renderFibonacciInput();
      case 'knapsack-dp': return renderKnapsackInput();
      case 'longest-common-subsequence': return renderLCSInput();
      case 'coin-change-dp': return renderCoinChangeInput();
      case 'edit-distance': return renderEditDistanceInput();
      case 'matrix-chain-multiplication': return renderMatrixChainInput();
      default: return null;
    }
  };

  return (
    <div className="dp-input-panel">
      <h3>Input Parameters</h3>
      <div className="dp-inputs">
        {renderAlgorithmInput()}
      </div>
      <button 
        className="run-dp-btn" 
        onClick={handleRun} 
        disabled={isLoading}
      >
        {isLoading ? 'Running...' : 'Run Algorithm'}
      </button>
    </div>
  );
};

export default DPInputPanel;