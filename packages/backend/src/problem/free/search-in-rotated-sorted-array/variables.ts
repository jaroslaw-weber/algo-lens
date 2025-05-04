import { defineVariable } from "@problem/types/variable";

export const variables = {
  nums: defineVariable({
    label: "nums",
    description: "The rotated sorted array 🔄",
    type: "integer[]",
    role: "input",
  }),
  target: defineVariable({
    label: "target",
    description: "The value to search for 🎯",
    type: "integer",
    role: "input",
  }),
  left: defineVariable({
    label: "left",
    description: "Left pointer for binary search 👈",
    type: "integer",
    role: "local",
  }),
  right: defineVariable({
    label: "right",
    description: "Right pointer for binary search 👉",
    type: "integer",
    role: "local",
  }),
  mid: defineVariable({
    label: "mid",
    description: "Middle index calculated in binary search 📍",
    type: "integer",
    role: "local",
  }),
  midValue: defineVariable({ // Added for clarity in steps
    label: "midValue",
    description: "Value at the middle index (nums[mid])",
    type: "integer",
    role: "local",
  }),
  result: defineVariable({
    label: "result",
    description: "Index of target if found, otherwise -1 🤔",
    type: "integer",
    role: "output",
  }),
};
