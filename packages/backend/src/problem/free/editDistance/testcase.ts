import { TestCase } from "algo-lens-core";
// Removed import for EditDistanceInput

// Reverted TestCase signature to use tuple input type
export const testcases = [
  { input: ["horse", "ros"], expected: 3 },
  { input: ["intention", "execution"], expected: 5 },
  { input: ["", "a"], expected: 1 },
  { input: ["a", ""], expected: 1 },
  { input: ["abc", "abc"], expected: 0 },
  { input: ["a", "b"], expected: 1 ,
    isDefault: true},
  { input: ["abc", "axc"], expected: 1 },
  { input: ["sea", "eat"], expected: 2 },
  { input: ["plasma", "altruism"], expected: 6 },
  { input: ["dinitrophenylhydrazine", "acetylphenylhydrazine"], expected: 6 },
  { input: ["", ""], expected: 0 }
];
