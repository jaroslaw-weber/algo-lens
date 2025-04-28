import { Problem, ProblemState, TreeNode } from "algo-lens-core"; // Use TreeNode consistently
import { SameTreeInput } from "./types";
import { sameTreeSteps } from "./steps"; // Import the steps function
import { code } from "./code"; // Import the code string

// Define the title for the problem
const title = "Same Tree Check";

// Function to generate a default input set
// Using the structure from the original file
const getInput = (): SameTreeInput => {
  const p: TreeNode = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 3,
      left: { val: 6, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  };
  // Create a slightly different tree for q for a non-matching default case
  const q: TreeNode = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 3,
      left: { val: 6, left: null, right: null },
      right: { val: 8, left: null, right: null }, // Difference here
    },
  };
  return { p, q };
};

// Export the complete problem setup
export const sameTreeProblem: Problem<
  SameTreeInput,
  ProblemState // The output type is ProblemState[]
> = {
  title,
  code,
  getInput,
  func: sameTreeSteps, // Use the steps function
  id: "same-tree", // Match the directory name
  tested: true, // From original file
  tags: ["tree", "recursion", "depth-first search"], // Added relevant tags
};
