import { Problem } from "../../Problem";
import {cloneDeep} from 'lodash'
function editDistance(p: { s1: string, s2: string }): any[] {
  const { s1, s2 } = p;
  const steps = [];
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize the DP table
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;  // Cost of deleting all characters from s1
    steps.push({dp: cloneDeep(dp),line: 1 });
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;  // Cost of inserting all characters into s1
    steps.push({ dp: cloneDeep(dp), line: 6 });
  }

  // Compute the DP values
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];  // No operation needed if characters match
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],    // Deletion
          dp[i][j - 1],    // Insertion
          dp[i - 1][j - 1] // Substitution
        );
      }
      steps.push({ i, j, dp: cloneDeep(dp),line: 17 });
    }
  }

  const result = dp[m][n];
  steps.push({ s1, s2, dp: cloneDeep(dp), result, line: 23 });
  return steps;
}

interface EditDistanceState {
  s1: string;
  s2: string;
  dp: number[][];
}

interface EditDistanceInput {
  s1: string;
  s2: string;
}

const code = `function editDistance(s1: string, s2: string): number {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}`;

const title = "Edit Distance";

const getInput = () => ({
	s1: "kitten", // Changed from "horse"
	s2: "sitting" // Changed from "ros"
  });

export const editDistanceProblem: Problem<
  EditDistanceInput,
  EditDistanceState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: editDistance,
};
