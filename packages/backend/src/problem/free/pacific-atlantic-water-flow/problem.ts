import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code/typescript";
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
  metadata: {
    title: "Pacific Atlantic Water Flow",
    description: "Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, the 'Pacific ocean' touches the left and top edges of the matrix and the 'Atlantic ocean' touches the right and bottom edges. Find the list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
    source: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix"],
    difficulty: "Medium",
    id: "pacific-atlantic-water-flow", // Ensure this matches the existing id
    groups: []
  },
  code,
  func: generateSteps, // Use the renamed function
  id: "pacific-atlantic-water-flow", // Keep existing id outside metadata
};
