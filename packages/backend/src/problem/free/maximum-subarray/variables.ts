import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "nums",
    label: "nums",
    description: "The input array of numbers.",
    emoji: "🔢",
  },
  {
    name: "maxSoFar",
    label: "maxSoFar",
    description: "Maximum subarray sum found so far (globally).",
    emoji: "🏆",
  },
  {
    name: "maxEndingHere",
    label: "maxEndingHere",
    description: "Maximum subarray sum ending at the current position.",
    emoji: "📈",
  },
  {
    name: "i",
    label: "i",
    description: "Index for iterating through the input array.",
    emoji: "🚶",
  },
  {
    name: "num", // Representing nums[i] inside the loop
    label: "num",
    description: "The current number being processed from the input array.",
    emoji: "#️⃣",
  },
  {
    name: "result",
    label: "result",
    description: "The final maximum subarray sum.",
    emoji: "🏁", // Or another suitable emoji
  }
];
