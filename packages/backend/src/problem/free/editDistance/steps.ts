import { EditDistanceInput } from "./types"; // Keep this if needed, or remove if EditDistanceInput is defined elsewhere or not used
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2

export function generateSteps(s1: string, s2: string) { // Return type will be inferred or set by StepLoggerV2's output type
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // Log initial state (optional, could log inputs here)
  l.array("s1", s1, undefined, { group: "inputs" });
  l.array("s2", s2, undefined, { group: "inputs" });
  l.simple("s1Length", s1.length, { group: "inputs" });
  l.simple("s2Length", s2.length, { group: "inputs" });
  l.array2d("dp", dp, undefined, { group: "dpTable" }); // Log initial empty dp table

  // Initialize the DP table - First Column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    l.simple("i", i, { group: "loopVariables" });
    l.array2d("dp", dp, [{ r: i, c: 0 }], { group: "dpTable" });
    l.breakpoint(1);
  }
  // Reset i after loop if needed, or log it as inactive
  l.simple("i", undefined, { group: "loopVariables" }); // Indicate loop finish

  // Initialize the DP table - First Row
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    l.simple("j", j, { group: "loopVariables" });
    l.array2d("dp", dp, [{ r: 0, c: j }], { group: "dpTable" });
    l.breakpoint(2);
  }
  // Reset j after loop
  l.simple("j", undefined, { group: "loopVariables" }); // Indicate loop finish


  // Compute the DP values
  for (let i = 1; i <= m; i++) {
     l.simple("i", i, { group: "loopVariables" }); // Log i at the start of outer loop
    for (let j = 1; j <= n; j++) {
      l.simple("j", j, { group: "loopVariables" }); // Log j at the start of inner loop
      l.array("s1", s1, i - 1, { group: "inputs" }); // Highlight characters being compared
      l.array("s2", s2, j - 1, { group: "inputs" });

      let cost = 0; // Renamed 'op' to 'cost' for clarity? Or keep 'op'? Let's keep 'op'.
      let op = 0; // Operation cost - keeping original name 'op'

      if (s1[i - 1] === s2[j - 1]) {
        // Characters match
        op = dp[i - 1][j - 1]; // Cost is the value from diagonal
        dp[i][j] = op;
        // Log state: match case
        l.simple("op", op, { group: "loopVariables", label: "Cost (Match)" });
        l.array2d("dp", dp, [{ r: i, c: j }], { group: "dpTable" }); // Highlight updated cell
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
        l.simple("op", op, { group: "loopVariables", label: "Cost (Mismatch/Ins/Del)" });
        l.array2d("dp", dp, [{ r: i, c: j }], { group: "dpTable" }); // Highlight updated cell
        l.breakpoint(3); // Breakpoint after calculation
      }
      // Reset op? Maybe not needed if logged correctly above.
      // l.simple("op", undefined, { group: "loopVariables" });
    }
     // Reset j after inner loop
     l.simple("j", undefined, { group: "loopVariables" });
  }
   // Reset i after outer loop
   l.simple("i", undefined, { group: "loopVariables" });

  // Final result
  const result = dp[m][n];
  l.simple("result", result, { group: "result" });
  l.array2d("dp", dp, [{ r: m, c: n }], { group: "dpTable" }); // Highlight final result cell
  // Optionally log final inputs again if they weren't logged initially
  // l.array("s1", s1, undefined, { group: "inputs" });
  // l.array("s2", s2, undefined, { group: "inputs" });
  l.breakpoint(4);

  return l.getSteps(); // Return the collected steps
}
// Ensure EditDistanceInput type is correctly handled or removed if not used directly in this file.
// If EditDistanceInput was just for type hinting the input object, it might not be needed anymore.
