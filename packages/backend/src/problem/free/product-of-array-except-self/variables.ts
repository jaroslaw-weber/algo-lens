import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "nums",
    label: "Input Array",
    description: "The original array of numbers.",
    emoji: "🔢",
  },
  {
    name: "leftProducts",
    label: "Left Products",
    description:
      "Array storing the product of all elements to the left of the current index.",
    emoji: "⬅️",
  },
  {
    name: "rightProducts",
    label: "Right Products",
    description:
      "Array storing the product of all elements to the right of the current index.",
    emoji: "➡️",
  },
  {
    name: "result",
    label: "Output Array",
    description:
      "The resulting array where each element is the product of all elements in the input array except for the element at the current index.",
    emoji: "✅",
  },
];
