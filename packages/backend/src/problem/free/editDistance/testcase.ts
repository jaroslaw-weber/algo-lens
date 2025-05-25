import { ProblemState, TestCase } from "algo-lens-core";
import { EditDistanceInput } from "./types";
// Removed import for EditDistanceInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<EditDistanceInput, ProblemState>[] = [
  { name: "Horse to Ros", input: ["horse", "ros"], expected: 3 },
  {
    name: "Intention to Execution",
    input: ["intention", "execution"],
    expected: 5,
  },
  { name: "Empty to Single Char", input: ["", "a"], expected: 1 },
  { name: "Single Char to Empty", input: ["a", ""], expected: 1 },
  { name: "Identical Strings", input: ["abc", "abc"], expected: 0 },
  {
    name: "Default Intention to Execution",
    input: ["intention", "execution"],
    expected: 5,
    isDefault: true,
  }, // Changed from ["a", "b"]
  { name: "One Char Diff", input: ["abc", "axc"], expected: 1 },
  { name: "Sea to Eat", input: ["sea", "eat"], expected: 2 },
  { name: "Plasma to Altruism", input: ["plasma", "altruism"], expected: 6 },
  {
    name: "Long Strings",
    input: ["dinitrophenylhydrazine", "acetylphenylhydrazine"],
    expected: 6,
  },
  { name: "Empty to Empty", input: ["", ""], expected: 0 },
];
