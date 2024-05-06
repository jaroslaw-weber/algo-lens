import React from "react";
import ProblemVisualizer from "../ProblemVisualizer";
import { wait } from "../../utils/utils";
 function climbStairs(
  p: { n: number },
): any[] {
  const steps = [];
  const { n } = p;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1; // Ensure dp[0] is set for clarity, even though it's technically not needed.
  steps.push({ step: "Initial state", n, dp });
  dp[1] = 1;
  steps.push({ step: "Base case 1", n, dp });
  if (n > 1) {
    dp[2] = 2;
    steps.push({ step: "Base case 2", n, dp });
  }
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({ step: `Calculate dp[${i}]`, i, n, dp });
  }
  steps.push({ step: "Final state", n, dp });
  return steps
}

const ClimbStairsComponent = () => {
  const codeSnippet = `
    function climbStairs(n) {
      let dp = [0, 1, 2];
      for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
      }
      return dp[n];
    } 
  `;

  return (
    <ProblemVisualizer
      solveFunction={climbStairs}
      input={{ n: 8 }}
      codeSnippet={codeSnippet}
      title="Climbing Stairs"
    />
  );
};


export interface Problem<T>{
  code:string 
  getInput:()=>T 
  title:string;
  func: (t:T)=>any[]}

export const climbStairsProblem:Problem<{n:number}>={
  title: "Climbing Stairs",
  code : `
    function climbStairs(n) {
      let dp = [0, 1, 2];
      for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
      }
      return dp[n];
    } 
  `,
  getInput:()=> ({ n: 8 }),
  func: climbStairs
}

export default ClimbStairsComponent;
