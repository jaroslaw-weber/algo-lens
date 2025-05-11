import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { InsertIntervalInput } from "./types";
import { testcases } from "./testcase";

const title = "Insert Interval";

export const problem: Problem<InsertIntervalInput, ProblemState> = {
  title: title,
  emoji: "➕",
  func: (i) => generateSteps(...i), // Use generateSteps from steps.ts
  codegen: { // Added codegen property
    signature: "insertInterval(intervals: number[][], newInterval: number[]): number[][]", // Added signature
  },
  testcases,
  difficulty: "medium",
  id: "insert-interval",
  tags: ["array", "intervals"], // Updated tags
  metadata: {
    variables,
    groups: groups,
  },
};
