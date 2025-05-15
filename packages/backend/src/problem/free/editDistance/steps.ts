import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2

export function generateSteps(s1: string, s2: string) {
  // Return type will be inferred or set by StepLoggerV2's output type
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // Log initial state (optional, could log inputs here)
  l.arrayV2({ s1: s1.split("") });
  l.arrayV2({ s2: s2.split("") });
  l.groupOptions.set("size", { min: 0, max: Math.max(m, n) });
  l.group("size", { m, n });
  l.array2d("dp", dp); // Log initial empty dp table

  // Initialize the DP table - First Column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    l.grid("dp", dp, ...[{ r: i, c: 0 }]);
    l.comment = `Initializing the first column of the DP table. The value represents the number of deletions needed to transform a prefix of s1 into an empty string.`;
    l.breakpoint(1);
  }

  // Initialize the DP table - First Row
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    l.grid("dp", dp, ...[{ r: 0, c: j }]);
    l.comment = `Initializing the first row of the DP table. The value represents the number of insertions needed to transform an empty string into a prefix of s2.`;
    l.breakpoint(2);
  }
  l.groupOptions.set("cost", { min: 0, max: m + n });

  l.comment = `DP table initialized. Starting to compute the minimum edit distance using dynamic programming.`;
  // Compute the DP values
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      l.arrayV2({ s1: s1.split("") }, { "i - 1": i - 1 }); // Highlight characters being compared
      l.arrayV2({ s2: s2.split("") }, { "j - 1": j - 1 });

      let op = 0; // Operation cost
      l.breakpoint(3); // Change breakpoint to 3

      if (s1[i - 1] === s2[j - 1]) {
        // Characters match
        op = dp[i - 1][j - 1]; // Cost is the value from diagonal
        dp[i][j] = op;
        // Log state: match case
        l.simple({ op });
        l.grid(
          "dp",
          dp,
          ...[
            { r: i, c: j, label: "current" },
            { r: i - 1, c: j - 1, label: "op" },
          ]
        ); // Highlight updated cell
        l.comment = `Characters '${s1[i - 1]}' and '${s2[j - 1]}' match. The cost is inherited from the diagonal cell, which is ${op}.`;
        l.breakpoint(4); // Keep breakpoint as 4
      } else {
        // Characters don't match - find min cost
        const insertionCost = dp[i][j - 1];
        const deletionCost = dp[i - 1][j];
        const substitutionCost = dp[i - 1][j - 1];
        op = 1 + Math.min(insertionCost, deletionCost, substitutionCost);
        dp[i][j] = op;
        // Log state: mismatch case
        l.group("cost", { insertionCost, deletionCost, substitutionCost });
        l.simple({ op });
        // HIDE_START
        l.grid(
          "dp",
          dp,
          ...[
            { r: i, c: j, label: "current" },
            { r: i, c: j - 1, label: "insert" },
            { r: i - 1, c: j, label: "deletion" },
            { r: i - 1, c: j - 1, label: "substitution" },
          ]
        ); 
        // HIDE_END
        l.comment = `Characters '${s1[i - 1]}' and '${s2[j - 1]}' do not match. The cost is 1 plus the minimum of the costs for insertion (${insertionCost}), deletion (${deletionCost}), or substitution (${substitutionCost}). The calculated cost is ${op}.`;
        l.breakpoint(5); // Change breakpoint to 6
      }
    }
  }

  // Final result
  const result = dp[m][n];
  l.simple({ result });
  l.grid("dp", dp, ...[{ r: m, c: n }]); // Highlight final result cell
  l.comment = `Final result: The minimum edit distance is ${result}.`;
  l.breakpoint(6); // Change breakpoint to 7

  return l.getSteps(); // Return the collected steps
}
