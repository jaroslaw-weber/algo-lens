import { TestCase } from "algo-lens-core";
import { ContainerInput } from "./types";

// Input type is number[] (heights), output type is number (max area)
export const testcases = [
  { name: "Standard Input", input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
  { name: "Two Equal Heights", input: [1, 1], expected: 1 },
  {
    name: "Default Input",
    input: [1, 7, 2, 8, 1, 6, 4, 9, 3],
    expected: 42, // Changed from [4, 3, 2, 1, 4] (len 5) to len 9
    isDefault: true,
  },
  { name: "Small Input", input: [1, 2, 1], expected: 2 },
  {
    name: "Increasing Then Decreasing",
    input: [2, 3, 4, 5, 18, 17, 6],
    expected: 17,
  },
];
