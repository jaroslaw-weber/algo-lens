import { Problem, ProblemState, Variable } from "../../Problem";
import { asArray, asSingleValue } from "../../service";

function climbStairs(p: ClimbingStairsInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { n } = p;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  // Initial states of dp array
  s.push({
    variables: [
      asArray("dp", dp),
      ...asSingleValue({ n }),
    ],
    breakpoint: 1,
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    s.push({
      variables: [
        asArray("dp", dp, i, i - 1, i - 2),
        ...asSingleValue({ i }),
      ],
      breakpoint: 2,
    });
  }

  const result = dp[n];
  s.push({
    variables: [
      asArray("dp", dp, n),
      ...asSingleValue({ result }),
    ],
    breakpoint: 3,
  });
  return s;
}

interface ClimbingStairsInput {
  n: number;
}

const code = `function climbStairs(n) {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1; // Base case
  dp[1] = 1; // Base case
  //#1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    //#2
  }
  const result = dp[n];
  //#3
  return result;
}`;

const title = "Climbing Stairs";
const getInput = () => ({ n: 8 });
export const climbStairsProblem: Problem<ClimbingStairsInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: climbStairs,
};
