import { ProblemState, TestCase } from "@algolens/core/src/types";

import { EditDistanceInput } from "./types";
// Removed import for EditDistanceInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<EditDistanceInput, ProblemState>[] = [
  {
    name: "Horse to Ros",
    description: "Transform 'horse' to 'ros'.",
    input: ["horse", "ros"],
    expected: 3,
  },
  {
    name: "Intention to Execution",
    description: "Transform 'intention' to 'execution'.",
    input: ["intention", "execution"],
    expected: 5,
  },
  {
    name: "Empty to Single Char",
    description: "Transform an empty string to a single character.",
    input: ["", "a"],
    expected: 1,
  },
  {
    name: "Single Char to Empty",
    description: "Transform a single character to an empty string.",
    input: ["a", ""],
    expected: 1,
  },
  {
    name: "Identical Strings",
    description: "Transform identical strings (expected 0 changes).",
    input: ["abc", "abc"],
    expected: 0,
  },
  {
    name: "Default Intention to Execution",
    description: "Default test case: transform 'intention' to 'execution'.",
    input: ["intention", "execution"],
    expected: 5,
    isDefault: true,
  }, // Changed from ["a", "b"]
  {
    name: "One Char Diff",
    description: "Strings differing by one character.",
    input: ["abc", "axc"],
    expected: 1,
  },
  {
    name: "Sea to Eat",
    description: "Transform 'sea' to 'eat'.",
    input: ["sea", "eat"],
    expected: 2,
  },
  {
    name: "Plasma to Altruism",
    description: "Transform 'plasma' to 'altruism'.",
    input: ["plasma", "altruism"],
    expected: 6,
  },
  {
    name: "Long Strings",
    description: "Transforming two long strings.",
    input: ["dinitrophenylhydrazine", "acetylphenylhydrazine"],
    expected: 6,
  },
  {
    name: "Empty to Empty",
    description: "Transforming an empty string to an empty string.",
    input: ["", ""],
    expected: 0,
  },
];
