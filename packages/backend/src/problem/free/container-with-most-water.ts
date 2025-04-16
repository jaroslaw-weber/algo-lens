import { sum } from "lodash";
import { Problem, ProblemState } from "algo-lens-core"
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../core/utils";

interface ContainerInput {
  height: number[];
}

/**
 * Implements the algorithm to find the maximum area of water that can be trapped between two lines.
 * @param p - The input parameters including an array of heights.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function maxArea(p: ContainerInput): ProblemState[] {
  const { height } = p;
  const steps: ProblemState[] = [];
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  const max = sum(height)*2

  // Helper function to create and log each step's computational state
  function log(point: number, area?: number) {
    const step: ProblemState = {
      variables: [asArray("height", height, left, right)],
      breakpoint: point,
    };
      step.variables.push(
        asValueGroup("area", { area, maxArea }, { min: 0, max })
      );
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  // Main loop to check areas
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    log(2, area);

    if (area > maxArea) {
      maxArea = area;
      log(3, area);
    }

    if (height[left] < height[right]) {
      left++;
      log(4, area);
    } else {
      right--;
      log(5, area);
    }
  }

  // Logs the final state with the maximum area
  log(6, undefined);

  return steps;
}

// Example implementation of the maxArea function for demonstration and testing
const code = `function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  //#1 Start the loop to find the maximum area
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    //#2 Check if the current area is greater than the maximum area
    if (area > maxArea) {
      //#3 Update the maximum area
      maxArea = area;
    }

    // Move the pointer with the shorter height to the center
    if (height[left] < height[right]) {
      left++;
      //#4 Move the pointer with the shorter height to the center
    } else {
      right--;
      //#5 Move the pointer with the shorter height to the center
    }
  }

  //#6 Return the maximum area
  return maxArea;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Container With Most Water";
const getInput = () => ({
  height: [1, 8, 6, 2, 5, 4, 8, 3, 7],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const maxAreaProblem: Problem<ContainerInput, ProblemState> = {
  title,
  code,
  getInput,
  func: maxArea,
  id: "container-with-most-water",
  tags: ["array", "two pointers"],
};
