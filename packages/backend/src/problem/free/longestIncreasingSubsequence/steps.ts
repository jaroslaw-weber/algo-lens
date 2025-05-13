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
      l.comment = `Comparing nums[${i}] (${nums[i]}) with nums[${j}] (${nums[j]}).`;
      l.breakpoint(2); //#2

      if (nums[i] > nums[j]) {
        const currentDpI = dp[i];
        const newDpI = dp[j] + 1;
        dp[i] = Math.max(currentDpI, newDpI);

        l.arrayV2({ nums: nums }, { i: i, j: j });
        l.arrayV2({ dp: dp }, { i: i });

        l.comment = `nums[${i}] (${nums[i]}) > nums[${j}] (${nums[j]}). Updated dp[${i}] from ${currentDpI} to ${dp[i]} because dp[${j}] (${dp[j]}) + 1 = ${newDpI}.`;
        l.breakpoint(3); //#3
      }
    }
  }

  const maxLength = n > 0 ? Math.max(...dp) : 0;
  l.simple({ result: maxLength });
  l.arrayV2({ dp: dp });
  l.arrayV2({ nums: nums });
  l.comment = "Final result: calculated maxLength from dp array.";
  l.breakpoint(4); //#4

  return l.getSteps();
}
