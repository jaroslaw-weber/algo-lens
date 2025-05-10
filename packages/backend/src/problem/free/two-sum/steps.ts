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
  l.comment = "Initial state: target, nums array, and empty 'seen' map.";
  l.breakpoint(1); // Corresponds to #1

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]; // num defined here to be used in explanation for breakpoint 2
    l.comment = `Start of loop iteration for nums[${i}] (${num}).`;
    l.breakpoint(2); // Corresponds to #2 Start loop iteration
    const complement = target - num;

    // Highlight current element and show complement needed
    l.arrayV2({ nums: nums }, { i: i }); // Use inferred label "i"
    l.simple({ complement: complement }); // Corrected l.simple call
    l.comment = `Calculated complement = target (${target}) - nums[${i}] (${num}) = ${complement}.`;
    l.breakpoint(3); // Corresponds to #3 Calculate complement

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
      l.arrayV2({ result: [complementIndex!, i] }, {}); // Added non-null assertion for complementIndex
      l.comment = `Complement (${complement}) found in 'seen' map at index ${complementIndex}. Result is [${complementIndex}, ${i}]. Returning.`;
      l.breakpoint(4); // Corresponds to #4 Found complement
      return l.getSteps();
    }
    l.comment = "Complement not found in 'seen' map yet.";
    l.breakpoint(5); // Corresponds to #5 Complement not found yet

    seen.set(num, i);
    // Log adding the current number to 'seen' map
    l.hashmap("seen", seen, { value: num, color: "primary" });
    l.comment = `Added nums[${i}] (${num}) and its index ${i} to 'seen' map.`;
    l.breakpoint(6); // Corresponds to #6 Add current number and index to map
  }
  l.comment = "Loop finished.";
  l.breakpoint(7); // Corresponds to #7 Loop finished

  l.arrayV2({ result: [] }, {}); // No solution found

  // Original code didn't have a specific step for not found,
  // but we can add one if needed, mirroring the original return pattern.
  // If loop finishes without finding a pair, implicitly means no solution.
  l.comment = "No solution found. Returning empty result.";
  l.breakpoint(8); // Corresponds to #8 No solution found

  return l.getSteps(); // Return steps even if no solution is found during the loop
}
