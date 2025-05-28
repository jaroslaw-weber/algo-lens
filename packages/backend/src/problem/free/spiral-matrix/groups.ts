import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "The input matrix for the problem.",
    emoji: "📥",
  },
  {
    name: "boundaries",
    label: "Boundaries",
    description:
      "Variables defining the current traversal boundaries (top, bottom, left, right).",
    emoji: "🚧",
  },
  {
    name: "traversal",
    label: "Traversal",
    description:
      "Variables used during the spiral traversal (row and column indices).",
    emoji: "🚶",
  },
  {
    name: "result",
    label: "Result",
    description: "The array accumulating elements in spiral order.",
    emoji: "✅",
  },
];
