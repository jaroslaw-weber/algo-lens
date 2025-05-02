import { TestCase } from "algo-lens-core";
import { EditDistanceInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type EditDistanceOutput = number;

// Define the test cases for the editDistance function
export const testcases: Array<TestCase<EditDistanceInput, EditDistanceOutput>> = [
  {
    input: {
      s1: "horse",
      s2: "ros",
    },
    expected: 3, // Replace 'h' with 'r', Remove 'r', Remove 'e'
    description: "Standard case: 'horse' to 'ros'"
  },
  {
    input: {
      s1: "intention",
      s2: "execution",
    },
    expected: 5, // Various substitutions and deletions
    description: "Standard case: 'intention' to 'execution'"
  },
  {
    input: {
      s1: "",
      s2: "abc",
    },
    expected: 3, // Insert 'a', 'b', 'c'
    description: "Edge case: Empty string s1"
  },
   {
    input: {
      s1: "xyz",
      s2: "",
    },
    expected: 3, // Delete 'x', 'y', 'z'
    description: "Edge case: Empty string s2"
   },
   {
     input: {
       s1: "abc",
       s2: "abc"
     },
     expected: 0, // Strings are identical
     description: "Edge case: Identical strings"
   }
];
