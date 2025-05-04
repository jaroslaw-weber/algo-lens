import { defineGroup } from "@problem/types/group";
import { variables } from "./variables";

export const groups = {
  input: defineGroup({
    label: "Input",
    description: "The rotated array and the target value.",
    variables: [variables.nums, variables.target],
  }),
  searchSpace: defineGroup({
    label: "Binary Search Pointers",
    description: "Indices defining the current search space within the array.",
    variables: [variables.left, variables.right, variables.mid],
  }),
  comparison: defineGroup({ // Renamed from 'Comparison' to 'Current Comparison' for clarity
    label: "Current Comparison",
    description: "Value at the middle index being compared.",
    variables: [variables.midValue], // Grouping midValue separately
  }),
  output: defineGroup({
    label: "Result",
    description: "The outcome of the search.",
    variables: [variables.result],
  }),
};
