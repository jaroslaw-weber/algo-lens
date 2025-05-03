import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { CoinChangeInput } from "./types";
import { groups } from "./groups"; // Import groups

export function generateSteps(p: CoinChangeInput): ProblemState[] {
  const l = new StepLoggerV2();
  const { coins, target } = p;

  // Initialize dp array
  const dp: number[] = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case

  // Log initial state (Breakpoint #1)
  l.simple({ target }, groups.find(g => g.name === "input")!.name);
  l.array("coins", coins, [], groups.find(g => g.name === "input")!.name);
  l.array("dp", dp, [0], groups.find(g => g.name === "dp_table")!.name);
  l.breakpoint(1, "Initialize dp table with base case dp[0] = 0");

  // Outer loop: Iterate through coins
  // Note: The original code uses for...of, but the original ProblemState generation used indices.
  // We will use indices here to match the variable metadata ('coin' as index) and original ProblemState logic.
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i]; // Actual coin value

    // Inner loop: Iterate through amounts
    for (let amount = coin; amount <= target; amount++) {
      const left = amount - coin;
      const include = dp[left] + 1;
      const exclude = dp[amount];

      // Log state before update check (Breakpoint #2)
      l.simple({ target }, groups.find(g => g.name === "input")!.name);
      l.array("coins", coins, [i], groups.find(g => g.name === "input")!.name);
      l.array("dp", dp, [amount, left], groups.find(g => g.name === "dp_table")!.name);
      // Log loop variables and calculations
      l.simple({ coin: coin }, groups.find(g => g.name === "loops")!.name); // Log current coin value
      l.simple({ amount }, groups.find(g => g.name === "loops")!.name);
      l.simple({ left }, groups.find(g => g.name === "loops")!.name);
      l.simple({ include }, groups.find(g => g.name === "loops")!.name);
      l.simple({ exclude }, groups.find(g => g.name === "loops")!.name);
      l.breakpoint(2, `Evaluating amount ${amount} with coin ${coin}`);


      if (include < exclude) {
        dp[amount] = include;

        // Log state after update (Breakpoint #3 in original code's comment, corresponds to #3 in logic)
        l.simple({ target }, groups.find(g => g.name === "input")!.name);
        l.array("coins", coins, [i], groups.find(g => g.name === "input")!.name);
        l.array("dp", dp, [amount, left], groups.find(g => g.name === "dp_table")!.name); // dp[amount] is now updated
        // Log loop variables and calculations again
        l.simple({ coin: coin }, groups.find(g => g.name === "loops")!.name);
        l.simple({ amount }, groups.find(g => g.name === "loops")!.name);
        l.simple({ left }, groups.find(g => g.name === "loops")!.name);
        l.simple({ include }, groups.find(g => g.name === "loops")!.name);
        l.simple({ exclude: dp[amount] }, groups.find(g => g.name === "loops")!.name); // exclude is now equal to the new dp[amount]
        l.breakpoint(3, `Updated dp[${amount}] using coin ${coin}`);
      }
    }
  }

  // Log final result (Breakpoint #4 in original code's comment, corresponds to #3 in original ProblemState logic)
  const result = dp[target] === Infinity ? -1 : dp[target];
  l.simple({ target }, groups.find(g => g.name === "input")!.name);
  l.array("coins", coins, [], groups.find(g => g.name === "input")!.name);
  l.array("dp", dp, [target], groups.find(g => g.name === "dp_table")!.name); // Highlight final dp[target]
  l.simple({ result }, groups.find(g => g.name === "result")!.name);
  l.breakpoint(4, "Determine final result from dp[target]"); // Adjusted breakpoint number to match code comment

  return l.getSteps();
}
