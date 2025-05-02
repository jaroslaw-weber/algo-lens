import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code";
import { PacificAtlanticInput } from "./types"; // Import input type from types.ts

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Pacific Atlantic Water Flow";
const getInput = () => ({
  heights: [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
// Note: Original problem didn't have tags, so omitting them here.
export const problem: Problem<PacificAtlanticInput, ProblemState> = {
  title,
  emoji: '🌊',
  code,
  func: generateSteps, // Use the renamed function
  id: "pacific-atlantic-water-flow",
};
