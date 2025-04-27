import { VariableMetadataMap, VariableType } from "algo-lens-core";

export const variableMetadata: VariableMetadataMap = {
  dp: {
    type: VariableType.TABLE,
    label: "DP Table",
    description: "Dynamic programming table storing edit distances",
  },
  i: {
    type: VariableType.INDEX,
    label: "i",
    description: "Outer loop index (for s1)",
  },
  j: {
    type: VariableType.INDEX,
    label: "j",
    description: "Inner loop index (for s2)",
  },
  s1: {
    type: VariableType.STRING_ARRAY,
    label: "s1",
    description: "First input string",
  },
  s2: {
    type: VariableType.STRING_ARRAY,
    label: "s2",
    description: "Second input string",
  },
  op: {
    type: VariableType.NUMBER,
    label: "Operation Cost",
    description:
      "Cost of the current operation (match or mismatch/insertion/deletion)",
  },
  result: {
    type: VariableType.NUMBER,
    label: "Result",
    description: "Final edit distance",
  },
  s1Length: {
    type: VariableType.NUMBER,
    label: "Length of s1",
    description: "Length of the first input string",
  },
  s2Length: {
    type: VariableType.NUMBER,
    label: "Length of s2",
    description: "Length of the second input string",
  },
  loop: {
    type: VariableType.GROUP,
    label: "Initialization Loop",
    description: "Loop variables during DP table initialization",
  },
  loops: {
    type: VariableType.GROUP,
    label: "Main Loop",
    description: "Loop variables during DP table computation",
  },
};
