import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { InsertIntervalInput, Interval } from "./types"; // Import Interval as well

const title = "Insert Interval";
const getInput = () => ({
  intervals: [[1, 3], [6, 9]] as Interval[], // Add type assertion for clarity
  newInterval: [2, 5] as Interval, // Add type assertion for clarity
});

export const problem: Problem<InsertIntervalInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: generateSteps, // Use generateSteps from steps.ts
  id: "insert-interval",
  tags: ["intervals", "array", "merging"], // Added relevant tags
  tested: true, // Assuming it was tested, keep as true
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
