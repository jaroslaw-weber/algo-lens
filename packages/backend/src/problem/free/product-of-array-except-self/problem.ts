import { Problem } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types";
import { productExceptSelf } from "./steps"; // Import the function from steps.ts
import { code } from "./code"; // Import the code string from code.ts

// Define the title for the problem
const title = "Product of Array Except Self";

// Function to generate a default input set
const getInput = (): ProductExceptSelfInput => ({
  nums: [1, 2, 3, 4], // Using a slightly smaller default input
});

// Export the complete problem setup
export const productExceptSelfProblem: Problem<
  ProductExceptSelfInput, // Input type
  ReturnType<typeof productExceptSelf> // Output type (ProblemState[])
> = {
  title,
  code,
  getInput,
  func: productExceptSelf,
  id: "product-of-array-except-self", // Keep the original ID
  tags: ["array", "prefix sum"],
  tested: true, // Assuming tests will be added or confirmed later
};
