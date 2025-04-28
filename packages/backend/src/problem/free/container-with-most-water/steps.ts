import { sum } from "lodash";
import { ProblemState } from "algo-lens-core" // Removed Problem
import {
  asArray,
  // Removed unused imports
  asValueGroup,
} from "../core/utils";
import { ContainerInput } from "./types"; // Import from ./types

// Export ContainerInput as per instruction (even though it's imported)
export type { ContainerInput };

/**
 * Implements the algorithm to find the maximum area of water that can be trapped between two lines.
 * @param p - The input parameters including an array of heights.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(p: ContainerInput): ProblemState[] { // Renamed and Exported
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

// Removed code, title, getInput, id, tags, Problem export
