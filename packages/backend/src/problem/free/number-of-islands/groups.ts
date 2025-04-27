import { VariableGroup } from "algo-lens-core";

export const variableGroups: VariableGroup[] = [
  {
    id: "grid",
    label: "Grid State",
    variables: ["grid"], // Group the grid itself
  },
  {
    id: "state",
    label: "Traversal State",
    variables: ["r", "c", "numIslands"], // Group loop indices and the island count
  },
];
