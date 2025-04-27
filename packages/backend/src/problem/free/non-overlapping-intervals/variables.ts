import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "intervals",
    label: "Input Intervals",
    type: "interval", // Use interval type for visualization
  },
  {
    name: "remainingIntervals",
    label: "Non-overlapping Intervals",
    type: "interval", // Use interval type for visualization
  },
  {
    name: "removalCount",
    label: "Removal Count",
    type: "scalar",
    dimension: 0,
  },
  {
    name: "lastEnd",
    label: "Last End",
    type: "scalar",
    dimension: 0,
  },
  {
    name: "i",
    label: "Index",
    type: "scalar",
    dimension: 0,
  },
];
