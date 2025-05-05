import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: "Input",
    description: "Input numbers",
    emoji: "🔢",
    variables: ["a", "b"],
    highlight: true
  },
  {
    name: "Output",
    description: "Calculation result",
    emoji: "✅",
    variables: ["result"],
    highlight: true
  },
];
