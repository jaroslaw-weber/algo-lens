import { Problem, ProblemState } from "algo-lens-core"; // Assuming ProblemState is the correct state type
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code";
import { MinPathSumInput } from "./types"; // Import input type from types.ts

const title = "Minimum Path Sum";
const getInput = () => ({
  grid: [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ],
});

// Note: The original file used MinPathSumState, but ProblemState is the standard.
// If specific state aspects were needed, they'd be handled within generateSteps.
export const problem: Problem<MinPathSumInput, ProblemState> = {
  title: title,
  emoji: '🗺️',
  code: code,
  func: generateSteps, // Use the renamed function
  id: "minimum-path-sum",
  tags: ["2d dynamic programming"],
};
