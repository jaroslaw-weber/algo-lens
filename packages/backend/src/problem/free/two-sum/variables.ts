import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "nums",
    description: "Input array of numbers",
    type: "array",
    emoji: "🔢",
  },
  {
    name: "target",
    description: "The target sum we are looking for",
    type: "simple",
    emoji: "🎯",
  },
  {
    name: "seen",
    description: "Map storing numbers encountered so far and their indices",
    type: "hashmap",
    emoji: "👀",
  },
  {
    name: "i",
    description: "Current index in the nums array",
    type: "simple",
    emoji: "👆",
  },
  {
    name: "complement",
    description: "Value needed to reach the target (target - nums[i])",
    type: "simple",
    emoji: "❓",
  },
  {
    name: "result",
    description: "Array containing the indices of the two numbers that sum to the target",
    type: "array",
    emoji: "✅",
  },
  // Note: complementIndex isn't explicitly logged as a separate variable in steps.ts,
  // but its value is used in logging. We can add it here for completeness if needed,
  // though it might not appear directly in the visualization based on current steps.ts.
  // Let's add it for potential future use or clarification.
  {
      name: "complementIndex",
      description: "Index of the complement found in the 'seen' map",
      type: "simple",
      emoji: "🔑",
  },
];
