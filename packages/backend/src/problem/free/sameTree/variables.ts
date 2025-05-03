import { TreeVariable, BooleanGroupVariable } from "algo-lens-core";

export const pTree: TreeVariable = {
  label: "pTree",
  type: "tree",
  value: null, // Initial value, will be updated by log
  highlight: [],
};

export const qTree: TreeVariable = {
  label: "qTree",
  type: "tree",
  value: null, // Initial value, will be updated by log
  highlight: [],
};

export const isNodeSame: BooleanGroupVariable = {
  label: "is node same?",
  type: "boolean-group",
  data: [{ label: "return", value: false }], // Initial value, will be updated by log
};

// Export all variables in an array or object if needed by the framework,
// or just export them individually as above.
// Assuming individual exports are sufficient for now.
