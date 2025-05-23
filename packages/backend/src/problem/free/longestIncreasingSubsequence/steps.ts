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

  l.arrayV3({ nums: nums }, []);
  l.arrayV3({ dp: dp }, []);
  l.comment = "Initial state: nums array and dp array (all 1s).";
  l.breakpoint(1); //#1

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const currentNum = nums[i];
      const previousNum = nums[j];
      l.group(
        "compare",
        { currentNum, previousNum },
        { min: Math.min(...nums), max: Math.max(...nums) }
      );
      l.arrayV3({ nums: nums }, [
        { dimension: "column", value: i, label: "current", color: "primary" },
        { dimension: "column", value: j, label: "previous", color: "info" },
      ]);
      l.arrayV3({ dp: dp }, [
        {
          dimension: "column",
          value: i,
          label: "current dp",
          color: "primary",
        },
        { dimension: "column", value: j, label: "previous dp", color: "info" },
      ]);
      l.comment = `Compare ${currentNum} with ${previousNum}. Extend LIS?`;
      l.breakpoint(2); //#2

      if (currentNum > previousNum) {
        const currentDpI = dp[i];
        const newDpI = dp[j] + 1;
        dp[i] = Math.max(currentDpI, newDpI);

        l.arrayV3({ nums: nums }, [
          { dimension: "column", value: i, label: "current", color: "primary" },
          { dimension: "column", value: j, label: "previous", color: "info" },
        ]);
        l.arrayV3({ dp: dp }, [
          {
            dimension: "column",
            value: i,
            label: "current dp",
            color: "primary",
          },
        ]);

        l.comment = `Current number is greater. Extend LIS.`;
        l.breakpoint(3); //#3

        l.arrayV3({ nums: nums }, [
          { dimension: "column", value: i, label: "current", color: "primary" },
          { dimension: "column", value: j, label: "previous", color: "info" },
        ]);
        l.arrayV3({ dp: dp }, [
          {
            dimension: "column",
            value: i,
            label: "current dp",
            color: "primary",
          },
        ]);
        l.comment = `Update LIS length for current number.`;
        l.breakpoint(4); //#4
      }
    }
  }

  const maxLength = n > 0 ? Math.max(...dp) : 0;
  l.simple({ result: maxLength });
  l.arrayV3({ dp: dp }, []);
  l.arrayV3({ nums: nums }, []);
  l.comment = `All numbers processed. LIS length: ${maxLength}.`;
  l.breakpoint(5); //#5

  return l.getSteps();
}
