// Imports specific utility functions and type definitions from the relative paths
import { ProblemState, Variable } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types"; // Import the interface
import { asArray } from "../../core/utils";

/**
 * Implements the product of array except self algorithm which calculates the product of all numbers in the input array except for the number at each index, generating steps for visualization.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  const steps: ProblemState[] = [];
  const length = nums.length;
  const output: number[] = new Array(length).fill(1);
  // Create the left (prefix) and right (suffix) products arrays
  const productsLeft: number[] = new Array(length).fill(1);
  const productsRight: number[] = new Array(length).fill(1);

  // Helper function to create and log each step's computational state
  function log(p: {
    point: number;
    numsIndex?: number[];
    leftIndex?: number[];
    rightIndex?: number[];
    outputIndex?: number[];
  }) {
    const v: Variable[] = [];
    const { point, numsIndex, leftIndex, rightIndex, outputIndex } = p;
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    v.push(asArray("nums", nums, ...(numsIndex ?? [])));
    if (productsLeft) {
      v.push(asArray("productsLeft", productsLeft, ...(leftIndex ?? [])));
    }
    if (productsRight) {
      v.push(asArray("productsRight", productsRight, ...(rightIndex ?? [])));
    }
    if (output) {
      v.push(asArray("output", output, ...(outputIndex ?? [])));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  log({ point: 1 });

  // Fill productsLeft array (prefix products)
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    log({ point: 2, leftIndex: [i, i - 1], numsIndex: [i - 1] });
  }

  // Fill productsRight array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    log({ point: 3, rightIndex: [i, i + 1], numsIndex: [i + 1] });
  }

  // Calculate the output array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    log({ point: 4, outputIndex: [i], leftIndex: [i], rightIndex: [i] });
  }

  // Logs the final state with the output array
  log({ point: 5 });

  // Ensure the final step has the 'result' variable
  if (steps.length > 0) {
    const lastStep = steps[steps.length - 1];
    // Check if 'result' already exists, if not, add it.
    // It's safer to remove any existing 'output' variable first if the test expects ONLY 'result'
    // For now, let's just add 'result'. Consider refining if tests still fail.
    const resultVar = asArray("result", output); // Use the final 'output' array
    lastStep.variables.push(resultVar);

    // Optional: Remove the 'output' variable from the last step if it causes issues
    // lastStep.variables = lastStep.variables.filter(v => v.label !== 'output');
  }

  return steps;
}
