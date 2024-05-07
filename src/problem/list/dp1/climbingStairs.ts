import { Problem } from "../../Problem";

function climbStairs(p: ClimbingStairsInput): any[] {
  const steps = [];
  const { n } = p;
  const dp: number[] = new Array(n + 1).fill(0);
  steps.push({  n, dp:dp.slice() , line:1});
  dp[0] = 1; // Ensure dp[0] is set for clarity, even though it's technically not needed.
  steps.push({  n, dp:dp.slice() , line:2});
  dp[1] = 1;
  steps.push({  n, dp:dp.slice() , line:3 });
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({  i, n, dp:dp.slice() , line:7})
  }
  const result = dp[n];
  steps.push({  n, dp ,result,line:12 });
  return steps;
}

interface ClimbingStairsState {
  label?: string;
  n: number;
  dp: number[];
}
interface ClimbingStairsInput {
  n: number;
}

const code = `function climbStairs(n) {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    // Number of ways to climb i steps
    dp[i] = dp[i - 1] + dp[i - 2]; 
  }
  
  // Number of ways to climb n steps
  const result = dp[n];
  return result; 
} 
`;
const title = "Climbing Stairs";
const getInput = () => ({ n: 8 });
export const climbStairsProblem: Problem<
  ClimbingStairsInput,
  ClimbingStairsState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: climbStairs,
};

