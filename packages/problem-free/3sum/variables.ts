import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "nums",
    description: "The input array of numbers.",
    emoji: "🔢",
  },
  {
    name: "target",
    description: "The target sum we are looking for (always 0 for 3Sum).",
    emoji: "🎯",
  },
  {
    name: "result",
    description: "The list of unique triplets that sum up to the target.",
    emoji: "✅",
  },
  {
    name: "i",
    description: "Index of the first element in the potential triplet.",
    emoji: "👆",
  },
  {
    name: "left",
    description: "Left pointer index, starting after 'i'.",
    emoji: "👈",
  },
  {
    name: "right",
    description: "Right pointer index, starting at the end of the array.",
    emoji: "👉",
  },
  {
    name: "sum",
    description:
      "The sum of the current triplet (nums[i] + nums[left] + nums[right]).",
    emoji: "➕",
  },
  {
    name: "triplet",
    description:
      "The current triplet being examined ([nums[i], nums[left], nums[right]]).",
    emoji: "📦",
  },
];
