import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "grid",
    label: "Grid",
    type: "matrix", // Representing the grid state
    dimension: 2,
    // Optional: Define cell styles for '0', '1', '2' if supported
  },
  {
    name: "numIslands",
    label: "Island Count",
    type: "scalar",
    dimension: 0,
  },
  {
    name: "r",
    label: "Row (r)",
    type: "scalar",
    dimension: 0,
  },
  {
    name: "c",
    label: "Column (c)",
    type: "scalar",
    dimension: 0,
  },
  // Note: DFS parameters (dr, dc) are transient and might not be needed here unless logged specifically.
];
