import { TestCase } from "algo-lens-core";
import { HouseRobberInput } from "./types";

// Updated TestCase signature to use tuple input type [number[]]
export const testcases: TestCase<HouseRobberInput, number>[] = [
  // Existing cases (refactored format)
  { input: [1, 2, 3, 1], expected: 4 }, // 1 + 3 = 4
  { input: [2, 7, 9, 3, 1], expected: 12 }, // 2 + 9 + 1 = 12
  { input: [1, 2, 3, 5, 6, 7, 10], expected: 20 }, // 1 + 3 + 6 + 10 = 20
  { input: [0, 0, 0, 0], expected: 0 }, // All houses are empty
];
