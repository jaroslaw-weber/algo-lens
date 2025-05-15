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
  l.arrayV2({ coins: coins }, {});
  l.arrayV2({ dp: dp }, { 0: 0 });
  l.comment = `Initialize dp array of size ${target + 1} with Infinity, representing unreachable amounts. Set dp[0] to 0, as 0 coins are needed for amount 0.`;
  l.breakpoint(1);

  // Outer loop: Iterate through coins
  // Note: The original code uses for...of, but the original ProblemState generation used indices.
  // We will use indices here to match the variable metadata ('coin' as index) and original ProblemState logic.
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i]; // Actual coin value
    l.simple({ coin });
    l.comment = `Iterating through each coin in the coins array. Current coin is ${coin}.`;

    // Inner loop: Iterate through amounts
    for (let amount = coin; amount <= target; amount++) {
      const left = amount - coin;
      const include = dp[left] + 1;
      let exclude = dp[amount];

      // Log state before update check (Breakpoint #2)
      l.simple({ target });
      l.arrayV2({ coins: coins }, { i: i });
      l.arrayV2({ dp: dp }, { amount: amount, left: left });
      // Log loop variables and calculations
      l.simple({ coin: coin }); // Log current coin value
      l.simple({ amount });
      l.simple({ left });
      l.simple({ include });
      l.simple({ exclude });
      l.comment = `Evaluating if using coin ${coin} can achieve amount ${amount} with fewer coins than currently recorded in dp[${amount}].`;
      l.breakpoint(2);

      if (include < exclude) {
        dp[amount] = include;

        l.comment = `Update dp[amount] (${exclude}) with minimum coins (${include})`;

        l.breakpoint(3);
      }
    }
  }

  // Log final result (Breakpoint #4 in original code's comment, corresponds to #3 in original ProblemState logic)
  const result = dp[target] === Infinity ? -1 : dp[target];
  l.simple({ target });
  l.arrayV2({ coins: coins }, {});
  l.arrayV2({ dp: dp }, { target: target }); // Highlight final dp[target]
  l.simple({ result });
  l.comment = `After iterating through all coins, the minimum number of coins to make amount ${target} is stored in dp[${target}]. If dp[${target}] is Infinity, it's impossible to make the amount, so the result is -1.`;
  l.breakpoint(4); // Adjusted breakpoint number to match code comment

  return l.getSteps();
}
