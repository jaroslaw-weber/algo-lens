import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "prices",
    description:
      "The stock prices for each day. You're choosing the best day to buy and sell.",
    emoji: "📈",
  },
  {
    name: "dp",
    description: "The maximum profit you could have made up to that day.",
    emoji: "💰",
  },
  {
    name: "price",
    description: "The current day's price being considered (prices[i]).",
    emoji: "💵",
  },
  {
    name: "minPrice",
    description: "The lowest price seen so far — you 'buy' at this price.",
    emoji: "🏦",
  },
  {
    name: "diff",
    description:
      "The possible profit if you bought at minPrice and sold today (price - minPrice).",
    emoji: "🔍",
  },
  {
    name: "prev",
    description: "The best profit found until the previous day (dp[i - 1]).",
    emoji: "📊",
  },
  { name: "i", description: "The current step/day in the loop.", emoji: "🔄" },
];