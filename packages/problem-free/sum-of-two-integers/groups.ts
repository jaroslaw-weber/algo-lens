import { GroupMetadata } from "@algolens/core/src/types";
// Corrected import

export const groups: GroupMetadata[] = [
  // Corrected type annotation
  {
    name: "input", // Use 'name' for identifier
    label: "Input", // Keep 'label' for display text
    description: "Input integers a and b", // Added description
    emoji: "🔢", // Added emoji
    // variables: ["a", "b"], // Removed invalid 'variables' property
    // highlight: true // Removed invalid 'highlight' property
  },
  {
    name: "output", // Use 'name' for identifier
    label: "Output", // Keep 'label' for display text
    description: "Calculation result", // Added description
    emoji: "✅", // Added emoji
    // variables: ["result"], // Removed invalid 'variables' property
    // highlight: true // Removed invalid 'highlight' property
  },
];
