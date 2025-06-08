// components/Header.jsx
import '../styles/Header.css';

const Header = ({ speed, onSpeedChange, onAlgorithmChange, selectedAlgorithm, algorithmType, toggleTheme, theme,onStartTutorial }) => {
  const algorithms = {
    sorting: ['bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort', 'quickSort', 'heapSort'],
    bst: ['bst', 'avl'],
    graph: ['bfs', 'dfs', 'dijkstra'],
    linkedList: ['linkedList'],
    heap: ['heap'],
    trie: ['trie'],
  };

  return (
    <header className="header">
      <h1>DSA Visualization</h1>
      <div className="controls">
        <select
          value={algorithmType}
          onChange={(e) => onAlgorithmChange(algorithms[e.target.value][0], e.target.value)}
        >
          <option value="sorting">Sorting</option>
          <option value="bst">Binary Search Tree</option>
          <option value="graph">Graph</option>
          <option value="linkedList">Linked List</option>
          <option value="heap">Binary Heap</option>
          <option value="trie">Trie</option>
        </select>
        <select
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value, algorithmType)}
        >
          {algorithms[algorithmType].map((algo) => (
            <option key={algo} value={algo}>
              {algo.charAt(0).toUpperCase() + algo.slice(1).replace(/Sort/, ' Sort')}
            </option>
          ))}
        </select>
        <div className="speed-control">
          <label>Speed: {speed}ms</label>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          />
        </div>
        <button onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
        <button onClick={onStartTutorial}>Start Tutorial</button>
      </div>
    </header>
  );
};

export default Header;