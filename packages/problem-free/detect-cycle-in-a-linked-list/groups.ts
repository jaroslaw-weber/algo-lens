import { GroupMetadata } from "@algolens/core/src/types";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "The input linked list head.",
    emoji: "🔗",
  },
  {
    name: "pointers",
    label: "Pointers",
    description: "Pointers used to traverse the linked list.",
    emoji: "👉",
  },
  {
    name: "result",
    label: "Result",
    description: "The final result indicating if a cycle is detected.",
    emoji: "✅",
  },
];
