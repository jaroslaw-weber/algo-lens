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
import type { IntervalVariable, LabeledIntervalVariable } from "algo-lens-core/src/types";


// Constants for chart height calculation
const BAR_HEIGHT = 30;
const BASE_PADDING = 70;

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
  data: IntervalVariable | LabeledIntervalVariable;
}

const DisplayIntervals: React.FC<DisplayBarChartProps> = ({ data }) => {
  const backgroundColor = [];
  const borderColor = [];
  const indexes = new Set(data.indexes);

  // Determine the actual intervals and labels based on the type
  let intervalsToDisplay: number[][];
  let chartLabels: string[];

  if (data.type === "labeled-interval") {
    intervalsToDisplay = data.value.map((item) => item);
    chartLabels = data.labels?.map((item) => item || "") ?? []; // Use label if present, else empty string
  } else {
    intervalsToDisplay = data.value;
    chartLabels = data.value.map(() => ""); // Original behavior for unlabeled intervals
  }

  for (let i = 0; i < intervalsToDisplay.length; i++) {
    if (indexes.has(i)) {
      backgroundColor.push("rgba(255, 99, 132, 0.2)");
      borderColor.push("rgba(255, 99, 132, 1)");
    } else {
      backgroundColor.push("rgba(54, 162, 235, 0.2)");
      borderColor.push("rgba(54, 162, 235, 1)");
    }
  }

  const chartData = {
    labels: chartLabels, // Use the dynamically generated labels
    datasets: [
      {
        data: intervalsToDisplay, // Use the dynamically determined intervals
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  // Calculate dynamic chart height
  const numDataPoints = intervalsToDisplay.length;
  const chartHeight =
    numDataPoints === 0
      ? BASE_PADDING
      : numDataPoints * BAR_HEIGHT + BASE_PADDING;

  const options = {
    maintainAspectRatio: false,
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
        // text: data.label,
      },
    },
  };

  return (
    <div style={{ height: `${chartHeight}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DisplayIntervals;
