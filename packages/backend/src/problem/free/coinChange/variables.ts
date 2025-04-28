import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "coins",
    label: "coins",
    description: "Available coin denominations.",
    emoji: "🪙",
    group: "input", // Correct group
  },
  {
    name: "target",
    label: "target",
    description: "The target amount to make change for.",
    emoji: "🎯",
    group: "input", // Correct group
  },
  {
    name: "dp",
    label: "dp",
    description: "DP array: Minimum coins for each amount from 0 to target.",
    emoji: "🔢",
    group: "dp_table", // Correct group
  },
  {
    name: "coin", // Representing the outer loop variable in the original logic (though the code uses for...of)
    label: "coin",
    description: "Current coin denomination being considered.",
    emoji: "🪙",
    group: "loops", // Correct group
  },
  {
    name: "amount", // Representing the inner loop variable
    label: "amount",
    description: "Current amount being evaluated.",
    emoji: "💰",
    group: "loops", // Correct group
  },
  {
    name: "left",
    label: "left",
    description: "Remaining amount after using the current coin (amount - coin).",
    emoji: "➖",
    group: "loops", // Correct group
  },
  {
    name: "include",
    label: "include",
    description: "Number of coins needed if the current coin is included.",
    emoji: "✅",
    group: "loops", // Correct group
  },
  {
    name: "exclude",
    label: "exclude",
    description: "Number of coins needed if the current coin is excluded (current dp[amount]).",
    emoji: "❌",
    group: "loops", // Correct group
  },
  {
    name: "result",
    label: "result",
    description: "Minimum coins needed for the target amount, or -1 if impossible.",
    emoji: "🏁",
    group: "result", // Correct group
  },
];
