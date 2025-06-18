// Imports specific utility functions and type definitions from the relative paths
import { Pointer, ProblemState } from "algo-lens-core/src/types";
 // Import ProblemState
import { ProductExceptSelfInput } from "./types"; // Import the interface
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";

/**
 * Implements the product of array except self algorithm which calculates the product of all numbers in the input array except for the number at each index, generating steps for visualization.
 * @param nums - The input array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  const length = nums.length;
  const result: number[] = new Array(length).fill(1);
  // Create the left (prefix) and right (suffix) products arrays
  const leftProducts: number[] = new Array(length).fill(1);
  const rightProducts: number[] = new Array(length).fill(1);

  // Log the initial state
  l.arrayV3({ nums: nums }, []);
  l.arrayV3({ leftProducts: leftProducts }, []);
  l.arrayV3({ rightProducts: rightProducts }, []);
  l.arrayV3({ result: result }, []);
  l.comment =
    "Initialize the result array and two temporary arrays, leftProducts and rightProducts, all filled with 1s. leftProducts will store the product of all elements to the left of the current index, and rightProducts will store the product of all elements to the right.";
  l.breakpoint(1);

  // Fill leftProducts array (prefix products)
  for (let i = 1; i < length; i++) {
    const prevLeftProduct = leftProducts[i - 1];
    const prevNum = nums[i - 1];
    leftProducts[i] = prevLeftProduct * prevNum;
    l.arrayV3({ nums: nums }, [
      {
        dimension: "column",
        value: i - 1,
        label: "current num",
        color: "primary",
      },
    ]); // Use inferred label "i - 1"
    l.arrayV3({ leftProducts: leftProducts }, [
      { dimension: "column", value: i, label: "current", color: "primary" },
      { dimension: "column", value: i - 1, label: "previous", color: "info" },
    ]); // Use inferred labels "i" and "i - 1"
    l.arrayV3({ rightProducts: rightProducts }, []);
    l.arrayV3({ result: result }, []);
    l.comment = `Calculate prefix product for current position.`;
    l.breakpoint(2);
  }

  // Fill rightProducts array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    const nextRightProduct = rightProducts[i + 1];
    const nextNum = nums[i + 1];
    rightProducts[i] = nextRightProduct * nextNum;
    l.arrayV3({ nums: nums }, [
      {
        dimension: "column",
        value: i + 1,
        label: "current num",
        color: "primary",
      },
    ]); // Use inferred label "i + 1"
    l.arrayV3({ leftProducts: leftProducts }, []);
    l.arrayV3({ rightProducts: rightProducts }, [
      { dimension: "column", value: i, label: "current", color: "primary" },
      { dimension: "column", value: i + 1, label: "next", color: "info" },
    ]); // Use inferred labels "i" and "i + 1"
    l.arrayV3({ result: result }, []);
    l.comment = `Calculate suffix product for current position.`;
    l.breakpoint(3);
  }

  // Calculate the result array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    const currentLeftProduct = leftProducts[i];
    const currentRightProduct = rightProducts[i];
    result[i] = currentLeftProduct * currentRightProduct;
    l.arrayV3({ nums: nums }, []);
    l.arrayV3({ leftProducts: leftProducts }, [
      { value: i, label: "left product", color: "info" } as Pointer,
    ]);
    l.arrayV3({ rightProducts: rightProducts }, [
      { value: i, label: "right product", color: "info" } as Pointer,
    ]);
    l.arrayV3({ result: result }, [
      {
        dimension: "column",
        value: i,
        label: "right * left",
        color: "success",
      },
    ]);
    l.comment = `Calculate final output: left product * right product.`;
    l.breakpoint(4);
  }

  // Log the final state with the result
  l.arrayV3({ result: result }, []);
  l.hide("nums");
  l.hide("leftProducts");
  l.hide("rightProducts");
  l.hide("result");
  l.comment =
    "All elements have been processed. The result array now contains the product of all elements except self for each index of the original input array.";
  l.breakpoint(5);

  return l.getSteps();
}
