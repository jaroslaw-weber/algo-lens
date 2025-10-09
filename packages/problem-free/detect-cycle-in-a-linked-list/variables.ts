import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "head",
    label: "Head",
    description: "The head of the linked list.",
    emoji: "🔗",
  },
  {
    name: "slow",
    label: "Slow Pointer",
    description: "The slow pointer, moving one step at a time.",
    emoji: "🐢",
  },
  {
    name: "fast",
    label: "Fast Pointer",
    description: "The fast pointer, moving two steps at a time.",
    emoji: "🐇",
  },
  {
    name: "result",
    label: "Result",
    description: "Boolean indicating if a cycle is detected.",
    emoji: "✅",
  },
];
