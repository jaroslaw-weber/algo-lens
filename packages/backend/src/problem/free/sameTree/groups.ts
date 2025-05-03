import { pTree, qTree, isNodeSame } from "./variables"; // Import the variable definitions

// Define groups of variables for display purposes
// Often, variables are grouped logically in the UI

// Group for the two trees being compared
export const treeGroup = [pTree, qTree];

// Group for the result comparison
export const resultGroup = [isNodeSame];

// You might have a main group that includes all variables or specific combinations
export const mainViewGroup = [pTree, qTree, isNodeSame];

// Export the groups as needed by the visualization framework
// Assuming individual exports or a default export of all groups might be needed.
export default {
  treeGroup,
  resultGroup,
  mainViewGroup,
};
