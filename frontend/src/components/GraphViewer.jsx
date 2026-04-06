// components/GreedyViewer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import '../styles/GreedyViewer.css';

const GreedyViewer = ({ step, algorithm }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const containerRef = useRef(null);

  if (!step) {
    return <div className="greedy-viewer">No data to display. Click "Run Algorithm" to start.</div>;
  }

  const renderActivitySelection = () => {
    const { activities = [], selected = [], currentIndex = -1, comparingIndices = [] } = step;
    const maxTime = Math.max(...activities.map(a => a.finish), 24);
    
    const timelineWidth = Math.max(800, maxTime * 50);
    const activityHeight = 80;
    const totalHeight = activities.length * activityHeight + 150;
    
    return (
      <div className="greedy-scroll-container">
        <div className="activity-selection-viewer">
          <div className="timeline-header" style={{ minWidth: `${timelineWidth}px` }}>
            <div className="timeline-title">📅 Activity Schedule Timeline</div>
            <div className="selected-count">
              ✅ Selected: {selected.length} / {activities.length} activities
            </div>
          </div>
          
          <div className="activities-container" style={{ minHeight: `${totalHeight}px`, minWidth: `${timelineWidth}px` }}>
            {activities.map((activity, idx) => {
              const startPercent = (activity.start / maxTime) * 100;
              const widthPercent = ((activity.finish - activity.start) / maxTime) * 100;
              const isSelected = selected.includes(idx);
              const isCurrent = currentIndex === idx;
              const isComparing = comparingIndices.includes(idx);
              
              return (
                <motion.div
                  key={idx}
                  className="activity-row"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  style={{ top: `${idx * activityHeight}px`, height: `${activityHeight - 10}px` }}
                >
                  <div className="activity-label">
                    <span className="activity-id">{activity.name}</span>
                    <span className="activity-duration">[{activity.start}-{activity.finish}]</span>
                  </div>
                  
                  <div className="timeline-track">
                    <motion.div
                      className={`activity-bar ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''} ${isComparing ? 'comparing' : ''}`}
                      style={{ left: `${startPercent}%`, width: `${widthPercent}%` }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      whileHover={{ scaleY: 1.05, zIndex: 10 }}
                      onHoverStart={() => setHoveredItem(idx)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <div className="bar-content">
                        <span className="bar-label">{activity.name}</span>
                        <span className="bar-time">{activity.start} → {activity.finish}</span>
                      </div>
                      {isSelected && (
                        <motion.div 
                          className="selected-check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ✓
                        </motion.div>
                      )}
                      {hoveredItem === idx && (
                        <div className="activity-tooltip">
                          Start: {activity.start}, Finish: {activity.finish}
                          {isSelected && " ✓ Selected"}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="timeline-axis-wrapper" style={{ minWidth: `${timelineWidth}px` }}>
            <div className="timeline-axis">
              {Array.from({ length: maxTime + 1 }, (_, i) => (
                <div key={i} className="timeline-mark" style={{ left: `${(i / maxTime) * 100}%` }}>
                  <span className="mark-label">{i}</span>
                  <div className="mark-line"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="timeline-legend" style={{ minWidth: `${timelineWidth}px` }}>
            <div className="legend-item"><div className="legend-color default"></div> Not Selected</div>
            <div className="legend-item"><div className="legend-color selected"></div> Selected ✓</div>
            <div className="legend-item"><div className="legend-color current"></div> Currently Processing</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFractionalKnapsack = () => {
    const { items = [], selectedItems = [], currentIndex = -1, currentWeight = 0, totalValue = 0, capacity = 0 } = step;
    
    return (
      <div className="greedy-scroll-container">
        <div className="knapsack-viewer">
          <div className="knapsack-stats">
            <div className="stat">📦 Used: {currentWeight}/{capacity} kg</div>
            <div className="stat">💰 Total: ${totalValue.toFixed(2)}</div>
            <div className="stat">📊 Fill: {((currentWeight / capacity) * 100).toFixed(1)}%</div>
          </div>
          
          <div className="capacity-bar">
            <motion.div 
              className="capacity-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(currentWeight / capacity) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="knapsack-items-grid">
            {items.map((item, idx) => {
              const selectedItem = selectedItems?.find(s => s.name === item.name);
              const fraction = selectedItem?.fraction || 0;
              const isCurrent = currentIndex === idx;
              
              return (
                <motion.div
                  key={idx}
                  className={`knapsack-item ${fraction > 0 ? 'taken' : ''} ${isCurrent ? 'current' : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="item-name">{item.name}</div>
                  <div className="item-details">💰 ${item.value} | ⚖️ {item.weight}kg</div>
                  <div className="item-ratio">📈 Ratio: {(item.value / item.weight).toFixed(2)}</div>
                  {fraction > 0 && (
                    <motion.div 
                      className="item-fraction"
                      initial={{ width: 0 }}
                      animate={{ width: `${fraction * 100}%` }}
                      transition={{ duration: 0.5 }}
                    >
                      <span>Taken: {(fraction * 100).toFixed(0)}%</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderJobScheduling = () => {
    const { jobs = [], schedule = [], totalProfit = 0, currentIndex = -1, checkingSlot = -1 } = step;
    const maxDeadline = Math.max(...jobs.map(j => j.deadline), 1);
    
    return (
      <div className="greedy-scroll-container">
        <div className="job-scheduling-viewer">
          <div className="profit-display">💰 Total Profit: ${totalProfit}</div>
          
          <div className="schedule-timeline" style={{ gridTemplateColumns: `repeat(${maxDeadline}, minmax(100px, 1fr))` }}>
            {schedule.map((jobId, slot) => (
              <motion.div 
                key={slot} 
                className={`time-slot ${checkingSlot === slot ? 'checking' : ''} ${jobId !== null ? 'filled' : 'empty'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: slot * 0.05 }}
              >
                <div className="slot-time">Slot {slot + 1}</div>
                <div className="slot-job">{jobId !== null ? `Job ${jobId}` : '—'}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="jobs-list">
            <h4>📋 Jobs (Profit, Deadline):</h4>
            {jobs.map((job, idx) => (
              <motion.div 
                key={idx} 
                className={`job-item ${currentIndex === idx ? 'current' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <span className="job-id">{job.id}</span>
                <span className="job-profit">💰 ${job.profit}</span>
                <span className="job-deadline">⏰ Deadline: {job.deadline}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderHuffmanEncoding = () => {
    const { frequencies = {}, codes = {}, encoded = '', tree = null, currentNode = null } = step;
    
    const totalChars = Object.values(frequencies).reduce((a, b) => a + b, 0);
    const maxFreq = Math.max(...Object.values(frequencies), 1);
    
    const renderHuffmanTree = (node, x, y, level = 0) => {
      if (!node) return null;
      
      const nodeWidth = 60;
      const nodeHeight = 50;
      const horizontalSpacing = Math.max(60, 200 / (level + 1));
      const verticalSpacing = 80;
      
      const isCurrent = currentNode && (node.char === currentNode || node.char?.includes(currentNode));
      
      return (
        <g key={`tree-node-${node.char || node.frequency}`}>
          {node.left && (
            <line
              x1={x}
              y1={y + nodeHeight/2}
              x2={x - horizontalSpacing}
              y2={y + verticalSpacing}
              stroke="#4a5568"
              strokeWidth="2"
              className="tree-line"
            />
          )}
          {node.right && (
            <line
              x1={x}
              y1={y + nodeHeight/2}
              x2={x + horizontalSpacing}
              y2={y + verticalSpacing}
              stroke="#4a5568"
              strokeWidth="2"
              className="tree-line"
            />
          )}
          
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: level * 0.1 }}
          >
            <circle
              cx={x}
              cy={y}
              r={nodeWidth/2}
              fill={node.left || node.right ? "url(#nodeGrad)" : "url(#leafGrad)"}
              stroke={isCurrent ? "#f1c40f" : "#4a5568"}
              strokeWidth={isCurrent ? 3 : 1}
              className="tree-node"
            />
            <text x={x} y={y - 15} textAnchor="middle" fill="#a0aec0" fontSize="10">
              {node.frequency}
            </text>
            <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              {node.char || '●'}
            </text>
            {!node.left && !node.right && codes[node.char] && (
              <text x={x} y={y + 25} textAnchor="middle" fill="#2ecc71" fontSize="9">
                {codes[node.char]}
              </text>
            )}
          </motion.g>
          
          {node.left && renderHuffmanTree(node.left, x - horizontalSpacing, y + verticalSpacing, level + 1)}
          {node.right && renderHuffmanTree(node.right, x + horizontalSpacing, y + verticalSpacing, level + 1)}
        </g>
      );
    };
    
    const treeWidth = Math.max(800, Object.keys(codes).length * 60);
    const treeHeight = 400;
    
    return (
      <div className="greedy-scroll-container">
        <div className="huffman-viewer">
          <div className="frequency-section">
            <h4>📊 Character Frequency Analysis</h4>
            <div className="frequency-stats">
              <div className="stat">Total: {totalChars} chars</div>
              <div className="stat">Unique: {Object.keys(frequencies).length}</div>
              <div className="stat">Original: {totalChars * 8} bits</div>
            </div>
            <div className="frequency-grid">
              {Object.entries(frequencies).map(([char, freq], idx) => (
                <motion.div
                  key={char}
                  className={`freq-card ${currentNode === char ? 'current' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="char-icon">'{char}'</div>
                  <div className="freq-value">{freq}</div>
                  <div className="freq-percent">{((freq / totalChars) * 100).toFixed(1)}%</div>
                  <div className="freq-bar-container">
                    <motion.div 
                      className="freq-bar" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(freq / maxFreq) * 100}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {tree && Object.keys(codes).length > 0 && (
            <div className="tree-section">
              <h4>🌳 Huffman Tree</h4>
              <div className="tree-container" style={{ minWidth: `${treeWidth}px`, minHeight: `${treeHeight}px` }}>
                <svg width={treeWidth} height={treeHeight} className="huffman-tree-svg">
                  <defs>
                    <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#27ae60" />
                      <stop offset="100%" stopColor="#2ecc71" />
                    </linearGradient>
                  </defs>
                  {renderHuffmanTree(tree, treeWidth / 2, 50)}
                </svg>
              </div>
            </div>
          )}
          
          <div className="codes-section">
            <h4>🔤 Huffman Codes</h4>
            <div className="codes-grid">
              {Object.entries(codes).map(([char, code], idx) => (
                <motion.div
                  key={char}
                  className="code-card"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="code-char">'{char}'</span>
                  <span className="code-bits">{code}</span>
                  <span className="code-length">{code.length} bits</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {encoded && (
            <div className="encoded-section">
              <h4>📝 Encoded Output</h4>
              <div className="encoded-container">
                <div className="encoded-bits">
                  {encoded.split('').map((bit, idx) => (
                    <motion.span
                      key={idx}
                      className={`bit ${bit === '0' ? 'bit-zero' : 'bit-one'}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.1, delay: idx * 0.005 }}
                    >
                      {bit}
                    </motion.span>
                  ))}
                </div>
                <div className="compression-info">
                  <div className="info-item">
                    <span className="info-label">Original:</span>
                    <span className="info-value">{totalChars * 8} bits</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Compressed:</span>
                    <span className="info-value">{encoded.length} bits</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ratio:</span>
                    <span className="info-value highlight">{((totalChars * 8) / encoded.length).toFixed(2)}:1</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Saved:</span>
                    <span className="info-value success">{((1 - encoded.length / (totalChars * 8)) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCoinChange = () => {
    const { coins = [], result = [], remaining = 0, amount = 0, currentCoin = null } = step;
    
    return (
      <div className="greedy-scroll-container">
        <div className="coin-change-viewer">
          <div className="coin-header">
            <div className="target-amount">🎯 Target Amount: ${amount}</div>
            <div className={`remaining-amount ${remaining === 0 ? 'success' : 'pending'}`}>
              Remaining: ${remaining}
            </div>
          </div>
          
          <div className="coins-grid">
            {coins.map((coin, idx) => (
              <motion.div
                key={idx}
                className={`coin-card ${currentCoin === coin ? 'current' : ''} ${result.includes(coin) ? 'used' : ''}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="coin-value">${coin}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="result-coins">
            <h4>💰 Coins Used:</h4>
            <div className="coins-list">
              {result.map((coin, idx) => (
                <motion.span 
                  key={idx} 
                  className="used-coin"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  ${coin}
                </motion.span>
              ))}
            </div>
            {remaining > 0 && (
              <div className="warning">
                ⚠️ Cannot make exact change with given coins! Remaining: ${remaining}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGraphAlgorithm = () => {
    const { graph = [], dist = [], visited = [], currentVertex = -1, updatingVertex = -1, parent = [] } = step;
    const n = graph.length;
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    return (
      <div className="greedy-scroll-container">
        <div className="graph-viewer">
          <div className="graph-nodes">
            {Array.from({ length: n }, (_, i) => (
              <motion.div
                key={i}
                className={`graph-node ${visited[i] ? 'visited' : ''} ${currentVertex === i ? 'current' : ''} ${updatingVertex === i ? 'updating' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="node-label">{nodes[i]}</span>
                <span className="node-distance">{dist[i] !== Infinity ? dist[i] : '∞'}</span>
              </motion.div>
            ))}
          </div>
          <div className="graph-info">
            <div>📍 Current: {currentVertex !== -1 ? nodes[currentVertex] : 'None'}</div>
            <div>✅ Visited: {visited.map((v, i) => v ? nodes[i] : '').filter(Boolean).join(', ') || 'None'}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (algorithm) {
      case 'activity-selection': return renderActivitySelection();
      case 'fractional-knapsack': return renderFractionalKnapsack();
      case 'job-scheduling': return renderJobScheduling();
      case 'huffman-encoding': return renderHuffmanEncoding();
      case 'coin-change-greedy': return renderCoinChange();
      case 'prims-algorithm':
      case 'kruskals-algorithm':
      case 'dijkstras-algorithm':
        return renderGraphAlgorithm();
      default:
        return <div className="greedy-viewer">Unsupported greedy algorithm: {algorithm}</div>;
    }
  };

  return (
    <div className="greedy-viewer-wrapper" ref={containerRef}>
      <div className="greedy-step-info">
        <div className="step-action">
          {step.action?.replace(/-/g, ' ').toUpperCase() || 'Processing'}
        </div>
        <div className="step-message">{step.message || 'Processing...'}</div>
      </div>
      {renderContent()}
    </div>
  );
};

export default GreedyViewer;