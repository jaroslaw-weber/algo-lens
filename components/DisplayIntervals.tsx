import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { IntervalVariable } from "../src/problem/types";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DisplayBarChartProps {
  data: IntervalVariable;
}

const DisplayIntervals: React.FC<DisplayBarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.value.map(() => "test"), // Adjust label generation as necessary
    datasets: [
      {
        data: data.value.map((x) => x),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: 'y' as 'y',  // Explicitly typing it as 'y'
    scales: {
      y: {
        beginAtZero: true,
        min: data.options.min,
        max: data.options.max,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: data.label,
      },
    },
  };
  

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DisplayIntervals;
