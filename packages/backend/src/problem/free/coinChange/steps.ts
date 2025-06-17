import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2"; // Adjusted path
import { CoinChangeInput } from "./types";
import { groups } from "./groups"; // Import groups

export function generateSteps(coins: number[], target: number): ProblemState[] {
  const l = new StepLoggerV2();

  // Initialize dp array
  const dp: number[] = new Array(target + 1).fill(Infinity);
  dp[0] = 0; // Base case

  // Log initial state (Breakpoint #1)
  l.simple({ target });
  l.arrayV3({ coins: coins }, []);
  l.arrayV3({ dp: dp }, [{ value: 0, label: "base case", color: "success" }]);
  l.comment = `Initialize dp array. dp[0] is 0.`;
  l.breakpoint(1);

  // Outer loop: Iterate through coins
  // Note: The original code uses for...of, but the original ProblemState generation used indices.
  // We will use indices here to match the variable metadata ('coin' as index) and original ProblemState logic.
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i]; // Actual coin value
    l.simple({ coin });
    l.comment = `Process coin ${coin}.`;

    // Inner loop: Iterate through amounts
    for (let amount = coin; amount <= target; amount++) {
      const left = amount - coin;
      const include = dp[left] + 1;
      let exclude = dp[amount];

      // Log state before update check (Breakpoint #2)
      l.simple({ target });
      l.arrayV3({ coins: coins }, [
        { value: i, label: "current coin", color: "primary" },
      ]);
      l.arrayV3({ dp: dp }, [
        { value: amount, label: "current amount", color: "primary" },
        { value: left, label: "remaining amount", color: "info" },
      ]);
      // Log loop variables and calculations
      l.simple({ coin: coin }); // Log current coin value
      l.simple({ amount });
      l.simple({ left });
      l.simple({ include });
      l.simple({ exclude });
      l.comment = `Check if coin ${coin} improves amount ${amount}.`;
      l.breakpoint(2);

      if (include < exclude) {
        dp[amount] = include;

        l.comment = `Update dp[amount] with fewer coins.`;

        l.breakpoint(3);
      }
    }
  }

  // Log final result (Breakpoint #4 in original code's comment, corresponds to #3 in original ProblemState logic)
  const result = dp[target] === Infinity ? -1 : dp[target];
  l.simple({ target });
  l.arrayV3({ coins: coins }, []);
  l.arrayV3({ dp: dp }, [
    { value: target, label: "final amount", color: "success" },
  ]); // Highlight final dp[target]
  l.simple({ result });
  l.comment = `Final result for amount ${target}.`;
  l.breakpoint(4); // Adjusted breakpoint number to match code comment

  return l.getSteps();
}
