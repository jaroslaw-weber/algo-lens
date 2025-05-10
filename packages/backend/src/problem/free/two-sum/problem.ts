import { Problem, ProblemState } from "algo-lens-core";
import * as fs from "fs";
import * as path from "path";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { TwoSumInput } from "./types";
import { groups } from "./groups";
import { testcases } from "./testcase";

// Read the description from description.md
let description = "";
try {
  description = fs.readFileSync(
    path.join(__dirname, "description.md"),
    "utf-8"
  );
} catch (error) {
  console.error("Error reading description.md:", error);
  // Keep description as empty string if file reading fails
}

export const problem: Problem<TwoSumInput, ProblemState> = {
  title: "Two Sum",
  emoji: "🎯",
  description: description, // Add the description here
  func: (i) => generateSteps(...i), // Use the imported step generation function
  id: "two-sum",
  difficulty: "easy",
  tags: ["array", "hash set"],
  metadata: {
    variables, // Use the imported variables
    groups, // Use the imported groups
  },
  testcases: testcases, // Use the imported testcases
  codegen: {
    signature: "function twoSum(nums: number[], target: number): number[]",
  },
};
