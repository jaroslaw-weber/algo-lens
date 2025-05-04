import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { CoinChangeInput } from "./types";
import { groups } from "./groups"; // Import groups

export function generateSteps(coins: number[], target: number): ProblemState[] {
  const l = new StepLoggerV2();

  // Initialize dp array
  const dp: number[] = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case

  // Log initial state (Breakpoint #1)
  l.simple({ target });
  l.arrayV2("coins", coins);
  l.arrayV2("dp", dp, ...[0]);
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
      l.simple({ target });
      l.arrayV2("coins", coins, ...[i]);
      l.arrayV2("dp", dp, ...[amount, left]);
      // Log loop variables and calculations
      l.simple({ coin: coin }); // Log current coin value
      l.simple({ amount });
      l.simple({ left });
      l.simple({ include });
      l.simple({ exclude });
      l.breakpoint(2, `Evaluating amount ${amount} with coin ${coin}`);

      if (include < exclude) {
        dp[amount] = include;

        // Log state after update (Breakpoint #3 in original code's comment, corresponds to #3 in logic)
        l.simple({ target });
        l.arrayV2("coins", coins, ...[i]);
        l.arrayV2("dp", dp, ...[amount, left]); // dp[amount] is now updated
        // Log loop variables and calculations again
        l.simple({ coin: coin });
        l.simple({ amount });
        l.simple({ left });
        l.simple({ include });
        l.simple({ exclude: dp[amount] }); // exclude is now equal to the new dp[amount]
        l.breakpoint(3, `Updated dp[${amount}] using coin ${coin}`);
      }
    }
  }

  // Log final result (Breakpoint #4 in original code's comment, corresponds to #3 in original ProblemState logic)
  const result = dp[target] === Infinity ? -1 : dp[target];
  l.simple({ target });
  l.arrayV2("coins", coins, ...[]);
  l.arrayV2("dp", dp, ...[target]); // Highlight final dp[target]
  l.simple({ result });
  l.breakpoint(4, "Determine final result from dp[target]"); // Adjusted breakpoint number to match code comment

  return l.getSteps();
}
