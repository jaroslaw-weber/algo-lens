import { TestCase } from "algo-lens-core";
import { EditDistanceInput } from "./types"; // Assuming type { word1: string; word2: string; }

export const testcases: TestCase<EditDistanceInput, number>[] = [
  // Existing cases (refactored format)
  { input: { word1: "horse", word2: "ros" }, expected: 3 },
  { input: { word1: "intention", word2: "execution" }, expected: 5 },
  { input: { word1: "", word2: "a" }, expected: 1 },
  { input: { word1: "a", word2: "" }, expected: 1 },
  { input: { word1: "abc", word2: "abc" }, expected: 0 },

  // Added generated cases
  { input: { word1: "a", word2: "b" }, expected: 1 },
  { input: { word1: "abc", word2: "axc" }, expected: 1 },
  { input: { word1: "sea", word2: "eat" }, expected: 2 },
  { input: { word1: "plasma", word2: "altruism" }, expected: 6 },
  { input: { word1: "dinitrophenylhydrazine", word2: "acetylphenylhydrazine" }, expected: 6 },
  { input: { word1: "", word2: "" }, expected: 0 },
];
