import { TestCase } from "algo-lens-core";

// Updated TestCase signature to use tuple input type [number[]]
export const testcases: TestCase<[number[]], number>[] = [
  // Existing cases (refactored format)
  { input: [[1, 2, 3, 1]], expected: 4 }, // 1 + 3 = 4
  { input: [[2, 7, 9, 3, 1]], expected: 12 }, // 2 + 9 + 1 = 12
  { input: [[]], expected: 0 }, // Empty array
  { input: [[2, 1, 1, 2]], expected: 4 }, // 2 + 2 = 4
  { input: [[2]], expected: 2 }, // Single element

  // Added generated cases (refactored format)
  { input: [[0]], expected: 0 },
  { input: [[1, 2]], expected: 2 },
  { input: [[2, 1]], expected: 2 },
  { input: [[1, 3, 1]], expected: 3 },
  { input: [[6, 7, 1, 30, 8, 2, 4]], expected: 41 }, // 7 + 30 + 4 = 41
  { input: [[10, 1, 1, 10]], expected: 20 }, // 10 + 10 = 20
];
