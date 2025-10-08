import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import '../styles/LineChart.css';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ array }) => {
  const data = {
    labels: array.map((_, index) => index),
    datasets: [
      {
        label: 'Array Values',
        data: array,
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        pointBackgroundColor: '#4A90E2',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Index',
          color: '#e2e8f0',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(74, 85, 104, 0.3)',
          borderColor: 'rgba(74, 85, 104, 0.5)'
        },
        ticks: {
          color: '#cbd5e0'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: '#e2e8f0',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(74, 85, 104, 0.3)',
          borderColor: 'rgba(74, 85, 104, 0.5)'
        },
        ticks: {
          color: '#cbd5e0'
        }
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(45, 55, 72, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#4a5568',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Value: ${context.parsed.y} at index ${context.dataIndex}`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;