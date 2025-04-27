import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "nums",
    description: "The input array of numbers.",
    emoji: "🔢",
    group: "input", // Correct group
  },
  {
    name: "maxSoFar",
    description: "Maximum subarray sum found so far (globally).",
    emoji: "🏆",
    group: "kadane_vars", // Correct group
  },
  {
    name: "maxEndingHere",
    description: "Maximum subarray sum ending at the current position.",
    emoji: "📈",
    group: "kadane_vars", // Correct group
  },
  {
    name: "i",
    description: "Index for iterating through the input array.",
    emoji: "🚶",
    group: "loop", // Correct group
  },
  {
    name: "num", // Representing nums[i] inside the loop
    description: "The current number being processed from the input array.",
    emoji: "#️⃣",
    group: "loop", // Correct group
  }
];
