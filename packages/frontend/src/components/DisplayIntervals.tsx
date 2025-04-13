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
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import type { IntervalVariable } from "algo-lens-core";

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
  const backgroundColor = [];
  const borderColor = [];
  const indexes = new Set(data.indexes);
  for (let i = 0; i < data.value.length; i++) {
    if (indexes.has(i)) {
      backgroundColor.push("rgba(255, 99, 132, 0.2)");
      borderColor.push("rgba(255, 99, 132, 1)");
    } else {
      backgroundColor.push("rgba(54, 162, 235, 0.2)");
      borderColor.push("rgba(54, 162, 235, 1)");
    }
  }
  const chartData = {
    labels: data.value.map(() => ""), // Adjust label generation as necessary
    datasets: [
      {
        data: data.value.map((x) => x),
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    aspectRatio: 3,
    indexAxis: "y" as "y", // Explicitly typing it as 'y'
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Adjust this value based on the granularity you want
        },
      },
      x: {
        min: data.options.min,
        max: data.options.max,
        ticks: {
          stepSize: 1, // Adjust this value based on the granularity you want
        },
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
