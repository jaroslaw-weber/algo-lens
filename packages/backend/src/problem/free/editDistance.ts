import { Problem, ProblemState } from "algo-lens-core";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../core/utils";

function editDistance(p: EditDistanceInput): ProblemState[] {
  const { s1, s2 } = p;
  const steps: ProblemState[] = [];
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // Initialize the DP table
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    steps.push({
      variables: [
        as2dArray("dp", dp, [{ r: i, c: 0 }]),
        asValueGroup("loop", { i }, { min: 0,max: m }),
      ],
      breakpoint: 1,
    });
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    steps.push({
      variables: [
        as2dArray("dp", dp, [{ r: 0, c: j }]),
        asValueGroup("loop", { j }, { min: 0, max:n }),
      ],
      breakpoint: 2,
    });
  }

  // Compute the DP values
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let op = 0; // Operation cost
      if (s1[i - 1] === s2[j - 1]) {
        op = dp[i - 1][j - 1]; // No operation needed if characters match
      } else {
        op = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        dp[i][j] = op;
      }
      steps.push({
        variables: [
          asValueGroup("loops", { i, j }, { min: 1, max: Math.max(m, n) }),
          as2dArray("dp", dp, [{ r: i, c: j }]),
          asStringArray("s1", s1, i - 1),
          asStringArray("s2", s2, j - 1),
          ...asSimpleValue({ op }),
        ],
        breakpoint: 3,
      });
    }
  }

  const result = dp[m][n];
  steps.push({
    variables: [
      as2dArray("dp", dp, [{ r: m, c: n }]),
      asStringArray("s1", s1),
      asStringArray("s2", s2),
      ...asSimpleValue({ s1Length: s1.length, s2Length: s2.length }),
      ...asSimpleValue({ result }),
    ],
    breakpoint: 4,
  });

  return steps;
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
    //#1
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    //#2
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
      //#3
    }
  }

  //#4
  return dp[m][n];
}`;

const title = "Edit Distance";
const getInput = () => ({ s1: "kitten", s2: "sitting" });

export const editDistanceProblem: Problem<EditDistanceInput, ProblemState> = {
  title,
  code,
  getInput,
  func: editDistance,
  id: "edit-distance",
  tags: ["dynamic programming", "string"],
};
