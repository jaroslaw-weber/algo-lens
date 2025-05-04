import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "coins",
    label: "coins",
    description: "Available coin denominations.",
    emoji: "🪙",
  },
  {
    name: "target",
    label: "target",
    description: "The target amount to make change for.",
    emoji: "🎯",
  },
  {
    name: "dp",
    label: "dp",
    description: "DP array: Minimum coins for each amount from 0 to target.",
    emoji: "🔢",
  },
  {
    name: "coin", // Representing the outer loop variable in the original logic (though the code uses for...of)
    label: "coin",
    description: "Current coin denomination being considered.",
    emoji: "🪙",
  },
  {
    name: "amount", // Representing the inner loop variable
    label: "amount",
    description: "Current amount being evaluated.",
    emoji: "💰",
  },
  {
    name: "left",
    label: "left",
    description:
      "Remaining amount after using the current coin (amount - coin).",
    emoji: "➖",
  },
  {
    name: "include",
    label: "include",
    description: "Number of coins needed if the current coin is included.",
    emoji: "✅",
  },
  {
    name: "exclude",
    label: "exclude",
    description:
      "Number of coins needed if the current coin is excluded (current dp[amount]).",
    emoji: "❌",
  },
  {
    name: "result",
    label: "result",
    description:
      "Minimum coins needed for the target amount, or -1 if impossible.",
    emoji: "🏁",
  },
];
