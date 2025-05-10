import { EditDistanceInput } from "./types"; // Keep this if needed, or remove if EditDistanceInput is defined elsewhere or not used
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
  l.simple({ s1Length: s1.length });
  l.simple({ s2Length: s2.length });
  l.array2d("dp", dp); // Log initial empty dp table

  // Initialize the DP table - First Column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    l.array2d("dp", dp, ...[{ r: i, c: 0 }]);
    l.breakpoint_explanation = `Initializing first column of DP table (deletions to empty string). dp[${i}][0] = ${i}.`;
    l.breakpoint(1);
  }

  // Initialize the DP table - First Row
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    l.grid("dp", dp, ...[{ r: 0, c: j }]);
    l.breakpoint_explanation = `Initializing first row of DP table (insertions from empty string). dp[0][${j}] = ${j}.`;
    l.breakpoint(2);
  }

  // Compute the DP values
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      l.arrayV2({ s1: s1.split("") }, { "i - 1": i - 1 }); // Highlight characters being compared
      l.arrayV2({ s2: s2.split("") }, { "j - 1": j - 1 });

      let cost = 0; // Renamed 'op' to 'cost' for clarity? Or keep 'op'? Let's keep 'op'.
      let op = 0; // Operation cost - keeping original name 'op'

      if (s1[i - 1] === s2[j - 1]) {
        // Characters match
        op = dp[i - 1][j - 1]; // Cost is the value from diagonal
        dp[i][j] = op;
        // Log state: match case
        l.simple({ op });
        l.grid("dp", dp, ...[{ r: i, c: j }]); // Highlight updated cell
        l.breakpoint_explanation = `Calculated DP value for dp[${i}][${j}]. s1[${i-1}] ('${s1[i-1]}') == s2[${j-1}] ('${s2[j-1]}'). No cost, op = ${op}.`;
        l.breakpoint(3); // Breakpoint after calculation
      } else {
        // Characters don't match - find min cost
        const insertionCost = dp[i][j - 1];
        const deletionCost = dp[i - 1][j];
        const substitutionCost = dp[i - 1][j - 1];
        op = 1 + Math.min(insertionCost, deletionCost, substitutionCost);
        dp[i][j] = op;
        // Log state: mismatch case
        // Optional: Log intermediate costs if helpful for visualization
        // l.simple("insertionCost", insertionCost, { group: "loopVariables" });
        // l.simple("deletionCost", deletionCost, { group: "loopVariables" });
        // l.simple("substitutionCost", substitutionCost, { group: "loopVariables" });
        l.simple({ insertionCost, deletionCost, substitutionCost });
        l.simple({ op });
        l.grid("dp", dp, ...[{ r: i, c: j }]); // Highlight updated cell
        l.breakpoint_explanation = `Calculated DP value for dp[${i}][${j}]. s1[${i-1}] ('${s1[i-1]}') != s2[${j-1}] ('${s2[j-1]}'). Cost = 1 + min(${insertionCost}, ${deletionCost}, ${substitutionCost}) = ${op}.`;
        l.breakpoint(3); // Breakpoint after calculation
      }
      // Reset op? Maybe not needed if logged correctly above.
      // l.simple("op", undefined, { group: "loopVariables" });
    }
  }

  // Final result
  const result = dp[m][n];
  l.simple({ result });
  l.grid("dp", dp, ...[{ r: m, c: n }]); // Highlight final result cell
  l.breakpoint_explanation = `Final result: dp[${m}][${n}] = ${result}.`;
  l.breakpoint(4);

  return l.getSteps(); // Return the collected steps
}
// Ensure EditDistanceInput type is correctly handled or removed if not used directly in this file.
// If EditDistanceInput was just for type hinting the input object, it might not be needed anymore.
