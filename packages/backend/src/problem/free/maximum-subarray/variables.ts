import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "nums",
    label: "nums",
    description: "The input array of numbers.",
    emoji: "🔢",
    group: "input", // Correct group
  },
  {
    name: "maxSoFar",
    label: "maxSoFar",
    description: "Maximum subarray sum found so far (globally).",
    emoji: "🏆",
    group: "kadane_vars", // Correct group
  },
  {
    name: "maxEndingHere",
    label: "maxEndingHere",
    description: "Maximum subarray sum ending at the current position.",
    emoji: "📈",
    group: "kadane_vars", // Correct group
  },
  {
    name: "i",
    label: "i",
    description: "Index for iterating through the input array.",
    emoji: "🚶",
    group: "loop", // Correct group
  },
  {
    name: "num", // Representing nums[i] inside the loop
    label: "num",
    description: "The current number being processed from the input array.",
    emoji: "#️⃣",
    group: "loop", // Correct group
  },
  {
    name: "result",
    label: "result",
    description: "The final maximum subarray sum.",
    emoji: "🏁", // Or another suitable emoji
    group: "kadane_vars", // Or a more appropriate group if available, like 'output' or 'result'
  }
];
