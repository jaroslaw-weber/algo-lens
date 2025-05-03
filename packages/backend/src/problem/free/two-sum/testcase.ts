import { TwoSumInput } from "./types";

export const testcases: TwoSumInput[] = [
  { nums: [2, 7, 11, 15], target: 9 },
  { nums: [3, 2, 4], target: 6 },
  { nums: [3, 3], target: 6 },
  { nums: [-1, -2, -3, -4, -5], target: -8 },
  { nums: [0, 4, 3, 0], target: 0}, // Edge case: zero target, duplicate numbers
  { nums: [5, 1, 5, 3], target: 10} // Edge case: duplicate numbers summing to target
];
