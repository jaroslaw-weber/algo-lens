import { TestCase } from "algo-lens-core";
import { HouseRobberInput } from "./types";

// Updated TestCase signature to use tuple input type [number[]]
export const testcases = [
  { input: [1, 2, 3, 1], expected: 4 },
  { input: [2, 7, 9, 3, 1], expected: 12 },
  { input: [1, 2, 3, 5, 6, 7, 10], expected: 20 ,
    isDefault: true},
  { input: [0, 0, 0, 0], expected: 0 }
];
