import { Problem, ProblemState } from "algo-lens-core";
import { SetMatrixZeroesInput } from "./types";
import { setMatrixZeroesSteps } from "./steps"; // Import the steps function
import { code } from "./code"; // Import the code string

// Define the title for the problem
const title = "Set Matrix Zeroes";

// Function to generate a default input set (from original file)
const getInput = (): SetMatrixZeroesInput => ({
  matrix: [
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ],
});

// Export the complete problem setup
export const setMatrixZeroesProblem: Problem<
  SetMatrixZeroesInput,
  ProblemState // The output type is ProblemState[]
> = {
  title,
  code,
  getInput,
  func: setMatrixZeroesSteps, // Use the steps function
  id: "set-matrix-zeroes", // Match the directory name
  // Assuming 'tested: true' based on similar problems, though not explicitly in original
  tested: true,
  tags: ["matrix", "array", "in-place"], // Added relevant tags
};
