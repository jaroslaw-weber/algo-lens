import { sum } from "lodash";
import { ProblemState } from "algo-lens-core"; // Removed Problem
import {
  asArray,
  // Removed unused imports
  asValueGroup,
} from "../../core/utils";
import { ContainerInput } from "./types"; // Import from ./types
import { StepLoggerV2 } from "../../core/StepLoggerV2";

/**
 * Implements the algorithm to find the maximum area of water that can be trapped between two lines.
 * @param p - The input parameters including an array of heights.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(height: number[]): ProblemState[] {
  // Renamed and Exported

  const l = new StepLoggerV2();
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  const max = sum(height) * 2;

  // Helper function to create and log each step's computational state
  function log(point: number, area?: number) {
    l.arrayV2("height", height, left, right);
    l.simple({ maxArea });
    if (area !== undefined) {
      l.simple({ area });
    } else {
      l.hide("area");
    }
    const result = maxArea;
    l.simple({ result });
    l.breakpoint(point);
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

  return l.getSteps();
}

// Removed code, title, getInput, id, tags, Problem export
