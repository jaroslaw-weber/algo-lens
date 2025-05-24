import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(n: number): ProblemState[] {
  const l = new StepLoggerV2();

  // Initialize dp array
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // Log initial state before loop
  l.simple({ n }); // n belongs to 'input' group
  l.arrayV3({ dp: dp }, []); // dp belongs to 'computation' group
  l.comment =
    "Initialize base cases: dp[0] = 1 (0 steps, 1 way), dp[1] = 1 (1 step, 1 way).";
  l.breakpoint(1);

  // Loop through steps
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    // Log state within the loop
    l.simple({ n });
    l.arrayV3({ dp: dp }, [
      { value: i, label: "current step", color: "primary" },
      { value: i - 1, label: "previous step 1", color: "info" },
      { value: i - 2, label: "previous step 2", color: "info" },
    ]);
    l.comment = `Ways to reach step ${i}: dp[i-1] + dp[i-2].`;
    l.breakpoint(2);
  }

  // Log final result
  const result = dp[n];
  l.arrayV3({ dp: dp }, [{ value: n, label: "total ways", color: "success" }]);
  l.simple({ result }); // result belongs to 'computation' group
  l.comment = `Total ways to reach step ${n} is result.`;
  l.breakpoint(3);

  return l.getSteps();
}
