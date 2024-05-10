import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChartVariable } from "../src/problem/types";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DisplayBarChartProps {
  data: BarChartVariable;
}

function getAspectRatio(count: number): number {
  if (count == 1) {
    return 0.5;
  }
  if (count == 2) {
    return 1;
  }
  return 3;
}

const DisplayBarChart: React.FC<DisplayBarChartProps> = ({ data }) => {
  console.log("data", data);
  const count = data.data.length;
  const chartData = {
    labels: data.data.map((x) => x.label),
    datasets: [
      {
        data: data.data.map((x) => x.value),
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
    scales: {
      y: {
        min: data.options.min,
        max: data.options.max,
      },
    },
    legend: {
      display: false, // This hides the legend,
      /*
      labels: {
        fontSize: 26,
      },*/
    },
    plugins: {
      legend: {
        display: false, // Correct placement to hide the legend
      },
      title: {
        display: true, // Enables the title
        text: data.label, // Set the title text to the label from your data

        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 16,
        },
      },
    },
    aspectRatio: getAspectRatio(count),
  };

  // Fixed size container using Tailwind CSS
  return (
    <div className="flex-1">
      <div className="w-40 h-40">
        {/* Adjust width (w-64) and height (h-64) as needed */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DisplayBarChart;
