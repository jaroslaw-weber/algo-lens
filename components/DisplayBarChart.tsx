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
    return 2;
  }
  if (count == 2) {
    return 2;
  }
  return 2;
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
    indexAxis: "y",
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

  const progressBars = [];
  const color = ["primary", "secondary", "accent"]
  let i=0
  for (const x of data.data) {
    progressBars.push(
      <div className="flex flex-col gap-1 w-full">
        <p className="text-xs text-gray-400">{x.label}</p>
        <div className="flex items-center gap-4">
          <p className="text-xs">{data.options.min}</p>

          <div
            className="flex w-full h-6 bg-gray-200 rounded overflow-hidden dark:bg-neutral-700"
            role="progressbar"
            aria-valuenow={x.value}
            aria-valuemin={data.options.min}
            aria-valuemax={data.options.max}
          >
            <div
              className={`py-2 flex flex-col justify-center rounded overflow-hidden bg-${color[i%color.length]}   text-center whitespace-nowrap transition duration-500`}
              style={{
                width: isFinite(x.value)
                  ? `${(x.value / data.options.max) * 100}%`
                  : "100%",
              }}
            >
              {x.value}
            </div>
          </div>

          <p className="text-xs">{data.options.max}</p>
        </div>
      </div>
    );
    i++
  }

  // Fixed size container using Tailwind CSS
  return (
    <div className="flex-1">
      <p className="text-center font-bold pb-1">{data.label}</p>
      <div className="w-full flex flex-col gap-4">{progressBars}</div>
    </div>
  );
};

export default DisplayBarChart;
