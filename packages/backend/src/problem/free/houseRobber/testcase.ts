import { TestCase } from "algo-lens-core";
import { HouseRobberInput } from "./types";

// Updated TestCase signature to use tuple input type [number[]]
export const testcases = [
  {
    name: "Standard Input",
    description: "A basic test case with mixed values.",
    input: [1, 2, 3, 1],
    expected: 4,
  },
  {
    name: "Larger Values",
    description: "Test case with larger monetary values.",
    input: [2, 7, 9, 3, 1],
    expected: 12,
  },
  {
    name: "Default Input",
    description: "Default test case for initial display.",
    input: [1, 2, 3, 5, 6, 7, 10],
    expected: 20,
    isDefault: true,
  },
  {
    name: "All Zeros",
    description: "Test case with all houses having zero money.",
    input: [0, 0, 0, 0],
    expected: 0,
  },
];
