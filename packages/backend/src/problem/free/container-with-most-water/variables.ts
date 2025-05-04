import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "height",
    label: "height",
    description:
      "The input array representing the heights of the vertical lines.",
    emoji: "📊",
  },
  {
    name: "left",
    label: "left",
    description: "The pointer starting from the left end of the array.",
    emoji: "👈",
  },
  {
    name: "right",
    label: "right",
    description: "The pointer starting from the right end of the array.",
    emoji: "👉",
  },
  {
    name: "maxArea",
    label: "maxArea",
    description: "The maximum area found so far between two lines.",
    emoji: "🏆",
  },
  {
    name: "width",
    label: "width",
    description:
      "The current width between the left and right pointers (right - left).",
    emoji: "↔️",
  },
  {
    name: "currentHeight",
    label: "currentHeight",
    description:
      "The height of the shorter line between the left and right pointers.",
    emoji: "📏",
  },
  {
    name: "area",
    label: "area",
    description:
      "The area calculated for the current pair of lines (width * currentHeight).",
    emoji: "🌊",
  },
];
