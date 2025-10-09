import { VariableMetadata } from "@algolens/core/src/types";
// Changed import

// Changed type annotation and array content
export const variables: VariableMetadata[] = [
  {
    name: "a", // Changed label to name
    description: "First input integer", // Added description
    emoji: "🅰️", // Added emoji
  },
  {
    name: "b", // Changed label to name
    description: "Second input integer", // Added description
    emoji: "🅱️", // Added emoji
  },
  {
    name: "result", // Changed label to name
    description: "The sum of a and b", // Added description
    emoji: "✅", // Added emoji
  },
];
