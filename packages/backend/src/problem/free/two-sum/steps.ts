import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { TwoSumInput } from "./types"; // Assuming types.ts will be created later
import _ = require("lodash"); // Added lodash, might not be needed but good practice based on 3sum

export function generateSteps(nums: number[], target: number): ProblemState[] {
  const l = new StepLoggerV2();
  const seen = new Map<number, number>();

  l.simple({ target: target }); // Corrected l.simple call
  l.arrayV2({ nums: nums }, {});
  l.hashmap("seen", seen, undefined); // Corrected l.hashmap call, added undefined highlight
  l.breakpoint(1); // Corresponds to #1 in original code

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    // Highlight current element and show complement needed
    l.arrayV2({ nums: nums }, { i: i }); // Use inferred label "i"
    l.simple({ complement: complement }); // Corrected l.simple call
    l.breakpoint(2); // Corresponds to #2

    const complementIndex = seen.get(complement);
    const existsInSet = complementIndex !== undefined;

    // Log the check against the 'seen' map
    l.hashmap("seen", seen, {
      value: complement,
      color: existsInSet ? "success" : "error",
    });

    if (existsInSet) {
      // Highlight the found pair in nums array
      l.arrayV2({ nums: nums }, { i: i, complementIndex: complementIndex }); // Use inferred labels "i" and "complementIndex"
      // Show the final result
      l.arrayV2({ result: [complementIndex, i] }, {});
      l.breakpoint(3); // Corresponds to #3
      return l.getSteps();
    }

    seen.set(num, i);
    // Log adding the current number to 'seen' map
    l.hashmap("seen", seen, { value: num, color: "primary" });
    // No explicit breakpoint 4 in the original structure, but logging the map update is useful
  }

  l.arrayV2({ result: [] }, {}); // No solution found

  // Original code didn't have a specific step for not found,
  // but we can add one if needed, mirroring the original return pattern.
  // If loop finishes without finding a pair, implicitly means no solution.
  l.breakpoint(5); // Optional: Corresponds to original log(5) if needed

  return l.getSteps(); // Return steps even if no solution is found during the loop
}
