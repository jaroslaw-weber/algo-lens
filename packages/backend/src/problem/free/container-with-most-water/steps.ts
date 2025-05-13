import { sum } from "lodash";
import { ProblemState } from "algo-lens-core"; // Removed Problem
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(height: number[]): ProblemState[] {

  const l = new StepLoggerV2();
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  l.comment = "Initial state before the loop.";
  l.arrayV2({ height }, { left, right });
  l.simple({ maxArea });
  l.breakpoint(1);

  // Main loop to check areas
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    l.comment = "Calculated area for the current pair of lines.";
    l.simple({ area });
    l.breakpoint(2);

    if (area > maxArea) {
      maxArea = area;
      l.comment = "Updated maxArea with the new larger area.";
      l.simple({ maxArea });
      l.breakpoint(3);
    }

    if (height[left] < height[right]) {
      left++;
      l.comment = "Moved left pointer because height[left] < height[right].";
      l.arrayV2({ height }, { left, right });
      l.breakpoint(4);
    } else {
      right--;
      l.comment = "Moved right pointer because height[left] >= height[right].";
      l.arrayV2({ height }, { left, right });
      l.breakpoint(5);
    }
  }

  const result = maxArea;
  l.simple({ result });
  l.comment = "Final result.";
  l.hide("area");
  l.breakpoint(6);

  return l.getSteps();
}

