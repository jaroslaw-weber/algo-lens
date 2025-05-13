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
  l.comment = "Initialize the state with the input array 'nums', the 'target' sum, and an empty hash map called 'seen'. The 'seen' map will store numbers from 'nums' as keys and their indices as values to quickly check for complements.";
  l.breakpoint(1); // Corresponds to #1

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]; // num defined here to be used in explanation for breakpoint 2
    l.comment = `Start iterating through the 'nums' array from the beginning. The current element being processed is nums[${i}] with value ${num}.`;
    l.breakpoint(2); // Corresponds to #2 Start loop iteration
    const complement = target - num;

    // Highlight current element and show complement needed
    l.arrayV2({ nums: nums }, { i: i }); // Use inferred label "i"
    l.simple({ complement: complement }); // Corrected l.simple call
    l.comment = `For the current number nums[${i}] (${num}), calculate the 'complement' needed to reach the target sum. The complement is target (${target}) - nums[${i}] (${num}) = ${complement}. We need to find if this complement exists in the 'seen' map.`;
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
      l.comment = `Check if the calculated complement (${complement}) exists as a key in the 'seen' map. If it does, it means we have found two numbers in the array that add up to the target: the current number at index ${i} and the complement found at index ${complementIndex} (retrieved from the 'seen' map). The result is the indices [${complementIndex}, ${i}].`;
      l.breakpoint(4); // Corresponds to #4 Found complement
      return l.getSteps();
    }
    l.comment = "The calculated complement was not found in the 'seen' map. This means the current number, when added to any of the numbers processed so far (stored in 'seen'), does not equal the target.";
    l.breakpoint(5); // Corresponds to #5 Complement not found yet

    seen.set(num, i);
    // Log adding the current number to 'seen' map
    l.hashmap("seen", seen, { value: num, color: "primary" });
    l.comment = `Since the complement was not found, add the current number nums[${i}] (${num}) and its index ${i} to the 'seen' map. This makes the current number available as a potential complement for subsequent numbers in the array.`;
    l.breakpoint(6); // Corresponds to #6 Add current number and index to map
  }
  l.comment = "The loop has finished iterating through the entire 'nums' array.";
  l.breakpoint(7); // Corresponds to #7 Loop finished

  l.arrayV2({ result: [] }, {}); // No solution found

  // Original code didn't have a specific step for not found,
  // but we can add one if needed, mirroring the original return pattern.
  // If loop finishes without finding a pair, implicitly means no solution.
  l.comment = "The loop finished without finding a pair of numbers that sum up to the target. This means no solution exists in the array. Return an empty result.";
  l.breakpoint(8); // Corresponds to #8 No solution found

  return l.getSteps(); // Return steps even if no solution is found during the loop
}
