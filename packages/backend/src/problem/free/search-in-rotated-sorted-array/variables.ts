import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  { key: "nums", name: "nums", type: "array", },
  { key: "target", name: "target", type: "scalar", },
  { key: "left", name: "left", type: "scalar", description: "Left pointer" },
  { key: "right", name: "right", type: "scalar", description: "Right pointer" },
  { key: "mid", name: "mid", type: "scalar", description: "Middle index" },
  { key: "result", name: "result", type: "scalar", description: "Index of target, -1 if not found" },
];
