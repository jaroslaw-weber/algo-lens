import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger"; // Adjusted path
import { ClimbingStairsInput } from "./types";
import { groups } from "./groups"; // Import groups
import { StepLoggerV2 } from "../../core/StepLoggerV2";

export function generateSteps(p: ClimbingStairsInput): ProblemState[] {
  const l = new StepLoggerV2();

  // Initialize dp array
  const dp: number[] = new Array(p + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // Log initial state before loop
  l.simple({ n: p }); // n belongs to 'input' group
  l.array("dp", dp); // dp belongs to 'computation' group
  l.breakpoint(1, "Initialize base cases for dp array");

  // Loop through steps
  for (let i = 2; i <= p; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    // Log state within the loop
    l.simple({ n: p });
    l.array("dp", dp, i, i - 1, i - 2);
    l.group("loop", { i }, { min: 2, max: p }); // i belongs to 'computation' group
    l.breakpoint(2, `Calculate ways for step ${i}`);
    l.hide("loop")
  }

  // Log final result
  const result = dp[p];
  l.array("dp", dp, p);
  l.simple({ result }) // result belongs to 'computation' group
  l.breakpoint(3, "Store the final result");

  return l.getSteps();
}
