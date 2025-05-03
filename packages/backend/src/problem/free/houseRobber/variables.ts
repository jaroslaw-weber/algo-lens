import { VariableMetadata } from "algo-lens-core"; // Corrected import

export const variables: VariableMetadata[] = [ // Changed to array
  {
    name: "nums", // Key became name
    label: "nums", // Label added (same as name)
    description: "The input array representing the amount of money in each house.", // Added description
    emoji: "🏠", // Added emoji
  },
  {
    name: "dp",
    label: "dp",
    description: "Dynamic programming array storing the maximum profit achievable up to each house.",
    emoji: "💰",
  },
  {
    name: "i",
    label: "i",
    description: "The index of the current house being considered.",
    emoji: "🔢",
  },
  {
    name: "skipCurrent",
    label: "skipCurrent",
    description: "The maximum profit if the current house (i) is skipped (equivalent to dp[i-1]).",
    emoji: "🚶", // Emoji representing skipping/walking past
  },
  {
    name: "twoHousesBefore",
    label: "twoHousesBefore",
    description: "The maximum profit up to two houses before the current one (dp[i-2]).",
    emoji: "⏮️", // Emoji representing going back two steps
  },
  {
    name: "currentHouse",
    label: "currentHouse",
    description: "The amount of money in the current house (nums[i]).",
    emoji: "💲",
  },
  {
    name: "includeCurrent",
    label: "includeCurrent",
    description: "The maximum profit if the current house (i) is robbed (nums[i] + dp[i-2]).",
    emoji: "➕", // Emoji representing adding/including
  },
  {
    name: "result",
    label: "result",
    description: "The final maximum profit that can be robbed.",
    emoji: "🏆",
  },
];
