import { defineGroup } from "@problem/types/group";
import { variables } from "./variables";

export const groups = {
  input: defineGroup({
    label: "Input",
    description: "The string and dictionary provided.",
    variables: [variables.s, variables.wordDict],
  }),
  dpTable: defineGroup({
    label: "Dynamic Programming Table",
    description: "Tracking if substrings can be segmented.",
    variables: [variables.dp],
  }),
  loopIndices: defineGroup({
    label: "Loop Indices",
    description: "Indices used to iterate through the string and substrings.",
    variables: [variables.i, variables.j],
  }),
  currentState: defineGroup({
    label: "Current State",
    description: "Variables reflecting the check within the inner loop.",
    variables: [variables.substring, variables.wordFound],
  }),
  output: defineGroup({
    label: "Result",
    description: "The final boolean result.",
    variables: [variables.result],
  }),
};
