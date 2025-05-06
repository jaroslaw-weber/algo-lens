import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    title: "Input",
    variables: ["nums", "target"],
  },
  {
    name: "pointers",
    title: "Pointers",
    variables: ["left", "right", "mid"],
  },
  {
    id: "output",
    title: "Output",
    variables: ["result"],
  },
];
