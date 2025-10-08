// components/GreedyViewer.jsx
import { motion } from 'framer-motion';
import ZoomPanWrapper from './ZoomPanWrapper.jsx';
import '../styles/GreedyViewer.css';

const GreedyViewer = ({ step, algorithm }) => {
  if (!step) {
    return <div className="greedy-viewer">No data to display</div>;
  }

  const renderContent = () => {
    switch (algorithm) {
      case 'activity-selection':
        return renderActivitySelection(step);
      case 'fractional-knapsack':
        return renderFractionalKnapsack(step);
      case 'job-scheduling':
        return renderJobScheduling(step);
      case 'huffman-encoding':
        return renderHuffmanEncoding(step);
      case 'prims-algorithm':
        return renderPrimsAlgorithm(step);
      case 'kruskals-algorithm':
        return renderKruskalsAlgorithm(step);
      case 'dijkstras-algorithm':
        return renderDijkstrasAlgorithm(step);
      case 'coin-change-greedy':
        return renderCoinChange(step);
      default:
        return <div>Unsupported greedy algorithm</div>;
    }
  };

  const renderActivitySelection = (step) => {
    const { activities = [], selected = [], currentIndex = -1 } = step;

    return (
      <div className="activity-selection">
        <h4>Activity Selection</h4>
        <div className="activities-timeline">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className={`activity ${selected.includes(index) ? 'selected' : ''} ${
                currentIndex === index ? 'current' : ''
              }`}
              style={{
                left: `${(activity.start / 24) * 100}%`,
                width: `${((activity.finish - activity.start) / 24) * 100}%`
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="activity-name">{activity.name}</span>
              <span className="activity-time">
                {activity.start}-{activity.finish}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="timeline-axis">
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i} className="timeline-mark">
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFractionalKnapsack = (step) => {
    const {
      items = [],
      capacity = 0,
      currentWeight = 0,
      totalValue = 0,
      selected = [],
      currentIndex = -1
    } = step;

    return (
      <div className="fractional-knapsack">
        <h4>Fractional Knapsack</h4>
        <div className="knapsack-container">
          <div className="knapsack-header">
            <div>
              Capacity: {currentWeight}/{capacity}
            </div>
            <div>Total Value: {totalValue.toFixed(2)}</div>
          </div>
          <div className="items-container">
            {items.map((item, index) => {
              const selectedItem = selected.find((s) => s.name === item.name);
              const fraction = selectedItem ? selectedItem.fraction : 0;

              return (
                <motion.div
                  key={index}
                  className={`item ${currentIndex === index ? 'current' : ''}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="item-name">{item.name}</div>
                  <div className="item-details">
                    Value: {item.value}, Weight: {item.weight}
                  </div>
                  <div className="item-ratio">
                    Ratio: {(item.value / item.weight).toFixed(2)}
                  </div>
                  {fraction > 0 && (
                    <div className="item-fraction">
                      Taken: {(fraction * 100).toFixed(0)}%
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderJobScheduling = (step) => {
    const { jobs = [], schedule = [], totalProfit = 0, currentIndex = -1 } = step;

    return (
      <div className="job-scheduling">
        <h4>Job Scheduling</h4>
        <div className="schedule-timeline">
          {schedule.map((jobId, timeSlot) => (
            <motion.div
              key={timeSlot}
              className="time-slot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="slot-time">Slot {timeSlot + 1}</div>
              <div className="slot-job">
                {jobId !== null ? `Job ${jobId}` : 'Empty'}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="jobs-list">
          <h5>Jobs (Profit, Deadline):</h5>
          {jobs.map((job, index) => (
            <div key={index} className={`job ${currentIndex === index ? 'current' : ''}`}>
              {job.id}: Profit {job.profit}, Deadline {job.deadline}
            </div>
          ))}
        </div>
        <div className="total-profit">Total Profit: {totalProfit}</div>
      </div>
    );
  };

  const renderHuffmanEncoding = (step) => {
    const { frequencies = {}, codes = {}, encoded = '', currentChar = '' } = step;

    return (
      <div className="huffman-encoding">
        <h4>Huffman Encoding</h4>
        <div className="frequency-table">
          <h5>Character Frequencies:</h5>
          {Object.entries(frequencies).map(([char, freq]) => (
            <div key={char} className={`frequency ${currentChar === char ? 'current' : ''}`}>
              '{char}': {freq}
            </div>
          ))}
        </div>
        <div className="codes-table">
          <h5>Huffman Codes:</h5>
          {Object.entries(codes).map(([char, code]) => (
            <div key={char} className="code">
              '{char}': {code}
            </div>
          ))}
        </div>
        {encoded && (
          <div className="encoded-result">
            <h5>Encoded Text:</h5>
            <div className="encoded-bits">{encoded}</div>
          </div>
        )}
      </div>
    );
  };

  const renderPrimsAlgorithm = (step) => {
    const { graph = {}, dist = {}, visited = {}, currentVertex = -1, totalWeight = 0 } = step;

    return (
      <div className="prims-algorithm">
        <h4>Prim's Algorithm</h4>
        <div className="graph-visualization">
          {Object.entries(graph).map(([vertex]) => (
            <motion.div
              key={vertex}
              className={`graph-node ${visited[vertex] ? 'visited' : ''} ${
                currentVertex === parseInt(vertex) ? 'current' : ''
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {vertex}
              {dist[vertex] < Infinity && (
                <div className="node-distance">{dist[vertex]}</div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="algorithm-info">
          <div>Total Weight: {totalWeight}</div>
          <div>Current Vertex: {currentVertex}</div>
        </div>
      </div>
    );
  };

  const renderKruskalsAlgorithm = (step) => {
    const { edges = [], mst = [], currentEdge = null, totalWeight = 0 } = step;

    return (
      <div className="kruskals-algorithm">
        <h4>Kruskal's Algorithm</h4>
        <div className="edges-list">
          <h5>Edges (Weight):</h5>
          {edges.map((edge, index) => (
            <div
              key={index}
              className={`edge ${
                mst.some((e) => e.u === edge.u && e.v === edge.v) ? 'in-mst' : ''
              } ${
                currentEdge && currentEdge.u === edge.u && currentEdge.v === edge.v
                  ? 'current'
                  : ''
              }`}
            >
              {edge.u}-{edge.v}: {edge.weight}
            </div>
          ))}
        </div>
        <div className="mst-info">
          <div>MST Weight: {totalWeight}</div>
          <div>MST Edges: {mst.length}</div>
        </div>
      </div>
    );
  };

  const renderDijkstrasAlgorithm = (step) => {
    const { graph = {}, dist = {}, visited = {}, currentVertex = -1, updatingVertex = -1 } = step;

    return (
      <div className="dijkstras-algorithm">
        <h4>Dijkstra's Algorithm</h4>
        <div className="graph-visualization">
          {Object.entries(graph).map(([vertex]) => (
            <motion.div
              key={vertex}
              className={`graph-node ${visited[vertex] ? 'visited' : ''} ${
                currentVertex === parseInt(vertex) ? 'current' : ''
              } ${updatingVertex === parseInt(vertex) ? 'updating' : ''}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {vertex}
              <div className="node-distance">{dist[vertex]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderCoinChange = (step) => {
    const { coins = [], amount = 0, result = [], remaining = 0, currentCoin = null } = step;

    return (
      <div className="coin-change">
        <h4>Coin Change</h4>
        <div className="coins-display">
          <div className="target-amount">Target: {amount}</div>
          <div className="remaining">Remaining: {remaining}</div>
          <div className="coins-used">Coins used: {result.join(', ')}</div>
        </div>
        <div className="coins-grid">
          {coins.map((coin, index) => (
            <motion.div
              key={index}
              className={`coin ${currentCoin === coin ? 'current' : ''} ${
                result.includes(coin) ? 'used' : ''
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {coin}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="greedy-viewer">
      <ZoomPanWrapper>{renderContent()}</ZoomPanWrapper>
    </div>
  );
};

export default GreedyViewer;
