import { VariableMetadata } from "algo-lens-core"; // Updated import

export const variableMetadata: VariableMetadata[] = [
  // Changed to array
  {
    name: "dp", // Key became name
    label: "dp", // Label added (same as name)
    description: "Dynamic programming table storing edit distances", // Kept description
    emoji: "🔢", // Added emoji
  },
  {
    name: "i",
    label: "i",
    description: "Outer loop index (for s1)",
    emoji: "➡️",
  },
  {
    name: "j",
    label: "j",
    description: "Inner loop index (for s2)",
    emoji: "⬇️",
  },
  {
    name: "s1",
    label: "s1",
    description: "First input string",
    emoji: "📄",
  },
  {
    name: "s2",
    label: "s2",
    description: "Second input string",
    emoji: "📄",
  },
  {
    name: "op",
    label: "op",
    description:
      "Cost of the current operation (match or mismatch/insertion/deletion)",
    emoji: "💲",
  },
  {
    name: "result",
    label: "result",
    description: "Final edit distance",
    emoji: "🏁",
  },
  {
    name: "s1Length",
    label: "s1Length",
    description: "Length of the first input string",
    emoji: "📏",
  },
  {
    name: "s2Length",
    label: "s2Length",
    description: "Length of the second input string",
    emoji: "📏",
  },
  // Removed 'loop' and 'loops' groups as they don't represent specific variables
  // in the same way as the others and might be better handled dynamically if needed.
  // If they represent loop counters, 'i' and 'j' already cover that.
];
