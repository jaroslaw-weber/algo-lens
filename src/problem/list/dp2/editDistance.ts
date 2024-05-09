import { Problem, ProblemState } from "../../types";
import { asArray, as2dArray, asSimpleValue } from "../../utils";

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
        ...asSimpleValue({ s1Length: s1.length, s2Length: s2.length }),
        asArray("dp", dp),
        ...asSimpleValue({ i }),
      ],
      breakpoint: 1,
    });
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    steps.push({
      variables: [
        ...asSimpleValue({ s1Length: s1.length, s2Length: s2.length }),
        asArray("dp", dp),
        ...asSimpleValue({ j }),
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
          ...asSimpleValue({
            s1Char: s1.charCodeAt(i - 1),
            s2Char: s2.charCodeAt(j - 1),
          }),
          asArray("dp", dp, i, j),
          ...asSimpleValue({ op, i, j }),
        ],
        breakpoint: 3,
      });
    }
  }

  const result = dp[m][n];
  steps.push({
    variables: [
      ...asSimpleValue({ s1Length: s1.length, s2Length: s2.length }),
      as2dArray("dp", dp, [{ r: m, c: n }]),
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
const getInput = () => ({ s1: "kitten", s2: "sitting" });

export const editDistanceProblem: Problem<
  EditDistanceInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: editDistance,
  id: "edit-distance",
};
