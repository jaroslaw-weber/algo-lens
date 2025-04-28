import { Problem, ProblemState } from "algo-lens-core";
import { SearchInput } from "./types";
import { searchSteps } from "./steps"; // Import the steps function
import { code } from "./code"; // Import the code string

// Define the title for the problem
const title = "Search in Rotated Sorted Array";

// Function to generate a default input set (from original file)
const getInput = (): SearchInput => ({
  nums: [13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  target: 1,
});

// Export the complete problem setup
export const searchProblem: Problem<
  SearchInput,
  ProblemState // The output type is ProblemState[]
> = {
  title,
  code,
  getInput,
  func: searchSteps, // Use the steps function
  id: "search-in-rotated-sorted-array", // Match the directory name
  tested: true, // From original file
  tags: ["array", "binary search", "rotated array"], // Added relevant tags
};
