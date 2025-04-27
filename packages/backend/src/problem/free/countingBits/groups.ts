import { VariableGroup } from "algo-lens-core";

export const groups: VariableGroup[] = [
  {
    name: "loop",
    label: "Outer Loop Iteration",
    description: "Tracks the current number 'i' being processed from 0 to n.",
  },
  {
    name: "count",
    label: "Bit Counting",
    description: "Tracks the number of set bits ('1's) for the current number.",
  },
  {
      name: "binaryRepresentation",
      label: "Binary Representation",
      description: "Shows the binary representation of the number being processed.",
  }
];
