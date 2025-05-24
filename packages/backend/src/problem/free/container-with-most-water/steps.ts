import { sum } from "lodash";
import { ProblemState } from "algo-lens-core"; // Removed Problem
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(height: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  l.comment = `Initialize pointers and maxArea.`;
  l.arrayV3({ height }, [
    { value: left, label: "left", color: "info" },
    { value: right, label: "right", color: "info" },
  ]);
  l.simple({ maxArea });
  l.breakpoint(1);

  // Main loop to check areas
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    l.comment = `Calculate area: width ${width}, minHeight ${minHeight}. Area ${area}.`;
    l.simple({ area });
    l.breakpoint(2);

    if (area > maxArea) {
      l.comment = `Update maxArea to ${area}.`;

      maxArea = area;
      l.simple({ maxArea });
      l.breakpoint(3);
    }

    if (height[left] < height[right]) {
      l.comment = `Left height smaller. Move left pointer.`;

      l.breakpoint(4);
      left++;
      l.arrayV3({ height }, [
        { value: left, label: "left", color: "info" },
        { value: right, label: "right", color: "info" },
      ]);
    } else {
      l.comment = `Right height smaller. Move right pointer.`;

      l.breakpoint(5);
      right--;
      l.arrayV3({ height }, [
        { value: left, label: "left", color: "info" },
        { value: right, label: "right", color: "info" },
      ]);
    }
  }

  const result = maxArea;
  l.simple({ result });
  l.comment = `All pairs checked. Max area is ${maxArea}.`;
  l.hide("area");
  l.breakpoint(6);

  return l.getSteps();
}
