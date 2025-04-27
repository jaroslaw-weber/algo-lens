import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "heights",
    label: "Heights",
    type: "matrix",
    dimension: 2,
  },
  {
    name: "pacificReachable",
    label: "Pacific Reachable",
    type: "matrix", // Boolean matrix
    dimension: 2,
    // Potentially add cell styling for true/false if supported
  },
  {
    name: "atlanticReachable",
    label: "Atlantic Reachable",
    type: "matrix", // Boolean matrix
    dimension: 2,
    // Potentially add cell styling for true/false if supported
  },
  {
    name: "result",
    label: "Result Cells",
    type: "coordinate_list", // Assuming a type for list of [r, c] pairs
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
  // DFS specific variables like 'reachable' parameter might not be needed
  // unless logging internal DFS state explicitly.
];
