import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "nums",
    description: "The input array of numbers.",
    emoji: "🔢", // Using the same emoji as 3sum for consistency
  },
  {
    name: "result",
    description: "Boolean indicating if the array contains duplicate elements.",
    emoji: "✅", // Using the same emoji as 3sum for the result
  },
  // Add other relevant variables if needed based on steps.ts, e.g., a hash set
  {
    name: "seen",
    description: "Hash set to store numbers encountered so far.",
    emoji: "🔍",
  },
];
