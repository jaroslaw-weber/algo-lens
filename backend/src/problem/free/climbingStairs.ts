import { Problem, ProblemState, Variable } from "../core/types";
import { asArray, asValueGroup, asSimpleValue } from "../core/utils";

function climbStairs(p: ClimbingStairsInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { n } = p;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // Initial states of dp array
  s.push({
    variables: [asArray("dp", dp), ...asSimpleValue({ n })],
    breakpoint: 1,
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    s.push({
      variables: [
        asArray("dp", dp, i, i - 1, i - 2),
        ...asSimpleValue({ n }),
        asValueGroup("loop", { i }, { min: 0, max: n }),
      ],
      breakpoint: 2,
    });
  }

  const result = dp[n];
  s.push({
    variables: [asArray("dp", dp, n), ...asSimpleValue({ result })],
    breakpoint: 3,
  });
  return s;
}

interface ClimbingStairsInput {
  n: number;
}
const code = `function climbStairs(n) {
  // Initialize a dynamic programming array with n + 1 elements to hold the number of ways to reach each step
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1; // Base case: one way to stand on the ground (step 0)
  dp[1] = 1; // Base case: one way to reach the first step directly

  //#1 Loop through steps starting from the second step to compute number of ways to reach each step
  for (let i = 2; i <= n; i++) {
    // The number of ways to reach step i is the sum of the ways to reach step (i-1) and step (i-2)
    dp[i] = dp[i - 1] + dp[i - 2];

    //#2 End of loop iteration, continue to next step
  }

  // Store the result, which is the total number of ways to reach the nth step
  const result = dp[n];

  //#3 Return the total ways to reach the nth step
  return result;
}`;

const title = "Climbing Stairs";
const getInput = () => ({ n: 8 });
export const climbStairsProblem: Problem<ClimbingStairsInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: climbStairs,
  id: "climbing-stairs",
  tags: ["dynamic programming"],
  tested: true
};
