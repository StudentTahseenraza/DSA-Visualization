// components/PerformanceMetrics.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceMetrics = ({ results }) => {
  const chartData = [
    {
      name: 'Execution Time (ms)',
      [results[0].algorithmName]: parseFloat(results[0].executionTime),
      [results[1].algorithmName]: parseFloat(results[1].executionTime),
    },
    {
      name: 'Steps Count',
      [results[0].algorithmName]: results[0].steps.length,
      [results[1].algorithmName]: results[1].steps.length,
    },
    {
      name: 'Comparisons',
      [results[0].algorithmName]: results[0].comparisons,
      [results[1].algorithmName]: results[1].comparisons,
    },
    {
      name: 'Swaps/Operations',
      [results[0].algorithmName]: results[0].swaps,
      [results[1].algorithmName]: results[1].swaps,
    }
  ];

  return (
    <div className="performance-metrics">
      <h3>Performance Metrics Comparison</h3>
      
      <div className="metrics-grid">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={results[0].algorithmName} fill="#8884d8" />
              <Bar dataKey={results[1].algorithmName} fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="metrics-table">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>{results[0].algorithmName}</th>
                <th>{results[1].algorithmName}</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Execution Time (ms)</td>
                <td>{results[0].executionTime}</td>
                <td>{results[1].executionTime}</td>
                <td className={
                  parseFloat(results[0].executionTime) < parseFloat(results[1].executionTime) 
                    ? 'better' : 'worse'
                }>
                  {Math.abs(results[0].executionTime - results[1].executionTime)}ms
                </td>
              </tr>
              <tr>
                <td>Total Steps</td>
                <td>{results[0].steps.length}</td>
                <td>{results[1].steps.length}</td>
                <td className={
                  results[0].steps.length < results[1].steps.length 
                    ? 'better' : 'worse'
                }>
                  {Math.abs(results[0].steps.length - results[1].steps.length)}
                </td>
              </tr>
              <tr>
                <td>Comparisons</td>
                <td>{results[0].comparisons}</td>
                <td>{results[1].comparisons}</td>
                <td className={
                  results[0].comparisons < results[1].comparisons 
                    ? 'better' : 'worse'
                }>
                  {Math.abs(results[0].comparisons - results[1].comparisons)}
                </td>
              </tr>
              <tr>
                <td>Swaps/Operations</td>
                <td>{results[0].swaps}</td>
                <td>{results[1].swaps}</td>
                <td className={
                  results[0].swaps < results[1].swaps 
                    ? 'better' : 'worse'
                }>
                  {Math.abs(results[0].swaps - results[1].swaps)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;