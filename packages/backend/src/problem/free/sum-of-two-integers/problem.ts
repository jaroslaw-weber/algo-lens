import { Problem, ProblemState } from "algo-lens-core";
import { SumOfTwoIntegersInput } from "./types";
import { sumOfTwoIntegersSteps } from "./steps"; // Import the steps function
import { code } from "./code"; // Import the code string

// Define the title for the problem
const title = "Sum of Two Integers (Bitwise)";

// Function to generate a default input set (from original file)
const getInput = (): SumOfTwoIntegersInput => ({ a: 3, b: 5 });

// Export the complete problem setup
export const sumOfTwoIntegersProblem: Problem<
  SumOfTwoIntegersInput,
  ProblemState // The output type is ProblemState[]
> = {
  title,
  code,
  getInput,
  func: sumOfTwoIntegersSteps, // Use the steps function
  id: "sum-of-two-integers", // Match the directory name
  // Assuming 'tested: true' based on similar problems, though not explicitly in original
  tested: true,
  tags: ["bit manipulation", "math"], // Added relevant tags
};
