import { sum } from "lodash";
import { ProblemState } from "algo-lens-core"; // Removed Problem
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(height: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  l.comment = `Initialize left pointer to ${left}, right pointer to ${right}, and maxArea to ${maxArea}.`;
  l.arrayV3({ height }, { left, right });
  l.simple({ maxArea });
  l.breakpoint(1);

  // Main loop to check areas
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    l.comment = `Calculate the area between the lines with heights ${height[left]} and ${height[right]}. Width is ${width}, minimum height is ${minHeight}. Area = ${area}.`;
    l.simple({ area });
    l.breakpoint(2);

    if (area > maxArea) {
      l.comment = `The calculated area (${area}) is greater than the current maxArea (${maxArea}). Update maxArea to ${area}.`;

      maxArea = area;
      l.simple({ maxArea });
      l.breakpoint(3);
    }

    if (height[left] < height[right]) {
      l.comment = `Since ${height[left]} is less than ${height[right]}, move the left pointer to the right to potentially find a larger area. New left: ${left + 1}, right: ${right}.`;

      l.breakpoint(4);
      left++;
      l.arrayV3({ height }, { left, right });
    } else {
      l.comment = `Since ${height[left]} is greater than or equal to ${height[right]}, move the right pointer to the left to potentially find a larger area. New left: ${left}, right: ${right - 1}.`;

      l.breakpoint(5);
      right--;
      l.arrayV3({ height }, { left, right });
    }
  }

  const result = maxArea;
  l.simple({ result });
  l.comment = `All possible pairs of lines have been considered. The maximum area found is ${maxArea}.`;
  l.hide("area");
  l.breakpoint(6);

  return l.getSteps();
}
