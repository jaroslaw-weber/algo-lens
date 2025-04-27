import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger"; // Adjusted path
import { ClimbingStairsInput } from "./types";
import { groups } from "./groups"; // Import groups

export function generateSteps(p: ClimbingStairsInput): ProblemState[] {
  const l = new StepLogger();
  const { n } = p;

  // Initialize dp array
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // Log initial state before loop
  l.simple({ n }, groups[0].name); // n belongs to 'input' group
  l.array("dp", dp, [], groups[1].name); // dp belongs to 'computation' group
  l.breakpoint(1, "Initialize base cases for dp array");
  l.save();

  // Loop through steps
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    // Log state within the loop
    l.simple({ n }, groups[0].name);
    l.array("dp", dp, [i, i - 1, i - 2], groups[1].name);
    l.group("loop", { i }, groups[1].name, { min: 2, max: n }); // i belongs to 'computation' group
    l.breakpoint(2, `Calculate ways for step ${i}`);
    l.save();
  }

  // Log final result
  const result = dp[n];
  l.array("dp", dp, [n], groups[1].name);
  l.simple({ result }, groups[1].name); // result belongs to 'computation' group
  l.breakpoint(3, "Store the final result");
  l.save();

  return l.getSteps();
}
