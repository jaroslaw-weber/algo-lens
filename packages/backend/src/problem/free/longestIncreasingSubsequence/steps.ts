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
      l.arrayV2({ nums: nums }, { i: i, j: j });
      l.arrayV2({ dp: dp }, { i: i, j: j });
      l.comment = `Comparing the current number (${nums[i]}) with a previous number (${nums[j]}).`;
      l.breakpoint(2); //#2

      if (nums[i] > nums[j]) {
        const currentDpI = dp[i];
        const newDpI = dp[j] + 1;
        dp[i] = Math.max(currentDpI, newDpI);

        l.arrayV2({ nums: nums }, { i: i, j: j });
        l.arrayV2({ dp: dp }, { i: i });

        l.comment = `Since the current number (${nums[i]}) is greater than the previous number (${nums[j]}), we can potentially extend the longest increasing subsequence ending at the previous number. The length of the LIS ending at the current number is updated from ${currentDpI} to ${dp[i]} because the LIS ending at the previous number (${dp[j]}) plus 1 (${newDpI}) is greater.`;
        l.breakpoint(3); //#3
      }
    }
  }

  const maxLength = n > 0 ? Math.max(...dp) : 0;
  l.simple({ result: maxLength });
  l.arrayV2({ dp: dp });
  l.arrayV2({ nums: nums });
  l.comment = `All numbers have been processed. The final result, ${maxLength}, is the maximum length found in the dp array, representing the length of the longest increasing subsequence.`;
  l.breakpoint(4); //#4

  return l.getSteps();
}
