import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  const n = nums.length;

  if (n === 0) {
    l.simple({ maxLength: 0 });
    l.breakpoint(4);
    return l.getSteps();
  }

  const dp: number[] = new Array(n).fill(1);

  l.arrayV2({ nums: nums });
  l.arrayV2({ dp: dp });
  l.comment = "Initial state: nums array and dp array (all 1s).";
  l.breakpoint(1); //#1

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const currentNum = nums[i];
      const previousNum = nums[j];
      l.group("compare", {currentNum, previousNum}, {min: Math.min(...nums), max: Math.max(...nums)})
      l.arrayV2({ nums: nums }, { i: i, j: j });
      l.arrayV2({ dp: dp }, { i: i, j: j });
      l.comment = `Comparing the current number (${currentNum}) with a previous number (${previousNum}). We are checking if we can extend an increasing subsequence ending at the previous number.`;
      l.breakpoint(2); //#2

      if (currentNum > previousNum) {
        const currentDpI = dp[i];
        const newDpI = dp[j] + 1;
        dp[i] = Math.max(currentDpI, newDpI);

        l.arrayV2({ nums: nums }, { i: i, j: j });
        l.arrayV2({ dp: dp }, { i: i });

        l.comment = `Since the current number (${currentNum}) is greater than the previous number (${previousNum}), we can potentially extend the longest increasing subsequence ending at the previous number.`;
        l.breakpoint(3); //#3

        l.arrayV2({ nums: nums }, { i: i, j: j });
        l.arrayV2({ dp: dp }, { i: i });
        l.comment = `We update the length of the LIS ending at the current number to be the maximum of its current length (${currentDpI}) and the length of the LIS ending at the previous number plus 1 (${newDpI}). The new length is ${dp[i]}.`;
        l.breakpoint(4); //#4
      }
    }
  }

  const maxLength = n > 0 ? Math.max(...dp) : 0;
  l.simple({ result: maxLength });
  l.arrayV2({ dp: dp });
  l.arrayV2({ nums: nums });
  l.comment = `All numbers have been processed. The final result, ${maxLength}, is the maximum value in the dp array. This value represents the length of the longest increasing subsequence found in the input array.`;
  l.breakpoint(5); //#5

  return l.getSteps();
}
