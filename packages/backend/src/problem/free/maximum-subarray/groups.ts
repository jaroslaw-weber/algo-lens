import { GroupMetadata } from 'algo-lens-core';

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "Input array for the problem.",
    emoji: "📥",
  },
  {
    name: "kadane_vars", // Changed from kandane for consistency
    label: "Kadane's Variables",
    description: "Variables used in Kadane's algorithm.",
    emoji: "💡",
  },
  {
    name: "loop",
    label: "Loop",
    description: "Variables related to the iteration.",
    emoji: "🔁",
  },
];
