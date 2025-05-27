import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "root",
    label: "Root Node",
    description: "The root node of the binary tree.",
    emoji: "🌲",
  },
  {
    name: "node",
    label: "Current Node",
    description: "The current node being processed during traversal.",
    emoji: "➡️",
  },
  {
    name: "depth",
    label: "Current Depth",
    description: "The depth of the current node from the root.",
    emoji: "📏",
  },
  {
    name: "maxDepth",
    label: "Maximum Depth",
    description: "The maximum depth found so far.",
    emoji: "🏆",
  },
  {
    name: "queue",
    label: "Queue",
    description: "The queue used for Breadth-First Search (BFS) traversal.",
    emoji: "🇶",
  },
  {
    name: "stack",
    label: "Stack",
    description: "The stack used for Depth-First Search (DFS) traversal.",
    emoji: "🇸",
  },
  {
    name: "result",
    label: "Result",
    description: "The final maximum depth of the binary tree.",
    emoji: "✅",
  },
];
