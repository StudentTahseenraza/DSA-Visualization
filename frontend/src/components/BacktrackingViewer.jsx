// components/BacktrackingViewer.jsx
import { motion } from 'framer-motion';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/BacktrackingViewer.css';

const BacktrackingViewer = ({ step, algorithm }) => {
  if (!step) {
    return <div className="backtracking-viewer">No data to display</div>;
  }

  const renderContent = () => {
    switch (algorithm) {
      case 'n-queens':
        return renderNQueens(step);
      case 'sudoku-solver':
        return renderSudoku(step);
      case 'rat-in-maze':
        return renderMaze(step);
      case 'knights-tour':
        return renderKnightsTour(step);
      case 'word-search':
        return renderWordSearch(step);
      case 'graph-coloring':
        return renderGraphColoring(step);
      case 'hamiltonian-cycle':
        return renderHamiltonianCycle(step);
      case 'power-set':
        return renderPowerSet(step);
      case 'generate-permutations':
        return renderPermutations(step);
      case 'combination-sum':
        return renderCombinationSum(step);
      case 'palindrome-partitioning':
        return renderPalindromePartitioning(step);
      case 'word-break':
        return renderWordBreak(step);
      case 'crossword-solver':
        return renderCrosswordSolver(step);
      case 'all-paths-graph':
        return renderAllPaths(step);
      case 'partition-k-subsets':
        return renderPartitionKSubsets(step);
      default:
        return <div>Unsupported backtracking algorithm: {algorithm}</div>;
    }
  };

  const renderNQueens = (step) => {
    if (!step.board || !Array.isArray(step.board)) {
      return <div>No board data for N-Queens</div>;
    }

    const { board, currentRow, currentCol } = step;
    const n = board.length;

    return (
      <div className="n-queens-board">
        <h4>N-Queens Board ({n}x{n})</h4>
        <div className="chess-board">
          {board.map((row, i) => (
            <div key={i} className="chess-row">
              {row.map((cell, j) => (
                <motion.div
                  key={j}
                  className={`chess-cell ${(i + j) % 2 === 0 ? 'light' : 'dark'} ${
                    currentRow === i && currentCol === j ? 'current' : ''
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cell === 1 && (
                    <motion.div
                      className="queen"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      ♛
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSudoku = (step) => {
    if (!step.grid || !Array.isArray(step.grid)) {
      return <div>No grid data for Sudoku</div>;
    }

    const { grid, currentRow, currentCol, currentNum } = step;

    return (
      <div className="sudoku-grid">
        <h4>Sudoku Grid</h4>
        <div className="sudoku-board">
          {grid.map((row, i) => (
            <div key={i} className="sudoku-row">
              {row.map((cell, j) => (
                <motion.div
                  key={j}
                  className={`sudoku-cell ${
                    currentRow === i && currentCol === j ? 'current' : ''
                  } ${cell === 0 ? 'empty' : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cell !== 0 ? cell : ''}
                  {currentRow === i && currentCol === j && currentNum > 0 && (
                    <motion.div
                      className="trying-number"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {currentNum}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMaze = (step) => {
    if (!step.maze || !Array.isArray(step.maze)) {
      return <div>No maze data</div>;
    }

    const { maze, solution = [], visited = [], currentX, currentY } = step;

    return (
      <div className="maze-viewer">
        <h4>Rat in a Maze</h4>
        <div className="maze-grid">
          {maze.map((row, i) => (
            <div key={i} className="maze-row">
              {row.map((cell, j) => (
                <motion.div
                  key={j}
                  className={`maze-cell ${
                    cell === 1 ? 'path' : 'wall'
                  } ${solution[i] && solution[i][j] === 1 ? 'solution' : ''} ${
                    visited[i] && visited[i][j] ? 'visited' : ''
                  } ${
                    currentX === i && currentY === j ? 'current' : ''
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentX === i && currentY === j && '🐭'}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderKnightsTour = (step) => {
    if (!step.board || !Array.isArray(step.board)) {
      return <div>No board data for Knight's Tour</div>;
    }

    const { board, currentX, currentY, moveNumber } = step;
    const n = board.length;

    return (
      <div className="knights-tour">
        <h4>Knight's Tour ({n}x{n}) - Move: {moveNumber}</h4>
        <div className="chess-board">
          {board.map((row, i) => (
            <div key={i} className="chess-row">
              {row.map((cell, j) => (
                <motion.div
                  key={j}
                  className={`chess-cell ${(i + j) % 2 === 0 ? 'light' : 'dark'} ${
                    currentX === i && currentY === j ? 'current' : ''
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cell !== -1 && <span className="move-number">{cell}</span>}
                  {currentX === i && currentY === j && <span className="knight">♞</span>}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWordSearch = (step) => {
    if (!step.board || !Array.isArray(step.board)) {
      return <div>No board data for Word Search</div>;
    }

    const { board, visited = [], currentX, currentY } = step;

    return (
      <div className="word-search">
        <h4>Word Search</h4>
        <div className="word-grid">
          {board.map((row, i) => (
            <div key={i} className="word-row">
              {row.map((cell, j) => (
                <motion.div
                  key={j}
                  className={`word-cell ${
                    visited[i] && visited[i][j] ? 'visited' : ''
                  } ${currentX === i && currentY === j ? 'current' : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {cell}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGraphColoring = (step) => {
    if (!step.graph || typeof step.graph !== 'object') {
      return <div>No graph data</div>;
    }

    const { graph, color = {}, currentVertex } = step;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3', '#6c5ce7'];

    return (
      <div className="graph-coloring">
        <h4>Graph Coloring</h4>
        <div className="graph-nodes">
          {Object.entries(graph).map(([vertex]) => (
            <motion.div
              key={vertex}
              className={`graph-node ${currentVertex === parseInt(vertex) ? 'current' : ''}`}
              style={{ backgroundColor: color[vertex] ? colors[color[vertex] - 1] : '#ccc' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {vertex}
            </motion.div>
          ))}
        </div>
        <div className="color-palette">
          {colors.map((color, index) => (
            <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHamiltonianCycle = (step) => {
    if (!step.graph || typeof step.graph !== 'object') {
      return <div>No graph data</div>;
    }

    const { graph, path = [], currentVertex } = step;

    return (
      <div className="hamiltonian-cycle">
        <h4>Hamiltonian Cycle</h4>
        <div className="cycle-graph">
          {Object.entries(graph).map(([vertex]) => (
            <motion.div
              key={vertex}
              className={`cycle-node ${
                path.includes(parseInt(vertex)) ? 'in-path' : ''
              } ${currentVertex === parseInt(vertex) ? 'current' : ''}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {vertex}
            </motion.div>
          ))}
        </div>
        {path.length > 0 && <div className="path-display">Path: {path.join(' → ')}</div>}
      </div>
    );
  };

  const renderPowerSet = (step) => {
    const { set = [], currentSubset = [], result = [], currentIndex } = step;

    return (
      <div className="power-set">
        <h4>Power Set (All Subsets)</h4>
        <div className="set-display">
          <div className="original-set">
            Original Set: [{set.join(', ')}]
          </div>
          <div className="current-subset">
            Current Subset: [{currentSubset.join(', ')}]
          </div>
          <div className="result-subsets">
            <h5>Found Subsets ({result.length}):</h5>
            <div className="subsets-grid">
              {result.map((subset, index) => (
                <motion.div
                  key={index}
                  className="subset-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  [{subset.join(', ')}]
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPermutations = (step) => {
    const { arr = [], current = [], result = [], start, i } = step;

    return (
      <div className="permutations">
        <h4>Permutations</h4>
        <div className="permutation-display">
          <div className="original-array">
            Original Array: [{arr.join(', ')}]
          </div>
          <div className="current-state">
            Current: [{current.join(', ')}]
          </div>
          {start !== undefined && (
            <div className="current-index">
              Start Index: {start}
              {i !== undefined && <span>, Current Index: {i}</span>}
            </div>
          )}
          <div className="result-permutations">
            <h5>Found Permutations ({result.length}):</h5>
            <div className="permutations-grid">
              {result.map((perm, index) => (
                <motion.div
                  key={index}
                  className="permutation-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  [{perm.join(', ')}]
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCombinationSum = (step) => {
    const { candidates = [], target, currentCombination = [], result = [], currentIndex, currentSum } = step;

    return (
      <div className="combination-sum">
        <h4>Combination Sum</h4>
        <div className="combination-display">
          <div className="candidates">
            Candidates: [{candidates.join(', ')}], Target: {target}
          </div>
          <div className="current-state">
            Current Combination: [{currentCombination.join(', ')}]
            {currentSum !== undefined && <span>, Sum: {currentSum}</span>}
          </div>
          {currentIndex !== undefined && (
            <div className="current-index">Current Index: {currentIndex}</div>
          )}
          <div className="result-combinations">
            <h5>Valid Combinations ({result.length}):</h5>
            <div className="combinations-grid">
              {result.map((comb, index) => (
                <motion.div
                  key={index}
                  className="combination-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  [{comb.join(', ')}]
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPalindromePartitioning = (step) => {
    const { str = '', currentPartition = [], result = [], currentIndex } = step;

    return (
      <div className="palindrome-partitioning">
        <h4>Palindrome Partitioning</h4>
        <div className="partitioning-display">
          <div className="original-string">
            String: "{str}"
          </div>
          <div className="current-state">
            Current Partition: [{currentPartition.join('", "')}"]
          </div>
          {currentIndex !== undefined && (
            <div className="current-index">Current Index: {currentIndex}</div>
          )}
          <div className="result-partitions">
            <h5>Valid Partitions ({result.length}):</h5>
            <div className="partitions-grid">
              {result.map((partition, index) => (
                <motion.div
                  key={index}
                  className="partition-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  [{partition.map(p => `"${p}"`).join(', ')}]
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWordBreak = (step) => {
    const { s = '', wordDict = [], currentSolution = [], result = [], currentIndex } = step;

    return (
      <div className="word-break">
        <h4>Word Break</h4>
        <div className="word-break-display">
          <div className="input-data">
            String: "{s}", Dictionary: [{wordDict.map(w => `"${w}"`).join(', ')}]
          </div>
          <div className="current-state">
            Current Solution: [{currentSolution.map(w => `"${w}"`).join(', ')}]
          </div>
          {currentIndex !== undefined && (
            <div className="current-index">Current Index: {currentIndex}</div>
          )}
          <div className="result-solutions">
            <h5>Valid Solutions ({result.length}):</h5>
            <div className="solutions-grid">
              {result.map((solution, index) => (
                <motion.div
                  key={index}
                  className="solution-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  [{solution.map(w => `"${w}"`).join(', ')}]
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCrosswordSolver = (step) => {
    const { crossword = [], words = [], currentAssignment = [], result = [], currentWordIndex } = step;

    return (
      <div className="crossword-solver">
        <h4>Crossword Solver</h4>
        <div className="crossword-display">
          <div className="crossword-board">
            <h5>Crossword Board:</h5>
            <div className="board-grid">
              {crossword.map((row, i) => (
                <div key={i} className="crossword-row">
                  {row.map((cell, j) => (
                    <motion.div
                      key={j}
                      className={`crossword-cell ${cell === '+' ? 'block' : 'empty'}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: (i * row.length + j) * 0.01 }}
                    >
                      {cell !== '+' ? cell : ''}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="words-info">
            <div>Words to place: [{words.map(w => `"${w}"`).join(', ')}]</div>
            {currentWordIndex !== undefined && (
              <div>Current Word Index: {currentWordIndex}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAllPaths = (step) => {
    const { graph = [], source, destination, path = [], result = [], current, visited = [] } = step;

    return (
      <div className="all-paths">
        <h4>All Paths in Graph</h4>
        <div className="paths-display">
          <div className="graph-info">
            Source: {source}, Destination: {destination}
          </div>
          <div className="current-state">
            Current Path: {path.join(' → ')}
          </div>
          {current !== undefined && (
            <div className="current-node">Current Node: {current}</div>
          )}
          <div className="result-paths">
            <h5>Found Paths ({result.length}):</h5>
            <div className="paths-list">
              {result.map((path, index) => (
                <motion.div
                  key={index}
                  className="path-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {path.join(' → ')}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPartitionKSubsets = (step) => {
    const { nums = [], k, currentPartition = [], result = [], currentIndex, currentSum } = step;

    return (
      <div className="partition-k-subsets">
        <h4>Partition to K Equal Sum Subsets</h4>
        <div className="partition-display">
          <div className="input-data">
            Numbers: [{nums.join(', ')}], K: {k}
          </div>
          <div className="current-state">
            Current Partition: {currentPartition.map((subset, i) => (
              <div key={i}>Subset {i + 1}: [{subset.join(', ')}]</div>
            ))}
          </div>
          {currentIndex !== undefined && (
            <div className="current-index">Current Index: {currentIndex}</div>
          )}
          <div className="result-partitions">
            <h5>Valid Partitions ({result.length}):</h5>
            <div className="partitions-list">
              {result.map((partition, index) => (
                <motion.div
                  key={index}
                  className="partition-item"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {partition.map((subset, i) => (
                    <div key={i}>Subset {i + 1}: [{subset.join(', ')}]</div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="backtracking-viewer">
      <ZoomPanWrapper>{renderContent()}</ZoomPanWrapper>
    </div>
  );
};

export default BacktrackingViewer;