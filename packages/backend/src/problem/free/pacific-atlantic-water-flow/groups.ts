import { VariableGroup } from "algo-lens-core";

export const variableGroups: VariableGroup[] = [
  {
    id: "input",
    label: "Input Heights",
    variables: ["heights"],
  },
  {
    id: "reachability",
    label: "Ocean Reachability",
    variables: ["pacificReachable", "atlanticReachable"],
  },
  {
    id: "state",
    label: "Traversal State",
    variables: ["r", "c"], // Indices used during traversal/result collection
  },
   {
    id: "result",
    label: "Result",
    variables: ["result"],
  },
];
