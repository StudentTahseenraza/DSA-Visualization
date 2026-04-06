// components/DPTableVisualizer.jsx
import { motion } from 'framer-motion';
import '../styles/DPTableVisualizer.css';

const DPTableVisualizer = ({ dpTable, currentCell, dependencies, action, labels }) => {
  if (!dpTable || !Array.isArray(dpTable) || dpTable.length === 0) {
    return <div className="dp-table-empty">No table data available</div>;
  }

  const rows = dpTable.length;
  const cols = dpTable[0]?.length || 0;

  const isDependency = (i, j) => {
    if (!dependencies) return false;
    return dependencies.some(dep => dep.i === i && dep.j === j);
  };

  const isCurrent = (i, j) => {
    return currentCell?.i === i && currentCell?.j === j;
  };

  const getCellClassName = (i, j) => {
    const classes = ['dp-cell'];
    if (isCurrent(i, j)) classes.push('current');
    if (isDependency(i, j)) classes.push('dependency');
    if (action === 'match' && i === currentCell?.i && j === currentCell?.j) classes.push('match');
    if (action === 'select-include') classes.push('include');
    if (action === 'select-exclude') classes.push('exclude');
    return classes.join(' ');
  };

  return (
    <div className="dp-table-visualizer">
      <div className="dp-table-container">
        <table className="dp-animated-table">
          <thead>
            <tr>
              <th className="corner-cell"></th>
              {labels?.cols?.map((col, idx) => (
                <th key={idx} className="col-label">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpTable.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <th className="row-label">
                  {labels?.rows?.[i] !== undefined ? labels.rows[i] : i}
                </th>
                {row.map((cell, j) => (
                  <motion.td
                    key={j}
                    className={getCellClassName(i, j)}
                    animate={{
                      scale: isCurrent(i, j) ? [1, 1.05, 1] : 1,
                      backgroundColor: isCurrent(i, j) 
                        ? ['#2c3e50', '#3498db', '#2c3e50']
                        : isDependency(i, j)
                        ? ['#2c3e50', '#f39c12', '#2c3e50']
                        : '#2c3e50'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="cell-value">{cell !== undefined ? cell : '-'}</span>
                    {isCurrent(i, j) && (
                      <motion.div 
                        className="cell-pulse"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-legend">
        <div className="legend-item">
          <div className="legend-color current-color"></div>
          <span>Current Cell</span>
        </div>
        <div className="legend-item">
          <div className="legend-color dependency-color"></div>
          <span>Dependency</span>
        </div>
        <div className="legend-item">
          <div className="legend-color match-color"></div>
          <span>Match Found</span>
        </div>
        <div className="legend-item">
          <div className="legend-color include-color"></div>
          <span>Include Decision</span>
        </div>
      </div>
    </div>
  );
};

export default DPTableVisualizer;