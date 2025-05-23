import { ProblemState } from "algo-lens-core"; // Keep ProblemState for return type hint
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  let result = false; // Initialize result to false
  const hashSet: Set<number> = new Set();

  // Initial state log before the loop starts
  l.arrayV3({ nums: nums }, []);
  l.hashset("hashSet", hashSet, { value: -1, color: "neutral" }); // Initial empty hashset state
  l.simple({ result }); // Initial result state
  l.comment = "Initial state: empty hashSet, result is false.";
  l.breakpoint(1);

  // Main loop to check for duplicates
  for (let i = 0; i < nums.length; i++) {
    // Log state before checking hashSet
    l.arrayV3({ nums: nums }, [{ value: i, label: "i" }]);
    l.hashset("hashSet", hashSet, { value: nums[i], color: "neutral" }); // Highlight value being checked
    l.simple({ result });
    l.comment = `Checking if element at index ${i} is in hashSet.`;
    l.breakpoint(2);

    if (hashSet.has(nums[i])) {
      result = true; // Set result to true if duplicate found
      // Log duplicate found state
      l.arrayV3({ nums: nums }, [{ value: i, label: "i" }]);
      l.hashset("hashSet", hashSet, { value: nums[i], color: "error" }); // Highlight duplicate
      l.simple({ result }); // Log final true result
      l.comment = "Duplicate found. Set result to true and return.";
      l.breakpoint(3);
      return l.getSteps(); // Return early
    } else {
      hashSet.add(nums[i]);
      // Log state after adding to hashSet
      l.arrayV3({ nums: nums }, [{ value: i, label: "i" }]);
      l.hashset("hashSet", hashSet, { value: nums[i], color: "success" }); // Highlight added value
      l.simple({ result });
      l.comment = "Element not in hashSet. Added element to hashSet.";
      l.breakpoint(4);
    }
  }

  // Logs the final state when no duplicate is found
  l.arrayV3({ nums: nums }, []); // Final array state
  l.hashset("hashSet", hashSet, { value: -1, color: "neutral" }); // Final hashset state
  l.simple({ result }); // Log final false result
  l.comment =
    "No duplicates found after checking all elements. Result is false.";
  l.breakpoint(5);

  return l.getSteps();
}
