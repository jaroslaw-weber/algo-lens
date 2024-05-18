import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { IntervalVariable } from "../src/problem/types";

interface DisplayBarChartProps {
  data: IntervalVariable;
}

const DisplayIntervals: React.FC<DisplayBarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.intervals.map((x) => x.label),
    datasets: [
      {
        data: data.intervals.map((x) => x.value),
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
    indexAxis: "y",
    scales: {
      y: {
        min: data.options.min,
        max: data.options.max,
      },
    },
    legend: {
      display: false,
    },
    plugins: {
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
